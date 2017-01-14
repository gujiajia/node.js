// OOP  object-oriented progroming
class Login {

    // static 关键字  属性是属于类的,不是属于类的实例
    private static phoneRegexp = /^1[3-9]\d{9}$/;

    // 登录界面的页面元素
    /**
     *  访问修饰符，private 私有属性 只能在类中访问,protected 在当前类和其子类中可以访问
     *  
     * 关键字 | 当前类中访问 | 子类访问 | 所有地方都可以访问
     * -|-|-|-
     * private| √  | x | x
     * protected | √ | √ |x
     * public | √ | √ | √  
     * 
     *  */
    protected $el = $('.login.page');

    // 登录界面内 的用户输入框
    $username = this.$el.find('#username');

    constructor() {
        // 淡入
        this.$el.fadeIn(3000, () => {
            alert('淡入已经完成了')
        });
        // 用户的输入
        this.$username.val();
    }
}

// loginPage实例 或者说叫做对象 ,   Login是类    

var loginPage = new Login();


// protected 关键字 在外部不可以被访问
// loginPage.$el;

class LoginInput extends Login {


    inputUsername() {
        // 访问父类的$el
        this.$el;
    }

}

class Animal {
    // 能动  私有属性 只能在当前类中使用,默认public
    public do() {
        console.log('我能动');
    }
    say() {
        console.log(`i',m  a animal`)
    }

}

class Cat extends Animal {

    say() {
        super.say();
        console.log(`i'm  also  a  Cat`);
    }
}

class Dog extends Animal {

    say() {
        super.say();
        console.log(`i'm  also  a  Dog`);
    }
}
class Pig extends Animal {

    say() {
        super.say();
        // procted 能在当前类中使用,也能在子类使用 
        super.do()

        console.log(`i'm  also  a  Pig`);
    }
}

var cat = new Cat();
cat.say();
// 只有public 权限最高 能在外部,子类,内部都使用
cat.do();
var dog = new Dog();
dog.say();
dog.do();