//创建了app 的控制器模块
angular.module('starter.controllers')
    //产品
    .controller('productCtrl', function($scope, $stateParams, $http, $stateParams, $state, $ionicActionSheet) {
        //ajax trader/getGroupById
        $scope.group = {};
        var groupID = $stateParams.groupID;
        $scope.products = [];
        firebase.database().ref('products/' + $stateParams.groupID).on('value', function(snapshot) {
            $scope.$apply(function() {
                $scope.group = snapshot.val();
                // console.log($scope.group);
                // for (var key in $scope.group.products) {
                //     var product = $scope.group.products[key];
                //     product.key = key;
                //     $scope.$apply(function() {
                //         $scope.products.push(product);
                //     })
                // }     
            });
            console.log($scope.group);
        });
        $scope.actionProduct = function(key, product) {
            $ionicActionSheet.show({
                buttons: [
                    { text: '<b>查看产品</b>' },
                    { text: '<b>置顶</b>' },
                    { text: '<b>删除</b>' },
                    { text: '<b>重命名产品</b>' }
                ],
                titleText: '管理产品组<b>' + product.name + '</b>',
                cancelText: '取消',
                cancel: function() {
                    // add cancel code..
                },
                buttonClicked: function(index) {
                    console.log($scope.product);
                    switch (index) {
                        //进入产品组
                        case 0:
                            $state.go('product-detail', { productID: key, groupID: groupID });
                            break;
                        case 2:
                            firebase.database().ref('products/' + groupID + '/products/' + key).remove();
                            break;
                        default:
                            break;
                    }
                    return true;
                }
            });
        }

        //新建 product-detail.html 存放产品详情
        $scope.addNewProduct = function() {
                $state.go('product-detail', { groupID: $stateParams.groupID });
            }
            // $http.get('data/group.json').then(function(rtn) {
            //     var groups = rtn.data;
            //     $scope.group = groups.find(function(group) {
            //         return group._id == $stateParams.groupID;
            //     });
            //     console.log($scope.group);
            // })

    })