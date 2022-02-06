/**
 * Created by web on 21/5/13.
 */

if (!GRN_P) { var GRN_P = 'Report'; }
(function (global, namespace, factory, undefined) {
    'use strice';
    global[namespace] = factory(global, namespace);
})(typeof window !== "undefined" ? window : this, GRN_P, function(W, namespace, undefined) {
    'use strice';
    return {};
});

(function(System, $) {
    var __this__ = null;

    function isset(s) {
        return (typeof s !== "undefined" && s !== null);
    }
    var cache = [],
        cache_name = 'cache',
        myStorage = null;

    function isStorage() {
        if (typeof(myStorage) !== "undefined") {
            return true;
        } else {
            return false;
        }
    }

    function set(value, name) {
        value = value || cache;
        name = name || cache_name;
        if (isStorage()) {
            remove();
            myStorage.setItem(name, JSON.stringify(value));
        }
    }

    function remove(name) {
        name = name || cache_name;
        if (isStorage()) {
            myStorage.removeItem(name);
        }
    }

    function clear() {
        if (isStorage()) {
            myStorage.clear();
        } else {
            cache = [];
        }

    }

    function get(name) {
        name = name || cache_name;
        if (isStorage()) {
            return (JSON.parse(myStorage.getItem(name))) || cache;
        } else {
            return cache;
        }

    }

    function Cache(name, type) {
        __this__ = this;
        this.caches = [];
        cache_name = name || 'cache';
        this.cache_name = cache_name;
        this.myStorage = type || localStorage;
    }

    Cache.prototype = {
        'constructor': Cache,
        '_className': 'Cache',
        'init': function() {
            myStorage = this.myStorage;
            cache_name = this.cache_name;
            cache = get();
        },
        'cache': function(key, value, callback) {
            this.init();
            cache = get();
            var index = this.exist(key, value);
            if ($.isFunction(callback)) {
                callback.call(this, index);
            }
            return index;
        },
        'set': function(Obj, key, value) {
            this.init();
            Obj[key] = value;
            cache.push(Obj);
            set();

        },
        'update': function(index, Obj) {
            this.init();
            cache[index] = Obj;
            set();
        },
        'get': function(index) {
            this.init();
            return isset(index) ? cache[index] : cache;
        },
        'exist': function(key, value) {
            this.init();
            for (var i = 0, len = cache.length; i < len; i++) {
                if ((key in cache[i]) && (value == cache[i][key])) {
                    return i;
                }
            }
            return -1;
        },
        'clear': function() {
            this.init();
            this.remove();
            clear();
        },
        'remove': function(index) {
            this.init();
            if (index) {
                if (index > -1 && index < cache.length - 1) {
                    cache.splice(index, 1);
                    // delete cache[index];
                }
            } else {
                cache = [];
            }
            set();
        }
    };
    System.Cache = Cache;
})(Report, jQuery);

