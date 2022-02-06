(function (System, $){
    $(function() {
        var DetailTypeOf = typeof isHasDetailReport;
        var isWord;
        if (DetailTypeOf == "boolean" && isHasDetailReport == true) {
            var WordReport = typeof isWordDetailReport;
            if (WordReport == "boolean" && isWordDetailReport == true) {
                var DetailNum = System.operateState.getDetailNum(Report.report_id);
                var DetailOffset = System.operateState.getDetailOffset(Report.report_id);
                var DetailSize = System.operateState.getDetailSize(Report.report_id);
                var ZoomBtnState = System.operateState.getZoomBtnState(Report.report_id);
                var LineState = System.operateState.getLineState(Report.report_id);
                isWord = true
            } else {
                var DetailNum = System.operateState.getPlainTextDetailNum(Report.report_id);
                var DetailOffset = System.operateState.getPlainTextDetailOffset(Report.report_id);
                var DetailSize = System.operateState.getPlainTextDetailSize(Report.report_id);
                var ZoomBtnState = System.operateState.getPlainTextZoomBtnState(Report.report_id);
                var LineState = System.operateState.getPlainTextLineState(Report.report_id);
                isWord = false
            }
        } else {
            var WordReport = typeof isWordOriginalReport;
            if (WordReport == "boolean" && isWordOriginalReport == true) {
                var OriginalNum = System.operateState.getOriginalNum(Report.report_id);
                var OriginalOffset = System.operateState.getOriginalOffset(Report.report_id);
                var OriginalSize = System.operateState.getOriginalSize(Report.report_id);
                var OriZoomBtnState = System.operateState.getOriZoomBtnState(Report.report_id);
                isWord = true
            } else {
                var OriginalNum = System.operateState.getPlainTextOriginalNum(Report.report_id);
                var OriginalOffset = System.operateState.getPlainTextOriginalOffset(Report.report_id);
                var OriginalSize = System.operateState.getPlainTextOriginalSize(Report.report_id);
                var OriZoomBtnState = System.operateState.getPlainTextOriZoomBtnState(Report.report_id);
                isWord = false
            }
        }

        // Multilingual
        var leng = System.operateState.getLanguage(Report.report_id);
        if (leng != '') {
            leng = typeof multilingual[leng] == "undefined" ? "English" : leng;
        } else {
            leng = typeof multilingual[user_language] == "undefined" ? "English" : user_language;;
        }
        SwitchMultilingual(leng);
        function SwitchMultilingual(leng) {
            $('*[data-lang]').each(function () {
                var name = $(this).data().lang;
                $(this).html(multilingual[leng][name]);
            });
        }
        parent.postMessage("get_language", "*");
        parent.parent.postMessage("get_language", "*");

        // PageNum
        var PageNumber = `<span class="pageNum">1</span><span class="partition">/</span><span class="totalPage"></span>`;
        $(".top_Num").html(PageNumber);
        var totalPage = $(".upkmzjakmc").length;
        $(".totalPage").text(totalPage);
        $(".top_Num").show();

        if (DetailTypeOf == "boolean" && isHasDetailReport == true) {
            parentWidth(DetailSize ? DetailSize : 1);
            AddH(DetailSize ? DetailSize : 1);
            FunPage(DetailNum, DetailOffset);
            size = (DetailSize ? DetailSize : 1);
            ZoomState(ZoomBtnState, isWordDetailReport);
        } else {
            parentWidth(OriginalSize ? OriginalSize : 1);
            AddH(OriginalSize ? OriginalSize : 1);
            FunPage(OriginalNum, OriginalOffset);
            size = (OriginalSize ? OriginalSize : 1);
            ZoomState(OriZoomBtnState, isWordOriginalReport);
        }
        function FunPage(PageNum, OffsetTop) {
            if (PageNum == "" || PageNum == "null") {
                $(".pageNum").text(1);
                $(".input_pageNum").val(1);
            } else {
                $(".pageNum").text(PageNum);
                $(".input_pageNum").val(PageNum);
                $("#toall_Num").attr("href", "#" + PageNum);
                $("body").scrollTop(OffsetTop);
            }
        }
        function ZoomState(state, isWord) {
            if (isWord) {
                if (state == "" || state == "block") {
                    $(".allButton").hide();
                    $(".CollagenButton").hide();
                    $("#menuButton").css("background", "#323639");
                } else {
                    $(".allButton").show();
                    $(".CollagenButton").show();
                    $("#menuButton").css("background", "#1b1e1f");
                }
            } else {
                if (state == "" || state == "block") {
                    $(".allButton").hide();
                    $(".CollagenButton").hide();
                    $("#menuButton").css("background", "#f2f2f2");
                } else {
                    $(".allButton").show();
                    $(".CollagenButton").show();
                    $("#menuButton").css("background", "#f2f2f2");
                }
            }
        }

        // scroll
        var nowPage = 1;
        function scrollFunc() {
            var offsetH = $("body").scrollTop();
            var scrollH = -15;
            $('.upkmzjakmc').each(function(k, v) {
                var PageH = $(this)[0].getBoundingClientRect().height + 15;
                if (scrollH < offsetH && offsetH <= (scrollH + PageH)) {
                    nowPage = k + 1;
                }
                scrollH += PageH;
            });
            $('.pageNum').text(nowPage);
            $(".input_pageNum").val(nowPage);
            $("#toall_Num").attr("href", "#" + nowPage);
        }
        function parentWidth(size) {
            _Size = Math.round(size * 100) / 100;
            percent = Math.round(_Size * 100);
            if (percent == "") {
                $(".percent_num").text(100);
            } else {
                $(".percent_num").text(percent);
            }
            $(".upkmzjakmc").css("transform", "scale(" + _Size + ")");
            if (_Size < 1) {
                $(".upkmzjakmc").css("transform-origin", "left top");
            } else {
                $(".upkmzjakmc").css("transform-origin", "center top");
            }
            if (nowPage != undefined) {
                $(".jump_page").attr("href", "#" + nowPage);
            }
            $('.upkmzjakmc').each(function(k, v) {
                var pageW = ($(this)[0].getBoundingClientRect().width) + 30;
                var pageH = ($(this)[0].getBoundingClientRect().height) + 15;
                $(this).parent(".jcjymywwzd").css("width", pageW);
                $(this).parent(".jcjymywwzd").css("height", pageH);
            });
            $("body").off("scroll").on("scroll", function() {
                scrollFunc(_Size);
                var offsetTop = $("body").scrollTop();
                var Page = nowPage;
                var obj = {
                    PageNum: Page,
                    page_nav_click: page_nav_click
                }
                parent.parent.postMessage(obj, "*");
                if (DetailTypeOf == "boolean" && isHasDetailReport == true) {
                    if (isWord) {
                        System.operateState.saveDetailNum(Report.report_id, Page);
                        System.operateState.saveDetailOffset(Report.report_id, offsetTop);
                    } else {
                        System.operateState.savePlainTextDetailNum(Report.report_id, Page);
                        System.operateState.savePlainTextDetailOffset(Report.report_id, offsetTop);
                    }
                } else {
                    if (isWord) {
                        System.operateState.saveOriginalNum(Report.report_id, Page);
                        System.operateState.saveOriginalOffset(Report.report_id, offsetTop);
                    } else {
                        System.operateState.savePlainTextOriginalNum(Report.report_id, Page);
                        System.operateState.savePlainTextOriginalOffset(Report.report_id, offsetTop);
                    }
                }
            });
            var PageSize = _Size;
            if (DetailTypeOf == "boolean" && isHasDetailReport == true) {
                if (isWord) {
                    System.operateState.saveDetailSize(Report.report_id, PageSize);
                } else {
                    System.operateState.savePlainTextDetailSize(Report.report_id, PageSize);
                }
            } else {
                if (isWord) {
                    System.operateState.saveOriginalSize(Report.report_id, PageSize);
                } else {
                    System.operateState.savePlainTextOriginalSize(Report.report_id, PageSize);
                }
            }
        }

        // mouse
        $(".toall_div").mousemove(function() {
            if (isWord) {
                $(this).css({
                    "background-color": "#424649",
                    "border-radius": "2px"
                });
            } else {
                $(this).css({
                    "border": "1px solid #dbdbdb",
                    "background-color": "#fbfbfb"
                });
            }
            $(this).children(".tip").css("display", "block");
        }).mouseout(function() {
            if (isWord) {
                $(this).css("background-color", "transparent");
            } else {
                $(this).css({
                    "background-color": "transparent",
                    "border": "1px solid transparent"
                });
            }
            $(this).children(".tip").css("display", "none");
        });

        // switch
        $(".Switch").click(function() {
            $(".layui-layer-shade").show();
            $(".layui-layer-title").html(multilingual[leng].SwitchMode);
            $(".detail_btn").data('type', 'switch');
            if (isWord) {
                $(".layui-layer-content").html(multilingual[leng].TextMode);
            } else {
                $(".layui-layer-content").html(multilingual[leng].WordMode);
            }
        });
        $(".detail_btn").click(function () { 
            type = $(this).data('type');
			if (type == 'switch') {
				$(".layui-layer-btn0").attr("href", $(this).data('txtLink'));
                if (DetailTypeOf == "boolean" && isHasDetailReport == true) {
                    if (isWord) {
                        System.operateState.saveInitDetailReport(Report.report_id, "text");
                        parent.postMessage("switch-detail-text", "*");
                        parent.parent.postMessage("switch-detail-text", "*");
                    } else {
                        System.operateState.saveInitDetailReport(Report.report_id, "word");
                        parent.postMessage("switch-detail-word", "*");
                        parent.parent.postMessage("switch-detail-word", "*");
                    }
                } else {
                    if (isWord) {
                        parent.postMessage("switch-original-text", "*");
                    } else {
                        parent.postMessage("switch-original-word", "*");
                    }
                }
			}
            if (type == 'subline') {
                var has_red = $("span").hasClass("red");
			    var has_orange = $("span").hasClass("orange");
                if (has_red == false && has_orange == false) {
                    AuxiliaryLine('');
                } else {
                    var has_Class = $(".red").parent().eq(0).hasClass('red_a') || $(".orange").parent().eq(0).hasClass('orange_a');
				    var str_has = String(has_Class);
                    AuxiliaryLine(str_has);
                    if (isWord) {
                        System.operateState.saveLineState(Report.report_id, str_has);
                    } else {
                        System.operateState.savePlainTextLineState(Report.report_id, str_has);
                    }
                }
            }
        });
        $(".layui-layer-close, .layui-layer-btn1, .layui-layer-btn0").click(function(){
            $(".layui-layer-shade").hide();
        });

        // AuxiliaryLine
        $(".subline").click(function() {
            $(".layui-layer-shade").show();
            $(".layui-layer-title").html(multilingual[leng].AuxiliaryLine);
            $(".detail_btn").data('type', 'subline');
            if ($(".red").parent().eq(0).hasClass('red_a') || $(".orange").parent().eq(0).hasClass('orange_a')) {
                $(".layui-layer-content").html(multilingual[leng].CancelLine);
            } else {
                $(".layui-layer-content").html(multilingual[leng].UseLine);
            }
            curHref = $(".detail_btn").attr("href");
            if (curHref != '#') {
				$(".detail_btn").data('txtLink', $(".detail_btn").attr("href"));
				$(".layui-layer-btn0").attr("href", "#");
			}
        });
        function AuxiliaryLine(state) {
            if (state == '' || state == 'true') {
                $(".red").parent().removeClass('red_a');
				$(".orange").parent().removeClass('orange_a');
                if (isWord) {
                    $(".subline").css("background-position", "-106px -162px");
                } else {
                    $(".subline").css("background-position","-161px -9px");
                }
            } else {
                $(".red").parent().addClass('red_a');
				$(".orange").parent().addClass('orange_a');
                if (isWord) {
                    $(".subline").css("background-position", "-146px -159px");
                } else {
                    $(".subline").css("background-position","-43px -153px");
                }
            }
        }
        AuxiliaryLine(LineState);
        
        // updown
        $(".bottom").click(function() {
            $(".bottom_a").attr("href", "#" + (nowPage + 1));
            $("#toall_Num").attr("href", "#" + (nowPage + 1));
        });
        $(".top").click(function() {
            $(".top_a").attr("href", "#" + (nowPage - 1));
            $("#toall_Num").attr("href", "#" + (nowPage - 1));
        });

        // input
        $(".input_pageNum").focus(function() {
            if (isWord) {
                $(".input_pageNum").css("background-color", "#424649");
            } else {
                $(".input_pageNum").css("background-color", "#fbfbfb");
            }
            $(".input_pageNum").select();
        }).blur(function() {
            $(".input_pageNum").css("background-color", "transparent");
            page1 = $(".input_pageNum").val();
            if (page1 <= totalPage && /^[1-9]\d*$/.test(page1)) {
                $("#toall_Num").attr("href", "#" + page1);
            } else {
                $(".input_pageNum").val(nowPage);
            }
        }).mousemove(function() {
            if (isWord) {
                $(".input_pageNum").css("background-color", "#424649");
            } else {
                $(".input_pageNum").css("background-color", "#fbfbfb"); 
            }
            $(this).siblings(".tip").css("display", "block");
        }).mouseout(function() {
            if ($('.input_pageNum').is(':focus')) {
                if (isWord) {
                    $(".input_pageNum").css("background-color", "#424649");
                } else {
                    $(".input_pageNum").css("background-color", "#fbfbfb");
                    $(this).siblings(".tip").css("display", "none");
                }
            } else {
                $(".input_pageNum").css("background-color", "transparent");
                $(this).siblings(".tip").css("display", "none");
            }
        }).keyup(function() {
            if (event.keyCode == 13) {
                page1 = $(".input_pageNum").val();
                if (page1 <= totalPage && /^[1-9]\d*$/.test(page1)) {
                    $("#toall_Num").attr("href", "#" + page1);
                    window.location.hash = "#" + page1;
                } else {
                    $(".input_pageNum").val(nowPage);
                    $(".input_pageNum").blur();
                }
            }
        });

        // fold
        var FoldState = System.operateState.getFoldState(Report.report_id);
        foldFunc(FoldState);
        function foldFunc(isFold) {
            if (isFold == '' || isFold == 'block') {
                $('.btn_fold_left').css("display", "none");
                $('.btn_fold_right').css("display", "block");
            } else {
                $('.btn_fold_left').css("display", "block");
                $('.btn_fold_right').css("display", "none");
            }
            var obj = { FoldState: isFold }
            parent.postMessage(obj, "*");
            parent.parent.postMessage(obj, "*");
            System.operateState.saveFoldState(Report.report_id, isFold);
        }
        $(".btn_fold").click(function() {
            var fold = $('.btn_fold_left').css('display');
            _size = System.operateState.getDetailSize(Report.report_id);
            foldFunc(fold);
            AddH(_size);
        });
        var isHas = hasScrollbar();
        if (isHas) {
            var width = getScrollbarWidth();
            $('.btn_fold').css("right", width + 'px');
            $("body").css("border-right", "0");
            $(".fixed_shadow").css("width", "calc(100% - " + width +"px)");
        } else {
            $('.btn_fold').css("right", 0 + 'px');
            $("body").css("border-right", "1px solid #e8e8e8");
            $(".fixed_shadow").css("width", "100%");
        }

        // scale
        $("#originalButton").on("click", function() {
            $(".zoom-shade").show();
            size = 1;
            _size = size;
            parentWidth(_size);
            AddH(_size);
            HideShade();
        });
        $("#fitPageButton").click(function() {
            $(".zoom-shade").show();
            var fitPage_h = $("body")[0].getBoundingClientRect().height;
            size = (fitPage_h - 20) / minHeight;
            _size = size;
            parentWidth(_size);
            AddH(_size);
            HideShade();
        });
        $("#fitWidthButton").click(function() {
            $(".zoom-shade").show();
            var fitWidth_w = $("body")[0].getBoundingClientRect().width;
            size = (fitWidth_w - 163) / minWidth;
            if (size > 2.0) {
                size = 2.0;
            };
            _size = size;
            parentWidth(_size);
            AddH(_size);
            HideShade();
        });
        function roundFun(value, n) {
            return Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
        }
        var percent;
        $("#zoomOutButton").click(function() {
            $(".zoom-shade").show();
            if (percent % 10 == 0 && size <= 2.0) {
                size += 0.1;
            }
            if (percent % 10 >= 5 && size <= 2.0) {
                size = roundFun(percent / 100, 1);
            }
            if (percent % 10 < 5 && size <= 2.0) {
                size = roundFun(percent / 100, 1) + 0.1;
            }
            if (size > 2.0) {
                size = 2.0;
            }
            _size = size;
            parentWidth(_size);
            AddH(_size);
            HideShade();
        });
        $("#zoomInButton").click(function() {
            $(".zoom-shade").show();
            if (percent % 10 == 0 && size >= 0.1) {
                size -= 0.1;
            } else if (percent % 10 >= 5 && size >= 0.1) {
                size = roundFun(percent / 100, 1) - 0.1;
            } else if (percent % 10 < 5 && size >= 0.1) {
                size = roundFun(percent / 100, 1);
            }
            if (size < 0.1) {
                size = 0.1;
            }
            _size = size;
            parentWidth(_size);
            AddH(_size);
            HideShade();
        });
        $(".allButton").mousemove(function() {
            if (isWord) {
                $(this).css("background", "#1b1e1f");
            } else {
                $(this).css("background-image", "-webkit-linear-gradient( 90deg, rgb(216,216,216) 0%, rgb(239,239,239) 100%)");
            }
            $(this).children(".bot_tip").css("display", "block");
        }).mouseout(function() {
            if (isWord) {
                $(this).css("background", "#323639");
            } else {
                $(this).css("background", "#f2f2f2");
            }
            $(this).children(".bot_tip").css("display", "none");
        });
        $("#menuButton").click(function(){
            var showState = $(".allButton").css("display");
            $(".percent_list").hide();
            if (isWord) {
                $("#CollagenButton").css("background", "#323639");
            } else {
                $("#CollagenButton").css("background", "#f2f2f2");
            }
            if (DetailTypeOf == "boolean" && isHasDetailReport == true) {
                if (isWord) {
                    System.operateState.saveZoomBtnState(Report.report_id, showState);
                } else {
                    System.operateState.savePlainTextZoomBtnState(Report.report_id, showState);
                }
            } else {
                if (isWord) {
                    System.operateState.saveOriZoomBtnState(Report.report_id, showState);
                } else {
                    System.operateState.savePlainTextOriZoomBtnState(Report.report_id, showState);
                }
            }
            if (showState == "block") {
                $(".allButton").hide();
                $(".CollagenButton").hide();
                if (isWord) {
                    $("#menuButton").css("background", "#323639");
                } else {
                    $("#menuButton").css("background", "#f2f2f2");
                }
            } else {
                $(".allButton").show();
                $(".CollagenButton").show();
                if (isWord) {
                    $("#menuButton").css("background", "#1b1e1f");
                }
            }
        }).mousemove(function() {
            if (isWord) {
                $("#menuButton").css("background", "#1b1e1f");
            }
            $(this).children(".menu_tip").css("display", "block");
        }).mouseout(function() {
            $(this).children(".menu_tip").css("display", "none");
            if ($(".allButton").css("display") == "block") {
                if (isWord) {
                    $("#menuButton").css("background", "#1b1e1f");
                }
            } else {
                if (isWord) {
                    $("#menuButton").css("background", "#323639");
                } else {
                    $("#menuButton").css("background", "#f2f2f2");
                }
            }
        });
        $("#CollagenButton").click(function(e) {
            var listState = $(".percent_list").css("display");
            if (listState == "block") {
                $(".percent_list").hide();
                $(this).children(".percent_tip").css("display", "block");
            } else {
                $(".percent_list").show();
                if (isWord) {
                    $("#CollagenButton").css("background", "#1b1e1f");
                } else {
                    $("#CollagenButton").css("background-image", "-webkit-linear-gradient( 90deg, rgb(224,224,224) 0%, rgb(170,170,170) 170%)");
                }
            }
            $(this).children(".percent_tip").css("display", "none");
            e.stopPropagation();
        }).mousemove(function() {
            if (isWord) {
                $("#CollagenButton").css("background", "#1b1e1f");
            } else {
                $("#CollagenButton").css("background-image", "-webkit-linear-gradient( 90deg, rgb(224,224,224) 0%, rgb(170,170,170) 170%)");
            }
            if ($(".percent_list").css("display") == "block") {
                $(this).children(".percent_tip").css("display", "none");
            } else {
                $(this).children(".percent_tip").css("display", "block");
            }
        }).mouseout(function() {
            if ($(".percent_list").css("display") == "block") {
                if (isWord) {
                    $("#CollagenButton").css("background", "#1b1e1f");
                } else {
                    $("#CollagenButton").css("background-image", "-webkit-linear-gradient( 90deg, rgb(224,224,224) 0%, rgb(170,170,170) 170%)");
                }
            } else {
                if (isWord) {
                    $("#CollagenButton").css("background", "#323639"); 
                } else {
                    $("#CollagenButton").css("background", "#f2f2f2");
                }
            }
            $(this).children(".percent_tip").css("display", "none");
        });
        $(document).click(function() {
            $(".percent_list").hide();
            if (isWord) {
                $("#CollagenButton").css("background", "#323639");
            } else {
                $("#CollagenButton").css("background", "#f2f2f2");
            }
        });
        $(".zoom-shade").click(function(e) {
            var listState = $(".percent_list").css("display");
            if (listState == "block") {
                $(".percent_list").show();
            } else {
                $(".percent_list").hide();
            }
            e.stopPropagation();
        });
        $(".percent_li").click(function(e) {
            $(".zoom-shade").show();
            var liTxt = $(this).children(".li_text").text();
            size = liTxt / 100;
            _size = size;
            parentWidth(_size);
            AddH(_size);
            HideShade();
            e.stopPropagation();
        }).mousemove(function() {
            if (isWord) {
                $(this).css("background", "#1b1e1f")
            } else {
                $(this).css("background", "#e9e9e9");
            }
        }).mouseout(function() {
            if (isWord) {
                $(this).css("background", "#323639");
            } else {
                $(this).css("background", "#f2f2f2");
            }
        });
        function HideShade() {
            setTimeout(function() {
                $(".zoom-shade").hide();
            }, 200);
        }

        // similar
        function ReplaceString(data) {
            return JSON.stringify(JSON.parse(data)).replace(/</g,"&lt;").replace(/>/g,"&gt;");
        }
        var arr = JSON.parse(ReplaceString(detail_title_info));
        if (DetailTypeOf == "boolean" && isHasDetailReport == true) {
            $("#mbxsgxktna a[target='right']").mouseover(function() {
                var similarHtml = `<div class="similarTip"><div>${multilingual[leng].Similarity}: <span class="num"></span>%</div></div>`;
                var tip = `<div>${multilingual[leng].SimilarityTip} !</div>`;
                $('#mbxsgxktna').append(similarHtml);
                var a_Href = $(this).data().id;
                $(this).parent().css("z-index", "");
                var FoldState = System.operateState.getFoldState(Report.report_id);
                if (FoldState == 'none') {
                    $(".similarTip").append(tip);
                }
                $("div[class='similarTip'] .num").html(arr[a_Href].score);
            }).mouseout(function() {
                $("div[class='similarTip']").remove();
            }).mousemove(function(eve) {
                var e = eve || window.event;
                var w = document.documentElement.clientWidth;
                var h = document.documentElement.clientHeight;
                var top = e.clientY + 20;
                var left = e.clientX + 20;
                if (w - e.clientX < 120) {
                    left = e.clientX - 100;
                }
                if (h - e.clientY < 70) {
                    top = e.clientY - 50;
                }
                $("div[class='similarTip']").css({ "left": left + "px", "top": top + "px" });
            }).click(function() {
                var FoldState = System.operateState.getFoldState(Report.report_id);
                if (FoldState == 'none') {
                    return false;
                }
            });
        }

        $(document).on('click', '.edit_icon', function() {
            var id = $(this).prev().text();
            var obj = { "section_edit": id };
            parent.parent.postMessage(obj, "*");
        });

        $(document).on('click', '.modify_document', function() {
            var obj = { "modify_document": true }
            parent.parent.postMessage(obj, "*");
        });

        var page_nav_click = "false";
        window.addEventListener("message", function(event) {
            if (event.data.EnterId) {
                window.location.hash = "#" + event.data.EnterId;
            }
            if (event.data.page_nav_click) {
                page_nav_click = event.data.page_nav_click;
            }
            if (event.data.leng) {
                leng = event.data.leng;
                SwitchMultilingual(leng);
                System.operateState.saveLanguage(Report.report_id, leng);
            }
        });

        if (DetailTypeOf == "boolean" && isHasDetailReport == true) {
            parent.parent.postMessage("Page_Loading", "*");
        } else {
            parent.postMessage("Page_Loading", "*");
        }
    });
})(Report, jQuery);

