"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const config_1 = require('../config');
/**
 * 产品组
 */
class ProductGroup {
}
exports.ProductGroup = ProductGroup;
/**
 * 商家的促销产品
 */
class Sale {
}
exports.Sale = Sale;
/**
 * 商家的数据类型
 */
class Trader {
    // 创建商家,默认是没有产品的,
    constructor(username, password, avatar, nickname, products = [], sales = []) {
        this.createDt = new Date();
        this.lastModifyDt = new Date();
        this.username = username;
        this.password = password;
        this.avatar = avatar;
        this.nickname = nickname;
        this.products = products;
        this.sales = sales;
    }
}
exports.Trader = Trader;
/**
 * TraderService 存放着操作商家的数据库行为
 *
 */
class TraderSevice {
    /**
     * 注册 增加一个商家
     */
    static addTrader(trader) {
        return TraderSevice.traderDb.insertOne(trader);
    }
    /**  判断商家是否存在*/
    static isTraderExisit(username) {
        return __awaiter(this, void 0, void 0, function* () {
            var trader = yield TraderSevice.traderDb.find({ username }).limit(1);
            var result = trader ? true : false;
            return result;
        });
    }
    /**
     * 通过商家的名字拿到商家
     */
    static getTraderByName(username) {
        return TraderSevice.traderDb.findOne({ username });
    }
}
TraderSevice.traderDb = config_1.Config.Db.collection('traders'); // 拿到商家的集合
exports.TraderSevice = TraderSevice;
//# sourceMappingURL=trader.js.map