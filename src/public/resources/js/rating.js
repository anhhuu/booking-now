(window.jQuery)(function(n) {
    "use strict";
    n.fn.ratingLocales = {};
    var t, r, u, e, o, i, f;
    t = function(t, i) {
        return null === t || void 0 === t || 0 === t.length || i && "" === n.trim(t)
    };
    r = function(n, t) {
        return n ? " " + t : ""
    };
    u = function(n, t) {
        n.removeClass(t).addClass(t)
    };
    e = function(n) {
        var t = ("" + n).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
        return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0
    };
    o = function(n, t) {
        return parseFloat(n.toFixed(t))
    };
    i = function(n, t, i, r) {
        var u = r ? t : t.split(" ").join(".rating ") + ".rating";
        n.off(u).on(u, i)
    };
    (f = function(t, i) {
        var r = this;
        r.$element = n(t);
        r._init(i)
    }).prototype = {
        constructor: f,
        _parseAttr: function(n, i) {
            var o, f, r, u, e = this.$element,
                s = e.attr("type");
            if ("range" === s || "number" === s) {
                switch (f = i[n] || e.data(n) || e.attr(n), n) {
                    case "min":
                        r = 0;
                        break;
                    case "max":
                        r = 5;
                        break;
                    default:
                        r = .5
                }
                o = t(f) ? r : f;
                u = parseFloat(o)
            } else u = parseFloat(i[n]);
            return isNaN(u) ? r : u
        },
        _setDefault: function(n, i) {
            var r = this;
            t(r[n]) && (r[n] = i)
        },
        _listenClick: function(n, t) {
            if (n.stopPropagation(), n.preventDefault(), !0 === n.handled) return !1;
            t(n);
            n.handled = !0
        },
        _starClick: function(n) {
            var i, t = this;
            t._listenClick(n, function(n) {
                if (t.inactive) return !1;
                i = t._getTouchPosition(n);
                t._setStars(i);
                t.$element.trigger("change").trigger("rating.change", [t.$element.val(), t._getCaption()]);
                t.starClicked = !0
            })
        },
        _starMouseMove: function(n) {
            var r, i, t = this;
            !t.hoverEnabled || t.inactive || n && n.isDefaultPrevented() || (t.starClicked = !1, r = t._getTouchPosition(n), i = t.calculate(r), t._toggleHover(i), t.$element.trigger("rating.hover", [i.val, i.caption, "stars"]))
        },
        _starMouseLeave: function(n) {
            var i, t = this;
            !t.hoverEnabled || t.inactive || t.starClicked || n && n.isDefaultPrevented() || (i = t.cache, t._toggleHover(i), t.$element.trigger("rating.hoverleave", ["stars"]))
        },
        _clearClick: function(n) {
            var t = this;
            t._listenClick(n, function() {
                t.inactive || (t.clear(), t.clearClicked = !0)
            })
        },
        _clearMouseMove: function(n) {
            var r, i, u, t = this;
            !t.hoverEnabled || t.inactive || !t.hoverOnClear || n && n.isDefaultPrevented() || (t.clearClicked = !1, r = '<span class="' + t.clearCaptionClass + '">' + t.clearCaption + "<\/span>", i = t.clearValue, u = {
                caption: r,
                width: t.getWidthFromValue(i) || 0,
                val: i
            }, t._toggleHover(u), t.$element.trigger("rating.hover", [i, r, "clear"]))
        },
        _clearMouseLeave: function(n) {
            var i, t = this;
            !t.hoverEnabled || t.inactive || t.clearClicked || !t.hoverOnClear || n && n.isDefaultPrevented() || (i = t.cache, t._toggleHover(i), t.$element.trigger("rating.hoverleave", ["clear"]))
        },
        _resetForm: function(n) {
            var t = this;
            n && n.isDefaultPrevented() || t.inactive || t.reset()
        },
        _setTouch: function(n, i) {
            var u, o, e, f, s, h, c, r = this;
            ("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch) && !r.inactive && (u = n.originalEvent, o = t(u.touches) ? u.changedTouches : u.touches, e = r._getTouchPosition(o[0]), i ? (r._setStars(e), r.$element.trigger("change").trigger("rating.change", [r.$element.val(), r._getCaption()]), r.starClicked = !0) : (s = (f = r.calculate(e)).val <= r.clearValue ? r.fetchCaption(r.clearValue) : f.caption, h = r.getWidthFromValue(r.clearValue), c = f.val <= r.clearValue ? h + "%" : f.width, r._setCaption(s), r.$filledStars.css("width", c)))
        },
        _initTouch: function(n) {
            var t = this,
                i = "touchend" === n.type;
            t._setTouch(n, i)
        },
        _initSlider: function(n) {
            var i = this;
            t(i.$element.val()) && i.$element.val(0);
            i.initialValue = i.$element.val();
            i._setDefault("min", i._parseAttr("min", n));
            i._setDefault("max", i._parseAttr("max", n));
            i._setDefault("step", i._parseAttr("step", n));
            (isNaN(i.min) || t(i.min)) && (i.min = 0);
            (isNaN(i.max) || t(i.max)) && (i.max = 5);
            (isNaN(i.step) || t(i.step) || 0 === i.step) && (i.step = .5);
            i.diff = i.max - i.min
        },
        _initHighlight: function(n) {
            var i, t = this,
                r = t._getCaption();
            n || (n = t.$element.val());
            i = t.getWidthFromValue(n) + "%";
            t.$filledStars.width(i);
            t.cache = {
                caption: r,
                width: i,
                val: n
            }
        },
        _getContainerCss: function() {
            var n = this;
            return "rating-container" + r(n.theme, "theme-" + n.theme) + r(n.rtl, "rating-rtl") + r(n.size, "rating-" + n.size) + r(n.animate, "rating-animate") + r(n.disabled || n.readonly, "rating-disabled") + r(n.containerClass, n.containerClass)
        },
        _checkDisabled: function() {
            var n = this,
                i = n.$element,
                t = n.options;
            n.disabled = void 0 === t.disabled ? i.attr("disabled") || !1 : t.disabled;
            n.readonly = void 0 === t.readonly ? i.attr("readonly") || !1 : t.readonly;
            n.inactive = n.disabled || n.readonly;
            i.attr({
                disabled: n.disabled,
                readonly: n.readonly
            })
        },
        _addContent: function(n, t) {
            var r = this,
                i = r.$container,
                u = "clear" === n;
            return r.rtl ? u ? i.append(t) : i.prepend(t) : u ? i.prepend(t) : i.append(t)
        },
        _generateRating: function() {
            var r, i, f, t = this,
                e = t.$element;
            i = t.$container = n(document.createElement("div")).insertBefore(e);
            u(i, t._getContainerCss());
            t.$rating = r = n(document.createElement("div")).attr("class", "rating").appendTo(i).append(t._getStars("empty")).append(t._getStars("filled"));
            t.$emptyStars = r.find(".empty-stars");
            t.$filledStars = r.find(".filled-stars");
            t._renderCaption();
            t._renderClear();
            t._initHighlight();
            i.append(e);
            t.rtl && (f = Math.max(t.$emptyStars.outerWidth(), t.$filledStars.outerWidth()), t.$emptyStars.width(f))
        },
        _getCaption: function() {
            var n = this;
            return n.$caption && n.$caption.length ? n.$caption.html() : n.defaultCaption
        },
        _setCaption: function(n) {
            var t = this;
            t.$caption && t.$caption.length && t.$caption.html(n)
        },
        _renderCaption: function() {
            var r, t = this,
                f = t.$element.val(),
                i = t.captionElement ? n(t.captionElement) : "";
            if (t.showCaption) {
                if (r = t.fetchCaption(f), i && i.length) return u(i, "caption"), i.html(r), void(t.$caption = i);
                t._addContent("caption", '<div class="caption">' + r + "<\/div>");
                t.$caption = t.$container.find(".caption")
            }
        },
        _renderClear: function() {
            var r, t = this,
                i = t.clearElement ? n(t.clearElement) : "";
            if (t.showClear) {
                if (r = t._getClearClass(), i.length) return u(i, r), i.attr({
                    title: t.clearButtonTitle
                }).html(t.clearButton), void(t.$clear = i);
                t._addContent("clear", '<div class="' + r + '" title="' + t.clearButtonTitle + '">' + t.clearButton + "<\/div>");
                t.$clear = t.$container.find("." + t.clearButtonBaseClass)
            }
        },
        _getClearClass: function() {
            return this.clearButtonBaseClass + " " + (this.inactive ? "" : this.clearButtonActiveClass)
        },
        _getTouchPosition: function(n) {
            return (t(n.pageX) ? n.originalEvent.touches[0].pageX : n.pageX) - this.$rating.offset().left
        },
        _toggleHover: function(n) {
            var i, r, u, t = this;
            n && (t.hoverChangeStars && (i = t.getWidthFromValue(t.clearValue), r = n.val <= t.clearValue ? i + "%" : n.width, t.$filledStars.css("width", r)), t.hoverChangeCaption && (u = n.val <= t.clearValue ? t.fetchCaption(t.clearValue) : n.caption) && t._setCaption(u + ""))
        },
        _init: function(t) {
            var i = this,
                r = i.$element.addClass("hide");
            return i.options = t, n.each(t, function(n, t) {
                i[n] = t
            }), (i.rtl || "rtl" === r.attr("dir")) && (i.rtl = !0, r.attr("dir", "rtl")), i.starClicked = !1, i.clearClicked = !1, i._initSlider(t), i._checkDisabled(), i.displayOnly && (i.inactive = !0, i.showClear = !1, i.showCaption = !1), i._generateRating(), i._listen(), r.removeClass("rating-loading")
        },
        _listen: function() {
            var t = this,
                f = t.$element,
                e = f.closest("form"),
                r = t.$rating,
                u = t.$clear;
            return i(r, "touchstart touchmove touchend", n.proxy(t._initTouch, t)), i(r, "click touchstart", n.proxy(t._starClick, t)), i(r, "mousemove", n.proxy(t._starMouseMove, t)), i(r, "mouseleave", n.proxy(t._starMouseLeave, t)), t.showClear && u.length && (i(u, "click touchstart", n.proxy(t._clearClick, t)), i(u, "mousemove", n.proxy(t._clearMouseMove, t)), i(u, "mouseleave", n.proxy(t._clearMouseLeave, t))), e.length && i(e, "reset", n.proxy(t._resetForm, t)), f
        },
        _getStars: function(n) {
            for (var i = this, r = '<span class="' + n + '-stars">', t = 1; t <= i.stars; t++) r += '<span class="star">' + i[n + "Star"] + "<\/span>";
            return r + "<\/span>"
        },
        _setStars: function(n) {
            var t = this,
                i = arguments.length ? t.calculate(n) : t.calculate(),
                r = t.$element;
            return r.val(i.val), t.$filledStars.css("width", i.width), t._setCaption(i.caption), t.cache = i, r
        },
        showStars: function(n) {
            var t = this,
                i = parseFloat(n);
            return t.$element.val(isNaN(i) ? t.clearValue : i), t._setStars()
        },
        calculate: function(n) {
            var i = this,
                f = t(i.$element.val()) ? 0 : i.$element.val(),
                r = arguments.length ? i.getValueFromPosition(n) : f,
                e = i.fetchCaption(r),
                u = i.getWidthFromValue(r);
            return u += "%", {
                caption: e,
                width: u,
                val: r
            }
        },
        getValueFromPosition: function(n) {
            var i, r, t = this,
                u = e(t.step),
                f = t.$rating.width();
            return r = t.diff * n / (f * t.step), r = t.rtl ? Math.floor(r) : Math.ceil(r), i = o(parseFloat(t.min + r * t.step), u), i = Math.max(Math.min(i, t.max), t.min), t.rtl ? t.max - i : i
        },
        getWidthFromValue: function(n) {
            var f, i, r = this,
                t = r.min,
                u = r.max,
                e = r.$emptyStars;
            return !n || n <= t || t === u ? 0 : (i = e.outerWidth(), f = i ? e.width() / i : 1, n >= u ? 100 : (n - t) * f * 100 / (u - t))
        },
        fetchCaption: function(n) {
            var c, l, u, f, a, r = this,
                i = parseFloat(n) || r.clearValue,
                s = r.starCaptions,
                h = r.starCaptionClasses;
            return i && i !== r.clearValue && (i = o(i, e(r.step))), f = "function" == typeof h ? h(i) : h[i], u = "function" == typeof s ? s(i) : s[i], l = t(u) ? r.defaultCaption.replace(/\{rating}/g, i) : u, c = t(f) ? r.clearCaptionClass : f, a = i === r.clearValue ? r.clearCaption : l, '<span class="' + c + '">' + a + "<\/span>"
        },
        destroy: function() {
            var i = this,
                r = i.$element;
            return t(i.$container) || i.$container.before(r).remove(), n.removeData(r.get(0)), r.off("rating").removeClass("hide")
        },
        create: function(n) {
            var t = this,
                i = n || t.options || {};
            return t.destroy().rating(i)
        },
        clear: function() {
            var n = this,
                t = '<span class="' + n.clearCaptionClass + '">' + n.clearCaption + "<\/span>";
            return n.inactive || n._setCaption(t), n.showStars(n.clearValue).trigger("change").trigger("rating.clear")
        },
        reset: function() {
            var n = this;
            return n.showStars(n.initialValue).trigger("rating.reset")
        },
        update: function(n) {
            var t = this;
            return arguments.length ? t.showStars(n) : t.$element
        },
        refresh: function(t) {
            var i = this,
                r = i.$element;
            return t ? i.destroy().rating(n.extend(!0, i.options, t)).trigger("rating.refresh") : r
        }
    };
    n.fn.rating = function(i) {
        var u = Array.apply(null, arguments),
            r = [];
        switch (u.shift(), this.each(function() {
            var h, o = n(this),
                e = o.data("rating"),
                c = "object" == typeof i && i,
                s = c.language || o.data("language") || "en",
                l = {};
            e || ("en" === s || t(n.fn.ratingLocales[s]) || (l = n.fn.ratingLocales[s]), h = n.extend(!0, {}, n.fn.rating.defaults, n.fn.ratingLocales.en, l, c, o.data()), e = new f(this, h), o.data("rating", e));
            "string" == typeof i && r.push(e[i].apply(e, u))
        }), r.length) {
            case 0:
                return this;
            case 1:
                return void 0 === r[0] ? this : r[0];
            default:
                return r
        }
    };
    n.fn.rating.defaults = {
        theme: "",
        language: "en",
        stars: 5,
        filledStar: '<i class="glyphicon glyphicon-star"><\/i>',
        emptyStar: '<i class="glyphicon glyphicon-star-empty"><\/i>',
        containerClass: "",
        size: "md",
        animate: !0,
        displayOnly: !1,
        rtl: !1,
        showClear: !0,
        showCaption: !0,
        starCaptionClasses: {
            .5: "label label-danger",
            1: "label label-danger",
            1.5: "label label-warning",
            2: "label label-warning",
            2.5: "label label-info",
            3: "label label-info",
            3.5: "label label-primary",
            4: "label label-primary",
            4.5: "label label-success",
            5: "label label-success"
        },
        clearButton: '<i class="glyphicon glyphicon-minus-sign"><\/i>',
        clearButtonBaseClass: "clear-rating",
        clearButtonActiveClass: "clear-rating-active",
        clearCaptionClass: "label label-default",
        clearValue: null,
        captionElement: null,
        clearElement: null,
        hoverEnabled: !0,
        hoverChangeCaption: !0,
        hoverChangeStars: !0,
        hoverOnClear: !0
    };
    n.fn.ratingLocales.en = {
        defaultCaption: "{rating} Stars",
        starCaptions: {
            .5: "Half Star",
            1: "One Star",
            1.5: "One & Half Star",
            2: "Two Stars",
            2.5: "Two & Half Stars",
            3: "Three Stars",
            3.5: "Three & Half Stars",
            4: "Four Stars",
            4.5: "Four & Half Stars",
            5: "Five Stars"
        },
        clearButtonTitle: "Clear",
        clearCaption: "Not Rated"
    };
    n.fn.rating.Constructor = f;
    n(document).ready(function() {
        var i = n("input.rating"),
            t;
        i.length && i.removeClass("rating-loading").addClass("rating-loading").rating();
        t = n("input.rating-usd");
        t.length && t.removeClass("rating-loading").addClass("rating-loading").rating({
            filledStar: '<i class="glyphicon glyphicon-usd"><\/i>',
            emptyStar: '<i class="glyphicon glyphicon-usd"><\/i>'
        })
    })
});