function hasScrollbar() {
    return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
}
function getScrollbarWidth() {
    var scrollDiv = document.createElement("div");
    scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
    document.body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
}

var arrW = new Array();
var arrH = new Array();
$('.upkmzjakmc').each(function(k, v) {
    arrW.push($(this).width());
    arrH.push($(this).height());
});
function getMaxCountWidth(arr) {
    var mp = new Array();
    for (var idx in arr) {
        var item = arr[idx];
        var count = 0;
        if (!mp.hasOwnProperty(item)) {
            mp[item] = 1;
        } else {
            count = mp[item];
            count = count + 1;
            mp[item] = count;
        }
    };
    var maxCount = 0;
    var width = 0;
    for (var key in mp) {
        var val = mp[key];
        if (val >= maxCount) {
            maxCount = val;
            if (width == 0) {
                width = key;
            } else if (key > width) {
                width = key;
            }
        }
    };
    return width;
}
function getMaxCountHeight(arr) {
    var mp = new Array();
    for (var idx in arr) {
        var item = arr[idx];
        var count = 0;
        if (!mp.hasOwnProperty(item)) {
            mp[item] = 1;
        } else {
            count = mp[item];
            count = count + 1;
            mp[item] = count;
        }
    };
    var maxCount = 0;
    var height = 0;
    for (var key in mp) {
        var val = mp[key];
        if (val >= maxCount) {
            maxCount = val;
            if (height == 0) {
                height = key;
            } else if (key < height) {
                height = key;
            }
        }
    }
    return height;
}
var minWidth = getMaxCountWidth(arrW);
var minHeight = getMaxCountHeight(arrH);
var size = 1;
var _size;
function AddH(size) {
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    var last_h = $(".upkmzjakmc:last")[0].getBoundingClientRect().height + 30;
    var AddH = h - last_h;
    if (last_h >= h) {
        $("#Add_height").css("height", 0);
    } else {
        $("#Add_height").css("height", AddH);
    }
    var mWidth = minWidth * size;
    var topNumWidth = $(".top_Num").width() + 25;
    var right = (w - mWidth) / 2;
    if (mWidth <= 500) {
        right = right - topNumWidth;
    } else if (mWidth >= (w - 105)) {
        right = 77;
    } else {
        right = right + 15;
    }
    $(".top_Num").css("right", right);
}
$(window).resize(function() {
    AddH(size);
    var isHas = hasScrollbar();
    if (isHas) {
        var width = getScrollbarWidth();
        $('.btn_fold').css("right", width + 'px');
        $("body").css("border-right", "0");
    } else {
        $('.btn_fold').css("right", 0 + 'px');
        $("body").css("border-right", "1px solid #e8e8e8");
    }
});