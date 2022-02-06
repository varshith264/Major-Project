(function (System, $){
    var HeaderState = System.operateState.getHeaderState(Report.report_id);
    FuncHeader(HeaderState);
    $(".HeaderButton").click(function() {
        var show = $(".paper-header").css("display");
        System.operateState.saveHeaderState(Report.report_id, show);
        FuncHeader(show);
        ListHeight();
    });
    function FuncHeader(header){
        if (header == 'block' || header == '') {
            $(".paper-header").hide();
            $("#m-content").css("top", "40px");
            $(".overall-similarity").show();
            $(".header_logo").show();
            $(".clickimg").css("background-position", "-10px -98px");
            $(".dropdown-menu ul").css("top", "40px");
        } else {
            $(".paper-header").show();
            $("#m-content").css("top", "140px");
            $(".overall-similarity").hide();
            $(".header_logo").hide();
            $(".clickimg").css("background-position", "-71px -98px");
            $(".dropdown-menu ul").css("top", "140px");
        }
    }

    // language
    var leng = System.operateState.getLanguage(Report.report_id);
    if (leng != '') {
        leng = typeof multilingual[leng] == "undefined" ? "English" : leng;
    } else {
        leng = typeof multilingual[user_language] == "undefined" ? "English" : user_language;
    }
    SwitchMultilingual(leng);      
    function SwitchMultilingual(leng) {
        $('*[data-lang]').each(function () {
            var name = $(this).data().lang;
            $(this).html(multilingual[leng][name]);
        });
    }

    // nav
    var aLink = System.operateState.getALink(Report.report_id);
    var tabName = System.operateState.getTabName(Report.report_id);
    FuncPop(tabName);
    NavList();
    $("#childIframe").attr("src", aLink);
    ViewOriginalAttr();
    $("#m-nav .active_li").each(function () { 
        var activeName = $(this).find(".detailed_description").data().lang;
        if (tabName == activeName){
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
        }
        if (tabName == "UseHelp") {
            $("#nav_ul .active_li.active").removeClass('active');
        }
    });
    $("#m-nav .active_li").click(function() {
        var tab_name = $(this).find(".detailed_description").data().lang;
        var a_Attr = $(this).find("a").attr("href");
        System.operateState.saveALink(Report.report_id, a_Attr);
        System.operateState.saveTabName(Report.report_id, tab_name);
        FuncPop(tab_name);
        if (tab_name == "UseHelp") {
            $("#nav_ul .active_li.active").removeClass('active');
        }
    });
    function FuncPop(tab) {
        var template = '';
        if (tab == '' || tab == "DetailReport") {
            template += 
            '<div class="layui_fixed_layer"></div>' +
            '<div class="layui_loading_shade">' +
            '<div class="layui-layer main_layer">' +
            '<div class="layui-layer-content">' + multilingual[leng].LoadingReport + '</div>' +
            '</div>' +
            '</div>';
            $("#m-content").append(template);
            var FoldState = System.operateState.getFoldState(Report.report_id);
            var Init = System.operateState.getInitDetailReport(Report.report_id);
            FoldStateWidth(FoldState);
            BackgroundColor(Init);
        }
        if (tab == "ViewOriginal") {
            template +=
            '<div class="layui_fixed_layer"></div>' +
            '<div class="layui_loading_shade">' +
            '<div class="layui-layer main_layer">' +
            '<div class="layui-layer-content">' + multilingual[leng].LoadingOriginal + '</div>' +
            '</div>' +
            '</div>';
            $("#m-content").append(template);
            var Init = System.operateState.getInitViewOriginal(Report.report_id);
            BackgroundColor(Init);
        }
    }
    function ViewOriginalAttr() {
        var init = System.operateState.getInitViewOriginal(Report.report_id);
        if (is_has_word) {
            if (init == '' || init == "word") {
                $(".original-nav a").attr("href", "htmls/word/word_original.html");
            } else {
                $(".original-nav a").attr("href", "htmls/text/text_original.html");
            }
        } else {
            $(".original-nav a").attr("href", "htmls/text/text_original.html");
        }
    }
    function BackgroundColor(init) {
        if (is_has_word) {
            if (init == '' || init == "word") {
                $('.layui_loading_shade').css('background', '#484f52');
            } else {
                $('.layui_loading_shade').css('background', '#e7e7e7');
            }
        } else {
            $('.layui_loading_shade').css('background', '#e7e7e7');
        }
    }
    function FoldStateWidth(state){
        if (state == 'none') {
            $('.layui_loading_shade').css('width', '100%');
        } else {
            $('.layui_loading_shade').css('width', '70%');
        }
    }
    function NavList() {
        var width = document.documentElement.clientWidth;
        $("#nav_ul li").each(function() {
            if (width > 1280) {
                $('.tab li a').css("padding", "0 20px");
                $(".nav-tit h4").css("font-size", "20px");
            } else {
                $('.tab li a').css("padding", "0 10px");
                $(".nav-tit h4").css("font-size", "16px");
            }
        });
    }
    $(".dropdown-toggle").click(function () {
        if ($(".download-format").css("display") == "block") {
            $(".customize-select .dropdown-menu ul").css("right", "125px");
        } else {
            $(".customize-select .dropdown-menu ul").css("right", "81px");
        }
        $(".customize-select .dropdown-menu").toggle();
        $(".customize-select .caret").css({
            "transform" : "rotate(180deg)"
        });
    });
    $('.dropdown-menu *[data-option]').each(function() {
        if (leng == $(this).data().option) {
            $(".customize-select-text").html($(this).html());
            $(".dropdown-menu").find('li.selected').removeClass('selected');
            $(this).parent("li").addClass("selected");
        }
    });
    $(document).on('click','.customize-select .dropdown-menu li > a',function (e) {
        e.preventDefault();
        location.reload();
        var text = $(this).text();
        var li = $(this).parent('li');
        if(!li.hasClass('ignore')) {
            var selectGroup = $(".customize-select");
            var inputName = selectGroup.attr('data-name');
            var inputEle = selectGroup.find('input[name="' + inputName + '"]');
    
            $(".dropdown-menu").find('li.selected').removeClass('selected');
            li.addClass('selected');
            selectGroup.find('.customize-select-text').html(text);
            inputEle.val(text);
        }
        var option = $(this).attr('data-option');
        leng = typeof multilingual[option] == "undefined" ? "English" : option;
        SwitchMultilingual(leng); 
        System.operateState.saveLanguage(Report.report_id, leng);
        iframe.contentWindow.postMessage({leng: leng}, "*");
    });
    $(".download-format").click(function () { 
        $(this).find(".dropdown-menu").toggle();
    });
    $(".customize-select .dropdown-menu").click(function() {
        $(this).hide();
        $(".customize-select .caret").css({
            "transform" : "rotate(0deg)"
        });
    });
    $(".help_img,.download_img").mousemove(function() {
        $(this).parents(".ML20").find(".detailed_description").css("display", "block");
    }).mouseout(function() {
        $(this).parents(".ML20").find('.detailed_description').css("display", "none");
    });

    window.addEventListener("message", function (event) {
        if (event.data == "switch-detail-text") {
            System.operateState.saveInitDetailReport(Report.report_id, "text");
            FuncPop("DetailReport");
            $(".popover").hide();
        }
        if (event.data == "switch-detail-word") {
            System.operateState.saveInitDetailReport(Report.report_id, "word");
            FuncPop("DetailReport");
            $(".popover").hide();
        }
        if (event.data == "switch-original-text") {
            System.operateState.saveALink(Report.report_id, "htmls/text/text_original.html");
            System.operateState.saveInitViewOriginal(Report.report_id, "text");
            FuncPop("ViewOriginal");
            $(".original-nav a").attr("href", "htmls/text/text_original.html");
            $(".popover").hide();
        }
        if (event.data == "switch-original-word") {
            System.operateState.saveALink(Report.report_id, "htmls/word/word_original.html");
            System.operateState.saveInitViewOriginal(Report.report_id, "word");
            FuncPop("ViewOriginal");
            $(".original-nav a").attr("href", "htmls/word/word_original.html");
            $(".popover").hide();
        }
        if (event.data == "Page_Loading") {
            $(".layui_loading_shade").remove();
            $(".layui_fixed_layer").remove();
        }
        if (event.data.FoldState) {
            BookmarkPosition(event.data.FoldState);
        }
        if (event.data == "get_language") {
            iframe.contentWindow.postMessage({leng: leng}, "*");
        }
    });

    // DirectoryNavigation
    function DirectoryNavigation(id) {
        var root = "";
        root += 
            '<div class="popover bookmark" id="'+ id +'">' +
            '<div class="popover-child">' +
            '<div class="popover-title flex-between">' +
            '<div class="flex">' +
            '<div class="font-bold">'+ multilingual[leng].DirectoryNavigation +'</div>' +
            '<div class="mclick_show"><span>[</span><span class="mclick_span">'+ multilingual[leng].ExpandAll +'</span><i class="g-arrow-i"></i><span>]</span></div>' +
            '</div>' +
            '<button type="button" class="close"><span aria-hidden="true"></span></button>' +
            '</div>' +
            '<div class="popover-content">' +
            '<div class="overflow_ul"></div>' +
            '</div>' +
            '</div>' +
            '</div>';
        $("#m-content").append(root);
    }
    function loop(dt) {
        var child = "";
        if (dt.length == 0) {
            child += '<div style="text-align: center;margin-left: -40px;padding: 15px 0;">'+ multilingual[leng].EmptyDirectoryNavigation +'</div>';
        } else {
            dt.forEach(item => {
                var children = (item.children) != "undefined" && item.children && item.children.length ? loop(item.children) : null;
                if (children != null) {
                    child += 
                    '<div class="layui-nav-third-child">' +
                    '<div class="flex">' +
                    '<div class="mselect_img mselect_img_detail"></div>' +
                    '<div class="mselect_tit">' +
                    '<a href="htmls/word/word_report.html'+ item.anchorPoint +'" target="left" class="third-class">'+ item.content +'</a>' +
                    '</div>' +
                    '</div>' + children +
                    '</div>';
                } else {
                    child += 
                    '<div class="layui-nav-third-child">' +
                    '<div class="flex">' +
                    '<div class="mselect_tit ML20">' +
                    '<a href="htmls/word/word_report.html'+ item.anchorPoint +'" target="left" class="third-class">'+ item.content +'</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                }
            });
        }
        return child;
    }
    function loopFunc(dt) {
        var child = "";
        if (dt.length == 0) {
            child += '<div style="text-align: center;margin-left: -40px;padding: 15px 0;">'+ multilingual[leng].EmptyDirectoryNavigation +'</div>';
        } else {
            dt.forEach(item => {
                var children = (item.children) != "undefined" && item.children && item.children.length ? loopFunc(item.children) : null;
                if (children != null) {
                    child += 
                    '<div class="layui-nav-third-child">' +
                    '<div class="flex">' +
                    '<div class="mselect_img mselect_img_original"></div>' +
                    '<div class="mselect_tit">' +
                    '<a href="htmls/word/word_original.html'+ item.anchorPoint +'" target="main" class="third-class">'+ item.content +'</a>' +
                    '</div>' +
                    '</div>' + children +
                    '</div>';
                } else {
                    child += 
                    '<div class="layui-nav-third-child">' +
                    '<div class="flex">' +
                    '<div class="mselect_tit ML20">' +
                    '<a href="htmls/word/word_original.html'+ item.anchorPoint +'" target="main" class="third-class">'+ item.content +'</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                }
            });
        }
        return child;
    }
    function ReplaceString(data) {
        return JSON.stringify(JSON.parse(data)).replace(/</g,"&lt;").replace(/>/g,"&gt;");
    }
    DirectoryNavigation("detail_report");
    DirectoryNavigation("original_report");
    var treeData = JSON.parse(ReplaceString(detail_json));
    loop = loop(treeData);
    $('#detail_report .overflow_ul').html(loop);
    var originalData = JSON.parse(ReplaceString(original_json));
    loopFunc = loopFunc(originalData);
    $("#original_report .overflow_ul").html(loopFunc);
    $('.overflow_ul').children('.layui-nav-third-child').removeClass('layui-nav-third-child');

    $('.third-class').each(function() {
        var max = 40;
        var str = $(this).text().trim();
        var length = str.length;
        if (length > max) {
            $(this).html(str.substring(0, max) + '...');
        };
    });
    $(".mselect_img").click(function () { 
        var thirdchild = $(this).parent().siblings(".layui-nav-third-child");
        if ($(this).hasClass('opened')) {
            thirdchild.hide();
            thirdchild.find(".mselect_img").removeClass('opened');
            thirdchild.find(".mselect_img").css('background-position', '-115px -245px');
            $(this).css('background-position', '-115px -245px');
            $(this).removeClass('opened');
        } else {
            thirdchild.show();
            $(this).css('background-position', '-77px -245px');
            $(this).addClass('opened');
        }
    });
    function ExpandCollapse(arr) {
        var flag = true;
        $.each(arr, function (k, v) { 
            if (!$(v).hasClass('opened')) {
                flag = false;
            }         
        });
        if (flag) {
            $(".mclick_span").text(multilingual[leng].CollapseAll);
            $("i.g-arrow-i").css({
                "border-color": "transparent transparent #56b282",
                "top": "13px"
            });
        } else {
            $(".mclick_span").text(multilingual[leng].ExpandAll);
            $("i.g-arrow-i").css({
                "border-color": "#56b282 transparent transparent",
                "top": "18px"
            });
        }
    }
    $(".mselect_img_detail").click(function () {  
        var mselect = $(".mselect_img_detail");
        ExpandCollapse(mselect);
    });
    $(".mselect_img_original").click(function () {  
        var mselect = $(".mselect_img_original");
        ExpandCollapse(mselect);
    });
    if ($(".layui-nav-third-child").length == 0) {
        $(".mclick_show").hide();
    }
    $(".mclick_show").click(function () { 
        var thirdchild = $(this).parent().parent().next().find(".layui-nav-third-child");
        var selectimg = $(this).parent().parent().next().find(".mselect_img")
        if (thirdchild.is(":hidden")) {
            if ($(this).find(".mclick_span").text() == multilingual[leng].CollapseAll) {
                thirdchild.hide();
                selectimg.css('background-position', '-115px -245px');
                $(this).find(".mclick_span").text(multilingual[leng].ExpandAll);
                $("i.g-arrow-i").css({
                    "border-color": "#56b282 transparent transparent",
                    "top": "18px"
                });
                $(".mselect_img").removeClass('opened');
            } else {
                thirdchild.show();
                selectimg.css('background-position', '-77px -245px');
                $(this).find(".mclick_span").text(multilingual[leng].CollapseAll);
                $("i.g-arrow-i").css({
                    "border-color": "transparent transparent #56b282",
                    "top": "13px"
                });
                $(".mselect_img").addClass('opened');
            }
        } else {
            thirdchild.hide();
            selectimg.css('background-position', '-115px -245px');
            $(this).find(".mclick_span").text(multilingual[leng].ExpandAll);
            $("i.g-arrow-i").css({
                "border-color": "#56b282 transparent transparent",
                "top": "18px"
            });
            $(".mselect_img").removeClass('opened');
        }
    });

    // Webpage
    var webpage = "";
    webpage +=
        '<div class="popover bookmark layui-page-nav-child">' +
        '<div class="popover-child">' +
        '<div class="popover-title flex-between">' +
        '<div class="flex">' +
        '<div class="font-bold">'+ multilingual[leng].WebpageNavigation +'</div>' +
        '<ul class="nav-btns clearfix">' +
        '<li><span></span></li>' +
        '<li class="active"><span></span></li>' +
        '<li><span></span></li>' +
        '</ul>' +
        '</div>' +
        '<button type="button" class="close"><span aria-hidden="true"></span></button>' +
        '</div>' +
        '<div class="book-mark-body overflow_ul book-mark-center">' +
        '<div class="pic-list clearfix" style="width: 288px"></div>' +
        '</div>' +
        '</div>' +
        '</div>';
    $("#m-content").append(webpage);
    function PageNav(dt) {
        var str = "";
        if (dt.length == 0) {
            $(".nav-btns").hide();
            str += '<div style="float:none;color:#000000">' + multilingual[leng].EmptyWebPageNavigation + '</div>';
        } else {
            $(".nav-btns").show();
            dt.forEach((element, i) => {
                str += `<div><a href="javascript:;"><img src="${element}"></a><div class="page-nav-id">${i+1}</div></div>`
            });
        }
        return str;
    }
    function PageId(page) {
        $(".pic-list a").each(function(i) {
            var i = i + 1;
            if (i == page) {
                $(this).addClass("active");
                $(this).parent()[0].scrollIntoView(false);
            } else {
                $(this).removeClass("active");
            }
        });
    }
    function scrollPageNum(page, click) {
        $(".pic-list a").each(function(i) {
            if (page == (i + 1)) {
                $(this).addClass("active");
                if (click == "false") {
                    $(this).parent()[0].scrollIntoView(false);
                }
                var iframe = document.getElementById('childIframe');
                iframe.contentWindow.postMessage({ page_nav_click: "false" }, "*");
            } else {
                $(this).removeClass("active");
            }
        });
    }
    $(document).on('click', '.nav-btns li', function() {
        tab.call(this);
        $(this).parents(".layui-page-nav-child").find("li").each(function(k, v) {
            var k = k + 1;
            if (k == 1 && $(this).hasClass("active")) {
                $(this).parents(".layui-page-nav-child").find(".pic-list").css("width", "144px");
                SaveArrangement(k);
            } else if (k == 2 && $(this).hasClass("active")) {
                $(this).parents(".layui-page-nav-child").find(".pic-list").css("width", "288px");
                SaveArrangement(k);
            } else if (k == 3 && $(this).hasClass("active")) {
                $(this).parents(".layui-page-nav-child").find(".pic-list").css("width", "432px");
                SaveArrangement(k);
            }
        });
    });
    function SaveArrangement(k) {
        var tabName = System.operateState.getTabName(Report.report_id);
        var InitDetail = System.operateState.getInitDetailReport(Report.report_id);
        var InitOriginal = System.operateState.getInitViewOriginal(Report.report_id);
        if (tabName == '' || tabName == "DetailReport") {
            if (InitDetail == "word" || InitDetail == '') {
                System.operateState.savePageNavState(Report.report_id, k);
            } else {
                System.operateState.savePTPageNavState(Report.report_id, k);
            }
        } else {
            if (InitOriginal == "word" || InitOriginal == '') {
                System.operateState.saveOriPageNavState(Report.report_id, k);
            } else {
                System.operateState.saveOPTPageNavState(Report.report_id, k);
            }
        }
    }
    function GetArrangement() {
        var tabName = System.operateState.getTabName(Report.report_id);
        var InitDetail = System.operateState.getInitDetailReport(Report.report_id);
        var InitOriginal = System.operateState.getInitViewOriginal(Report.report_id);
        if (tabName == '' || tabName == "DetailReport") {
            if (InitDetail == "word" || InitDetail == '') {
                return System.operateState.getPageNavState(Report.report_id)
            } else {
                return System.operateState.getPTPageNavState(Report.report_id);
            }
        } else {
            if (InitOriginal == "word" || InitOriginal == '') {
                return System.operateState.getOriPageNavState(Report.report_id);
            } else {
                return System.operateState.getOPTPageNavState(Report.report_id);
            }
        }
    }
    $(document).delegate(".pic-list a", "click", function () {
        $(this).parents(".pic-list").find("a").removeClass("active");
        $(this).addClass("active");
        var EnterId = $(this).next(".page-nav-id").text();
        var obj = {
            EnterId: EnterId,
            page_nav_click: "true"
        }
        iframe.contentWindow.postMessage(obj, "*");
    });
    function GetPageNavState(num) {
        $(".layui-page-nav-child").find(".nav-btns li").each(function() {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
            }
        });
        if (num == "1") {
            $(".layui-page-nav-child").find(".nav-btns li:first-child").addClass("active");
            $(".layui-page-nav-child").find(".pic-list").css("width", "144px");
        } else if (num == "2" || num == "") {
            $(".layui-page-nav-child").find(".nav-btns li:nth-child(2)").addClass("active");
            $(".layui-page-nav-child").find(".pic-list").css("width", "288px");
        } else if (num == "3") {
            $(".layui-page-nav-child").find(".nav-btns li:last-child").addClass("active");
            $(".layui-page-nav-child").find(".pic-list").css("width", "432px");
        }
    }
    $("#m-nav a").click(function () {
        $(".popover").hide();
        $(".layui-page-nav-child").hide();
    });
    
    var iframe = document.getElementById('childIframe');
    var tab = System.Paper.tab();
    var textSectionSave = System.Paper.textSectionSave(null);
    $(function() {
        if("undefined" === typeof localStorage || "undefined" === typeof JSON) {
            $('body').append('<div class="alert-warning"><p>'+ multilingual[leng].SupportBrowser +'</p></div>');
        }
        $(document).on('click','[tab-a="ul"] .active_li',function(){
            tab.call(this);
        });

        var m_navchild = $("#detail_report").css("display");
        var o_navchild = $("#original_report").css("display");
        var n_navchild = $(".layui-page-nav-child").css("display");
        var obj = {
            child1: m_navchild,
            child2: o_navchild,
            child3: n_navchild,
            leng: leng,
        }
        $(".close").click(function () {
            $(".popover").hide();
            $(".layui-page-nav-child").hide();
            iframe.contentWindow.postMessage(obj, "*");
        })
        iframe.contentWindow.postMessage(obj, "*");

        $(document).on('click', '[tpl-section-save=btn]', function() {
            textSectionSave.call(this);
        });
        $(document).on('click', '[tpl-section-cancle=btn],[tpl-section-save=btn],.layui-layer-setwin', function() {
            $("#section-edit-modal").css("display", "none");
            $("#modify-document-modal").css("display", "none");
            $(".layui-layer").css("display", "none");
        });

        window.addEventListener("message", function (event) {
            $("#detail_report").css("display", event.data.state1);
            $("#original_report").css("display", event.data.state2);
            $(".layui-page-nav-child").css("display", event.data.navState);
            if (event.data.state1 == "block" || event.data.state2 == "block") {
                ListHeight();
            }
            if (event.data.navState == "block") {
                var html = PageNav(event.data.page_nav);
                $(".pic-list").html(html);
                GetPageNavState(GetArrangement());
                PageId(event.data.pageNum);
                ListHeight();
            }
            if (event.data.PageNum) {
                scrollPageNum(event.data.PageNum,event.data.page_nav_click);
            }
            if (event.data.section_edit) {
                $("#section-edit-modal").css("display", "block");
                $("#layui-layer-section").css("display", "block");
                var arr = JSON.parse(ReplaceString(section_edit_json));
                var id = event.data.section_edit.trim();
                $(".section-txt.section-txt-prev").text('');
                $.each(arr[id], function(i, value) {
                    if (value.score >= 0.4 && value.score < 0.7) {
                        var span = $('<span class="orange">' + value.content + '</span>');
                    } else if (value.score >= 0.7) {
                        var span = $('<span class="red">' + value.content + '</span>');
                    } else {
                        var span = $('<span>' + value.content + '</span>');
                    }
                    $(".section-txt.section-txt-prev").append(span);
                });
                $(".section-id").text(id);
                var textSectionEdit = System.Paper.textSectionEdit();
                textSectionEdit.call(this);
            }
            if (event.data.modify_document) {
                $("#modify-document-modal").css("display", "block");
                $("#layui-layer-document").css("display", "block");
                $("#modifyDocument").attr("src", "htmls/modify_document.html");
            }

        });
    });

    function BookmarkPosition(state) {
        var w = document.documentElement.clientWidth;
        if (state == "none") {
            $(".bookmark").css({
                "width": w * 0.29,
                "left": "auto",
                "right": "72px"
            });
        } else {
            $(".bookmark").css({
                "width": w * 0.29,
                "left": w * 0.7 - 30,
                "right": "auto"
            });
        }
    }
    
    ListHeight();
    function ListHeight() {
        var w = document.documentElement.clientWidth;
        var h = document.documentElement.clientHeight;
        var tabName = System.operateState.getTabName(Report.report_id);
        var FoldState = System.operateState.getFoldState(Report.report_id);
        var show = $('.paper-header').css('display');
        if (show == 'block') {
            $(".overflow_ul").css("height", h - 220);
        }
        if (show == 'none') {
            $(".overflow_ul").css("height", h - 120);
        }
        if (FoldState == "none" || tabName == "ViewOriginal") {
            $(".bookmark").css({
                "width": w * 0.29,
                "left": "auto",
                "right": "72px"
            });
        } else {
            $(".bookmark").css({
                "width": w * 0.29,
                "left": w * 0.7 - 30,
                "right": "auto"
            });
        }
    }

    $(window).resize(function () {
        NavList();
        ListHeight();
    });

})(Report, jQuery);