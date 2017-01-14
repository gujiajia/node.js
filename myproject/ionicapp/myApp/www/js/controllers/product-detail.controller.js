//创建了app 的控制器模块
angular.module('starter.controllers')
    .controller('product-DetailCtrl', function($scope, $stateParams) {
        var productID = $stateParams.productID;
        var groupID = $stateParams.groupID;
        //是否是新建产品
        $scope.isNew = productID ? false : true;
        //新建产品，默认产品是空的数据,产品的图片也是空的
        if ($scope.isNew) {
            $scope.product = { images: [] };
        } else {
            firebase.database().ref("products/" + groupID + '/products/' + productID).on('value', function(snapshot) {
                $scope.product = snapshot.val();
                //强制刷新
                // $scope.$digest();
            });
        }
        $scope.saveProduct = function() {
                //把当前的产品推送上去
                if ($scope.isNew) {
                    firebase.database().ref("products/" + groupID + '/products').push($scope.product);
                } else {
                    //判断是新建还是修改产品名
                    firebase.database().ref("products/" + groupID + '/products/' + productID).update($scope.product);
                }
            }
            //获取选取的文件 增加产品图片
        $scope.addProductImage = function(fileInput) {
            var file = fileInput.files[0];
            // //  调试输出console.log(file.name);
            // var reader = new FileReader();
            // //FileReader讲文件读取成图片  编写读取的回调事件
            // reader.onload = function(event) {
            //         //拿到读取后的数据
            //         var base64Data = event.target.result;
            //         //将图片推送入产品的图片组里; 如果出现undefined错误,记得初始化产品图片数组为空数组
            //         $scope.$apply(function() {
            //             $scope.product.images.push(base64Data);
            //         })
            //     }
            //     // 开始读取文件
            // reader.readAsDataURL(file);
            //管理上传产品的图片
            firebase.storage().ref("img/" + Math.random() + file.name).put(file)
                .then(function(rtn) {
                    $scope.$apply(function() {
                        $scope.product.images.push(rtn.a.downloadURLs[0]);
                    })
                })

        }
    });