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
//# sourceMappingURL=trader.js.map