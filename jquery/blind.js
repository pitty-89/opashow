$(document).ready(function(){
    var $html = $("html"),
        $contBlind = $('#blk-blind'),
        $btnShowBlind = $(".js-blind"),
        clsBtnToggleOff = "fa-toggle-off",
        clsBtnToggleOn = "fa-toggle-on",
        clsBtnOff = "btn-mnepu-gr",
        clsBtnOn = "btn-mnepu",
        clsActBlind = "active",
        $btnPanel = $contBlind.find(".btn"),
        clsBtnNormal = "view-normal",
        clsModeNorm = "mode-normal",
        clsModeVis = "mode-visuallity",
        storageSupport = supportHtml5Storage(),
        clsOffBlind = "js-blind-off",
        clsOnBlind = "js-blind-on",
        idFSNormal = "fs-normal", /* fs = font-size */
        idFSMedium = "fs-medium",
        idFSBig = "fs-big",
        idTINormal = "ti-normal", /* ti = text indent*/
        idTIMedium = "ti-medium",
        idTIBig = "ti-big",
        idBgdNormal = "bgd-normal", /* bgd = background */
        idBgdBlack = "bgd-black",
        idBgdBlue = "bgd-blue",
        idImgHide = "img-hide",
        idImgShow = "img-normal";


    initDefaultSettings();
    setInitActiveBtn();
    initPanel();

    /**
     * клик по кнопке скрытия/открытия панели управления
     */
    $btnShowBlind.on("click", function(e){
        e.preventDefault();
        /**
         * проверяем, поддерживается ли браузером функция локального хранилища
         */
        if(storageSupport){
            if($contBlind.hasClass(clsActBlind)){
                closePanelBlind();
            }else{
                showPanelBlind();
            }
        }
    });

    /**
     * клик по кнопке на панели управления
     */
    $btnPanel.on("click", function(e){
        e.preventDefault();
        /**
         * проверяем, поддерживается ли браузером функция локального хранилища
         */
        if(storageSupport){
            if($(this).hasClass(clsBtnNormal)){
                removeSettings();
                closePanelBlind();
            }else{
                var $blkContInPanel = $(this).closest("div"),
                    containFunction = $blkContInPanel.data("function"),
                    id = $(this).attr("id");
                if(!$(this).hasClass(clsActBlind)){
                    $blkContInPanel.find("." + clsActBlind).removeClass(clsActBlind);
                    $(this).addClass(clsActBlind);
                    getOption(containFunction, id);
                }
            }
        }
    });

    /*region функция инициализации панели*/
    function initPanel(){
        inspectContainer();
        if(localStorage.getItem("blMode") == clsModeVis){
            showPanelBlind();
            toggleClsHtml([clsModeVis, clsModeNorm], clsModeVis);
        }else{
            toggleClsHtml([clsModeVis, clsModeNorm], clsModeNorm);
        }

    }
    /*endregion*/
    /*region функция удаления настроек*/
    function removeSettings(){
        toggleClsHtml([clsModeVis, clsModeNorm], clsModeNorm);
        localStorage.removeItem('blMode');
        localStorage.removeItem('blFontSize');
        localStorage.removeItem('blTextIndent');
        localStorage.removeItem('blBgdColor');
        localStorage.removeItem('blImg');
        setInitActiveBtn();
    }
    /*endregion*/
    /*region функция проверки html на наличие классов не входящих в список обычных */
    function inspectHtml(){
        if($html.hasClass(idFSNormal) && $html.hasClass(idTINormal) && $html.hasClass(idBgdNormal) && $html.hasClass(idImgShow))
            toggleClsHtml([clsModeVis, clsModeNorm], clsModeNorm);
        else toggleClsHtml([clsModeVis, clsModeNorm], clsModeVis);
    }
    /*endregion*/
    /*region функция проверяет у контейнера $contBlind наличие активных элементов и наличие у них классов normal */
    function inspectContainer(){
        var option = false;
        $contBlind.find("." + clsActBlind).each(function(i,y){
            if(!$(y).hasClass("normal")) option = true;
        });
        if(option) setMode(clsModeVis);
        else setMode(clsModeNorm);

    }
    /*endregion*/
    /*region функция осуществляет выбор функции для запуска при нажатии на кнопку на панели управления */
    /**
     * функция осуществляет выбор функции для запуска при нажатии на кнопку на панели управления
     * @param option - опция для запуска
     * @param id - id объекта передаваемого
     */
    function getOption(option, id){
        if(option == "FontSize") setFontSize(id);
        if(option == "TextIndent") setTextIndent(id);
        if(option == "Bgd") setBackgroundColor(id);
        if(option == "PictureVisible") setToggleImage(id);
    }
    /*endregion*/
    /*region функция добавления класса активности к кнопке управления */
    function setActivityOnBtn(id, array){
        var $obj = $("#" + id);
        $obj.closest("div").find("." + clsActBlind).removeClass(clsActBlind);
        $obj.addClass(clsActBlind);
        toggleClsHtml(array, id);
    }
    /*endregion*/
    /*region перезаписи классов */
    /**
     * для html удаляются классы указанные в массиве obj и добавляется класс newCls
     * @param obj - массив классов для удаления
     * @param newCls - клас необходимый для добавления
     */
    function toggleClsHtml(obj, newCls){
        $(obj).each(function(i,y){
            $html.removeClass(y);
        });
        $html.addClass(newCls);
    }
    /*endregion*/
    /*region функция изменения мода в локальном хранилище для страницы*/
    function setMode(clsMode){
        saveSettings("blMode", clsMode);
    }
    /*endregion*/
    /*region функция установки класса активности для измененного размера текста*/
    function setFontSize(idFontSize){
        setActivityOnBtn(idFontSize, [idFSNormal, idFSMedium, idFSBig]);
        saveSettings("blFontSize", idFontSize);
        inspectHtml();
    }
    /*endregion*/
    /*region функция установки класса активности для межбуквенного интервала */
    function setTextIndent(idTextIndent){
        setActivityOnBtn(idTextIndent, [idTINormal, idTIMedium, idTIBig]);
        saveSettings("blTextIndent", idTextIndent);
        inspectHtml();
    }
    /*endregion*/
    /*region функция установки класса активности для фонового цвета */
    function setBackgroundColor(idBackground){
        setActivityOnBtn(idBackground, [idBgdNormal, idBgdBlack, idBgdBlue]);
        saveSettings("blBgdColor", idBackground);
        inspectHtml();
    }
    /*endregion*/
    /*region функция установки класса активности для наличия картинок */
    function setToggleImage(idImage){
        setActivityOnBtn(idImage, [idImgShow, idImgHide]);
        saveSettings("blImg", idImage);
        inspectHtml();
    }
    /*endregion*/
    /*region функция сохранения настроек в локальное хранилище*/
    function saveSettings(name, id){
        localStorage.setItem(name, id);
    }
    /*endregion*/
    /*region функция добавления пользовательских настроек на страницу */
    /**
     * добавляет пользовательские настройки в локальное хранилище
     * @param blGetSettings - объект содержащий пользовательские настройки
     */
    function setUserSetting(blGetSettings){
        setFontSize(blGetSettings.blFontSize);
        setTextIndent(blGetSettings.blTextIndent);
        setBackgroundColor(blGetSettings.blBgdColor);
        setToggleImage(blGetSettings.blImg);
    }
    /*endregion*/
    /*region функция инициализации настроек по умолчанию */
    function initDefaultSettings(){
        window.defSettings = {
            blMode :        clsModeNorm,
            blFontSize :    idFSNormal,
            blTextIndent :  idTINormal,
            blBgdColor :    idBgdNormal,
            blImg :         idImgShow
        }
    }
    /*endregion*/
    /*region функция инициализации активности на кнопках управления */
    function setInitActiveBtn(){
        var blGetSettings = {
            blMode :        localStorage.getItem("blMode")          ||  window.defSettings.blMode,
            blFontSize :    localStorage.getItem("blFontSize")      ||  window.defSettings.blFontSize,
            blTextIndent :  localStorage.getItem("blTextIndent")    ||  window.defSettings.blTextIndent,
            blBgdColor :    localStorage.getItem("blBgdColor")      ||  window.defSettings.blBgdColor,
            blImg :         localStorage.getItem("blImg")           ||   window.defSettings.blImg
        };
        setUserSetting(blGetSettings);
    }
    /*endregion*/
    /*region функция показа панели управления*/
    function showPanelBlind(){
        $contBlind.addClass(clsActBlind);
        var heightContBlind = $contBlind.height();
        $contBlind.css("top",  - heightContBlind);
        $("body").animate({ "padding-top" : $contBlind.height() }, 50);
        $contBlind.animate({ "top" : 0 }, 50);
        setBtnSwitchOn();
    }
    /*endregion*/
    /*region функция скрытия панели управления*/
    function closePanelBlind(){
        var heightContBlind = $contBlind.height();
        $contBlind.animate({ "top" : - heightContBlind }, 50, function(){
            $contBlind.removeClass(clsActBlind);
        });
        $("body").animate({ "padding-top" : 0 }, 50);
        setBtnSwitchOff();
    }
    /*endregion*/
    /*region включение активности на всех кнопках включения панели управления*/
    function setBtnSwitchOn(){
        $btnShowBlind.removeClass(clsBtnOff).addClass(clsBtnOn);
        //.find("i").removeClass(clsBtnToggleOff).addClass(clsBtnToggleOn);
    }
    /*endregion*/
    /*region отключение активности на всех кнопках включения панели управления*/
    function setBtnSwitchOff(){
        $btnShowBlind.removeClass(clsBtnOn).addClass(clsBtnOff);
        //.find("i").removeClass(clsBtnToggleOn).addClass(clsBtnToggleOff);
    }
    /*endregion*/
});

function supportHtml5Storage(){
    try{
        return "localStorage" in window && window["localStorage"] !== null;
    }
    catch(e){
        return false;
    }
}