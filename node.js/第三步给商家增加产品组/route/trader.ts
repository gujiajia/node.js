import { Router } from 'express';
import { TraderSevice, Trader } from '../service/trader';
import { Config } from '../config';
var traderRouter = Router();

/**
 * 服务器返回客户端的数据模板
 * 
 */
class Result {
    /**
     * 用户请求的结果,如果为false,则还有errorMsg存放错误的原因,
     * 如果为true,则还有data
     */
    issucess: boolean;
    errorMsg: string;
    data: any;
}



traderRouter.all('/signup', async (req, res, next) => {
    var result = new Result();
    // 用户请求的参数封装成商户
    var {username, password, nickname, avatar} = req.query;

    // 商家没有上传头像,就使用App.config里面配置的认头像
    avatar = avatar ? avatar : Config.defaultAvatar;

    // 如果参数合法
    if (username && password && nickname && /^1[3-9]\d{9}$/.test(username)) {
        //判断该账号是否已经注册过,如果注册过,该账号已经被注册,没注册过就注册
        if (await TraderSevice.isTraderExisit(username)) {
            result.issucess = false;
            result.errorMsg = "该用户已经注册了";
        }
        // 如果没注册过就去注册
        else {
            // 创建一个商家
            var trader = new Trader(username, password, avatar, nickname);
            // 插入一个商家
            var data = await TraderSevice.addTrader(trader);
            result.issucess = true;
            result.data = data;
        }
    }
    // 如果参数不合法
    else {
        result.issucess = false;
        result.errorMsg = "参数不合法";
    }
    res.json(result);
});

traderRouter.get('/signin', async (req, res, next) => {
    var result = new Result();
    // 获取登录的用户名和密码
    var {username, password} = req.query;
    // 验证参数
    if (username && password) {
        var trader: Trader = await TraderSevice.getTraderByName(username);
        // 如果商家存在,判断商家的密码是否一致
        if (trader) {
            if (trader.password == password) {
                result.issucess = true;
                result.data = trader;
            } else {
                result.issucess = false;
                result.errorMsg = "密码错误";
            }
        }
        // 如果商家不存在
        else {
            result.issucess = false;
            result.errorMsg = "不存在的商家";
        }

    } else {
        result.issucess = false;
        result.errorMsg = "参数不合法";
    }
    res.json(result);
});
/**  商家添加产品组
 *  给指定商家增加产品组
 */
traderRouter.all('/addGroup', async (req, res, next) => {
    var result = new Result();
    // 是哪一个商家想要增加产品组
    var {username, groupName} = req.query;
    if (username && groupName) {
        //判断商家存不存在
        var trader: Trader = await TraderSevice.getTraderByName(username);
        //如果商家存在,给商家添加一个产品组
        if (trader) {
            var data = await TraderSevice.addProductGroup(trader._id, groupName);
            result.issucess = true;
            result.data = data;


        } else {
            result.issucess = false;
            result.errorMsg = "商家不存在";
        }

    }
    // 参数不合法
    else {
        result.issucess = false;
        result.errorMsg = "参数不合法";
    }

    res.json(result);

});
export { traderRouter };