(function (System, $){
    'use strict';
    var storage = window.localStorage;

    function getObj(id) {
        id = id + '_s';
        var obj = JSON.parse(storage.getItem(id));
        return obj;
    }

    function setObj(id, obj) {
        id = id + '_s';
        storage.setItem(id, JSON.stringify(obj));
    }

    function operateState() {}

    operateState.saveId = function(id) {
        var defaults = {
            Language: '',
            ALink: 'htmls/detail_report.html',
            HeaderState: '',
            InitDetailReport: '',
            DetailNum: '',
            DetailOffset: '',
            FoldState: '',
            LineState: '',
            TabName: '',
            DetailSize: '',
            DetailPageNav: '',
            ZoomBtnState: '',
            PageNavState: '',
            InitViewOriginal: '',
            OriginalNum: '',
            OriginalOffset: '',
            OriginalSize: '',
            OriginalPageNav: '',
            OriginalTopNum: '',
            OriZoomBtnState: '',
            OriPageNavState: '',
            PlainTextLineState: '',
            PlainTextDetailNum: '',
            PlainTextDetailOffset: '',
            PlainTextDetailSize: '',
            PlainTextZoomBtnState: '',
            PTPageNavState: '',
            PlainTextOriginalNum: '',
            PlainTextOriginalOffset: '',
            PlainTextOriginalSize: '',
            PlainTextOriginalTopNum: '',
            PlainTextOriZoomBtnState: '',
            OPTPageNavState: '',
        }
        id = id + '_s';
        if (storage.getItem(id) == null) {
            storage.setItem(id, JSON.stringify(defaults));
        } else {
            return;
        }
    }

    operateState.saveLanguage = function(id, leng) {
        var obj = getObj(id);
        obj.Language = leng;
        setObj(id, obj);
    }
    operateState.getLanguage = function(id) {
        var obj = getObj(id);
        return obj.Language;
    }

    operateState.saveALink = function(id, link) {
        var obj = getObj(id);
        obj.ALink = link;
        setObj(id, obj);
    }
    operateState.getALink = function(id) {
        var obj = getObj(id);
        return obj.ALink;
    }

    operateState.saveTabName = function(id, name) {
        var obj = getObj(id);
        obj.TabName = name;
        setObj(id, obj);
    }
    operateState.getTabName = function(id) {
        var obj = getObj(id);
        return obj.TabName;
    }

    operateState.saveHeaderState = function(id, show) {
        var obj = getObj(id);
        obj.HeaderState = show;
        setObj(id, obj);
    }
    operateState.getHeaderState = function(id) {
        var obj = getObj(id);
        return obj.HeaderState;
    }

    operateState.saveFoldState = function(id, show) {
        var obj = getObj(id);
        obj.FoldState = show;
        setObj(id, obj);
    }
    operateState.getFoldState = function(id) {
        var obj = getObj(id);
        return obj.FoldState;
    }

    operateState.saveInitDetailReport = function(id, page) {
        var obj = getObj(id);
        obj.InitDetailReport = page;
        setObj(id, obj);
    };
    operateState.getInitDetailReport = function(id) {
        var obj = getObj(id);
        return obj.InitDetailReport;
    }

    operateState.saveDetailNum = function(id, num) {
        var obj = getObj(id);
        obj.DetailNum = num;
        setObj(id, obj);
    }
    operateState.getDetailNum = function(id) {
        var obj = getObj(id);
        return obj.DetailNum;
    }

    operateState.saveDetailOffset = function(id, offsetTop) {
        var obj = getObj(id);
        obj.DetailOffset = offsetTop;
        setObj(id, obj);
    }
    operateState.getDetailOffset = function(id) {
        var obj = getObj(id);
        return obj.DetailOffset;
    }
    
    operateState.saveLineState = function(id, show) {
        var obj = getObj(id);
        obj.LineState = show;
        setObj(id, obj);
    }
    operateState.getLineState = function(id) {
        var obj = getObj(id);
        return obj.LineState;
    }

    operateState.saveDetailSize = function(id, size) {
        var obj = getObj(id);
        obj.DetailSize = size;
        setObj(id, obj);
    }
    operateState.getDetailSize = function(id) {
        var obj = getObj(id);
        return obj.DetailSize;
    }

    operateState.saveDetailPageNav = function(id, num) {
        var obj = getObj(id);
        obj.DetailPageNav = num;
        setObj(id, obj);
    }
    operateState.getDetailPageNav = function(id) {
        var obj = getObj(id);
        return obj.DetailPageNav;
    }
    
    operateState.saveZoomBtnState = function(id, show) {
        var obj = getObj(id);
        obj.ZoomBtnState = show;
        setObj(id, obj);
    }
    operateState.getZoomBtnState = function(id) {
        var obj = getObj(id);
        return obj.ZoomBtnState;
    }

    operateState.savePageNavState = function(id, num) {
        var obj = getObj(id);
        obj.PageNavState = num;
        setObj(id, obj);
    }
    operateState.getPageNavState = function(id) {
        var obj = getObj(id);
        return obj.PageNavState;
    }

    operateState.saveInitViewOriginal = function(id, page) {
        var obj = getObj(id);
        obj.InitViewOriginal = page;
        setObj(id, obj);
    }
    operateState.getInitViewOriginal = function(id) {
        var obj = getObj(id);
        return obj.InitViewOriginal;
    }

    operateState.saveOriginalNum = function(id, num) {
        var obj = getObj(id);
        obj.OriginalNum = num;
        setObj(id, obj);
    }
    operateState.getOriginalNum = function(id) {
        var obj = getObj(id);
        return obj.OriginalNum;
    }

    operateState.saveOriginalOffset = function(id, offsetTop) {
        var obj = getObj(id);
        obj.OriginalOffset = offsetTop;
        setObj(id, obj);
    }
    operateState.getOriginalOffset = function(id) {
        var obj = getObj(id);
        return obj.OriginalOffset;
    }

    operateState.saveOriginalSize = function(id, size) {
        var obj = getObj(id);
        obj.OriginalSize = size;
        setObj(id, obj);
    }
    operateState.getOriginalSize = function(id) {
        var obj = getObj(id);
        return obj.OriginalSize;
    }

    operateState.saveOriginalPageNav = function(id, num) {
        var obj = getObj(id);
        obj.OriginalPageNav = num;
        setObj(id, obj);
    }
    operateState.getOriginalPageNav = function(id) {
        var obj = getObj(id);
        return obj.OriginalPageNav;
    }

    operateState.saveOriginalTopNum = function(id, num) {
        var obj = getObj(id);
        obj.OriginalTopNum = num;
        setObj(id, obj);
    }
    operateState.getOriginalTopNum = function(id) {
        var obj = getObj(id);
        return obj.OriginalTopNum;
    }
    
    operateState.saveOriZoomBtnState = function(id, show) {
        var obj = getObj(id);
        obj.OriZoomBtnState = show;
        setObj(id, obj);
    }
    operateState.getOriZoomBtnState = function(id) {
        var obj = getObj(id);
        return obj.OriZoomBtnState;
    }

    operateState.saveOriPageNavState = function(id, num) {
        var obj = getObj(id);
        obj.OriPageNavState = num;
        setObj(id, obj);
    }
    operateState.getOriPageNavState = function(id) {
        var obj = getObj(id);
        return obj.OriPageNavState;
    }

    operateState.savePlainTextLineState = function(id, show) {
        var obj = getObj(id);
        obj.PlainTextLineState = show;
        setObj(id, obj);
    }
    operateState.getPlainTextLineState = function(id) {
        var obj = getObj(id);
        return obj.PlainTextLineState;
    }

    operateState.savePlainTextDetailNum = function(id, num) {
        var obj = getObj(id);
        obj.PlainTextDetailNum = num;
        setObj(id, obj);
    }
    operateState.getPlainTextDetailNum = function(id) {
        var obj = getObj(id);
        return obj.PlainTextDetailNum;
    }

    operateState.savePlainTextDetailOffset = function(id, num) {
        var obj = getObj(id);
        obj.PlainTextDetailOffset = num;
        setObj(id, obj);
    }
    operateState.getPlainTextDetailOffset = function(id) {
        var obj = getObj(id);
        return obj.PlainTextDetailOffset;
    }
    
    operateState.savePlainTextDetailSize = function(id, num) {
        var obj = getObj(id);
        obj.PlainTextDetailSize = num;
        setObj(id, obj);
    }
    operateState.getPlainTextDetailSize = function(id) {
        var obj = getObj(id);
        return obj.PlainTextDetailSize;
    }
    
    operateState.savePlainTextZoomBtnState = function(id, show) {
        var obj = getObj(id);
        obj.PlainTextZoomBtnState = show;
        setObj(id, obj);
    }
    operateState.getPlainTextZoomBtnState = function(id) {
        var obj = getObj(id);
        return obj.PlainTextZoomBtnState;
    }

    operateState.savePTPageNavState = function(id, num) {
        var obj = getObj(id);
        obj.PTPageNavState = num;
        setObj(id, obj);
    }
    operateState.getPTPageNavState = function(id) {
        var obj = getObj(id);
        return obj.PTPageNavState;
    }

    operateState.savePlainTextOriginalNum = function(id, num) {
        var obj = getObj(id);
        obj.PlainTextOriginalNum = num;
        setObj(id, obj);
    }
    operateState.getPlainTextOriginalNum = function(id) {
        var obj = getObj(id);
        return obj.PlainTextOriginalNum;
    }

    operateState.savePlainTextOriginalOffset = function(id, num) {
        var obj = getObj(id);
        obj.PlainTextOriginalOffset = num;
        setObj(id, obj);
    }
    operateState.getPlainTextOriginalOffset = function(id) {
        var obj = getObj(id);
        return obj.PlainTextOriginalOffset;
    }
    
    operateState.savePlainTextOriginalSize = function(id, num) {
        var obj = getObj(id);
        obj.PlainTextOriginalSize = num;
        setObj(id, obj);
    }
    operateState.getPlainTextOriginalSize = function(id) {
        var obj = getObj(id);
        return obj.PlainTextOriginalSize;
    }
    
    operateState.savePlainTextOriginalTopNum = function(id, num) {
        var obj = getObj(id);
        obj.PlainTextOriginalTopNum = num;
        setObj(id, obj);
    }
    operateState.getPlainTextOriginalTopNum = function(id) {
        var obj = getObj(id);
        return obj.PlainTextOriginalTopNum;
    }
    
    operateState.savePlainTextOriZoomBtnState = function(id, show) {
        var obj = getObj(id);
        obj.PlainTextOriZoomBtnState = show;
        setObj(id, obj);
    }
    operateState.getPlainTextOriZoomBtnState = function(id) {
        var obj = getObj(id);
        return obj.PlainTextOriZoomBtnState;
    }

    operateState.saveOPTPageNavState = function(id, num) {
        var obj = getObj(id);
        obj.OPTPageNavState = num;
        setObj(id, obj);
    }
    operateState.getOPTPageNavState = function(id) {
        var obj = getObj(id);
        return obj.OPTPageNavState;
    }

    System.operateState = operateState;
})(Report, jQuery);

