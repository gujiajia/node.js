/**
 * 只要是能进食,运动的东西都叫动物
 * 
 */
interface Animal {
    name: string;
    eat: (food: string) => any;
    run: () => boolean;
}

class Cat implements Animal {
    name: string = "猫";
    eat() {
        console.log('我是猫,我要吃鱼');
    }
    run() {
        console.log('我是猫,我会跑,但腿短,跑不快');
        return true;
    }
}

class Dog implements Animal {
    name = "狗";
    eat() {
        console.log('我是狗,我要吃hotdog');
    }
    run() {
        console.log('我是狗,我跑的快');
        return true;
    }
}

class Fish implements Animal {
    name: string = "鱼";
    eat() {
        console.log('我是鱼,我要吃虾米');
    }

    run() {
        console.log('我是鱼,我游泳');
        return false;
    }
}

var myCat = new Cat();
myCat.eat();
var myDog = new Dog();
myDog.eat();
var myFish = new Fish();
myFish.eat();

/**
 * 房子的门
 * 有安全门，
 */
interface Door {
    doorType: string;
}

/**
 * 窗户
 */
interface WindowDoor {
    glassType: string;
}

/**
 * 一栋房子
 * 有门,有窗户
 * 
 */
class House {
    door: Door;
    windowDoor: WindowDoor;
    constructor(door: Door, windowDoor: WindowDoor) {
        this.door = door;
        this.windowDoor = windowDoor;
    }
}


class Cell {
    houses: House[];
    constructor(houses: House[]) {
        this.houses = houses;

    }
}

var myFirstHouse = new House({ doorType: '钛合金安全门' }, { glassType: '透明玻璃' });
console.log(myFirstHouse.door.doorType);
console.log(myFirstHouse.windowDoor.glassType);
var cell = new Cell([new House({ doorType: '钛合金安全门' }, { glassType: '透明玻璃' })]);