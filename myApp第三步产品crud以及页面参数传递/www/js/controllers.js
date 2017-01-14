// 创建了app的控制器模块
angular.module('starter.controllers', [])

// 登录界面的控制器,所有登录界面的操作都会在这里执行
.controller('signinCtrl', function($scope, $timeout, $http, $ionicPopup, myTools, $state, appConfig) {
    // 默认登录界面,没有任何数据
    $scope.user = {
        username: '',
        password: ''
    };


    $scope.checkUsername = function() {
        if (/^1[3-9]\d{9}$/.test($scope.user.username)) {
            return true;
        } else {
            // 显示用户不合法,3秒之后自动关闭
            myTools.alertError('用户名不合法');
            return false;
        }
    }
    $scope.login = function() {
        // 如果用户名合法,且密码不为空,发送ajax请求登录
        if ($scope.checkUsername() && $scope.user.password != "") {
            /*
            $http.get(appConfig.serverIp + 'trader/signin', {
                params: {
                    username: $scope.user.username,
                    password: $scope.user.password
                }
            }).then(function(rtn) {
                var result = rtn.data;
                if (result.issucess) {
                    */
            $state.go('home.index');
            // 服务器返回成功结果,本地存储用户信息,用于自动登录
            localStorage.setItem('username', $scope.user.username);
            localStorage.setItem('password', $scope.user.password);

            // } else {
            //     myTools.alertError(result.errorMsg);
            // }
            // // });

        }
        // 用户名不合法
        else {
            $scope.checkUsername() ? myTools.alertError("请输入密码") : "";
        }
    };

    if (localStorage.getItem('username') && localStorage.getItem('password')) {
        $scope.user.username = parseInt(localStorage.getItem('username'));
        $scope.user.password = localStorage.getItem('password');
        $scope.login();
    }
})

