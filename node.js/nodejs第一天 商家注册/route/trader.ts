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
traderRouter.get('/singin', async (req, res, next) => {
    var result = new Result();
    //获取登录的用户名密码 
    var {username, password} = req.query;
    //验证参数
    if (username && password)
})
export { traderRouter };