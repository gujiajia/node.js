angular.module('starter.services', ['ionic'])
    .service('myTools', function($ionicPopup, $timeout) {
        /**
         * 弹出错误消息函数，errMsg是错误的消息
         */
        this.alertError = function(errorMsg) {
            var myPop = $ionicPopup.show({
                template: '<div class="text-center">' + errorMsg + '</div>',
                title: '提示'
            });
            $timeout(function() {
                myPop.close();
            }, 3000);
            return myPop;
        }
    })
    /**管理app的配置，例如主题，服务器ip，特殊的配置，版本更新 */
    .service('appConfig', function() {
        // 服务器ip
        this.serverIP = "http://localhost:4000/";
    })