import * as Mongodb from 'mongodb';
import { Config } from '../config';

/**
 * 产品组
 */
export class ProductGroup {

}

/**
 * 商家的促销产品
 */
export class Sale {

}
/**
 * 商家的数据类型
 */
export class Trader {
    username: string;//用户名同样也是手机号
    password: string;
    avatar: string;//商家头像;
    nickname: string;// 昵称
    products: Mongodb.ObjectID[];//产品组
    createDt: Date = new Date();
    lastModifyDt: Date = new Date();
    sales: Sale[];//商家的促销产品,在首页上显示
    // 创建商家,默认是没有产品的,
    constructor(username, password, avatar, nickname, products = [], sales = []) {
        this.username = username;
        this.password = password;
        this.avatar = avatar;
        this.nickname = nickname;
        this.products = products;
        this.sales = sales;

    }

}

/**
 * TraderService 存放着操作商家的数据库行为
 * 
 */
export class TraderSevice {
    private static traderDb = Config.Db.collection('traders');// 拿到商家的集合

    /** 
     * 注册 增加一个商家
     */
    static addTrader(trader: Trader) {
        return TraderSevice.traderDb.insertOne(trader);
    }

    /**  判断商家是否存在*/
    static async  isTraderExisit(username: string) {
        var trader = await TraderSevice.traderDb.find({ username }).limit(1);
        var result = trader ? true : false
        return result;
    }
    /**
     * 通过商家的名字拿到商家
     */
    static getTraderByName(username: string) {
        return TraderSevice.traderDb.findOne({ username });
    }


}

