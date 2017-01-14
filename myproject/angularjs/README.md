


angularjs 项目构件流程

npm init初始化项目配置文件
* 有package.json文件
cnpm install  装node_modules包

命令行输入cnpm install angular --save
cnpm install angular @types/angular --save

新建tsconfig.json文件  文件内输入
<!--{
    "compilerOptions": {
        "target": "es5",
        "sourceMap": true,
        "typeRoots": [
            "node_modules/@types"
        ]
    }
 } --> 

cnpm install angular-route @types/angular-route -- save 装angular路由
 <img src="img/bg.png" alt="">
 ![](img/bg.png)
 # 
 ```js
 angular.module('myApp',['ngRoute'])
 ```
命令行输入
cnpm install ionic cprdova -g
