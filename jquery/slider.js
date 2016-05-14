$(document).ready(function(){
    var sl = ({
            container : "#slider",
            list : ".sl-list",
            elem : ".sl-list-elem",
            elAct : "sl-active",
            image : ".sl-img",
            title : ".sl-title",
            desc : ".sl-desc",
            loader : ".sl-load",
            loadAct : "sl-load-active",
            nav : ".sl-nav",
            navNext : "sl-nav-right",
            navPrev : "sl-nav-left",
            timeLine : ".sl-timeline",
            timeOn : "start-bar",
            delay : 5000
        }),
        autoload = true,
        a = true,
        time = '',
        $slider = $(sl.container),
        loader = $slider.find(sl.load);
    startLoader();
    $slider.imagesLoaded(function(){
        var heightBlk = $slider.find(sl.image).height();
        //$slider.find(sl.list).height(heightBlk);
        setIndexSlides();
        stopLoader();
        $slider.find(sl.nav).on("click", function(e){
            e.preventDefault();
            if(a){
                clearInterval(time);
                a = false;
                if($(this).hasClass(sl.navNext)) nextSlide();
                else prevSlide();
                if(autoload)
                    time = setInterval(autoChange, sl.delay);
            }
        });

    });
    if(autoload)
        time = setInterval(autoChange, sl.delay);

    function autoChange(){
        if(a){
            a = false;
            nextSlide();
        }
    }

    function resetProgress(){
        $slider.find(sl.timeLine).removeClass(sl.timeOn).children("div").animate({ "width" : 0 }, 10, function(){
            startProgress();
        });
    }
    function startProgress(){
        $slider.find(sl.timeLine).addClass(sl.timeOn);
    }

    function startLoader(){
        loader.addClass(sl.loadAct);
    }
    function stopLoader(){
        loader.removeClass(sl.loadAct);
    }
    function setIndexSlides(){
        $slider.find(sl.elem).each(function(i,y){
            $(y).attr("data-index", i + 1);
        });
    }
    function getActiveIndex(){
        return $slider.find("." + sl.elAct).data("index");
    }
    function getCountElem(){
        return $slider.find(sl.elem).length;
    }
    function nextSlide(){
        resetProgress();
        var curInd = getActiveIndex(),
            $curSlide = $slider.find("[data-index=" + curInd + "]");
        if(curInd < getCountElem()) var nextInd = curInd + 1;
        else nextInd = 1;
        $slider.find("[data-index=" + nextInd + "]").addClass(sl.elAct);
        $curSlide.removeClass(sl.elAct);
        a = true;
        //if(time != '') time = setInterval(autoChange, sl.delay);
    }
    function prevSlide(){
        resetProgress();
        var curInd = getActiveIndex(),
            $curSlide = $slider.find("[data-index=" + curInd + "]");
        if(curInd == 1) var nextInd = getCountElem();
        else nextInd = curInd - 1;
        $slider.find("[data-index=" + nextInd + "]").addClass(sl.elAct);
        $curSlide.removeClass(sl.elAct);
        a = true;
        //if(time != '') time = setInterval(autoChange, sl.delay);
    }
});
