//创建了app 的控制器模块
angular.module('starter.controllers')
    //登录界面的控制器，所有登录界面的操作都会在这里执行
    .controller('signinCtrl', function($scope, $timeout, $http, $ionicPopup, myTools, $state, appConfig) {
        //默认登录界面，没有任何数据
        $scope.user = { username: '', password: '', nickname: '' };
        // 检查用户名
        $scope.checkUsername = function() {
            if (/^1[3-9]\d{9}$/.test($scope.user.username)) {
                return true;
            } else {
                // 显示用户不合法，3秒之后关闭
                myTools.alertError('用户名不合法');
                return false;
            }
        }
        $scope.login = function() {
            // 如果用户名合法，且密码不为空，发送ajax请求登录
            if ($scope.checkUsername() && $scope.user.password != "") {
                // $http.get(appConfig.serverIP + 'trader/signin', {
                //     params: {
                //         username: $scope.user.username,
                //         password: $scope.user.password
                //     }
                // }).then(function(rtn) {
                //     var result = rtn.data;
                //     if (result.issucess) {
                // 登录成功
                $state.go('home.index');
                //服务器返回成功结果，本地存储用户信息，用于自动登录
                localStorage.setItem('username', $scope.user.username);
                localStorage.setItem('password', $scope.user.password);
                //     } else {
                //         myTools.alertError(result.errorMsg);
                //     }
                // })
            }
            // 用户名不合法
            else {
                // 显示用户不合法，3秒之后关闭
                $scope.checkUsername() ? myTools.alertError("请输入密码") : "";
            }
        };
        if (localStorage.getItem('username') && localStorage.getItem('password')) {
            $scope.user.username = parseInt(localStorage.getItem('username'));
            $scope.user.password = localStorage = localStorage.getItem('password');
            $scope.login();
        }
    })