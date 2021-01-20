var height=$('.intro').height() -$('.menu').height();
var navlinks=$(' .navigation li'),
        navh=$('.menu').height(),
        slide=$('section'),
        documentel=$(document),
        mywindow = $(window),
        htmlbody = $('html,body'),
        goal="";
        

$(window).scroll(function (){
    if($(this).scrollTop() >= height){
        $('.menu').addClass('fixed');
    }else{
        $('.menu').removeClass('fixed');
        if($(this).scrollTop() <= height+$('.menu').height()){
            $('.profile-nav').removeClass('active');
        }
    }
});

(function(){
    $(function(){
        $('.navigation li').click(function (){
            $('ul.navigation.show').css('display','none');
            $('ul.navigation.show').removeClass('show');
            $('.navigation li.active').removeClass('active');
            $(this).addClass('active');
        });
            
    });
    $(function(){
        $('#ret').click(function (){
            if($('ul.navigation').hasClass('show')){
                $('ul.navigation.show').css('display','none');
                     $('ul.navigation.show').removeClass('show');
                }
                else {
                    $('ul.navigation').css('display','flex');
                    $('ul.navigation').addClass('show');
                }

            });
    });

    documentel.on('scroll',function(){
        var currentScrollPos = documentel.scrollTop();
        slide.each(function(){
            var self=$(this);
            if(self.offset().top <= (currentScrollPos + (2*navh)) && (currentScrollPos + (navh/2))<= (self.offset().top + self.outerHeight())){
                var targetClass = '.'+self.attr('class')+'-nav';
                navlinks.removeClass('active');
                $(targetClass).addClass('active');
            }
        });
    });

    // fonction de défilement
    function goTo(dataslide) {
        slide.each(function(){
            var self=$(this);
            if(self.attr('data-slide')==dataslide){
                goal = self.offset().top;
            }
        });
        if (mywindow.scrollTop()<goal) {
            var goalPx = goal -navh+5;
        } 
        else {
             var goalPx = goal - navh+5;
        }
        htmlbody.animate({scrollTop: goalPx}, 1000);
    }

    navlinks.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goTo(dataslide);
    });

    // Le bouton de défilement vers le haut apparaît
    documentel.on('scroll', function() {
        var scrollDistance = $(this).scrollTop();
        if (scrollDistance > 300) {
          $('.scroll-to-top').css('display','inline');
        } else {
          $('.scroll-to-top').css('display','none');
        }
     });

    documentel.on('click', 'a.scroll-to-top', function(e) {
        var anchor = $(this).attr('href');
        goTo(anchor);
        e.preventDefault();
    });

})();
