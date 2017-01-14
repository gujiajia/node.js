import * as fs from 'fs';
import { Route, ResponseResult } from './interface';
var root = __dirname + '/route';




/**解析文件成为路由文件 */
function parseFileToRoute(dir: string): Route {
    var path = './route/' + dir;
    console.log(path);
    console.log(`扫描到路由组件${path}
    正在解析组件...
    `);
    var component = require(path).default;
    return new component();

}

export function scanner(root) {
    var dirs = fs.readdirSync(root);
    console.log('正在扫描路由文件夹:' + root);
    var allRoutes = {};
    dirs.forEach(dir => {
        let state = fs.lstatSync(root + '/' + dir);

        if (state.isFile()) {
            var route: Route = parseFileToRoute(dir);
            if (!allRoutes[route.routePath]) {
                console.log(`添加${route.routePath}到路由组合,已经可以接收${route.routePath}的请求`);
                allRoutes[route.routePath] = route;
            } else {
                console.error(`出现扫描错误,${route.routePath}已经存在`);
                process.exit(1);
            }
        }
    });
    return allRoutes;
}

// scanner(root);
