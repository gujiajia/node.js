//获取myApp模块
angular.module('myApp')
    .controller('headerCtrl', function ($scope, $http) {
        $scope.groups = [];
        $http({
            method: 'GET',
            url: 'http://localhost:4000/trader/getAllGroups',
            params: {
                username: '13212780816'
            }
        }).then(rtn => {
            var result = rtn.data;
            if (result.issucess) {
                $scope.groups = result.data;
            } else {
                alert(result.errorMsg);
            }
        })
    })