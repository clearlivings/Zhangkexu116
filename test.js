class Custome{
  constructor(name,age){ // 构造函数
    this.name = name;
    this.age = age;
  }
  showName(){
    alert(this.name);
  }
  showAge(){
    alert(this.age);
  }
}
class CustomeV extends Custome{
  constructor(name,age,grade){
    super(name,age); // 超类
    this.grade = grade;
  }
  showGrade(){
    alert(this.grade);
  }
}
let cusv = new CustomeV('mianma',15,20);
cusv.showName();
cusv.showAge();
cusv.showGrade();
