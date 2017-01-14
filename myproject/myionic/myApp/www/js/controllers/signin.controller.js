//创建了app 的控制器
angular.module('starter.controllers')
    //登录界面的控制器，所有登录界面的操作都会在这里执行
    .controller('signinCtrl', function($scope) {
        //默认登录界面，没有任何数据
        $scope.user = { username: "", password: "" };
        //检查用户是否合法
        $scope.checkUsername = function() {
            if (/^1[3-9]\d{9}$/.test($scope.user.username)) {
                console.log('合法的用户名')
            } else {
                console.log('非法的用户名')
            }
        }
        $scope.login = function() {
            console.log($scope.user);
        }
    })