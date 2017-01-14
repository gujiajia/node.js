"use strict";
const Express = require('express');
const BodyParser = require('body-parser');
const trader_1 = require('./route/trader');
const config_1 = require('./config');
var App = Express();
/** 跨域请求 */
App.use('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
App.use(BodyParser.json());
App.use(BodyParser.urlencoded({ extended: true }));
App.use('/trader', trader_1.traderRouter);
App.listen(config_1.Config.PORT, () => {
    console.log(`服务器运行在${config_1.Config.PORT} 端口`);
});
//# sourceMappingURL=app.js.map