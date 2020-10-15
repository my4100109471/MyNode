class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    showInfo() {
        return "name:" + this.name + ", age:" + this.age;
    }
}

module.exports=User;