.controller('signupCtrl', function($scope, myTools, $http, $state, appConfig) {
    $scope.user = { username: '', password: '', nickname: '' };
    $scope.checkUsername = function() {
        if (/^1[3-9]\d{9}$/.test($scope.user.username)) {
            return true;
        } else {
            // 显示用户不合法,3秒之后自动关闭
            myTools.alertError('用户名不合法');
            return false;
        }
    }

    $scope.signup = function() {
        if ($scope.checkUsername() && $scope.user.password != "" && $scope.user.nickname) {
            /*
            $http.get(appConfig.serverIp + 'trader/signup', {
                params: {
                    username: $scope.user.username,
                    password: $scope.user.password,
                    nickname: $scope.user.nickname
                }
            }).then(function(rtn) {
                var result = rtn.data;
                if (result.issucess) {
                    //注册成功
                    */

            $state.go('home');
            /*
                } else {
                    myTools.alertError(result.errorMsg);
                }
            }) */
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

.controller('homeCtrl', function($scope, $ionicSideMenuDelegate, $ionicActionSheet, productService) {
    $scope.avatar = "../img/adam.jpg";
    $scope.isEdit = false;
    $scope.nickname = "刺月无影";

    $scope.changeNickname = function() {
            //发送http请求修改用户的昵称
            console.log('已经发送请求,修改了用户的昵称');
            /*
            $http.get(serverIp+'trader/changeNickname',{
                params:{
                    newNickname:$scope.nickname,
                    username:$scope.username
                }
            })
            */
        }
        // 通过图片文件修改头像
    $scope.modifyAvatar = function(fileInput) {
        var file = fileInput.files[0];
        var reader = new FileReader();
        // fileReade 将文件读取成图片
        reader.onload = function(event) {
            // 文件读取出来的数据
            var base64 = event.target.result;
            $scope.$apply(function() {
                $scope.avatar = base64;
                // 压缩


                // ajax 发送请求 ,修改头像
                /* 
               $http.get(apppConfig.serverIp+'trader/changeAvatar',{
                   prarams:{
                       newAvatar:base64,
                       username:username
                   }
               }
                */
            });
        }

        // fileReader 开始读取文件
        reader.readAsDataURL(file);

    };

    $scope.showActionSheet = function() {
        $ionicActionSheet.show({
            buttons: [
                { text: '<label for="chooseImg"> 从手机相册选取 </label>' },
                { text: '<b>从空间相册选择</b>' },
                { text: '<b>拍一张</b>' }
            ],

            titleText: '更换封面',
            cancelText: '取消',
            cancel: function() {
                // add cancel code..
            },
            buttonClicked: function(index) {

                switch (index) {
                    // 从相册中选取
                    case 0:
                        document.querySelector('#chooseImg').click();
                        break;
                }

                return true;
            }
        });
    }



})

.controller('indexCtrl', function($http, $scope, $ionicActionSheet, $ionicPopup, $state) {
        // 当前显示的产品组,过滤后的产品组
        $scope.groups = [];

        // 所有的产品组
        $scope.allGroups = [];
        $scope.keyword = "";

        // 过滤掉产品的名字不包含关键字的产品,
        $scope.searchProduct = function() {
            //左侧是显示的产品组,右侧是从所有产品组关键字检索产品
            $scope.groups = $scope.allGroups.filter(function(group) {
                return group.name.indexOf($scope.keyword) != -1;
            });
        }


        // 发送http请求获取了产品组
        $http.get('data/group.json').then(function(rtn) {
            var groups = rtn.data;
            // 一份产品数据用于显示给用户
            $scope.groups = groups;
            // 第二份,保存用户的所有产品组
            $scope.allGroups = groups;
        });
        // 新增产品组
        $scope.addNewGroup = function() {
            $ionicPopup.prompt({
                title: '新增产品组',
                template: '请输入产品组名称',
                inputType: 'text',
                inputPlaceholder: '产品组名称',
                okText: '确定',
                cancelText: '取消',
                cssClass: 'myPopup',
                okType: 'button-royal'

            }).then(function(res) {
                if (!res) return;
                // 1.产品组不能重名 2.产品组名字不能够为空   
                /**
                 *  var canAddGroup = $scope.groups.indexOf(group=>group.name==res)==-1 && res;
                 */
                var canAddGroup =
                    // 判断没有该产品
                    $scope.groups.find(function(group) {
                        return group.name == res;
                    }) == null
                    // 并且新的产品组名字不为空
                    &&
                    res != "";
                if (canAddGroup) {
                    // ajax trader/addGroup
                    $scope.groups.push({ _id: $scope.groups.length, name: res });
                }

            });
        }

        // 操作产品组
        $scope.actionGroup = function(group) {
            $ionicActionSheet.show({
                buttons: [
                    { text: '<b>进入产品组</b> ' },
                    { text: '<b>置顶</b>' },
                    { text: '<b>删除</b>' },
                    { text: '<b>重命名产品组</b>' }
                ],

                titleText: '管理产品组<b>' + group.name + '</b>',
                cancelText: '取消',
                cancel: function() {
                    // add cancel code..
                },
                buttonClicked: function(index) {

                    switch (index) {
                        // 进入产品组
                        case 0:
                            $state.go('product', { groupID: group._id });
                            break;
                            // 置顶产品组
                        case 1:
                            var index = $scope.groups.indexOf(group);
                            $scope.groups.splice(index, 1);
                            // ajax trader/topGroup
                            $scope.groups.unshift(group); //插入到数组第一个
                            break;
                            // 删除产品组
                        case 2:
                            console.log('删除产品组:' + group.name);
                            var index = $scope.groups.indexOf(group);
                            // ajax trader/deleteGroup
                            $scope.groups.splice(index, 1);

                            break;
                        case 3:
                            console.log('重命名产品组' + group.name);
                            $ionicPopup.prompt({
                                title: '修改产品组的名字',
                                inputType: 'text',
                                inputPlaceholder: '产品组名称',
                                okText: '确定',
                                cancelText: '取消'
                            }).then(function(res) {
                                if (!res) return;
                                var canAddGroup =
                                    // 判断没有该产品
                                    $scope.groups.find(function(group) {
                                        return group.name == res;
                                    }) == null
                                    // 并且新的产品组名字不为空
                                    &&
                                    res != "";

                                // ajax trader/modifyGroup
                                if (canAddGroup) {
                                    group.name = res;
                                }

                            })

                            break;
                        default:
                            break;
                    }
                    return true;
                }
            });

        }
    })
    .controller('productCtrl', function($scope, $stateParams, productService, $http) {
        // ajax   trader/getGroupById
        $scope.group = {};
        $http.get('data/group.json').then(function(rtn) {
            var groups = rtn.data;
            $scope.group = groups.find(function(group) {
                return group._id == $stateParams.groupID;
            });
            console.log($scope.group);
        })


    })