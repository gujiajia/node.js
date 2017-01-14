import * as Mongodb from 'mongodb';
import { Config } from '../config';

/**
 * 产品
 * 
 */
export class Product {

}


/**
 * 产品组 ,
 * 存放着一组产品
 * 
 * 两个属性必需,产品组的商家的id,产品组的名字
 *
 */
export class ProductGroup {
    _id?: Mongodb.ObjectID = new Mongodb.ObjectID();// 随机生成的主键
    _traderID: Mongodb.ObjectID;// 商家的ID
    groupName: string;//产品组的名字
    productList: Product[];//存放着产品数组
    createDt: Date = new Date();
    lastModifyDt: Date = new Date();

    constructor(_traderID: Mongodb.ObjectID, groupName: string, productList: Product[] = []) {
        this._traderID = _traderID;
        this.groupName = groupName;
        this.productList = productList;
    }
}

/**
 * 商家的促销产品
 */
export class Sale {
    _id?: Mongodb.ObjectID;
    traderID: Mongodb.ObjectID;
    url: string;
    banner: string;
    createDt: Date = new Date();
    lastModifyDt: Date = new Date();
    constructor(traderID: Mongodb.ObjectID, url: string, banner: string) {
        [this.traderID, this.url, this.banner] = [traderID, url, banner];
    }
}
/**
 * 商家的数据类型
 */
export class Trader {
    _id: Mongodb.ObjectID = new Mongodb.ObjectID();
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
    private static productDb = Config.Db.collection('products');// 拿到产品的集合
    private static saleDb = Config.Db.collection('sales');//拿到产品促销产品
    /** 
     * 注册 增加一个商家
     */
    static addTrader(trader: Trader) {
        return TraderSevice.traderDb.insertOne(trader);
    }

    /**  判断商家是否存在*/
    static async  isTraderExisit(username: string) {
        var trader = await TraderSevice.traderDb.findOne({ username });
        var result = trader ? true : false
        return result;
    }
    /**
     * 通过商家的名字拿到商家
     */
    static getTraderByName(username: string) {
        return TraderSevice.traderDb.findOne({ username });
    }

    /**
     * 增加产品组
     */
    static addProductGroup(_traderID: Mongodb.ObjectID, groupName: string) {
        // 创建产品组
        var productGroup = new ProductGroup(_traderID, groupName);
        return TraderSevice.productDb.insertOne(productGroup);
    }

    /**
     * 通过商家ID获取商家的所有产品
     */
    static getAllGroupByTraderID(_traderID: Mongodb.ObjectID) {
        return TraderSevice.productDb.find({ _traderID }).toArray();
    }

    static getSales(traderID: Mongodb.ObjectID) {
        return TraderSevice.saleDb.find({ traderID: traderID }).toArray();
    }

    static addSales(traderID: Mongodb.ObjectID, url: string, banner: string) {
        var sale = new Sale(traderID, url, banner);
        return TraderSevice.saleDb.insertOne(sale);
    }

}

