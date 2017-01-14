//创建了app的控制器模块
angular.module('starter.controllers')
    .controller('homeCtrl', function($scope, $ionicActionSheet, $cordovaCamera) {
        //默认头像
        $scope.avatar = "../../img/ben.png";
        $scope.isEdit = false;
        //昵称
        $scope.nickname = "紧凑的时间";
        //修改用户名称
        $scope.cheakNickname = function() {
                console.log('已经发送了请求，修改了用户昵称');
            }
            //通过文件修改头像
        $scope.modifyAvatar = function(fileInput) {
                var file = fileInput.files[0];
                var reader = new FileReader();
                //FileReader讲文件读取成图片
                reader.onload = function(event) {
                    var base64 = event.target.result;
                    $scope.$apply(function() {
                        $scope.avatar = base64;
                    })
                }
                reader.readAsDataURL(file);
            }
            /**
             * 利用封装函数将 
             *  $ionicActionSheet.show({
                    buttons: [
                        { text: '<b>从手机相册选择</b>' },
                        { text: '从空间相册选择' },
                    ],
                    destructiveText: '拍一张',
                    titleText: '更换封面',
                    cancelText: '取消',
                    buttonClicked: function (index) {
                        return true;
                    }
                });
                进行封装。
                绑定头像 添加ng-click="showActionSheet()"
                */
        $scope.showActionSheet = function() {
            // 点击按钮触发，或一些其他的触发条件
            // 显示操作表
            $ionicActionSheet.show({
                buttons: [
                    { text: '<b>从手机相册选择</b>' },
                    { text: '从空间相册选择' },
                ],
                destructiveText: '拍一张',
                titleText: '更换封面',
                cancelText: '取消',
                buttonClicked: function(index) {
                    switch (index) {
                        case 0:
                            $scope.modifyAvatar();
                            break;
                            //从相册中选取
                        case 2:
                            document.addEventListener("deviceready", function() {

                                var options = {
                                    quality: 50,
                                    destinationType: Camera.DestinationType.DATA_URL,
                                    sourceType: Camera.PictureSourceType.CAMERA,
                                    allowEdit: true,
                                    encodingType: Camera.EncodingType.JPEG,
                                    targetWidth: 100,
                                    targetHeight: 100,
                                    popoverOptions: CameraPopoverOptions,
                                    saveToPhotoAlbum: false,
                                    correctOrientation: true
                                };

                                $cordovaCamera.getPicture(options).then(function(imageData) {
                                    var image = document.getElementById('myImage');
                                    $scope.avatar = "data:image/jpeg;base64," + imageData;
                                }, function(err) {
                                    // error
                                });

                            }, false);
                            break;

                    }
                    return true;
                }
            });
        }
    })