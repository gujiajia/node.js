import * as Express from 'express';
import * as BodyParser from 'body-parser';
import { traderRouter } from './route/trader';
import { Config } from './config';
var App = Express();
/** 跨域请求 */
App.use('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
})
App.use(BodyParser.json());
App.use(BodyParser.urlencoded({ extended: true }));

App.use('/trader', traderRouter);




App.listen(Config.PORT, () => {
    console.log(`服务器运行在${Config.PORT} 端口`);
});

