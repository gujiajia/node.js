//声明一个 myapp 模块
angular.module("myApp", ['ngRoute'])
    .config(function ($routeProvider) {
    $routeProvider.when('/index', {
        templateUrl: 'pages/index.html'
    }).when('/about', {
        templateUrl: 'pages/about.html'
    })
        .otherwise('/index');
});
//# sourceMappingURL=app.js.map