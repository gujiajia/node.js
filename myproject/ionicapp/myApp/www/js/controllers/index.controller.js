//创建了app 的控制器模块
angular.module('starter.controllers')
    //主页的操作
    .controller('indexCtrl', function($http, $scope, $ionicActionSheet, $ionicPopup, $state) {
        $scope.isLoading = true;
        //当前显示的产品组，过滤后的产品组
        $scope.groups = [];
        //所有的产品组
        $scope.allGroups = [];
        $scope.refershGroups = function(groups) {
            $scope.groups = [];
            $scope.allGroups = [];
            for (var key in groups) {
                var group = groups[key];
                group.key = key;
                $scope.groups.push(group);
                $scope.allGroups.push(group);
            }
        }
        var firstLogin = true;
        // 实时性的获取数据库的产品列表
        firebase.database().ref('products').on('value', function(snapshot) {
            var groups = snapshot.val();
            if (firstLogin) {
                //数据加载完成，取消加载状态
                $scope.isLoading = false;
                firstLogin = false;
                $scope.$apply(function() {
                    $scope.refershGroups(groups);
                });
            } else {
                $scope.refershGroups(groups);
            }

        });


        //keyword 关键词
        $scope.keyword = "";
        //根据关键字搜索产品的函数
        $scope.searchProduct = function(keyword) {
                //过滤掉产品的名字不包含关键字的产品
                $scope.groups = $scope.allGroups.filter(function(group) {
                    return group.name.indexOf($scope.keyword) != -1;
                });
            }
            //发送http请求获取了产品组
            // $http.get('../data/group.json').then(function(rtn) {
            //     var groups = rtn.data;
            //     //一份产品数据用于显示给用户
            //     $scope.groups = groups;
            //     //第二份，保存用户的所有产品组
            //     $scope.allGroups = groups;
            // });

        //新增产品组
        $scope.addNewGroup = function() {
                $ionicPopup.prompt({
                    title: '新增产品组',
                    template: '请输入产品组名称',
                    inputType: 'text',
                    inputPlaceholder: '产品组名称',
                    okText: '确定',
                    cancelText: '取消',
                    okType: 'button-dark'

                }).then(function(res, issucess) {
                    if (!res) return;
                    //1.产品组不能重名 2.产品组民资不能够为空
                    /**es6
                     * var canAddGroup = $scope.group.indexOf(group=>group.name==res)==-1 && res;
                     * 
                     * es5
                     */
                    var canAddGroup =
                        //判断没有该产品
                        $scope.groups.find(
                            function(group) {
                                return group.name == res;
                            }) == null
                        //并且新的产品组名字不为空
                        &&
                        res != "";
                    //如果可添加就添加
                    if (canAddGroup) {
                        //ajax trader/addGroup 请求
                        // $scope.groups.push({ _id: $scope.groups.length, name: res });
                        firebase.database().ref('products').push({ name: res, createdt: new Date().getTime() });
                    }
                });
            }
            //操作产品组
        $scope.actionGroup = function(group) {
            $ionicActionSheet.show({
                buttons: [
                    { text: '<b>进入产品组</b>' },
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
                        //进入产品组
                        case 0:
                            $state.go('product', { groupID: group.key });
                            break;
                            //置顶产品组
                        case 1:
                            console.log('置顶产品组：' + group.name);
                            var index = $scope.groups.indexOf(group);
                            $scope.groups.splice(index, 1);
                            //ajax trader/deletGroup 如果成功会发ajax请求，置顶产品
                            $scope.groups.unshift(group);
                            break;
                            //删除产品组
                        case 2:
                            console.log('删除产品组：' + group.name);
                            // var index = $scope.groups.indexOf(group);
                            // //ajax trader/deletGroup 如果成功会发ajax请求，删除产品
                            // $scope.groups.splice(index, 1);

                            //移除产品  group.key随机生成=ID
                            firebase.database().ref('products/' + group.key).remove();
                            break;
                        case 3:
                            console.log('重命名产品组：' + group.name);
                            $ionicPopup.prompt({
                                title: '新增产品组',

                                inputType: 'text',
                                inputPlaceholder: '产品组名称',
                                okText: '确定',
                                cancelText: '取消',
                                okType: 'button-dark'

                            }).then(function(res, issucess) {
                                if (!res) return;
                                var canAddGroup =
                                    //判断没有该产品
                                    $scope.groups.find(
                                        function(group) {
                                            return group.name == res;
                                        }) == null
                                    //并且新的产品组名字不为空
                                    &&
                                    res != "";
                                //如果可修改就修改
                                if (canAddGroup) {
                                    //ajax trader/modifyGroup
                                    group.name = res;
                                    firebase.database().ref('products/' + group.key).update({ name: res });
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