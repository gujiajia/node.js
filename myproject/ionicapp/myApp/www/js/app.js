// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
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

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    //发现了一个bug，在android下toolbar显示在上方，而本应该显示在下方
    $ionicConfigProvider.tabs.position('bottom');

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.app.js

    // 配置路由
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
        //抽象路由，不允许直接访问该页面，该页面可以加载其他的子页面
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html',
            abstract: true,
            controller: 'homeCtrl'
        })
        //不能够直接访问home，但是可以访问home的子页面，相当于把home 和子页面链接在一起访问
        .state('home.index', { //home.state
            url: '/index', //实际路由 #/home/index
            //配置所有视图的名字
            views: {
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
        })
        .state('product-detail', {
            url: '/product-detail/:groupID/:productID',
            templateUrl: 'templates/product-detail.html',
            controller: 'product-DetailCtrl'
        })

    // app默认进入登录界面
    $urlRouterProvider.otherwise('/signin');

});