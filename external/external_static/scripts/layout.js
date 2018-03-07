/**
 * @team Yundun FET
 * @author yilisong@yundun.com
 * @latest 2017-9-14
 * @operator yilisong@yundun.com
 */

/********************* 页面布局 *******************/

var LARGE_WIDTH = 1780;
var LARGE_HEIGHT = 775;

var SMALL_WIDTH = 1680;
var SMALL_HEIGHT = 605;

var IS_SMALL_SCENE = false;

var $scenes = $('.scene');
var $bottomLeftScene = $('.bottom-left-scene');
var $bottomRightScene = $('.bottom-right-scene');
var $bottomCenterScene = $('.bottom-center-scene');


//bottomLeftScene
$bottomLeftScene.find('.triangle').click(function() {
    if ($bottomLeftScene.hasClass('scene-open')) {
        closeScene([$bottomLeftScene]);
    } else {
        openScene([$bottomLeftScene], IS_SMALL_SCENE);
        if (IS_SMALL_SCENE) {
            $bottomLeftScene.addClass('bottom-left-top-scene');
            moveMapLegend('right');
        } else {
            $bottomLeftScene.removeClass('bottom-left-top-scene');
        }
    }
});

// bottomCenterScene
$bottomCenterScene.find('.triangle').click(function() {
    if ($bottomCenterScene.hasClass('scene-open')) {
        closeScene([$bottomCenterScene]);
    } else {
        openScene([$bottomCenterScene], IS_SMALL_SCENE);
        if (IS_SMALL_SCENE) {
            moveMapLegend('left');
        } else {
            return
        }
    }
});

//bottomRightScene
$bottomRightScene.find('.triangle').click(function() {
    if ($bottomRightScene.hasClass('scene-open')) {
        closeScene([$bottomRightScene]);
    } else {
        openScene([$bottomRightScene], IS_SMALL_SCENE);
        if (IS_SMALL_SCENE) {
            $bottomRightScene.addClass('bottom-center-scene');
            moveMapLegend('left');
        } else {
            $bottomRightScene.removeClass('bottom-center-scene');
        }
    }
});

/*************************计算自适应*************************/
function calcScene(clientWidth, clientHeight) {
    IS_SMALL_SCENE = false;
    $bottomLeftScene.removeClass('bottom-left-top-scene');
    $bottomRightScene.removeClass('bottom-center-scene');
    //屏幕分辨率设置参数
    if (clientWidth > LARGE_WIDTH) {
        if (clientHeight > LARGE_HEIGHT) {
            openScene($scenes);
        } else if (clientHeight > SMALL_HEIGHT) {
            closeScene($scenes);
            openScene([$bottomCenterScene, $topRightScene]);
        } else {
            closeScene($scenes);
        }
    } else if (clientWidth > SMALL_WIDTH) {
        if (clientHeight > LARGE_HEIGHT) {
            closeScene($scenes);
            openScene([$bottomCenterScene, $bottomRightScene]);
        } else if (clientHeight > SMALL_HEIGHT) {
            closeScene($scenes);
            openScene([$bottomRightScene]);
            IS_SMALL_SCENE = true;
            moveMapLegend('right');
        } else {
            closeScene($scenes);
        }
    } else {
        closeScene($scenes);
    }
}

calcScene(document.body.clientWidth, document.body.clientHeight);

window.onresize = function() {
    calcScene(document.body.clientWidth, document.body.clientHeight);
};

//打开多个场景(数组)
//closeClass可省略,缺省:'scene-close'
//closeOtherFlag可省略,缺省:false
function openScene(scenes, closeClass, closeOtherFlag) {
    if (typeof closeClass === 'undefined' || typeof closeClass === 'boolean') {
        closeOtherFlag = closeClass;
        closeClass = 'scene-close';
    }
    if (closeOtherFlag) closeScene($scenes);
    $.each(scenes, function(index, item) {
        $(item).find('.fa').addClass('fa-angle-double-right').removeClass('fa-angle-double-left');
        $(item).removeClass(closeClass).addClass('scene-open');
    });
}
//关闭多个场景(数组)
//closeClass可省略,缺省:'scene-close'
function closeScene(scenes, closeClass) {
    closeClass = closeClass || 'scene-close';
    $.each(scenes, function(index, item) {
        $(item).find('.fa').addClass('fa-angle-double-left').removeClass('fa-angle-double-right');
        $(item).removeClass('scene-open').addClass(closeClass);
    });
}

