

// pc导航栏
$(".pc-header .meun ul li").hover(function () {
    const i = $(this).find(".nav")
    i.stop().fadeIn();
}, function () {
    const i = $(this).find(".nav")
    i.stop().fadeOut();
})
$(".pc-header .language").hover(function () {
    $(this).find(".choose").stop().fadeIn()
}, function () {
    $(this).find(".choose").stop().fadeOut()

})
// ps导航栏
var PsSwiper = new Swiper('.ps-swiper', {
    loop: true, // 循环模式选项
    effect: 'fade',
    autoplay: {
        delay: 5000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    on: {
        init: function () {
            const p = this.$el.find('.swiper-slide-active');
            const i = $(p).find(".ps");
            const winW = $(window).width();
            const psW = i.innerWidth();
            i.css({
                "left": 0,
                "right": "auto"
            });
            if (psW > winW) {
                i.css("left", "auto");
                i.stop().animate({
                    right: 0
                }, 5000)


            }

        },
        slideChangeTransitionStart: function () {
            const p = this.$el.find('.swiper-slide-active');
            const i = $(p).find(".ps");
            const winW = $(window).width();
            const psW = i.innerWidth();
            i.css({
                "left": 0,
                "right": "auto"
            });
            if (psW > winW) {
                i.css("left", "auto");
                i.stop().animate({
                    right: 0
                }, 5000)


            }
        }
    }
})

// pmd导航栏
$(".pmd-header .nav-show").click(
    function () {
        $("main").hide();
        $(".ps-swiper").stop().fadeOut()
        $(".pmd-header  .animate span:nth-of-type(1)").stop().animate({
            "left": "-100%",
            "backgroundColor": "transparent"
        }, 300)
        $(".pmd-header  .animate span:nth-of-type(3)").stop().animate({
            "right": "-100%",
            "backgroundColor": "transparent"
        }, 300)
        
        $(".pmd-header  .animate .ro").stop().animate({
            rotate: '90deg',
            
        }, 300, function () {
            $(this).parent().stop().animate({
                rotate: '45deg',
               
            }, 200, "swing")
        })
        $(".pmd-index-one").stop().fadeOut();
        $(".pmd-header .nav-show").stop().fadeOut();
        $(".pmd-header .ps").stop().fadeOut();
        $(".pmd-header .nav-hide").stop().fadeIn();
        $("nav").stop().fadeIn();
        
    }
)
$(".pmd-header .nav-hide").click(
    function () {
        $("main").show();
        PsSwiper.update();
        $(".ps-swiper").stop().fadeIn();

        $(".pmd-header  .animate span:nth-of-type(1)").stop().animate({
            "left": "0",
            "backgroundColor": "var(--color-header)"
        }, 300);
        $(".pmd-header  .animate span:nth-of-type(3)").stop().animate({
            "right": "0",
            "backgroundColor": "var(--color-header)"
        }, 300);
        $(".pmd-header  .animate .ro").stop().animate({
            rotate: 0,
           


        }, 300, function () {
        

            $(this).parent().stop().animate({
                rotate: 0
                
            }, 200, "swing", function () { 
                $(this).css("transform","none")

            })
        });
        $(".pmd-index-one").stop().fadeIn();
        $(".pmd-header .nav-hide").stop().fadeOut();
        $(".pmd-header .ps").stop().fadeIn();
        $(".pmd-header .nav-show").stop().fadeIn();
        $("nav").stop().fadeOut();
        if ($("nav ul li").find(".language").css("display") != "none") {
            const i = $("nav ul li").find(".language");
            i.find(".choose").stop().fadeOut();
            i.find(".lang").css("color","rgba(255, 255, 255, 0.5)")
            i.find("i").css("color","rgba(255, 255, 255, 0.5)")
            i.css("border"," 1px solid rgba(255, 255, 255, 0.5) ")
        }
    }
)
$("nav ul li").click(function () {
    
    if ($("nav ul li").find(".language").css("display") != "none") {
        const i = $("nav ul li").find(".language");
        i.find(".choose").stop().fadeOut();
        i.find(".lang").css("color","rgba(255, 255, 255, 0.5)")
        i.find("i").css("color","rgba(255, 255, 255, 0.5)")
        i.css("border"," 1px solid rgba(255, 255, 255, 0.5) ")
    }
  



    $(this).parent().find(".detail").each(
        function (i, e) { 
            if ($(e).css("dispaly") != "none") {
                $(e).prev().css("border-bottom", "1px solid rgba(255, 255, 255, 0.2)");
                $(e).prev().find(".show").stop().fadeIn();
                $(e).prev().find(".hide").stop().fadeOut();
                $(e).prev().find(".arrow").stop().fadeOut();
                $(e).stop().slideUp();
                $(e).prev().find(".title").css("color", "var(--color-header)")
                $(e).prev().find(".button span").css("color", "var(--color-header)")
            }
        }
    )
    if ($(this).next().hasClass("detail")) {
        if ($(this).hasClass("act") == false ) {
            $(this).addClass("act")
            $(this).css("border", 0);
            $(this).find(".show").stop().fadeOut();
            $(this).find(".hide").stop().fadeIn();
            $(this).find(".arrow").stop().fadeIn()
            $(this).next(".detail").stop().slideDown()
            $(this).find(".title").css("color", "var(--color-hover)")
            $(this).find(".button span").css("color", "var(--color-hover)")
            
        } else if ($(this).hasClass("act") == true) {
            $(this).removeClass("act")
            $(this).css("border-bottom", "1px solid rgba(255, 255, 255, 0.2)");
            $(this).find(".show").stop().fadeIn();
            $(this).find(".hide").stop().fadeOut();
            $(this).find(".arrow").stop().fadeOut();
            $(this).next(".detail").stop().slideUp();
            $(this).find(".title").css("color", "var(--color-header)")
            $(this).find(".button span").css("color", "var(--color-header)")
            
        }
    } else {
        return;
    }
   

})
$("nav ul li").find(".language").click(function () { 
    setTimeout(() => {
        if ($(this).find(".choose").css("display") == "none") {
            $(this).find(".choose").stop().fadeIn();
            $(this).find(".lang").css("color", "var(--color-hover)")
            $(this).find("i").css("color","var(--color-hover)")
            $(this).css("border"," 1px solid var(--color-hover) ")
        }
    }, 10);
    
    // else { 
    //     $(this).find(".choose").stop().fadeOut();
    //     $(this).find(".lang").css("color","rgba(255, 255, 255, 0.5)")
    //     $(this).find("i").css("color","rgba(255, 255, 255, 0.5)")
    //     $(this).css("border"," 1px solid rgba(255, 255, 255, 0.5) ")

    // }
    

})
    

//pc or pmd
var curW = $(window).width();
$(window).resize(function () { 
    const winW = $(window).width();
    if (winW > 1024) {
        if (curW <= 1024) {           
            location.reload(true)
        }
    } else if (winW <= 1024) { 
        if (curW > 1024) {       
            location.reload(true)
    
        }
    }
   
    curWinW = winW
        
})
var PcPmd = (w) => { 
    const winW = $(window).width();
    if (winW > w) { 
        $(".pmd").hide();
        $(".pc").show();
    } else if (winW <= w) {
        $(".pmd").show();
        $(".pc").hide();
    }

}
PcPmd(1024)
$(window).resize(function () { 
PcPmd(1024)
})
