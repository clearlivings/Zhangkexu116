const mysql = require("mysql");
// 连接数据库,创建连接池
let db = mysql.createPool({host:"localhost",user:"root",password:"",database:"20171116"});
db.query("SELECT * FROM user_table",(err,data)=>{
  if(err){
    console.log(err);
  }else{
    console.log(data);
  }
});
/*[ RowDataPacket {
    ID: 1,
    username: 'zcox',
    password: '123456',
    online: <Buffer 00> },
  RowDataPacket {
    ID: 2,
    username: 'blue',
    password: '789456',
    online: <Buffer 00> },
  RowDataPacket {
    ID: 3,
    username: 'clearboy',
    password: '111111',
    online: <Buffer 00> } ]
*/
