// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }


    });
})

// ui-router, angular-route,
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    //发现了一个bug,在android 下 toolbar显示在上方,而本应该显示在下方
    $ionicConfigProvider.tabs.position('top');
    $ionicConfigProvider.views.swipeBackEnabled(true);
    // app里面的默认返回按钮
    $ionicConfigProvider.backButton.text('返回').icon('ion-chevron-left');
    $ionicConfigProvider.navBar.alignTitle('center');
    // ui-router的项目地址,查询使用方法点击右边按钮 https://github.com/angular-ui/ui-router
    $stateProvider.state('signin', {
            url: '/signin',
            templateUrl: 'templates/signin.html',
            controller: 'signinCtrl'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'templates/signup.html',
            controller: 'signupCtrl'
        })
        // 抽象路由,不允许直接访问该页面, 该页面可以加载其他的子页面
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html',
            abstract: true,
            controller: 'homeCtrl'
        })
        .state('home.index', {
            url: '/index',
            views: {
                // 子视图名字
                menuContent: {
                    templateUrl: 'templates/index.html',
                    controller: 'indexCtrl'
                }
            }
        })
        .state('product', {
            url: '/product/:groupID',
            templateUrl: 'templates/product.html',
            controller: 'productCtrl'
        });



    // app默认进入登录界面
    $urlRouterProvider.otherwise('/home/index');

});