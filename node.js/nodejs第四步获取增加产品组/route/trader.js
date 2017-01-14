"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const express_1 = require('express');
const trader_1 = require('../service/trader');
const config_1 = require('../config');
var traderRouter = express_1.Router();
exports.traderRouter = traderRouter;
/**
 * 服务器返回客户端的数据模板
 *
 */
class Result {
}
traderRouter.all('/signup', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    var result = new Result();
    // 用户请求的参数封装成商户
    var { username, password, nickname, avatar } = req.query;
    // 商家没有上传头像,就使用App.config里面配置的认头像
    avatar = avatar ? avatar : config_1.Config.defaultAvatar;
    // 如果参数合法
    if (username && password && nickname && /^1[3-9]\d{9}$/.test(username)) {
        //判断该账号是否已经注册过,如果注册过,该账号已经被注册,没注册过就注册
        if (yield trader_1.TraderSevice.isTraderExisit(username)) {
            result.issucess = false;
            result.errorMsg = "该用户已经注册了";
        }
        else {
            // 创建一个商家
            var trader = new trader_1.Trader(username, password, avatar, nickname);
            // 插入一个商家
            var data = yield trader_1.TraderSevice.addTrader(trader);
            result.issucess = true;
            result.data = data;
        }
    }
    else {
        result.issucess = false;
        result.errorMsg = "参数不合法";
    }
    res.json(result);
}));
traderRouter.get('/signin', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    var result = new Result();
    // 获取登录的用户名和密码
    var { username, password } = req.query;
    // 验证参数
    if (username && password) {
        var trader = yield trader_1.TraderSevice.getTraderByName(username);
        // 如果商家存在,判断商家的密码是否一致
        if (trader) {
            if (trader.password == password) {
                result.issucess = true;
                result.data = trader;
            }
            else {
                result.issucess = false;
                result.errorMsg = "密码错误";
            }
        }
        else {
            result.issucess = false;
            result.errorMsg = "不存在的商家";
        }
    }
    else {
        result.issucess = false;
        result.errorMsg = "参数不合法";
    }
    res.json(result);
}));
/**
 * 商家添加产品组
 *  给指定商家增加产品组
 */
traderRouter.all('/addGroup', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    var result = new Result();
    // 是哪一个商家想要增加产品组
    var { username, groupName } = req.query;
    if (username && groupName) {
        //判断商家存不存在
        var trader = yield trader_1.TraderSevice.getTraderByName(username);
        //如果商家存在,给商家添加一个产品组
        if (trader) {
            var data = yield trader_1.TraderSevice.addProductGroup(trader._id, groupName);
            result.issucess = true;
            result.data = data;
        }
        else {
            result.issucess = false;
            result.errorMsg = "商家不存在";
        }
    }
    else {
        result.issucess = false;
        result.errorMsg = "参数不合法";
    }
    res.json(result);
}));
/**
 * 获取指定商家的所有的产品组
 */
traderRouter.all('/getAllGroups', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    var result = new Result();
    //商家的用户名
    var { username } = req.query;
    if (username) {
        var trader = yield trader_1.TraderSevice.getTraderByName(username);
        // 如果有商家,拿到商家的id,根据id来获取该商家的所有产品组
        if (trader) {
            var productGroups = yield trader_1.TraderSevice.getAllGroupByTraderID(trader._id);
            result.issucess = true;
            result.data = productGroups;
        }
        else {
            result.issucess = false;
            result.errorMsg = "商家不存在";
        }
    }
    else {
        result.issucess = false;
        result.errorMsg = "参数不合法";
    }
    res.json(result);
}));
//商家增加促销产品
traderRouter.all('/addSale', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    var result = new Result();
    var { username, banner, url } = req.query;
    if (username && banner && url) {
        var trader = yield trader_1.TraderSevice.getTraderByName(username);
        if (trader) {
            var data = yield trader_1.TraderSevice.addSales(trader._id, url, banner);
            result.issucess = true;
            result.data = data;
        }
        else {
            result.issucess = false;
            result.errorMsg = "该商家不存在";
        }
    }
    else {
        result.issucess = false;
        result.errorMsg = "参数不合法";
    }
    res.json(result);
}));
traderRouter.all('/getAllSales', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    var result = new Result();
    var { username } = req.query;
    var trader = yield trader_1.TraderSevice.getTraderByName(username);
    var sales = yield trader_1.TraderSevice.getSales(trader._id);
    result.data = sales;
    res.json(result);
}));
//# sourceMappingURL=trader.js.map