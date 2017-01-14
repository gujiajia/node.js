// /* 层次选择器
//     * $('body div') 所有子类
//         *  * body
//         *      * div1
//         *      * div2
//         *         * div21
//         *          * div22
//         *          * div23
//         *      * div3
//         * $('body>div)只会选择body 下一层的div元素  不会选择更深层次的元素 所以div21,div23,div23都不会被选中
//             * /
// // var query = $('body>div') //body 下的直系div
// //+ 选择器 $('#demo +div')选取demo按钮后的div
// //~ 选所有
// // $('#demo+div').css('backgroundColor', 'blue');
// // $('#demo~div').css('backgroundColor', 'blue');
// //选取第一个元素
// // $('div:first').css('backgroundColor', 'red');
// //选取第一个下标 从零开始
// // $('div').eq(0).css('backgroundColor', 'red');
// // //不是#demo的所有body元素  过滤
// // $('body:not(#demo)').css('backgroundColor', 'red');
// // 奇数  偶数even   奇数odd
// // $('#table tr:odd').css('backgroundColor', 'red');
// // //如果标签页被点击，打印被点击的标签页下标
// // $('ul.header li').click(function (tabHeader) {
// //     //在所有的标签页中 被点击的标签页的下标
// //     var index = $('ul.header li').index($(this)); //this 被点击的元素
// //     // console.log()
// //     // alert(index);
// //     //让选中的标签页下标显示出来
// //     $('ul.content li').hide();  //隐藏面板
// //     $(`ul.content li`).eq(index).show(); //点击出现面板
// // })
// //bootstrap 标签事件的使用方式
// /**
//  * * show.bs.tab  在标签页切换的时候触发的事件
//  */
// // $(`a[data-toggle='tab']`).on('show.bs.tab', (event) => {
// //     console.log(`
// //     激活的新的标签页:${event.target};
// //     前一个活跃的标签页:${event.relatedTarget}`); //前一个活跃标签页
// // });
// // $(`a[data-toggle='tab']`).on('shown.bs.tab', (event) => {
// //     console.log(`
// //     激活的新的标签页,切换完成了:${event.target};
// //     前一个活跃的标签页,切换完成了:${event.relatedTarget}`);
// // });
// // /**
// //  * hide.bs.tab 隐藏标签页，在标签页之前
// //  */
// // $(`a[data-toggle='tab']`).on('hide.bs.tab', (event) => {
// //     console.log(`
// //     标签页切换之前触发，hide.bs.tab:${event.target};
// //     标签页切换之前触发,hide.bs.tab:${event.relatedTarget}`);
// // });
// // //默认所有的“显示全部按钮”后面的商品  都会隐藏
// // $('.list-group .show-all ~ .list-group-item').hide();
// // /**
// //  * 当点击“显示全部的时候”
// //  * * 显示全部按钮隐藏
// //  * * 把后面隐藏的商品全部显示
// //  * * 为收起按钮增加点击收起效果
// //  */
// // $('.list-group .show-all').click(() => {
// //     //显示全部的按钮隐藏
// //     $('.list-group .show-all').hide();
// //     //后面的商品显示
// //     $('.list-group .show-all ~ .list-group-item').show();
// //     //隐藏
// //     $('.shouqi').click(() => {
// //         //隐藏“显示全部”+按钮后面所有的商品
// //         $('.list-group .show-all ~ .list-group-item').hide();
// //         //“显示全部按钮” 显示
// //         $('.list-group .show-all').show();
// //     })
// // });
// // //"显示全部"  后面的商品默认隐藏不显示
// // $('.show-all ~ *').hide();
// // //"显示全部" 被点击 显示后面的所有商品
// // $('.show-all').click(() => $('.show-all ~ *').show());
// // //"收起"被点击 隐藏显示后面的所有商品
// // $('.shouqi').click(() => $('.show-all ~ *').hide());
// //jquery 链式操作
// $('.show-all ~ *').hide()
//     .parent().find('.show-all').click(() => { $('.show-all ~ *').show(); })
//     .parent().find('.shouqi').click(() => { $('.show-all ~ *').hide(); })
// //blur 当表单失去焦点的时候验证用户名
// // $('input.username').blur(() => {
// //     //获取输入框的值
// //     var phone = $('input.username').val();
// //     if (/^1[3-9]\d{9}$/.test(phone)) {
// //         alert('手机号通过验证' + phone)
// //     } else {
// //         alert('错误：' + phone);
// //         $('.errorMsg').text('错误').show()
// //     }
// // })
// //操作 DOM 元素
// /**  .html()操作html  .text()操作元素文本  .val()操作值,attr()操作属性
// ** 不传参数获取值，
// ** 传了参数设置值
// */
// $('body').html()
// $('body').text()
// $('body').val()
// /**
//  * attr()操作属性
//  * attr(str:string) 获取指定属性的值，例如id,class,style
//  */
// $('body').attr({ id: 'idBody', class: 'body' });
// /**
//  * 操作样式
//  *  *attr('style','xxx');//设置样式
//  *  *addClass 设置class
//  * 
//  */
// $('body').attr('style', '');
// $('body').addClass('myClass');//添加 class
// $('body').removeClass('');//移除 class
// $('body').toggleClass('');//开关class,当class,存在就移除，不存在就增加
// $('body').css('position');//css 的三种用法  css('position','fixed')  css('color',()=>{return ...}),css({color:'blue'});
// //首选项被点击
// $('.menu li').click(function () {
//     //子菜单开关
//     $(this).children().toggle();
// });
// // 绑点击事件
// $('.menu li').bind('click', function () {  // click blur ...
//     //子菜单开关
//     $(this).children().toggle();
// });
// //append 在元素内部后面添加  例如：body内部后面，或者说第一个子元素
// $(document.body).append($(`<h1>hello world</h1>`));
// // prepend 是在元素内部前面添加  例如:body内部前面，或者说最后一个元素
// $('body').prepend($(`<h1>hello world</h1>`));
// // after  元素外部后面添加，后面一个兄弟元素
// // before 元素外部前面添加，第一个同级元素
// $('body').remove('div'); //什么都不传，将元素移除，传入 selector,将选中的元素移除
// // $('body').empty()  //清空节点，不清除外部的元素
// //replaceWith 替换
// $('p').replaceWith('<h1>你最喜欢的水果是</h1>');
// /**
//  * clone() 默认不会复制元素的点击事件， true 则连时间一起复制
//  * $('body).append('ul.menu');
//  * $('ul.menu').appendTO('body');
//  */
// $('ul.menu').clone(true).appendTo('body');
// window.onload = () => { alert('第一次编写代码') };
// window.onload = () => { alert('第二次编写代码') };
// window.onload = () => { alert('第三次编写代码') };
// $(document).ready(() => {
//     alert('ready1')
// })
// $(document).ready(() => {
//     alert('ready2')
// })
// $(document).ready(() => {
//     alert('ready3')
// })
// $(function () {
//     alert('ready4')
// })
// $('body').click(() => {
//     alert('点击了body')
// })
// $('div.propagation').click(() => {
//     alert('点击了div')
// })
// $('a').click((event) => {
//     console.log(event);
//     alert('点击了a')
//     event.preventDefault();
//     event.stopPropagation();
// })
//# sourceMappingURL=index.js.map