(function (System, $){
    'use strict';
    var cache = null;

    function getCache() {
        if (!cache) { cache = new System.Cache(System.report_id, localStorage); }
    }

    function Paper() {}

    Paper.sectionEdit = function(D) {
        getCache();
        var defaults = {
            //"btn":"[tpl-section=btn]",
            "textWarp": "[tpl-section=warp]",
            "text": "[tpl-section=text]",
            "badge": "[tpl-section=badge]",
            "box": "[tpl-section=box]",
            "textarea": "[tpl-section=textarea]",
            "template": 'script[type="text/html"][template="section"]'
        };
        D = $.isPlainObject(D) ? $.extend(defaults, D) : defaults;
        var old_dom = null;
        return function() {
            //if(old_dom === this){return;}
            old_dom = this;
            var text = "";
            var $this = $(this);
            var $warp = $this.closest(D.textWarp);
            var id = $warp.find(D.badge).data('id');
            var $text = $warp.find(D.text);
            var $box = $warp.find(D.box);
            $box.html($(D.template).html());
            var $textarea = $warp.find(D.textarea);
            cache.cache('id', id, function(index) {
                if (-1 === index) {
                    text = $text.text();
                } else {
                    var Obj = cache.get(index);
                    text = Obj.text;

                }
                $textarea.val($.trim(text));
                $textarea.text($textarea.val()).focus();
            });
        }
    }

    Paper.textSectionEdit = function() {
        getCache();
        return function() {
            var text = "";
            var id = $(".section-id").text();
            var $textarea = $(".section-txt.section-txt-next");
            $textarea.text('');
            var arr = JSON.parse(section_edit_json);
            $.each(arr[id], function(index, value) {
                text += value.content;
            });
            cache.cache('id', id, function(index) {
                if (-1 === index) {
                    text = text;
                } else {
                    var Obj = cache.get(index);
                    text = Obj.text;
                }
                $textarea.val($.trim(text));
                $textarea.html($textarea.val());
            })
        }
    }

    Paper.sectionSave = function(D) {
        getCache();
        var defaults = {
            'warp': '[tpl-section="warp"]',
            'box': '[tpl-section="box"]',
            'badge': '[tpl-section="badge"]',
            'textarea': '[tpl-section="textarea"]'
        };
        D = $.isPlainObject(D) ? $.extend(defaults, D) : defaults;
        var old_dom = null;
        return function() {
            //if(old_dom === this){return;}
            var $warp = $(this).closest(D.warp);
            var text = $warp.find(D.textarea).val();
            text = $.trim(text);
            var id = $warp.find(D.badge).data('id');
            cache.cache('id', id, function(index) {
                if (-1 === index) {
                    cache.set({ 'text': text }, 'id', id);
                } else {
                    cache.update(index, { 'id': id, 'text': text });
                }
            });
            $warp.find(D.box).html('');
        }
    }

    Paper.textSectionSave = function() {
        getCache();
        return function() {
            var $this = $(this);
            var id = $this.parents('#layui-layer-section').find('.section-id').text();
            var text = $(".section-txt.section-txt-next").val();
            text = $.trim(text);
            cache.cache('id', id, function(index) {
                if (-1 === index) {
                    cache.set({ 'text': text }, 'id', id);
                } else {
                    cache.update(index, { 'id': id, 'text': text });
                }
            });
        }
    }

    Paper.tab = function() {
        var old_dom = null;
        return function(D) {
            if (old_dom === this) { return; }
            var defaults = {
                "li": "li",
                "section": '[tab="section"]',
                "active": 'active',
                "callback": function() {}
            };
            D = $.isPlainObject(D) ? $.extend(defaults, D) : defaults;
            old_dom = this;
            var $this = $(this);
            $this.parent().find(D.li).removeClass(D.active);
            $this.addClass(D.active);
            var id = $this.data('id');
            if (!id) { return; }
            var ids = id.toString().split(',');
            var $section = $(D.section);
            $section.hide();
            $section.each(function() {
                var $this = $(this);
                var id = $this.data('id');
                if ($.inArray(id.toString(), ids) !== -1) {
                    D.callback.call(this);
                    $this.show();
                }
            })

        }
    }

    Paper.toggle = function(show_fn, hide_fn) {
        var $section = $(this).closest('[eve-toggle=warp]').find('[eve-toggle=section]');
        if ($section.css("display") === "none") {
            if ($.isFunction(show_fn)) { show_fn(); }
            $section.show();
        } else {
            if ($.isFunction(hide_fn)) { hide_fn(); }
            $section.hide();
        }
    }

    System.Paper = Paper;
})(Report, jQuery);
