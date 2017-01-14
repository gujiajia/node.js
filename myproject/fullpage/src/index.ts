/**
 * 集成animateCss
 */
interface JQuery {
    /**
     * 第一次调用动画   接口
     */
    animateCss: (animationName: string) => JQuery;
}
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

var jqObj = $('body');
jqObj.animateCss('bounce');

$('#content').fullpage({
    onLeave: (index, nextIndex, direction) => {
        // console.log(index, nextIndex, direction);

        if (index == 1 && nextIndex == 2) {
            // alert('hello world');
        }
    },

    afterLoad: (link, index) => {
        switch (index) {
            // 进入第一个面板,头像淡入,或者其他的动画,向下的移动等
            case 1:
                setTimeout(function () {
                    // 头像 
                    $('.section1 .header-picture ').show().animateCss('flip');
                    //名字组显示
                    $('.section1 .namegroup').show().animateCss('bounce');
                    // 中文名字 左入
                    $('.section1 .chineseName').show().animateCss('slideInLeft');
                    $('.section1 .englishName').show().animateCss('slideInRight');
                    // 英文名字 右入
                }, 500);
                break;
            case 2:

                break;

            case 3:
                // console.log('欢迎进入第三面板');
                break;
        }
    },


    // 导航
    navigation: false,
    navigationPosition: 'top',
    navigationTooltips: ['firstSlide', 'secondSlide'],
    showActiveTooltip: false,
    slidesNavigation: false,
    slidesNavPosition: 'top',
    menu: '#menu',
    anchors: ['page1', 'page2', 'page3', 'page4'],
    css3: true,
    easing: 'easeInOutCubic',
    easingcss3: 'ease'
});

setInterval(function () {
    $.fn.fullpage.moveSlideRight();
}, 3000);

$('body').scrollspy({target:'.navbar-example'});
$('[data-spy="scroll"]').each(function () {
  var $spy = $(this).scrollspy('refresh')
});