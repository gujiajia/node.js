//创建了app 的控制器模块
angular.module('starter.controllers')
    //注册
    .controller('signupCtrl', function($scope, myTools, $http, $state, appConfig) {
        $scope.user = { username: '', password: '', nickname: '' };
        $scope.checkUsername = function() {
            if (/^1[3-9]\d{9}$/.test($scope.user.username)) {
                return true;
            } else {
                // 显示用户不合法，3秒之后关闭
                myTools.alertError('用户名不合法');
                return false;
            }
        }
        $scope.signup = function() {
            console.log($scope.user);
        }
        $scope.signup = function() {
            // 如果用户名合法，且密码不为空，发送ajax请求登录
            if ($scope.checkUsername() && $scope.user.password != "" && $scope.user.nickname) {
                // $http.get(appConfig.serverIP + 'trader/signup', {
                //     params: {
                //         username: $scope.user.username,
                //         password: $scope.user.password,
                //         nickname: $scope.user.nickname
                //     }
                // }).then(function(rtn) {
                //     var result = rtn.data;
                //     if (result.issucess) {
                //         // 注册成功
                $state.go('home');
                //     } else {
                //         myTools.alertError(result.errorMsg);
                //     }
                // })
            }
            // 用户名不合法
            else if ($scope.user.password == "") {
                myTools.alertError('请输入密码');
            } else if ($scope.user.nickname == "") {
                myTools.alertError('请输入昵称');
            } else {
                myTools.alertError('用户名不合法');
            }
        };
    })