import * as Express from 'express';
import * as BodyParser from 'body-parser';
import { traderRouter } from './route/trader';
import { Config } from './config';
var App = Express();
/** 解析请求体 */
App.use(BodyParser.json());
App.use(BodyParser.urlencoded({ extended: true }));

App.use('/trader', traderRouter);



App.listen(Config.PORT, () => {
    console.log(`服务器运行在${Config.PORT} 端口`);
});