function moveMapLegend(direction) {
    if (currentPrefix === PAGE_TYPE_CC) {
        return;
    }
    if(direction === 'right') {
        $('.group-menu').removeClass('group-menu-left').addClass('group-menu-right');
    } else {
        $('.group-menu').removeClass('group-menu-right').addClass('group-menu-left');
    }
    if (currentMapType === TYPE_WORLD) {
        refreshWorldMapByLegend(direction, 'center');
    } else {
        refreshChinaMapByLegend(direction, 'center');
    }
}

/***************右侧三个TAB效果****************/
$('.left_banner').click(function(){
    if ($(this).hasClass('left_banner_show')) {
        $(this).removeClass("left_banner_show").addClass("scene-close2").children(".left_switch_div").hide();
        $(this).children(".triangle_left_open").addClass("triangle_left").removeClass("triangle_left_open");
    } else {
        $(this).removeClass('scene-close2').addClass("left_banner_show").children(".left_switch_div").show();
        $(this).siblings('.left_banner').removeClass("left_banner_show").addClass("scene-close2").children(".left_switch_div").hide();
        $(this).children(".triangle_left").addClass("triangle_left_open").removeClass("triangle_left");
    }
})
$(".left1").click(function(){
    if (!$(this).hasClass('left_banner_show')) {
        $(".left2").css('margin-top','65px')
        $(".left3").css('margin-top','115px')
        $(this).children(".triangle_left_open").addClass("triangle_left").removeClass("triangle_left_open");
        $('.left2,.left3').children(".triangle_left, .triangle_left_open").addClass("triangle_left").removeClass("triangle_left_open");
    } else {
        $(this).css('margin-top','15px')
        $(this).children(".triangle_left").addClass("triangle_left_open").removeClass("triangle_left");
        $(".left2,.left3").children(".triangle_left, .triangle_left_open").addClass("triangle_left").removeClass("triangle_left_open");
        $(".left2").css('margin-top','12.5rem')
        $(".left3").css('margin-top','14.5rem')
    }
})
$(".left2").click(function(){
    if (!$(this).hasClass('left_banner_show')) {
        $(".left1").css('margin-top','15px')
        $(".left3").css('margin-top','115px')
        $(this).children(".triangle_left_open").addClass("triangle_left").removeClass("triangle_left_open");
        $('.left1,.left3').children(".triangle_left, .triangle_left_open").addClass("triangle_left").removeClass("triangle_left_open");
    } else {
        $(this).css('margin-top','65px')
        $(this).children(".triangle_left").addClass("triangle_left_open").removeClass("triangle_left");
        $(".left1,.left3").children(".triangle_left, .triangle_left_open").addClass("triangle_left").removeClass("triangle_left_open");
        $(".left1").css('margin-top','15px')
        $(".left3").css('margin-top','14.5rem')
    }
})
$(".left3").click(function(){
    if (!$(this).hasClass('left_banner_show')) {
        $(".left2").css('margin-top','65px')
        $(".left1").css('margin-top','15px')
        $(this).children(".triangle_left_open").addClass("triangle_left").removeClass("triangle_left_open");
        $('.left1,.left2').children(".triangle_left, .triangle_left_open").addClass("triangle_left").removeClass("triangle_left_open");
    } else {
        $(".left1").css('margin-top','15px')
        $(this).children(".triangle_left").addClass("triangle_left_open").removeClass("triangle_left");
        $(".left1,.left2").children(".triangle_left, .triangle_left_open").addClass("triangle_left").removeClass("triangle_left_open");
        $(".left2").css('margin-top','65px')
        $(this).css('margin-top','115px')
    }
})
$(".left2").trigger('click')
