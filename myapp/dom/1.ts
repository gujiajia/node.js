function isBrowser() {
    var Sys: any = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
        (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
            (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
                (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
                    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

    if (!Sys.safari) {//Js判断为苹果safari浏览器
        var iosButton = <HTMLButtonElement>document.getElementById('ios');
        iosButton.nodeType

    }
}

window.onload = isBrowser;
var body = document.body;

// 表单
var table = <HTMLTableElement>document.getElementById('table');
// 往表单插入100行
for (var i = 0; i < 100; i++) {
    var row = table.insertRow();
    row.textContent = "新增一行";
    var [r, g, b] = [parseInt(Math.random() * 10 + ''),
    parseInt(Math.random() * 10 + ''),
    parseInt(Math.random() * 10 + '')
    ];
    row.style.background = `#${r}${g}${b}`;
}
