const http  = require("http");
const fs = require("fs");
const url = require("url");
const socket = require("socket.io");
const mysql = require("mysql");
const regs = require("./lib/regs");
//创建HTTP服务
let httpServer = http.createServer((req,res)=>{
  fs.readFile(`www${req.url}`,(err,data)=>{
    if(err){
      res.writeHeader(404);
      res.write("not found!");
    }else{
      res.write(data);
    }
    res.end();
  });
});
httpServer.listen(8080,function(){
  console.log("this httpServer is running success port 8080!");
});
let db = mysql.createPool({host:"localhost",user:"root",password:"",database:"20171116"});
// websocket服务
let asock = [];
let ws = socket.listen(httpServer); // 监听这HTTP服务
ws.on("connection",sock=>{
  asock.push(sock);
  let cur_username = "";
  let cur_userID = 0;
  // 注册接口
  sock.on("reg",(user,pass)=>{
    //校验数据
    if(!regs.username.test(user)){
      sock.emit("reg_ret",1,"用户名不符合规范");
    }else if(!regs.password.test(pass)){
      sock.emit("reg_ret",1,"密码不符合规范");
    }else{
      db.query(`SELECT ID FROM user_table WHERE username='${user}'`,(err,data)=>{
        if(err){
          sock.emit("reg_ret",1,"数据库有错");
        }else if(data.length>0){
          sock.emit("reg_ret",1,"用户名已存在");
        }else{
          db.query(`INSERT INTO user_table(username,password,online) VALUES('${user}','${pass}', 0)`,err=>{
            if(err){
              sock.emit("reg_ret",1,"数据库有错");
            }else{
              sock.emit("reg_ret",0,"注册成功");
            }
          });
        }
      });
    }
  });
  // 登陆接口
  sock.on("login",(user,pass)=>{
    // 校验数据
    if(!regs.username.test(user)){
      sock.emit("login_ret",1,"用户名不符合规范");
    }else if(!regs.password.test(pass)){
      sock.emit("login_ret",1,"密码不符合规范");
    }else{
      db.query(`SELECT ID,password FROM user_table WHERE username='${user}'`,(err,data)=>{
        if(err){
          sock.emit("login_ret",1,"数据库有错");
        }else if(data.length==0){
          sock.emit("login_ret",1,"用户不存在");
        }else if(data[0].password!=pass){
          sock.emit("login_ret",1,"用户名或密码错误");
        }else{
          db.query(`UPDATE user_table SET online=1 WHERE ID=${data[0].ID}`,err=>{
            if(err){
              sock.emit("login_ret",1,"数据库有错");
            }else{
              sock.emit("login_ret",0,"登陆成功");
              cur_username = user;
              cur_userID=data[0].ID;
            }
          });
        }
      });
    }
  });
// 发言
    sock.on("msg",txt=>{
      if(!txt){
        sock.emit("msg_ret",1,"输入文本不能为空");
      }else{
        asock.forEach(item=>{
          if(item==sock)return;
          item.emit("msg",cur_username,txt);
        });
        sock.emit("msg_ret",0,"发送成功");
      }
    });
  // 离线
sock.on("disconnect",function(){
    db.query(`UPDATE user_table SET online=0 WHERE ID=${cur_userID}`,err=>{
      if(err){
        console.log("数据库有错 ",err);
      }
      cur_username = "";
      cur_userID = 0;
      asock = asock.filter(item=>item!=sock);
    });
  })
});
