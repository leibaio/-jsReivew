class Person {
  constructor(name) {
    this.name = name;
  }
  drink() {
    console.log('喝水');
  }
}

class Student extends Person{
  constructor(name, score) {
    // new Person();
    super(name);
    this.score = score;
  }

  introduce() {
    console.log(`我是${this.name}, 考了${this.score}分`);
  }
}

const student = new Student('张三', 99);
console.log(student);
console.log(student.name + student.score);
student.introduce();
student.drink();

class Teacher extends Person{
  constructor(name, subject) {
    super(name);
    this.subject = subject;
  }

  teach() {
    console.log(`我是${this.name}, 教了${this.subject}`);
  }
}

const teacher = new Teacher('李四', '数学');
console.log(teacher);
console.log(teacher.name + teacher.subject);
teacher.teach();
teacher.drink();

// 继承方式 extends，使用super()执行父类函数