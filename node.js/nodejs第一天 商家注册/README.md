# nodejs 构建流程



```npm
// 初始化package.json  项目配置文件,管理项目依赖包
npm init 

// 配置 start 脚本

"scripts":{
    "start":"ts-node app"
}
```


## 修改 npm 脚本 使其可以debug
tsconfig.json
```tsconfig.json
{
    "compilerOptions": {
        "target": "es6",
        "typeRoots": [
            "node_modules/@types"
        ],
        "module": "commonjs",
        "sourceMap": true
    }
}
```
`lanuch.json`中配置program属性和 sourceMaps属性
```lanuch.json
  "configurations": [{
            "type": "node",
            "request": "launch",
            "name": "启动程序",
            "program": "${workspaceRoot}\\app.js",
            "cwd": "${workspaceRoot}",
            "outFiles": [],
            "sourceMaps": true
        }
```

tsc  -w 监听文件发生改变

断点运行