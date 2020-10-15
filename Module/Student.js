var User = require('./User');
class Student extends User {
    constructor(name,age,hobbies) {
        super(name,age);
        this.hobbies = hobbies;
        this.name=name;
        this.age=age;
    }
}

module.exports = Student;