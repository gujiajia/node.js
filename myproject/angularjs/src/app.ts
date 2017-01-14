

//声明一个 myapp 模块
angular.module("myApp",['ngRoute'])
// 配置模块
.config(($routeProvider:ng.route.IRouteProvider)=>{
    $routeProvider.when('/index',{
        templateUrl:'pages/index.html'
    }).when('/about',{
        templateUrl:'pages/about.html'
    })
    //默认进入index路由
    .otherwise('/index');
});