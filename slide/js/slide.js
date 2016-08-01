"use strict"
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('jquery'));
    } else {
        factory(window.jQuery);
    }
})(function($) {
    if(1=="1"){
        console.log(2);
    }
    var settings = {
        container: 'ul',
        slideWay: 'left',
        srcElement: 'li',
        speed: 500
    };
    var defaults = {
        currentPage: 1,
        totalPage: 0,
        leftClickNum: 0,
        rightClickNum: 0
    };
    $.fn.tammySlide = function(opt) {
        var m = $(this);
        settings = $.extend(settings, opt);
        var mUl = m.find(settings.container);
        var imgLen = mUl.find(settings.srcElement);
        var mWidth = m.outerWidth();
        var imgWidth = imgLen.eq(0).outerWidth(),
            imgHeight = imgLen.eq(0).outerHeight(),
            totalWidth = 0,
            totalHeight = 0;

        for (var i = 0; i < imgLen.length; i++) {
            totalWidth += imgLen.eq(i).outerWidth();
            totalHeight += imgLen.eq(i).outerHeight();
        }
        mUl.css({
            width: totalWidth,
            height: imgHeight
        });
        defaults.totalPage = parseInt(mWidth / imgWidth);
        defaults.rightClickNum = imgLen.length - defaults.totalPage;
        defaults.rightClickNum = defaults.rightClickNum < 0 ? 0 : defaults.rightClickNum;
        var leftBtn = m.find('.toLeft');
        var rightBtn = m.find('.toRight');
        leftBtn.on('click', function() {
            if (mUl.is(':animated')) {
                return false;
            }
            if (!defaults.leftClickNum) {
                return false;
            } else {
                defaults.rightClickNum++;
                defaults.leftClickNum--;
                var leftVal = parseInt(mUl.css('left').replace('px', ''));
                var curLeftVal = leftVal + imgWidth;
                mUl.animate({
                    left: curLeftVal
                }, settings.speed, 'swing', function() {});
            }
        });
        rightBtn.on('click', function() {
            if (mUl.is(':animated')) {
                return false;
            }
            if (!defaults.rightClickNum) {
                return false;
            } else {
                defaults.rightClickNum--;
                defaults.leftClickNum++;
                var leftVal = parseInt(mUl.css('left').replace('px', ''));
                var curLeftVal = leftVal - imgWidth;
                mUl.animate({
                    left: curLeftVal
                }, settings.speed, 'swing', function() {});
            }
        });
    };
});