import * as express from 'express';
import { query } from './db';
import { scanner } from './scanner';
import { ResponseResult } from './interface';

var app = express();
//静态文件服务器
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

var allRoutes = scanner(__dirname + '/route');



app.all('/:routePath/:action', async (req, res, next) => {
    let {routePath, action} = req.params;
    /** 服务器返回结果 */
    var result: ResponseResult = { issucess: true, state: 1, data: '默认返回结果' };
    try {
        result = await allRoutes[routePath][action](req, result);
        res.json(result);
    } catch (e) {
        result.state = 0;
        result.errorMsg = e;
        res.json(result);
    }
})


app.listen(3000, () => {
    console.log('server is running on 3000');
})

