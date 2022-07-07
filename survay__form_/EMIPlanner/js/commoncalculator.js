var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(t) {
        var e, i, s, n, o, r, a, l = "", h = 0;
        for (t = Base64._utf8_encode(t); h < t.length; )
            e = t.charCodeAt(h++),
            i = t.charCodeAt(h++),
            s = t.charCodeAt(h++),
            n = e >> 2,
            o = (3 & e) << 4 | i >> 4,
            r = (15 & i) << 2 | s >> 6,
            a = 63 & s,
            isNaN(i) ? r = a = 64 : isNaN(s) && (a = 64),
            l = l + this._keyStr.charAt(n) + this._keyStr.charAt(o) + this._keyStr.charAt(r) + this._keyStr.charAt(a);
        return l
    },
    decode: function(t) {
        var e, i, s, n, o, r, a, l = "", h = 0;
        for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); h < t.length; )
            n = this._keyStr.indexOf(t.charAt(h++)),
            o = this._keyStr.indexOf(t.charAt(h++)),
            r = this._keyStr.indexOf(t.charAt(h++)),
            a = this._keyStr.indexOf(t.charAt(h++)),
            e = n << 2 | o >> 4,
            i = (15 & o) << 4 | r >> 2,
            s = (3 & r) << 6 | a,
            l += String.fromCharCode(e),
            64 != r && (l += String.fromCharCode(i)),
            64 != a && (l += String.fromCharCode(s));
        return l = Base64._utf8_decode(l)
    },
    _utf8_encode: function(t) {
        t = t.replace(/\r\n/g, "\n");
        for (var e = "", i = 0; i < t.length; i++) {
            var s = t.charCodeAt(i);
            128 > s ? e += String.fromCharCode(s) : s > 127 && 2048 > s ? (e += String.fromCharCode(s >> 6 | 192),
            e += String.fromCharCode(63 & s | 128)) : (e += String.fromCharCode(s >> 12 | 224),
            e += String.fromCharCode(s >> 6 & 63 | 128),
            e += String.fromCharCode(63 & s | 128))
        }
        return e
    },
    _utf8_decode: function(t) {
        for (var e = "", i = 0, s = c1 = c2 = 0; i < t.length; )
            s = t.charCodeAt(i),
            128 > s ? (e += String.fromCharCode(s),
            i++) : s > 191 && 224 > s ? (c2 = t.charCodeAt(i + 1),
            e += String.fromCharCode((31 & s) << 6 | 63 & c2),
            i += 2) : (c2 = t.charCodeAt(i + 1),
            c3 = t.charCodeAt(i + 2),
            e += String.fromCharCode((15 & s) << 12 | (63 & c2) << 6 | 63 & c3),
            i += 3);
        return e
    }
};
!function(t) {
    function e(t, e) {
        if (!(t.originalEvent.touches.length > 1)) {
            t.preventDefault();
            var i = t.originalEvent.changedTouches[0]
              , s = document.createEvent("MouseEvents");
            s.initMouseEvent(e, !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null),
            t.target.dispatchEvent(s)
        }
    }
    if (t.support.touch = "ontouchend"in document,
    t.support.touch) {
        var i, s = t.ui.mouse.prototype, n = s._mouseInit, o = s._mouseDestroy;
        s._touchStart = function(t) {
            var s = this;
            !i && s._mouseCapture(t.originalEvent.changedTouches[0]) && (i = !0,
            s._touchMoved = !1,
            e(t, "mouseover"),
            e(t, "mousemove"),
            e(t, "mousedown"))
        }
        ,
        s._touchMove = function(t) {
            i && (this._touchMoved = !0,
            e(t, "mousemove"))
        }
        ,
        s._touchEnd = function(t) {
            i && (e(t, "mouseup"),
            e(t, "mouseout"),
            this._touchMoved || e(t, "click"),
            i = !1)
        }
        ,
        s._mouseInit = function() {
            var e = this;
            e.element.bind({
                touchstart: t.proxy(e, "_touchStart"),
                touchmove: t.proxy(e, "_touchMove"),
                touchend: t.proxy(e, "_touchEnd")
            }),
            n.call(e)
        }
        ,
        s._mouseDestroy = function() {
            var e = this;
            e.element.unbind({
                touchstart: t.proxy(e, "_touchStart"),
                touchmove: t.proxy(e, "_touchMove"),
                touchend: t.proxy(e, "_touchEnd")
            }),
            o.call(e)
        }
    }
}(jQuery),
!function(t, e) {
    function i() {
        return new Date(Date.UTC.apply(Date, arguments))
    }
    function s() {
        var t = new Date;
        return i(t.getFullYear(), t.getMonth(), t.getDate())
    }
    function n(t, e) {
        return t.getUTCFullYear() === e.getUTCFullYear() && t.getUTCMonth() === e.getUTCMonth() && t.getUTCDate() === e.getUTCDate()
    }
    function o(t) {
        return function() {
            return this[t].apply(this, arguments)
        }
    }
    function r(e, i) {
        function s(t, e) {
            return e.toLowerCase()
        }
        var n, o = t(e).data(), r = {}, a = new RegExp("^" + i.toLowerCase() + "([A-Z])");
        i = new RegExp("^" + i.toLowerCase());
        for (var l in o)
            i.test(l) && (n = l.replace(a, s),
            r[n] = o[l]);
        return r
    }
    function a(e) {
        var i = {};
        if (g[e] || (e = e.split("-")[0],
        g[e])) {
            var s = g[e];
            return t.each(f, function(t, e) {
                e in s && (i[e] = s[e])
            }),
            i
        }
    }
    var l = function() {
        var e = {
            get: function(t) {
                return this.slice(t)[0]
            },
            contains: function(t) {
                for (var e = t && t.valueOf(), i = 0, s = this.length; s > i; i++)
                    if (this[i].valueOf() === e)
                        return i;
                return -1
            },
            remove: function(t) {
                this.splice(t, 1)
            },
            replace: function(e) {
                e && (t.isArray(e) || (e = [e]),
                this.clear(),
                this.push.apply(this, e))
            },
            clear: function() {
                this.length = 0
            },
            copy: function() {
                var t = new l;
                return t.replace(this),
                t
            }
        };
        return function() {
            var i = [];
            return i.push.apply(i, arguments),
            t.extend(i, e),
            i
        }
    }()
      , h = function(e, i) {
        this._process_options(i),
        this.dates = new l,
        this.viewDate = this.o.defaultViewDate,
        this.focusDate = null,
        this.element = t(e),
        this.isInline = !1,
        this.isInput = this.element.is("input"),
        this.component = this.element.hasClass("date") ? this.element.find(".add-on, .input-group-addon, .btn") : !1,
        this.hasInput = this.component && this.element.find("input").length,
        this.component && 0 === this.component.length && (this.component = !1),
        this.picker = t(m.template),
        this._buildEvents(),
        this._attachEvents(),
        this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu"),
        this.o.rtl && this.picker.addClass("datepicker-rtl"),
        this.viewMode = this.o.startView,
        this.o.calendarWeeks && this.picker.find("tfoot .today, tfoot .clear").attr("colspan", function(t, e) {
            return parseInt(e) + 1
        }),
        this._allow_update = !1,
        this.setStartDate(this._o.startDate),
        this.setEndDate(this._o.endDate),
        this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled),
        this.setDatesDisabled(this.o.datesDisabled),
        this.fillDow(),
        this.fillMonths(),
        this._allow_update = !0,
        this.update(),
        this.showMode(),
        this.isInline && this.show()
    };
    h.prototype = {
        constructor: h,
        _process_options: function(n) {
            this._o = t.extend({}, this._o, n);
            var o = this.o = t.extend({}, this._o)
              , r = o.language;
            switch (g[r] || (r = r.split("-")[0],
            g[r] || (r = p.language)),
            o.language = r,
            o.startView) {
            case 2:
            case "decade":
                o.startView = 2;
                break;
            case 1:
            case "year":
                o.startView = 1;
                break;
            default:
                o.startView = 0
            }
            switch (o.minViewMode) {
            case 1:
            case "months":
                o.minViewMode = 1;
                break;
            case 2:
            case "years":
                o.minViewMode = 2;
                break;
            default:
                o.minViewMode = 0
            }
            o.startView = Math.max(o.startView, o.minViewMode),
            o.multidate !== !0 && (o.multidate = Number(o.multidate) || !1,
            o.multidate !== !1 && (o.multidate = Math.max(0, o.multidate))),
            o.multidateSeparator = String(o.multidateSeparator),
            o.weekStart %= 7,
            o.weekEnd = (o.weekStart + 6) % 7;
            var a = m.parseFormat(o.format);
            if (o.startDate !== -1 / 0 && (o.startDate = o.startDate ? o.startDate instanceof Date ? this._local_to_utc(this._zero_time(o.startDate)) : m.parseDate(o.startDate, a, o.language) : -1 / 0),
            1 / 0 !== o.endDate && (o.endDate = o.endDate ? o.endDate instanceof Date ? this._local_to_utc(this._zero_time(o.endDate)) : m.parseDate(o.endDate, a, o.language) : 1 / 0),
            o.daysOfWeekDisabled = o.daysOfWeekDisabled || [],
            t.isArray(o.daysOfWeekDisabled) || (o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/)),
            o.daysOfWeekDisabled = t.map(o.daysOfWeekDisabled, function(t) {
                return parseInt(t, 10)
            }),
            o.datesDisabled = o.datesDisabled || [],
            !t.isArray(o.datesDisabled)) {
                var l = [];
                l.push(m.parseDate(o.datesDisabled, a, o.language)),
                o.datesDisabled = l
            }
            o.datesDisabled = t.map(o.datesDisabled, function(t) {
                return m.parseDate(t, a, o.language)
            });
            var h = String(o.orientation).toLowerCase().split(/\s+/g)
              , c = o.orientation.toLowerCase();
            if (h = t.grep(h, function(t) {
                return /^auto|left|right|top|bottom$/.test(t)
            }),
            o.orientation = {
                x: "auto",
                y: "auto"
            },
            c && "auto" !== c)
                if (1 === h.length)
                    switch (h[0]) {
                    case "top":
                    case "bottom":
                        o.orientation.y = h[0];
                        break;
                    case "left":
                    case "right":
                        o.orientation.x = h[0]
                    }
                else
                    c = t.grep(h, function(t) {
                        return /^left|right$/.test(t)
                    }),
                    o.orientation.x = c[0] || "auto",
                    c = t.grep(h, function(t) {
                        return /^top|bottom$/.test(t)
                    }),
                    o.orientation.y = c[0] || "auto";
            if (o.defaultViewDate) {
                var d = o.defaultViewDate.year || (new Date).getFullYear()
                  , u = o.defaultViewDate.month || 0
                  , f = o.defaultViewDate.day || 1;
                o.defaultViewDate = i(d, u, f)
            } else
                o.defaultViewDate = s();
            o.showOnFocus = o.showOnFocus !== e ? o.showOnFocus : !0
        },
        _events: [],
        _secondaryEvents: [],
        _applyEvents: function(t) {
            for (var i, s, n, o = 0; o < t.length; o++)
                i = t[o][0],
                2 === t[o].length ? (s = e,
                n = t[o][1]) : 3 === t[o].length && (s = t[o][1],
                n = t[o][2]),
                i.on(n, s)
        },
        _unapplyEvents: function(t) {
            for (var i, s, n, o = 0; o < t.length; o++)
                i = t[o][0],
                2 === t[o].length ? (n = e,
                s = t[o][1]) : 3 === t[o].length && (n = t[o][1],
                s = t[o][2]),
                i.off(s, n)
        },
        _buildEvents: function() {
            var e = {
                keyup: t.proxy(function(e) {
                    -1 === t.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) && this.update()
                }, this),
                keydown: t.proxy(this.keydown, this)
            };
            this.o.showOnFocus === !0 && (e.focus = t.proxy(this.show, this)),
            this.isInput ? this._events = [[this.element, e]] : this.component && this.hasInput ? this._events = [[this.element.find("input"), e], [this.component, {
                click: t.proxy(this.show, this)
            }]] : this.element.is("div") ? this.isInline = !0 : this._events = [[this.element, {
                click: t.proxy(this.show, this)
            }]],
            this._events.push([this.element, "*", {
                blur: t.proxy(function(t) {
                    this._focused_from = t.target
                }, this)
            }], [this.element, {
                blur: t.proxy(function(t) {
                    this._focused_from = t.target
                }, this)
            }]),
            this._secondaryEvents = [[this.picker, {
                click: t.proxy(this.click, this)
            }], [t(window), {
                resize: t.proxy(this.place, this)
            }], [t(document), {
                "mousedown touchstart": t.proxy(function(t) {
                    this.element.is(t.target) || this.element.find(t.target).length || this.picker.is(t.target) || this.picker.find(t.target).length || this.hide()
                }, this)
            }]]
        },
        _attachEvents: function() {
            this._detachEvents(),
            this._applyEvents(this._events)
        },
        _detachEvents: function() {
            this._unapplyEvents(this._events)
        },
        _attachSecondaryEvents: function() {
            this._detachSecondaryEvents(),
            this._applyEvents(this._secondaryEvents)
        },
        _detachSecondaryEvents: function() {
            this._unapplyEvents(this._secondaryEvents)
        },
        _trigger: function(e, i) {
            var s = i || this.dates.get(-1)
              , n = this._utc_to_local(s);
            this.element.trigger({
                type: e,
                date: n,
                dates: t.map(this.dates, this._utc_to_local),
                format: t.proxy(function(t, e) {
                    0 === arguments.length ? (t = this.dates.length - 1,
                    e = this.o.format) : "string" == typeof t && (e = t,
                    t = this.dates.length - 1),
                    e = e || this.o.format;
                    var i = this.dates.get(t);
                    return m.formatDate(i, e, this.o.language)
                }, this)
            })
        },
        show: function() {
            return this.element.attr("readonly") && this.o.enableOnReadonly === !1 ? void 0 : (this.isInline || this.picker.appendTo(this.o.container),
            this.place(),
            this.picker.show(),
            this._attachSecondaryEvents(),
            this._trigger("show"),
            (window.navigator.msMaxTouchPoints || "ontouchstart"in document) && this.o.disableTouchKeyboard && t(this.element).blur(),
            this)
        },
        hide: function() {
            return this.isInline ? this : this.picker.is(":visible") ? (this.focusDate = null,
            this.picker.hide().detach(),
            this._detachSecondaryEvents(),
            this.viewMode = this.o.startView,
            this.showMode(),
            this.o.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(),
            this._trigger("hide"),
            this) : this
        },
        remove: function() {
            return this.hide(),
            this._detachEvents(),
            this._detachSecondaryEvents(),
            this.picker.remove(),
            delete this.element.data().datepicker,
            this.isInput || delete this.element.data().date,
            this
        },
        _utc_to_local: function(t) {
            return t && new Date(t.getTime() + 6e4 * t.getTimezoneOffset())
        },
        _local_to_utc: function(t) {
            return t && new Date(t.getTime() - 6e4 * t.getTimezoneOffset())
        },
        _zero_time: function(t) {
            return t && new Date(t.getFullYear(),t.getMonth(),t.getDate())
        },
        _zero_utc_time: function(t) {
            return t && new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()))
        },
        getDates: function() {
            return t.map(this.dates, this._utc_to_local)
        },
        getUTCDates: function() {
            return t.map(this.dates, function(t) {
                return new Date(t)
            })
        },
        getDate: function() {
            return this._utc_to_local(this.getUTCDate())
        },
        getUTCDate: function() {
            var t = this.dates.get(-1);
            return "undefined" != typeof t ? new Date(t) : null
        },
        clearDates: function() {
            var t;
            this.isInput ? t = this.element : this.component && (t = this.element.find("input")),
            t && t.val("").change(),
            this.update(),
            this._trigger("changeDate"),
            this.o.autoclose && this.hide()
        },
        setDates: function() {
            var e = t.isArray(arguments[0]) ? arguments[0] : arguments;
            return this.update.apply(this, e),
            this._trigger("changeDate"),
            this.setValue(),
            this
        },
        setUTCDates: function() {
            var e = t.isArray(arguments[0]) ? arguments[0] : arguments;
            return this.update.apply(this, t.map(e, this._utc_to_local)),
            this._trigger("changeDate"),
            this.setValue(),
            this
        },
        setDate: o("setDates"),
        setUTCDate: o("setUTCDates"),
        setValue: function() {
            var t = this.getFormattedDate();
            return this.isInput ? this.element.val(t).change() : this.component && this.element.find("input").val(t).change(),
            this
        },
        getFormattedDate: function(i) {
            i === e && (i = this.o.format);
            var s = this.o.language;
            return t.map(this.dates, function(t) {
                return m.formatDate(t, i, s)
            }).join(this.o.multidateSeparator)
        },
        setStartDate: function(t) {
            return this._process_options({
                startDate: t
            }),
            this.update(),
            this.updateNavArrows(),
            this
        },
        setEndDate: function(t) {
            return this._process_options({
                endDate: t
            }),
            this.update(),
            this.updateNavArrows(),
            this
        },
        setDaysOfWeekDisabled: function(t) {
            return this._process_options({
                daysOfWeekDisabled: t
            }),
            this.update(),
            this.updateNavArrows(),
            this
        },
        setDatesDisabled: function(t) {
            this._process_options({
                datesDisabled: t
            }),
            this.update(),
            this.updateNavArrows()
        },
        place: function() {
            if (this.isInline)
                return this;
            var e = this.picker.outerWidth()
              , i = this.picker.outerHeight()
              , s = 10
              , n = t(this.o.container).width()
              , o = t(this.o.container).height()
              , r = t(this.o.container).scrollTop()
              , a = t(this.o.container).offset()
              , l = [];
            this.element.parents().each(function() {
                var e = t(this).css("z-index");
                "auto" !== e && 0 !== e && l.push(parseInt(e))
            });
            var h = Math.max.apply(Math, l) + 10
              , c = this.component ? this.component.parent().offset() : this.element.offset()
              , d = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!1)
              , u = this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1)
              , p = c.left - a.left
              , f = c.top - a.top;
            this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"),
            "auto" !== this.o.orientation.x ? (this.picker.addClass("datepicker-orient-" + this.o.orientation.x),
            "right" === this.o.orientation.x && (p -= e - u)) : c.left < 0 ? (this.picker.addClass("datepicker-orient-left"),
            p -= c.left - s) : p + e > n ? (this.picker.addClass("datepicker-orient-right"),
            p = c.left + u - e) : this.picker.addClass("datepicker-orient-left");
            var g, m, v = this.o.orientation.y;
            if ("auto" === v && (g = -r + f - i,
            m = r + o - (f + d + i),
            v = Math.max(g, m) === m ? "top" : "bottom"),
            this.picker.addClass("datepicker-orient-" + v),
            "top" === v ? f += d : f -= i + parseInt(this.picker.css("padding-top")),
            this.o.rtl) {
                var y = n - (p + u);
                this.picker.css({
                    top: f,
                    right: y,
                    zIndex: h
                })
            } else
                this.picker.css({
                    top: f,
                    left: p,
                    zIndex: h
                });
            return this
        },
        _allow_update: !0,
        update: function() {
            if (!this._allow_update)
                return this;
            var e = this.dates.copy()
              , i = []
              , s = !1;
            return arguments.length ? (t.each(arguments, t.proxy(function(t, e) {
                e instanceof Date && (e = this._local_to_utc(e)),
                i.push(e)
            }, this)),
            s = !0) : (i = this.isInput ? this.element.val() : this.element.data("date") || this.element.find("input").val(),
            i = i && this.o.multidate ? i.split(this.o.multidateSeparator) : [i],
            delete this.element.data().date),
            i = t.map(i, t.proxy(function(t) {
                return m.parseDate(t, this.o.format, this.o.language)
            }, this)),
            i = t.grep(i, t.proxy(function(t) {
                return t < this.o.startDate || t > this.o.endDate || !t
            }, this), !0),
            this.dates.replace(i),
            this.dates.length ? this.viewDate = new Date(this.dates.get(-1)) : this.viewDate < this.o.startDate ? this.viewDate = new Date(this.o.startDate) : this.viewDate > this.o.endDate && (this.viewDate = new Date(this.o.endDate)),
            s ? this.setValue() : i.length && String(e) !== String(this.dates) && this._trigger("changeDate"),
            !this.dates.length && e.length && this._trigger("clearDate"),
            this.fill(),
            this
        },
        fillDow: function() {
            var t = this.o.weekStart
              , e = "<tr>";
            if (this.o.calendarWeeks) {
                this.picker.find(".datepicker-days thead tr:first-child .datepicker-switch").attr("colspan", function(t, e) {
                    return parseInt(e) + 1
                });
                var i = '<th class="cw">&#160;</th>';
                e += i
            }
            for (; t < this.o.weekStart + 7; )
                e += '<th class="dow">' + g[this.o.language].daysMin[t++ % 7] + "</th>";
            e += "</tr>",
            this.picker.find(".datepicker-days thead").append(e)
        },
        fillMonths: function() {
            for (var t = "", e = 0; 12 > e; )
                t += '<span class="month">' + g[this.o.language].monthsShort[e++] + "</span>";
            this.picker.find(".datepicker-months td").html(t)
        },
        setRange: function(e) {
            e && e.length ? this.range = t.map(e, function(t) {
                return t.valueOf()
            }) : delete this.range,
            this.fill()
        },
        getClassNames: function(e) {
            var i = []
              , s = this.viewDate.getUTCFullYear()
              , o = this.viewDate.getUTCMonth()
              , r = new Date;
            return e.getUTCFullYear() < s || e.getUTCFullYear() === s && e.getUTCMonth() < o ? i.push("old") : (e.getUTCFullYear() > s || e.getUTCFullYear() === s && e.getUTCMonth() > o) && i.push("new"),
            this.focusDate && e.valueOf() === this.focusDate.valueOf() && i.push("focused"),
            this.o.todayHighlight && e.getUTCFullYear() === r.getFullYear() && e.getUTCMonth() === r.getMonth() && e.getUTCDate() === r.getDate() && i.push("today"),
            -1 !== this.dates.contains(e) && i.push("active"),
            (e.valueOf() < this.o.startDate || e.valueOf() > this.o.endDate || -1 !== t.inArray(e.getUTCDay(), this.o.daysOfWeekDisabled)) && i.push("disabled"),
            this.o.datesDisabled.length > 0 && t.grep(this.o.datesDisabled, function(t) {
                return n(e, t)
            }).length > 0 && i.push("disabled", "disabled-date"),
            this.range && (e > this.range[0] && e < this.range[this.range.length - 1] && i.push("range"),
            -1 !== t.inArray(e.valueOf(), this.range) && i.push("selected")),
            i
        },
        fill: function() {
            var s, n = new Date(this.viewDate), o = n.getUTCFullYear(), r = n.getUTCMonth(), a = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCFullYear() : -1 / 0, l = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCMonth() : -1 / 0, h = 1 / 0 !== this.o.endDate ? this.o.endDate.getUTCFullYear() : 1 / 0, c = 1 / 0 !== this.o.endDate ? this.o.endDate.getUTCMonth() : 1 / 0, d = g[this.o.language].today || g.en.today || "", u = g[this.o.language].clear || g.en.clear || "";
            if (!isNaN(o) && !isNaN(r)) {
                this.picker.find(".datepicker-days thead .datepicker-switch").text(g[this.o.language].months[r] + " " + o),
                this.picker.find("tfoot .today").text(d).toggle(this.o.todayBtn !== !1),
                this.picker.find("tfoot .clear").text(u).toggle(this.o.clearBtn !== !1),
                this.updateNavArrows(),
                this.fillMonths();
                var p = i(o, r - 1, 28)
                  , f = m.getDaysInMonth(p.getUTCFullYear(), p.getUTCMonth());
                p.setUTCDate(f),
                p.setUTCDate(f - (p.getUTCDay() - this.o.weekStart + 7) % 7);
                var v = new Date(p);
                v.setUTCDate(v.getUTCDate() + 42),
                v = v.valueOf();
                for (var y, x = []; p.valueOf() < v; ) {
                    if (p.getUTCDay() === this.o.weekStart && (x.push("<tr>"),
                    this.o.calendarWeeks)) {
                        var b = new Date(+p + (this.o.weekStart - p.getUTCDay() - 7) % 7 * 864e5)
                          , k = new Date(Number(b) + (11 - b.getUTCDay()) % 7 * 864e5)
                          , w = new Date(Number(w = i(k.getUTCFullYear(), 0, 1)) + (11 - w.getUTCDay()) % 7 * 864e5)
                          , C = (k - w) / 864e5 / 7 + 1;
                        x.push('<td class="cw">' + C + "</td>")
                    }
                    if (y = this.getClassNames(p),
                    y.push("day"),
                    this.o.beforeShowDay !== t.noop) {
                        var S = this.o.beforeShowDay(this._utc_to_local(p));
                        S === e ? S = {} : "boolean" == typeof S ? S = {
                            enabled: S
                        } : "string" == typeof S && (S = {
                            classes: S
                        }),
                        S.enabled === !1 && y.push("disabled"),
                        S.classes && (y = y.concat(S.classes.split(/\s+/))),
                        S.tooltip && (s = S.tooltip)
                    }
                    y = t.unique(y),
                    x.push('<td class="' + y.join(" ") + '"' + (s ? ' title="' + s + '"' : "") + ">" + p.getUTCDate() + "</td>"),
                    s = null,
                    p.getUTCDay() === this.o.weekEnd && x.push("</tr>"),
                    p.setUTCDate(p.getUTCDate() + 1)
                }
                this.picker.find(".datepicker-days tbody").empty().append(x.join(""));
                var T = this.picker.find(".datepicker-months").find("th:eq(1)").text(o).end().find("span").removeClass("active");
                if (t.each(this.dates, function(t, e) {
                    e.getUTCFullYear() === o && T.eq(e.getUTCMonth()).addClass("active")
                }),
                (a > o || o > h) && T.addClass("disabled"),
                o === a && T.slice(0, l).addClass("disabled"),
                o === h && T.slice(c + 1).addClass("disabled"),
                this.o.beforeShowMonth !== t.noop) {
                    var M = this;
                    t.each(T, function(e, i) {
                        if (!t(i).hasClass("disabled")) {
                            var s = new Date(o,e,1)
                              , n = M.o.beforeShowMonth(s);
                            n === !1 && t(i).addClass("disabled")
                        }
                    })
                }
                x = "",
                o = 10 * parseInt(o / 10, 10);
                var D = this.picker.find(".datepicker-years").find("th:eq(1)").text(o + "-" + (o + 9)).end().find("td");
                o -= 1;
                for (var A, L = t.map(this.dates, function(t) {
                    return t.getUTCFullYear()
                }), P = -1; 11 > P; P++)
                    A = ["year"],
                    -1 === P ? A.push("old") : 10 === P && A.push("new"),
                    -1 !== t.inArray(o, L) && A.push("active"),
                    (a > o || o > h) && A.push("disabled"),
                    x += '<span class="' + A.join(" ") + '">' + o + "</span>",
                    o += 1;
                D.html(x)
            }
        },
        updateNavArrows: function() {
            if (this._allow_update) {
                var t = new Date(this.viewDate)
                  , e = t.getUTCFullYear()
                  , i = t.getUTCMonth();
                switch (this.viewMode) {
                case 0:
                    this.picker.find(".prev").css(this.o.startDate !== -1 / 0 && e <= this.o.startDate.getUTCFullYear() && i <= this.o.startDate.getUTCMonth() ? {
                        visibility: "hidden"
                    } : {
                        visibility: "visible"
                    }),
                    this.picker.find(".next").css(1 / 0 !== this.o.endDate && e >= this.o.endDate.getUTCFullYear() && i >= this.o.endDate.getUTCMonth() ? {
                        visibility: "hidden"
                    } : {
                        visibility: "visible"
                    });
                    break;
                case 1:
                case 2:
                    this.picker.find(".prev").css(this.o.startDate !== -1 / 0 && e <= this.o.startDate.getUTCFullYear() ? {
                        visibility: "hidden"
                    } : {
                        visibility: "visible"
                    }),
                    this.picker.find(".next").css(1 / 0 !== this.o.endDate && e >= this.o.endDate.getUTCFullYear() ? {
                        visibility: "hidden"
                    } : {
                        visibility: "visible"
                    })
                }
            }
        },
        click: function(e) {
            e.preventDefault();
            var s, n, o, r = t(e.target).closest("span, td, th");
            if (1 === r.length)
                switch (r[0].nodeName.toLowerCase()) {
                case "th":
                    switch (r[0].className) {
                    case "datepicker-switch":
                        this.showMode(1);
                        break;
                    case "prev":
                    case "next":
                        var a = m.modes[this.viewMode].navStep * ("prev" === r[0].className ? -1 : 1);
                        switch (this.viewMode) {
                        case 0:
                            this.viewDate = this.moveMonth(this.viewDate, a),
                            this._trigger("changeMonth", this.viewDate);
                            break;
                        case 1:
                        case 2:
                            this.viewDate = this.moveYear(this.viewDate, a),
                            1 === this.viewMode && this._trigger("changeYear", this.viewDate)
                        }
                        this.fill();
                        break;
                    case "today":
                        var l = new Date;
                        l = i(l.getFullYear(), l.getMonth(), l.getDate(), 0, 0, 0),
                        this.showMode(-2);
                        var h = "linked" === this.o.todayBtn ? null : "view";
                        this._setDate(l, h);
                        break;
                    case "clear":
                        this.clearDates()
                    }
                    break;
                case "span":
                    r.hasClass("disabled") || (this.viewDate.setUTCDate(1),
                    r.hasClass("month") ? (o = 1,
                    n = r.parent().find("span").index(r),
                    s = this.viewDate.getUTCFullYear(),
                    this.viewDate.setUTCMonth(n),
                    this._trigger("changeMonth", this.viewDate),
                    1 === this.o.minViewMode && this._setDate(i(s, n, o))) : (o = 1,
                    n = 0,
                    s = parseInt(r.text(), 10) || 0,
                    this.viewDate.setUTCFullYear(s),
                    this._trigger("changeYear", this.viewDate),
                    2 === this.o.minViewMode && this._setDate(i(s, n, o))),
                    this.showMode(-1),
                    this.fill());
                    break;
                case "td":
                    r.hasClass("day") && !r.hasClass("disabled") && (o = parseInt(r.text(), 10) || 1,
                    s = this.viewDate.getUTCFullYear(),
                    n = this.viewDate.getUTCMonth(),
                    r.hasClass("old") ? 0 === n ? (n = 11,
                    s -= 1) : n -= 1 : r.hasClass("new") && (11 === n ? (n = 0,
                    s += 1) : n += 1),
                    this._setDate(i(s, n, o)))
                }
            this.picker.is(":visible") && this._focused_from && t(this._focused_from).focus(),
            delete this._focused_from
        },
        _toggle_multidate: function(t) {
            var e = this.dates.contains(t);
            if (t || this.dates.clear(),
            -1 !== e ? (this.o.multidate === !0 || this.o.multidate > 1 || this.o.toggleActive) && this.dates.remove(e) : this.o.multidate === !1 ? (this.dates.clear(),
            this.dates.push(t)) : this.dates.push(t),
            "number" == typeof this.o.multidate)
                for (; this.dates.length > this.o.multidate; )
                    this.dates.remove(0)
        },
        _setDate: function(t, e) {
            e && "date" !== e || this._toggle_multidate(t && new Date(t)),
            e && "view" !== e || (this.viewDate = t && new Date(t)),
            this.fill(),
            this.setValue(),
            e && "view" === e || this._trigger("changeDate");
            var i;
            this.isInput ? i = this.element : this.component && (i = this.element.find("input")),
            i && i.change(),
            !this.o.autoclose || e && "date" !== e || this.hide()
        },
        moveMonth: function(t, i) {
            if (!t)
                return e;
            if (!i)
                return t;
            var s, n, o = new Date(t.valueOf()), r = o.getUTCDate(), a = o.getUTCMonth(), l = Math.abs(i);
            if (i = i > 0 ? 1 : -1,
            1 === l)
                n = -1 === i ? function() {
                    return o.getUTCMonth() === a
                }
                : function() {
                    return o.getUTCMonth() !== s
                }
                ,
                s = a + i,
                o.setUTCMonth(s),
                (0 > s || s > 11) && (s = (s + 12) % 12);
            else {
                for (var h = 0; l > h; h++)
                    o = this.moveMonth(o, i);
                s = o.getUTCMonth(),
                o.setUTCDate(r),
                n = function() {
                    return s !== o.getUTCMonth()
                }
            }
            for (; n(); )
                o.setUTCDate(--r),
                o.setUTCMonth(s);
            return o
        },
        moveYear: function(t, e) {
            return this.moveMonth(t, 12 * e)
        },
        dateWithinRange: function(t) {
            return t >= this.o.startDate && t <= this.o.endDate
        },
        keydown: function(t) {
            if (!this.picker.is(":visible"))
                return void (27 === t.keyCode && this.show());
            var e, i, n, o = !1, r = this.focusDate || this.viewDate;
            switch (t.keyCode) {
            case 27:
                this.focusDate ? (this.focusDate = null,
                this.viewDate = this.dates.get(-1) || this.viewDate,
                this.fill()) : this.hide(),
                t.preventDefault();
                break;
            case 37:
            case 39:
                if (!this.o.keyboardNavigation)
                    break;
                e = 37 === t.keyCode ? -1 : 1,
                t.ctrlKey ? (i = this.moveYear(this.dates.get(-1) || s(), e),
                n = this.moveYear(r, e),
                this._trigger("changeYear", this.viewDate)) : t.shiftKey ? (i = this.moveMonth(this.dates.get(-1) || s(), e),
                n = this.moveMonth(r, e),
                this._trigger("changeMonth", this.viewDate)) : (i = new Date(this.dates.get(-1) || s()),
                i.setUTCDate(i.getUTCDate() + e),
                n = new Date(r),
                n.setUTCDate(r.getUTCDate() + e)),
                this.dateWithinRange(n) && (this.focusDate = this.viewDate = n,
                this.setValue(),
                this.fill(),
                t.preventDefault());
                break;
            case 38:
            case 40:
                if (!this.o.keyboardNavigation)
                    break;
                e = 38 === t.keyCode ? -1 : 1,
                t.ctrlKey ? (i = this.moveYear(this.dates.get(-1) || s(), e),
                n = this.moveYear(r, e),
                this._trigger("changeYear", this.viewDate)) : t.shiftKey ? (i = this.moveMonth(this.dates.get(-1) || s(), e),
                n = this.moveMonth(r, e),
                this._trigger("changeMonth", this.viewDate)) : (i = new Date(this.dates.get(-1) || s()),
                i.setUTCDate(i.getUTCDate() + 7 * e),
                n = new Date(r),
                n.setUTCDate(r.getUTCDate() + 7 * e)),
                this.dateWithinRange(n) && (this.focusDate = this.viewDate = n,
                this.setValue(),
                this.fill(),
                t.preventDefault());
                break;
            case 32:
                break;
            case 13:
                r = this.focusDate || this.dates.get(-1) || this.viewDate,
                this.o.keyboardNavigation && (this._toggle_multidate(r),
                o = !0),
                this.focusDate = null,
                this.viewDate = this.dates.get(-1) || this.viewDate,
                this.setValue(),
                this.fill(),
                this.picker.is(":visible") && (t.preventDefault(),
                "function" == typeof t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0,
                this.o.autoclose && this.hide());
                break;
            case 9:
                this.focusDate = null,
                this.viewDate = this.dates.get(-1) || this.viewDate,
                this.fill(),
                this.hide()
            }
            if (o) {
                this._trigger(this.dates.length ? "changeDate" : "clearDate");
                var a;
                this.isInput ? a = this.element : this.component && (a = this.element.find("input")),
                a && a.change()
            }
        },
        showMode: function(t) {
            t && (this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + t))),
            this.picker.children("div").hide().filter(".datepicker-" + m.modes[this.viewMode].clsName).css("display", "block"),
            this.updateNavArrows()
        }
    };
    var c = function(e, i) {
        this.element = t(e),
        this.inputs = t.map(i.inputs, function(t) {
            return t.jquery ? t[0] : t
        }),
        delete i.inputs,
        u.call(t(this.inputs), i).bind("changeDate", t.proxy(this.dateUpdated, this)),
        this.pickers = t.map(this.inputs, function(e) {
            return t(e).data("datepicker")
        }),
        this.updateDates()
    };
    c.prototype = {
        updateDates: function() {
            this.dates = t.map(this.pickers, function(t) {
                return t.getUTCDate()
            }),
            this.updateRanges()
        },
        updateRanges: function() {
            var e = t.map(this.dates, function(t) {
                return t.valueOf()
            });
            t.each(this.pickers, function(t, i) {
                i.setRange(e)
            })
        },
        dateUpdated: function(e) {
            if (!this.updating) {
                this.updating = !0;
                var i = t(e.target).data("datepicker")
                  , s = i.getUTCDate()
                  , n = t.inArray(e.target, this.inputs)
                  , o = n - 1
                  , r = n + 1
                  , a = this.inputs.length;
                if (-1 !== n) {
                    if (t.each(this.pickers, function(t, e) {
                        e.getUTCDate() || e.setUTCDate(s)
                    }),
                    s < this.dates[o])
                        for (; o >= 0 && s < this.dates[o]; )
                            this.pickers[o--].setUTCDate(s);
                    else if (s > this.dates[r])
                        for (; a > r && s > this.dates[r]; )
                            this.pickers[r++].setUTCDate(s);
                    this.updateDates(),
                    delete this.updating
                }
            }
        },
        remove: function() {
            t.map(this.pickers, function(t) {
                t.remove()
            }),
            delete this.element.data().datepicker
        }
    };
    var d = t.fn.datepicker
      , u = function(i) {
        var s = Array.apply(null, arguments);
        s.shift();
        var n;
        return this.each(function() {
            var o = t(this)
              , l = o.data("datepicker")
              , d = "object" == typeof i && i;
            if (!l) {
                var u = r(this, "date")
                  , f = t.extend({}, p, u, d)
                  , g = a(f.language)
                  , m = t.extend({}, p, g, u, d);
                if (o.hasClass("input-daterange") || m.inputs) {
                    var v = {
                        inputs: m.inputs || o.find("input").toArray()
                    };
                    o.data("datepicker", l = new c(this,t.extend(m, v)))
                } else
                    o.data("datepicker", l = new h(this,m))
            }
            return "string" == typeof i && "function" == typeof l[i] && (n = l[i].apply(l, s),
            n !== e) ? !1 : void 0
        }),
        n !== e ? n : this
    };
    t.fn.datepicker = u;
    var p = t.fn.datepicker.defaults = {
        autoclose: !1,
        beforeShowDay: t.noop,
        beforeShowMonth: t.noop,
        calendarWeeks: !1,
        clearBtn: !1,
        toggleActive: !1,
        daysOfWeekDisabled: [],
        datesDisabled: [],
        endDate: 1 / 0,
        forceParse: !0,
        format: "mm/dd/yyyy",
        keyboardNavigation: !0,
        language: "en",
        minViewMode: 0,
        multidate: !1,
        multidateSeparator: ",",
        orientation: "auto",
        rtl: !1,
        startDate: -1 / 0,
        startView: 0,
        todayBtn: !1,
        todayHighlight: !1,
        weekStart: 0,
        disableTouchKeyboard: !1,
        enableOnReadonly: !0,
        container: "body"
    }
      , f = t.fn.datepicker.locale_opts = ["format", "rtl", "weekStart"];
    t.fn.datepicker.Constructor = h;
    var g = t.fn.datepicker.dates = {
        en: {
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            today: "Today",
            clear: "Clear"
        }
    }
      , m = {
        modes: [{
            clsName: "days",
            navFnc: "Month",
            navStep: 1
        }, {
            clsName: "months",
            navFnc: "FullYear",
            navStep: 1
        }, {
            clsName: "years",
            navFnc: "FullYear",
            navStep: 10
        }],
        isLeapYear: function(t) {
            return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0
        },
        getDaysInMonth: function(t, e) {
            return [31, m.isLeapYear(t) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e]
        },
        validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
        nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
        parseFormat: function(t) {
            var e = t.replace(this.validParts, "\x00").split("\x00")
              , i = t.match(this.validParts);
            if (!e || !e.length || !i || 0 === i.length)
                throw new Error("Invalid date format.");
            return {
                separators: e,
                parts: i
            }
        },
        parseDate: function(s, n, o) {
            function r() {
                var t = this.slice(0, u[c].length)
                  , e = u[c].slice(0, t.length);
                return t.toLowerCase() === e.toLowerCase()
            }
            if (!s)
                return e;
            if (s instanceof Date)
                return s;
            "string" == typeof n && (n = m.parseFormat(n));
            var a, l, c, d = /([\-+]\d+)([dmwy])/, u = s.match(/([\-+]\d+)([dmwy])/g);
            if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(s)) {
                for (s = new Date,
                c = 0; c < u.length; c++)
                    switch (a = d.exec(u[c]),
                    l = parseInt(a[1]),
                    a[2]) {
                    case "d":
                        s.setUTCDate(s.getUTCDate() + l);
                        break;
                    case "m":
                        s = h.prototype.moveMonth.call(h.prototype, s, l);
                        break;
                    case "w":
                        s.setUTCDate(s.getUTCDate() + 7 * l);
                        break;
                    case "y":
                        s = h.prototype.moveYear.call(h.prototype, s, l)
                    }
                return i(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate(), 0, 0, 0)
            }
            u = s && s.match(this.nonpunctuation) || [],
            s = new Date;
            var p, f, v = {}, y = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"], x = {
                yyyy: function(t, e) {
                    return t.setUTCFullYear(e)
                },
                yy: function(t, e) {
                    return t.setUTCFullYear(2e3 + e)
                },
                m: function(t, e) {
                    if (isNaN(t))
                        return t;
                    for (e -= 1; 0 > e; )
                        e += 12;
                    for (e %= 12,
                    t.setUTCMonth(e); t.getUTCMonth() !== e; )
                        t.setUTCDate(t.getUTCDate() - 1);
                    return t
                },
                d: function(t, e) {
                    return t.setUTCDate(e)
                }
            };
            x.M = x.MM = x.mm = x.m,
            x.dd = x.d,
            s = i(s.getFullYear(), s.getMonth(), s.getDate(), 0, 0, 0);
            var b = n.parts.slice();
            if (u.length !== b.length && (b = t(b).filter(function(e, i) {
                return -1 !== t.inArray(i, y)
            }).toArray()),
            u.length === b.length) {
                var k;
                for (c = 0,
                k = b.length; k > c; c++) {
                    if (p = parseInt(u[c], 10),
                    a = b[c],
                    isNaN(p))
                        switch (a) {
                        case "MM":
                            f = t(g[o].months).filter(r),
                            p = t.inArray(f[0], g[o].months) + 1;
                            break;
                        case "M":
                            f = t(g[o].monthsShort).filter(r),
                            p = t.inArray(f[0], g[o].monthsShort) + 1
                        }
                    v[a] = p
                }
                var w, C;
                for (c = 0; c < y.length; c++)
                    C = y[c],
                    C in v && !isNaN(v[C]) && (w = new Date(s),
                    x[C](w, v[C]),
                    isNaN(w) || (s = w))
            }
            return s
        },
        formatDate: function(e, i, s) {
            if (!e)
                return "";
            "string" == typeof i && (i = m.parseFormat(i));
            var n = {
                d: e.getUTCDate(),
                D: g[s].daysShort[e.getUTCDay()],
                DD: g[s].days[e.getUTCDay()],
                m: e.getUTCMonth() + 1,
                M: g[s].monthsShort[e.getUTCMonth()],
                MM: g[s].months[e.getUTCMonth()],
                yy: e.getUTCFullYear().toString().substring(2),
                yyyy: e.getUTCFullYear()
            };
            n.dd = (n.d < 10 ? "0" : "") + n.d,
            n.mm = (n.m < 10 ? "0" : "") + n.m,
            e = [];
            for (var o = t.extend([], i.separators), r = 0, a = i.parts.length; a >= r; r++)
                o.length && e.push(o.shift()),
                e.push(n[i.parts[r]]);
            return e.join("")
        },
        headTemplate: '<thead><tr><th class="prev">&#171;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&#187;</th></tr></thead>',
        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
        footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
    };
    m.template = '<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">' + m.headTemplate + "<tbody></tbody>" + m.footTemplate + '</table></div><div class="datepicker-months"><table class="table-condensed">' + m.headTemplate + m.contTemplate + m.footTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + m.headTemplate + m.contTemplate + m.footTemplate + "</table></div></div>",
    t.fn.datepicker.DPGlobal = m,
    t.fn.datepicker.noConflict = function() {
        return t.fn.datepicker = d,
        this
    }
    ,
    t.fn.datepicker.version = "1.4.0",
    t(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function(e) {
        var i = t(this);
        i.data("datepicker") || (e.preventDefault(),
        u.call(i, "show"))
    }),
    t(function() {
        u.call(t('[data-provide="datepicker-inline"]'))
    })
}(window.jQuery),
!function(t) {
    "use strict";
    function e(e) {
        var i = [{
            re: /[\xC0-\xC6]/g,
            ch: "A"
        }, {
            re: /[\xE0-\xE6]/g,
            ch: "a"
        }, {
            re: /[\xC8-\xCB]/g,
            ch: "E"
        }, {
            re: /[\xE8-\xEB]/g,
            ch: "e"
        }, {
            re: /[\xCC-\xCF]/g,
            ch: "I"
        }, {
            re: /[\xEC-\xEF]/g,
            ch: "i"
        }, {
            re: /[\xD2-\xD6]/g,
            ch: "O"
        }, {
            re: /[\xF2-\xF6]/g,
            ch: "o"
        }, {
            re: /[\xD9-\xDC]/g,
            ch: "U"
        }, {
            re: /[\xF9-\xFC]/g,
            ch: "u"
        }, {
            re: /[\xC7-\xE7]/g,
            ch: "c"
        }, {
            re: /[\xD1]/g,
            ch: "N"
        }, {
            re: /[\xF1]/g,
            ch: "n"
        }];
        return t.each(i, function() {
            e = e.replace(this.re, this.ch)
        }),
        e
    }
    function i(t) {
        var e = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;"
        }
          , i = "(?:" + Object.keys(e).join("|") + ")"
          , s = new RegExp(i)
          , n = new RegExp(i,"g")
          , o = null == t ? "" : "" + t;
        return s.test(o) ? o.replace(n, function(t) {
            return e[t]
        }) : o
    }
    function s(e, i) {
        var s = arguments
          , o = e
          , r = i;
        [].shift.apply(s);
        var a, l = this.each(function() {
            var e = t(this);
            if (e.is("select")) {
                var i = e.data("selectpicker")
                  , l = "object" == typeof o && o;
                if (i) {
                    if (l)
                        for (var h in l)
                            l.hasOwnProperty(h) && (i.options[h] = l[h])
                } else {
                    var c = t.extend({}, n.DEFAULTS, t.fn.selectpicker.defaults || {}, e.data(), l);
                    e.data("selectpicker", i = new n(this,c,r))
                }
                "string" == typeof o && (a = i[o]instanceof Function ? i[o].apply(i, s) : i.options[o])
            }
        });
        return "undefined" != typeof a ? a : l
    }
    String.prototype.includes || !function() {
        var t = {}.toString
          , e = function() {
            try {
                var t = {}
                  , e = Object.defineProperty
                  , i = e(t, t, t) && e
            } catch (s) {}
            return i
        }()
          , i = "".indexOf
          , s = function(e) {
            if (null == this)
                throw TypeError();
            var s = String(this);
            if (e && "[object RegExp]" == t.call(e))
                throw TypeError();
            var n = s.length
              , o = String(e)
              , r = o.length
              , a = arguments.length > 1 ? arguments[1] : void 0
              , l = a ? Number(a) : 0;
            l != l && (l = 0);
            var h = Math.min(Math.max(l, 0), n);
            return r + h > n ? !1 : -1 != i.call(s, o, l)
        };
        e ? e(String.prototype, "includes", {
            value: s,
            configurable: !0,
            writable: !0
        }) : String.prototype.includes = s
    }(),
    String.prototype.startsWith || !function() {
        var t = function() {
            try {
                var t = {}
                  , e = Object.defineProperty
                  , i = e(t, t, t) && e
            } catch (s) {}
            return i
        }()
          , e = {}.toString
          , i = function(t) {
            if (null == this)
                throw TypeError();
            var i = String(this);
            if (t && "[object RegExp]" == e.call(t))
                throw TypeError();
            var s = i.length
              , n = String(t)
              , o = n.length
              , r = arguments.length > 1 ? arguments[1] : void 0
              , a = r ? Number(r) : 0;
            a != a && (a = 0);
            var l = Math.min(Math.max(a, 0), s);
            if (o + l > s)
                return !1;
            for (var h = -1; ++h < o; )
                if (i.charCodeAt(l + h) != n.charCodeAt(h))
                    return !1;
            return !0
        };
        t ? t(String.prototype, "startsWith", {
            value: i,
            configurable: !0,
            writable: !0
        }) : String.prototype.startsWith = i
    }(),
    t.expr[":"].icontains = function(e, i, s) {
        var n = t(e)
          , o = (n.data("tokens") || n.text()).toUpperCase();
        return o.includes(s[3].toUpperCase())
    }
    ,
    t.expr[":"].ibegins = function(e, i, s) {
        var n = t(e)
          , o = (n.data("tokens") || n.text()).toUpperCase();
        return o.startsWith(s[3].toUpperCase())
    }
    ,
    t.expr[":"].aicontains = function(e, i, s) {
        var n = t(e)
          , o = (n.data("tokens") || n.data("normalizedText") || n.text()).toUpperCase();
        return o.includes(o, s[3])
    }
    ,
    t.expr[":"].aibegins = function(e, i, s) {
        var n = t(e)
          , o = (n.data("tokens") || n.data("normalizedText") || n.text()).toUpperCase();
        return o.startsWith(s[3].toUpperCase())
    }
    ;
    var n = function(e, i, s) {
        s && (s.stopPropagation(),
        s.preventDefault()),
        this.$element = t(e),
        this.$newElement = null,
        this.$button = null,
        this.$menu = null,
        this.$lis = null,
        this.options = i,
        null === this.options.title && (this.options.title = this.$element.attr("title")),
        this.val = n.prototype.val,
        this.render = n.prototype.render,
        this.refresh = n.prototype.refresh,
        this.setStyle = n.prototype.setStyle,
        this.selectAll = n.prototype.selectAll,
        this.deselectAll = n.prototype.deselectAll,
        this.destroy = n.prototype.remove,
        this.remove = n.prototype.remove,
        this.show = n.prototype.show,
        this.hide = n.prototype.hide,
        this.init()
    };
    n.VERSION = "1.6.4",
    n.DEFAULTS = {
        noneSelectedText: "Nothing selected",
        noneResultsText: "No results matched {0}",
        countSelectedText: function(t) {
            return 1 == t ? "{0} item selected" : "{0} items selected"
        },
        maxOptionsText: function(t, e) {
            return [1 == t ? "Limit reached ({n} item max)" : "Limit reached ({n} items max)", 1 == e ? "Group limit reached ({n} item max)" : "Group limit reached ({n} items max)"]
        },
        selectAllText: "Select All",
        deselectAllText: "Deselect All",
        doneButton: !1,
        doneButtonText: "Close",
        multipleSeparator: ", ",
        style: "btn-default",
        size: "auto",
        title: null,
        selectedTextFormat: "values",
        width: !1,
        container: !1,
        hideDisabled: !1,
        showSubtext: !1,
        showIcon: !0,
        showContent: !0,
        dropupAuto: !0,
        header: !1,
        liveSearch: !1,
        liveSearchPlaceholder: null,
        liveSearchNormalize: !1,
        liveSearchStyle: "contains",
        actionsBox: !1,
        iconBase: "glyphicon",
        tickIcon: "glyphicon-ok",
        maxOptions: !1,
        mobile: !1,
        selectOnTab: !1,
        dropdownAlignRight: !1
    },
    n.prototype = {
        constructor: n,
        init: function() {
            var e = this
              , i = this.$element.attr("id");
            this.$element.hide(),
            this.multiple = this.$element.prop("multiple"),
            this.autofocus = this.$element.prop("autofocus"),
            this.$newElement = this.createView(),
            this.$element.after(this.$newElement),
            this.$button = this.$newElement.children("button"),
            this.$menu = this.$newElement.children(".dropdown-menu"),
            this.$searchbox = this.$menu.find("input"),
            this.options.dropdownAlignRight && this.$menu.addClass("dropdown-menu-right"),
            "undefined" != typeof i && (this.$button.attr("data-id", i),
            t('label[for="' + i + '"]').click(function(t) {
                t.preventDefault(),
                e.$button.focus()
            })),
            this.checkDisabled(),
            this.clickListener(),
            this.options.liveSearch && this.liveSearchListener(),
            this.render(),
            this.liHeight(),
            this.setStyle(),
            this.setWidth(),
            this.options.container && this.selectPosition(),
            this.$menu.data("this", this),
            this.$newElement.data("this", this),
            this.options.mobile && this.mobile()
        },
        createDropdown: function() {
            var e = this.multiple ? " show-tick" : ""
              , s = this.$element.parent().hasClass("input-group") ? " input-group-btn" : ""
              , n = this.autofocus ? " autofocus" : ""
              , o = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + "</div>" : ""
              , r = this.options.liveSearch ? '<div class="bs-searchbox"><input type="text" class="form-control" autocomplete="off"' + (null === this.options.liveSearchPlaceholder ? "" : ' placeholder="' + i(this.options.liveSearchPlaceholder) + '"') + "></div>" : ""
              , a = this.multiple && this.options.actionsBox ? '<div class="bs-actionsbox"><div class="btn-group btn-group-sm btn-block"><button class="actions-btn bs-select-all btn btn-default">' + this.options.selectAllText + '</button><button class="actions-btn bs-deselect-all btn btn-default">' + this.options.deselectAllText + "</button></div></div>" : ""
              , l = this.multiple && this.options.doneButton ? '<div class="bs-donebutton"><div class="btn-group btn-block"><button class="btn btn-sm btn-default">' + this.options.doneButtonText + "</button></div></div>" : ""
              , h = '<div class="btn-group bootstrap-select' + e + s + '"><button type="button" class="btn dropdown-toggle" data-toggle="dropdown"' + n + '><span class="filter-option pull-left"></span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu open">' + o + r + a + '<ul class="dropdown-menu inner" role="menu"></ul>' + l + "</div></div>";
            return t(h)
        },
        createView: function() {
            var t = this.createDropdown()
              , e = this.createLi();
            return t.find("ul").append(e),
            t
        },
        reloadLi: function() {
            this.destroyLi();
            var t = this.createLi();
            this.$menu.find("ul").append(t)
        },
        destroyLi: function() {
            this.$menu.find("li").remove()
        },
        createLi: function() {
            var s = this
              , n = []
              , o = 0
              , r = function(t, e, i, s) {
                return "<li" + ("undefined" != typeof i & "" !== i ? ' class="' + i + '"' : "") + ("undefined" != typeof e & null !== e ? ' data-original-index="' + e + '"' : "") + ("undefined" != typeof s & null !== s ? 'data-optgroup="' + s + '"' : "") + ">" + t + "</li>"
            }
              , a = function(t, n, o, r) {
                return '<a tabindex="0"' + ("undefined" != typeof n ? ' class="' + n + '"' : "") + ("undefined" != typeof o ? ' style="' + o + '"' : "") + ' data-normalized-text="' + e(i(t)) + '"' + ("undefined" != typeof r || null !== r ? ' data-tokens="' + r + '"' : "") + ">" + t + '<span class="' + s.options.iconBase + " " + s.options.tickIcon + ' check-mark"></span></a>'
            };
            return this.$element.find("option").each(function(e) {
                var i = t(this)
                  , l = i.attr("class") || ""
                  , h = i.attr("style")
                  , c = i.data("content") ? i.data("content") : i.html()
                  , d = i.data("tokens") ? i.data("tokens") : null
                  , u = "undefined" != typeof i.data("subtext") ? '<small class="text-muted">' + i.data("subtext") + "</small>" : ""
                  , p = "undefined" != typeof i.data("icon") ? '<span class="' + s.options.iconBase + " " + i.data("icon") + '"></span> ' : ""
                  , f = i.is(":disabled") || i.parent().is(":disabled");
                if ("" !== p && f && (p = "<span>" + p + "</span>"),
                i.data("content") || (c = p + '<span class="text">' + c + u + "</span>"),
                !s.options.hideDisabled || !f)
                    if (i.parent().is("optgroup") && i.data("divider") !== !0) {
                        if (0 === i.index()) {
                            o += 1;
                            var g = i.parent().attr("label")
                              , m = "undefined" != typeof i.parent().data("subtext") ? '<small class="text-muted">' + i.parent().data("subtext") + "</small>" : ""
                              , v = i.parent().data("icon") ? '<span class="' + s.options.iconBase + " " + i.parent().data("icon") + '"></span> ' : "";
                            g = v + '<span class="text">' + g + m + "</span>",
                            0 !== e && n.length > 0 && n.push(r("", null, "divider", o + "div")),
                            n.push(r(g, null, "dropdown-header", o))
                        }
                        n.push(r(a(c, "opt " + l, h, d), e, "", o))
                    } else
                        i.data("divider") === !0 ? n.push(r("", e, "divider")) : i.data("hidden") === !0 ? n.push(r(a(c, l, h, d), e, "hidden is-hidden")) : (i.prev().is("optgroup") && n.push(r("", null, "divider", o + "div")),
                        n.push(r(a(c, l, h, d), e)))
            }),
            this.multiple || 0 !== this.$element.find("option:selected").length || this.options.title || this.$element.find("option").eq(0).prop("selected", !0).attr("selected", "selected"),
            t(n.join(""))
        },
        findLis: function() {
            return null == this.$lis && (this.$lis = this.$menu.find("li")),
            this.$lis
        },
        render: function(e) {
            var i = this;
            e !== !1 && this.$element.find("option").each(function(e) {
                i.setDisabled(e, t(this).is(":disabled") || t(this).parent().is(":disabled")),
                i.setSelected(e, t(this).is(":selected"))
            }),
            this.tabIndex();
            var s = this.options.hideDisabled ? ":enabled" : ""
              , n = this.$element.find("option:selected" + s).map(function() {
                var e, s = t(this), n = s.data("icon") && i.options.showIcon ? '<i class="' + i.options.iconBase + " " + s.data("icon") + '"></i> ' : "";
                return e = i.options.showSubtext && s.data("subtext") && !i.multiple ? ' <small class="text-muted">' + s.data("subtext") + "</small>" : "",
                "undefined" != typeof s.attr("title") ? s.attr("title") : s.data("content") && i.options.showContent ? s.data("content") : n + s.html() + e
            }).toArray()
              , o = this.multiple ? n.join(this.options.multipleSeparator) : n[0];
            if (this.multiple && this.options.selectedTextFormat.indexOf("count") > -1) {
                var r = this.options.selectedTextFormat.split(">");
                if (r.length > 1 && n.length > r[1] || 1 == r.length && n.length >= 2) {
                    s = this.options.hideDisabled ? ", [disabled]" : "";
                    var a = this.$element.find("option").not('[data-divider="true"], [data-hidden="true"]' + s).length
                      , l = "function" == typeof this.options.countSelectedText ? this.options.countSelectedText(n.length, a) : this.options.countSelectedText;
                    o = l.replace("{0}", n.length.toString()).replace("{1}", a.toString())
                }
            }
            void 0 == this.options.title && (this.options.title = this.$element.attr("title")),
            "static" == this.options.selectedTextFormat && (o = this.options.title),
            o || (o = "undefined" != typeof this.options.title ? this.options.title : this.options.noneSelectedText),
            this.$button.attr("title", t.trim(o.replace(/<[^>]*>?/g, ""))),
            this.$button.children(".filter-option").html(o)
        },
        setStyle: function(t, e) {
            this.$element.attr("class") && this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|validate\[.*\]/gi, ""));
            var i = t ? t : this.options.style;
            "add" == e ? this.$button.addClass(i) : "remove" == e ? this.$button.removeClass(i) : (this.$button.removeClass(this.options.style),
            this.$button.addClass(i))
        },
        liHeight: function() {
            if (this.options.size !== !1) {
                var t = this.$menu.parent().clone().children(".dropdown-toggle").prop("autofocus", !1).end().appendTo("body")
                  , e = t.addClass("open").children(".dropdown-menu")
                  , i = e.find("li").not(".divider, .dropdown-header").filter(":visible").children("a").outerHeight()
                  , s = this.options.header ? e.find(".popover-title").outerHeight() : 0
                  , n = this.options.liveSearch ? e.find(".bs-searchbox").outerHeight() : 0
                  , o = this.options.actionsBox ? e.find(".bs-actionsbox").outerHeight() : 0
                  , r = this.multiple ? e.find(".bs-donebutton").outerHeight() : 0;
                t.remove(),
                this.$newElement.data("liHeight", i).data("headerHeight", s).data("searchHeight", n).data("actionsHeight", o).data("doneButtonHeight", r)
            }
        },
        setSize: function() {
            this.findLis();
            var e, i, s, n = this, o = this.$menu, r = o.children(".inner"), a = this.$newElement.outerHeight(), l = this.$newElement.data("liHeight"), h = this.$newElement.data("headerHeight"), c = this.$newElement.data("searchHeight"), d = this.$newElement.data("actionsHeight"), u = this.$newElement.data("doneButtonHeight"), p = this.$lis.filter(".divider").outerHeight(!0), f = parseInt(o.css("padding-top")) + parseInt(o.css("padding-bottom")) + parseInt(o.css("border-top-width")) + parseInt(o.css("border-bottom-width")), g = this.options.hideDisabled ? ".disabled" : "", m = t(window), v = f + parseInt(o.css("margin-top")) + parseInt(o.css("margin-bottom")) + 2, y = function() {
                i = n.$newElement.offset().top - m.scrollTop(),
                s = m.height() - i - a
            };
            if (y(),
            this.options.header && o.css("padding-top", 0),
            "auto" == this.options.size) {
                var x = function() {
                    var t, a = n.$lis.not(".hidden");
                    y(),
                    e = s - v,
                    n.options.dropupAuto && n.$newElement.toggleClass("dropup", i > s && e - v < o.height()),
                    n.$newElement.hasClass("dropup") && (e = i - v),
                    t = a.length + a.filter(".dropdown-header").length > 3 ? 3 * l + v - 2 : 0,
                    o.css({
                        "max-height": e + "px",
                        overflow: "hidden",
                        "min-height": t + h + c + d + u + "px"
                    }),
                    r.css({
                        "max-height": e - h - c - d - u - f + "px",
                        "overflow-y": "auto",
                        "min-height": Math.max(t - f, 0) + "px"
                    })
                };
                x(),
                this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize", x),
                m.off("resize.getSize scroll.getSize").on("resize.getSize scroll.getSize", x)
            } else if (this.options.size && "auto" != this.options.size && o.find("li").not(g).length > this.options.size) {
                var b = this.$lis.not(".divider").not(g).children().slice(0, this.options.size).last().parent().index()
                  , k = this.$lis.slice(0, b + 1).filter(".divider").length;
                e = l * this.options.size + k * p + f,
                n.options.dropupAuto && this.$newElement.toggleClass("dropup", i > s && e < o.height()),
                o.css({
                    "max-height": e + h + c + d + u + "px",
                    overflow: "hidden"
                }),
                r.css({
                    "max-height": e - f + "px",
                    "overflow-y": "auto"
                })
            }
        },
        setWidth: function() {
            if ("auto" == this.options.width) {
                this.$menu.css("min-width", "0");
                var t = this.$newElement.clone().appendTo("body")
                  , e = t.children(".dropdown-menu").css("width")
                  , i = t.css("width", "auto").children("button").css("width");
                t.remove(),
                this.$newElement.css("width", Math.max(parseInt(e), parseInt(i)) + "px")
            } else
                "fit" == this.options.width ? (this.$menu.css("min-width", ""),
                this.$newElement.css("width", "").addClass("fit-width")) : this.options.width ? (this.$menu.css("min-width", ""),
                this.$newElement.css("width", this.options.width)) : (this.$menu.css("min-width", ""),
                this.$newElement.css("width", ""));
            this.$newElement.hasClass("fit-width") && "fit" !== this.options.width && this.$newElement.removeClass("fit-width")
        },
        selectPosition: function() {
            var e, i, s = this, n = "<div />", o = t(n), r = function(t) {
                o.addClass(t.attr("class").replace(/form-control/gi, "")).toggleClass("dropup", t.hasClass("dropup")),
                e = t.offset(),
                i = t.hasClass("dropup") ? 0 : t[0].offsetHeight,
                o.css({
                    top: e.top + i,
                    left: e.left,
                    width: t[0].offsetWidth,
                    position: "absolute"
                })
            };
            this.$newElement.on("click", function() {
                s.isDisabled() || (r(t(this)),
                o.appendTo(s.options.container),
                o.toggleClass("open", !t(this).hasClass("open")),
                o.append(s.$menu))
            }),
            t(window).on("resize scroll", function() {
                r(s.$newElement)
            }),
            t("html").on("click", function(e) {
                t(e.target).closest(s.$newElement).length < 1 && o.removeClass("open")
            })
        },
        setSelected: function(t, e) {
            this.findLis(),
            this.$lis.filter('[data-original-index="' + t + '"]').toggleClass("selected", e)
        },
        setDisabled: function(t, e) {
            this.findLis(),
            e ? this.$lis.filter('[data-original-index="' + t + '"]').addClass("disabled").children("a").attr("href", "#").attr("tabindex", -1) : this.$lis.filter('[data-original-index="' + t + '"]').removeClass("disabled").children("a").removeAttr("href").attr("tabindex", 0)
        },
        isDisabled: function() {
            return this.$element.is(":disabled")
        },
        checkDisabled: function() {
            var t = this;
            this.isDisabled() ? this.$button.addClass("disabled").attr("tabindex", -1) : (this.$button.hasClass("disabled") && this.$button.removeClass("disabled"),
            -1 != this.$button.attr("tabindex") || this.$element.data("tabindex") || this.$button.removeAttr("tabindex")),
            this.$button.click(function() {
                return !t.isDisabled()
            })
        },
        tabIndex: function() {
            this.$element.is("[tabindex]") && (this.$element.data("tabindex", this.$element.attr("tabindex")),
            this.$button.attr("tabindex", this.$element.data("tabindex")))
        },
        clickListener: function() {
            var e = this;
            this.$newElement.on("touchstart.dropdown", ".dropdown-menu", function(t) {
                t.stopPropagation()
            }),
            this.$newElement.on("click", function() {
                e.setSize(),
                e.options.liveSearch || e.multiple || setTimeout(function() {
                    e.$menu.find(".selected a").focus()
                }, 10)
            }),
            this.$menu.on("click", "li a", function(i) {
                var s = t(this)
                  , n = s.parent().data("originalIndex")
                  , o = e.$element.val()
                  , r = e.$element.prop("selectedIndex");
                if (e.multiple && i.stopPropagation(),
                i.preventDefault(),
                !e.isDisabled() && !s.parent().hasClass("disabled")) {
                    var a = e.$element.find("option")
                      , l = a.eq(n)
                      , h = l.prop("selected")
                      , c = l.parent("optgroup")
                      , d = e.options.maxOptions
                      , u = c.data("maxOptions") || !1;
                    if (e.multiple) {
                        if (l.prop("selected", !h),
                        e.setSelected(n, !h),
                        s.blur(),
                        d !== !1 || u !== !1) {
                            var p = d < a.filter(":selected").length
                              , f = u < c.find("option:selected").length;
                            if (d && p || u && f)
                                if (d && 1 == d)
                                    a.prop("selected", !1),
                                    l.prop("selected", !0),
                                    e.$menu.find(".selected").removeClass("selected"),
                                    e.setSelected(n, !0);
                                else if (u && 1 == u) {
                                    c.find("option:selected").prop("selected", !1),
                                    l.prop("selected", !0);
                                    var g = s.data("optgroup");
                                    e.$menu.find(".selected").has('a[data-optgroup="' + g + '"]').removeClass("selected"),
                                    e.setSelected(n, !0)
                                } else {
                                    var m = "function" == typeof e.options.maxOptionsText ? e.options.maxOptionsText(d, u) : e.options.maxOptionsText
                                      , v = m[0].replace("{n}", d)
                                      , y = m[1].replace("{n}", u)
                                      , x = t('<div class="notify"></div>');
                                    m[2] && (v = v.replace("{var}", m[2][d > 1 ? 0 : 1]),
                                    y = y.replace("{var}", m[2][u > 1 ? 0 : 1])),
                                    l.prop("selected", !1),
                                    e.$menu.append(x),
                                    d && p && (x.append(t("<div>" + v + "</div>")),
                                    e.$element.trigger("maxReached.bs.select")),
                                    u && f && (x.append(t("<div>" + y + "</div>")),
                                    e.$element.trigger("maxReachedGrp.bs.select")),
                                    setTimeout(function() {
                                        e.setSelected(n, !1)
                                    }, 10),
                                    x.delay(750).fadeOut(300, function() {
                                        t(this).remove()
                                    })
                                }
                        }
                    } else
                        a.prop("selected", !1),
                        l.prop("selected", !0),
                        e.$menu.find(".selected").removeClass("selected"),
                        e.setSelected(n, !0);
                    e.multiple ? e.options.liveSearch && e.$searchbox.focus() : e.$button.focus(),
                    (o != e.$element.val() && e.multiple || r != e.$element.prop("selectedIndex") && !e.multiple) && e.$element.change()
                }
            }),
            this.$menu.on("click", "li.disabled a, .popover-title, .popover-title :not(.close)", function(t) {
                t.currentTarget == this && (t.preventDefault(),
                t.stopPropagation(),
                e.options.liveSearch ? e.$searchbox.focus() : e.$button.focus())
            }),
            this.$menu.on("click", "li.divider, li.dropdown-header", function(t) {
                t.preventDefault(),
                t.stopPropagation(),
                e.options.liveSearch ? e.$searchbox.focus() : e.$button.focus()
            }),
            this.$menu.on("click", ".popover-title .close", function() {
                e.$button.focus()
            }),
            this.$searchbox.on("click", function(t) {
                t.stopPropagation()
            }),
            this.$menu.on("click", ".actions-btn", function(i) {
                e.options.liveSearch ? e.$searchbox.focus() : e.$button.focus(),
                i.preventDefault(),
                i.stopPropagation(),
                t(this).hasClass("bs-select-all") ? e.selectAll() : e.deselectAll(),
                e.$element.change()
            }),
            this.$element.change(function() {
                e.render(!1)
            })
        },
        liveSearchListener: function() {
            var s = this
              , n = t('<li class="no-results"></li>');
            this.$newElement.on("click.dropdown.data-api touchstart.dropdown.data-api", function() {
                s.$menu.find(".active").removeClass("active"),
                s.$searchbox.val() && (s.$searchbox.val(""),
                s.$lis.not(".is-hidden").removeClass("hidden"),
                n.parent().length && n.remove()),
                s.multiple || s.$menu.find(".selected").addClass("active"),
                setTimeout(function() {
                    s.$searchbox.focus()
                }, 10)
            }),
            this.$searchbox.on("click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api", function(t) {
                t.stopPropagation()
            }),
            this.$searchbox.on("input propertychange", function() {
                if (s.$searchbox.val()) {
                    var o = s.$lis.not(".is-hidden").removeClass("hidden").children("a");
                    o = o.not(s.options.liveSearchNormalize ? ":a" + s._searchStyle() + "(" + e(s.$searchbox.val()) + ")" : ":" + s._searchStyle() + "(" + s.$searchbox.val() + ")"),
                    o.parent().addClass("hidden"),
                    s.$lis.filter(".dropdown-header").each(function() {
                        var e = t(this)
                          , i = e.data("optgroup");
                        0 === s.$lis.filter("[data-optgroup=" + i + "]").not(e).not(".hidden").length && (e.addClass("hidden"),
                        s.$lis.filter("[data-optgroup=" + i + "div]").addClass("hidden"))
                    });
                    var r = s.$lis.not(".hidden");
                    r.each(function(e) {
                        var i = t(this);
                        i.hasClass("divider") && (i.index() === r.eq(0).index() || i.index() === r.last().index() || r.eq(e + 1).hasClass("divider")) && i.addClass("hidden")
                    }),
                    s.$lis.not(".hidden, .no-results").length ? n.parent().length && n.remove() : (n.parent().length && n.remove(),
                    n.html(s.options.noneResultsText.replace("{0}", '"' + i(s.$searchbox.val()) + '"')).show(),
                    s.$menu.append(n))
                } else
                    s.$lis.not(".is-hidden").removeClass("hidden"),
                    n.parent().length && n.remove();
                s.$lis.filter(".active").removeClass("active"),
                s.$lis.not(".hidden, .divider, .dropdown-header").eq(0).addClass("active").children("a").focus(),
                t(this).focus()
            })
        },
        _searchStyle: function() {
            var t = "icontains";
            switch (this.options.liveSearchStyle) {
            case "begins":
            case "startsWith":
                t = "ibegins";
                break;
            case "contains":
            }
            return t
        },
        val: function(t) {
            return "undefined" != typeof t ? (this.$element.val(t),
            this.render(),
            this.$element) : this.$element.val()
        },
        selectAll: function() {
            this.findLis(),
            this.$element.find("option:enabled").not("[data-divider], [data-hidden]").prop("selected", !0),
            this.$lis.not(".divider, .dropdown-header, .disabled, .hidden").addClass("selected"),
            this.render(!1)
        },
        deselectAll: function() {
            this.findLis(),
            this.$element.find("option:enabled").not("[data-divider], [data-hidden]").prop("selected", !1),
            this.$lis.not(".divider, .dropdown-header, .disabled, .hidden").removeClass("selected"),
            this.render(!1)
        },
        keydown: function(i) {
            var s, n, o, r, a, l, h, c, d, u = t(this), p = u.is("input") ? u.parent().parent() : u.parent(), f = p.data("this"), g = {
                32: " ",
                48: "0",
                49: "1",
                50: "2",
                51: "3",
                52: "4",
                53: "5",
                54: "6",
                55: "7",
                56: "8",
                57: "9",
                59: ";",
                65: "a",
                66: "b",
                67: "c",
                68: "d",
                69: "e",
                70: "f",
                71: "g",
                72: "h",
                73: "i",
                74: "j",
                75: "k",
                76: "l",
                77: "m",
                78: "n",
                79: "o",
                80: "p",
                81: "q",
                82: "r",
                83: "s",
                84: "t",
                85: "u",
                86: "v",
                87: "w",
                88: "x",
                89: "y",
                90: "z",
                96: "0",
                97: "1",
                98: "2",
                99: "3",
                100: "4",
                101: "5",
                102: "6",
                103: "7",
                104: "8",
                105: "9"
            };
            if (f.options.liveSearch && (p = u.parent().parent()),
            f.options.container && (p = f.$menu),
            s = t("[role=menu] li a", p),
            d = f.$menu.parent().hasClass("open"),
            !d && /([0-9]|[A-z])/.test(String.fromCharCode(i.keyCode)) && (f.options.container ? f.$newElement.trigger("click") : (f.setSize(),
            f.$menu.parent().addClass("open"),
            d = !0),
            f.$searchbox.focus()),
            f.options.liveSearch && (/(^9$|27)/.test(i.keyCode.toString(10)) && d && 0 === f.$menu.find(".active").length && (i.preventDefault(),
            f.$menu.parent().removeClass("open"),
            f.$button.focus()),
            s = t("[role=menu] li:not(.divider):not(.dropdown-header):visible a", p),
            u.val() || /(38|40)/.test(i.keyCode.toString(10)) || 0 === s.filter(".active").length && (s = f.$newElement.find("li a"),
            s = s.filter(f.options.liveSearchNormalize ? ":a" + f._searchStyle() + "(" + e(g[i.keyCode]) + ")" : ":" + f._searchStyle() + "(" + g[i.keyCode] + ")"))),
            s.length) {
                if (/(38|40)/.test(i.keyCode.toString(10)))
                    n = s.index(s.filter(":focus")),
                    r = s.parent(":not(.disabled):visible").first().index(),
                    a = s.parent(":not(.disabled):visible").last().index(),
                    o = s.eq(n).parent().nextAll(":not(.disabled):visible").eq(0).index(),
                    l = s.eq(n).parent().prevAll(":not(.disabled):visible").eq(0).index(),
                    h = s.eq(o).parent().prevAll(":not(.disabled):visible").eq(0).index(),
                    f.options.liveSearch && (s.each(function(e) {
                        t(this).hasClass("disabled") || t(this).data("index", e)
                    }),
                    n = s.index(s.filter(".active")),
                    r = s.filter(":not(.disabled):visible").first().data("index"),
                    a = s.filter(":not(.disabled):visible").last().data("index"),
                    o = s.eq(n).nextAll(":not(.disabled):visible").eq(0).data("index"),
                    l = s.eq(n).prevAll(":not(.disabled):visible").eq(0).data("index"),
                    h = s.eq(o).prevAll(":not(.disabled):visible").eq(0).data("index")),
                    c = u.data("prevIndex"),
                    38 == i.keyCode ? (f.options.liveSearch && (n -= 1),
                    n != h && n > l && (n = l),
                    r > n && (n = r),
                    n == c && (n = a)) : 40 == i.keyCode && (f.options.liveSearch && (n += 1),
                    -1 == n && (n = 0),
                    n != h && o > n && (n = o),
                    n > a && (n = a),
                    n == c && (n = r)),
                    u.data("prevIndex", n),
                    f.options.liveSearch ? (i.preventDefault(),
                    u.hasClass("dropdown-toggle") || (s.removeClass("active"),
                    s.eq(n).addClass("active").children("a").focus(),
                    u.focus())) : s.eq(n).focus();
                else if (!u.is("input")) {
                    var m, v, y = [];
                    s.each(function() {
                        t(this).parent().hasClass("disabled") || t.trim(t(this).text().toLowerCase()).substring(0, 1) == g[i.keyCode] && y.push(t(this).parent().index())
                    }),
                    m = t(document).data("keycount"),
                    m++,
                    t(document).data("keycount", m),
                    v = t.trim(t(":focus").text().toLowerCase()).substring(0, 1),
                    v != g[i.keyCode] ? (m = 1,
                    t(document).data("keycount", m)) : m >= y.length && (t(document).data("keycount", 0),
                    m > y.length && (m = 1)),
                    s.eq(y[m - 1]).focus()
                }
                if ((/(13|32)/.test(i.keyCode.toString(10)) || /(^9$)/.test(i.keyCode.toString(10)) && f.options.selectOnTab) && d) {
                    if (/(32)/.test(i.keyCode.toString(10)) || i.preventDefault(),
                    f.options.liveSearch)
                        /(32)/.test(i.keyCode.toString(10)) || (f.$menu.find(".active a").click(),
                        u.focus());
                    else {
                        var x = t(":focus");
                        x.click(),
                        x.focus(),
                        i.preventDefault()
                    }
                    t(document).data("keycount", 0)
                }
                (/(^9$|27)/.test(i.keyCode.toString(10)) && d && (f.multiple || f.options.liveSearch) || /(27)/.test(i.keyCode.toString(10)) && !d) && (f.$menu.parent().removeClass("open"),
                f.$button.focus())
            }
        },
        mobile: function() {
            this.$element.addClass("mobile-device").appendTo(this.$newElement),
            this.options.container && this.$menu.hide()
        },
        refresh: function() {
            this.$lis = null,
            this.reloadLi(),
            this.render(),
            this.setWidth(),
            this.setStyle(),
            this.checkDisabled(),
            this.liHeight()
        },
        hide: function() {
            this.$newElement.hide()
        },
        show: function() {
            this.$newElement.show()
        },
        remove: function() {
            this.$newElement.remove(),
            this.$element.remove()
        }
    };
    var o = t.fn.selectpicker;
    t.fn.selectpicker = s,
    t.fn.selectpicker.Constructor = n,
    t.fn.selectpicker.noConflict = function() {
        return t.fn.selectpicker = o,
        this
    }
    ,
    t(document).data("keycount", 0).on("keydown", ".bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bs-searchbox input", n.prototype.keydown).on("focusin.modal", ".bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bs-searchbox input", function(t) {
        t.stopPropagation()
    }),
    t(window).on("load.bs.select.data-api", function() {
        t(".selectpicker").each(function() {
            var e = t(this);
            s.call(e, e.data())
        })
    })
}(jQuery),
function(t) {
    t.fn.mask = function(e, i) {
        t(this).each(function() {
            if (void 0 !== i && i > 0) {
                var s = t(this);
                s.data("_mask_timeout", setTimeout(function() {
                    t.maskElement(s, e)
                }, i))
            } else
                t.maskElement(t(this), e)
        })
    }
    ,
    t.fn.unmask = function() {
        t(this).each(function() {
            t.unmaskElement(t(this))
        })
    }
    ,
    t.fn.isMasked = function() {
        return this.hasClass("masked")
    }
    ,
    t.maskElement = function(e, i) {
        void 0 !== e.data("_mask_timeout") && (clearTimeout(e.data("_mask_timeout")),
        e.removeData("_mask_timeout")),
        e.isMasked() && t.unmaskElement(e),
        "static" == e.css("position") && e.addClass("masked-relative"),
        e.addClass("masked");
        var s = t('<div class="loadmask"></div>');
        if (navigator.userAgent.toLowerCase().indexOf("msie") > -1 && (s.height(e.height() + parseInt(e.css("padding-top")) + parseInt(e.css("padding-bottom"))),
        s.width(e.width() + parseInt(e.css("padding-left")) + parseInt(e.css("padding-right")))),
        navigator.userAgent.toLowerCase().indexOf("msie 6") > -1 && e.find("select").addClass("masked-hidden"),
        e.append(s),
        void 0 !== i) {
            var n = t('<div class="loadmask-msg" style="display:none;"></div>');
            n.append("<div>" + i + "</div>"),
            e.append(n),
            n.css("top", Math.round(e.height() / 2 - (n.height() - parseInt(n.css("padding-top")) - parseInt(n.css("padding-bottom"))) / 2) + "px"),
            n.css("left", Math.round(e.width() / 2 - (n.width() - parseInt(n.css("padding-left")) - parseInt(n.css("padding-right"))) / 2) + "px"),
            n.show()
        }
    }
    ,
    t.unmaskElement = function(t) {
        void 0 !== t.data("_mask_timeout") && (clearTimeout(t.data("_mask_timeout")),
        t.removeData("_mask_timeout")),
        t.find(".loadmask-msg,.loadmask").remove(),
        t.removeClass("masked"),
        t.removeClass("masked-relative"),
        t.find("select").removeClass("masked-hidden")
    }
}(jQuery),
function(t) {
    t.fn.bindWithDelay = function(e, i, s, n, o) {
        return t.isFunction(i) && (o = n,
        n = s,
        s = i,
        i = void 0),
        s.guid = s.guid || t.guid && t.guid++,
        this.each(function() {
            function r() {
                var e = t.extend(!0, {}, arguments[0])
                  , i = this
                  , r = function() {
                    a = null,
                    s.apply(i, [e])
                };
                o || (clearTimeout(a),
                a = null),
                a || (a = setTimeout(r, n))
            }
            var a = null;
            r.guid = s.guid,
            t(this).bind(e, i, r)
        })
    }
}(jQuery),
function(t, e) {
    var i, s, n, o, r, a, l, h, c, d, u, p, f, g, m, v, y, x, b, k, w, C, S, T;
    i = function(t) {
        return new i.prototype.init(t)
    }
    ,
    "undefined" != typeof require && "undefined" != typeof exports && "undefined" != typeof module ? module.exports = i : t.Globalize = i,
    i.cultures = {},
    i.prototype = {
        constructor: i,
        init: function(t) {
            return this.cultures = i.cultures,
            this.cultureSelector = t,
            this
        }
    },
    i.prototype.init.prototype = i.prototype,
    i.cultures["default"] = {
        name: "en",
        englishName: "English",
        nativeName: "English",
        isRTL: !1,
        language: "en",
        numberFormat: {
            pattern: ["-n"],
            decimals: 0,
            ",": ",",
            ".": ".",
            groupSizes: [3],
            "+": "+",
            "-": "-",
            NaN: "NaN",
            negativeInfinity: "-Infinity",
            positiveInfinity: "Infinity",
            percent: {
                pattern: ["-n %", "n %"],
                decimals: 2,
                groupSizes: [3],
                ",": ",",
                ".": ".",
                symbol: "%"
            },
            currency: {
                pattern: ["($n)", "$n"],
                decimals: 2,
                groupSizes: [3],
                ",": ",",
                ".": ".",
                symbol: "$"
            }
        },
        calendars: {
            standard: {
                name: "Gregorian_USEnglish",
                "/": "/",
                ":": ":",
                firstDay: 0,
                days: {
                    names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    namesAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    namesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
                },
                months: {
                    names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],
                    namesAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""]
                },
                AM: ["AM", "am", "AM"],
                PM: ["PM", "pm", "PM"],
                eras: [{
                    name: "A.D.",
                    start: null,
                    offset: 0
                }],
                twoDigitYearMax: 2029,
                patterns: {
                    d: "M/d/yyyy",
                    D: "dddd, MMMM dd, yyyy",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    f: "dddd, MMMM dd, yyyy h:mm tt",
                    F: "dddd, MMMM dd, yyyy h:mm:ss tt",
                    M: "MMMM dd",
                    Y: "yyyy MMMM",
                    S: "yyyy'-'MM'-'dd'T'HH':'mm':'ss"
                }
            }
        },
        messages: {}
    },
    i.cultures["default"].calendar = i.cultures["default"].calendars.standard,
    i.cultures.en = i.cultures["default"],
    i.cultureSelector = "en",
    s = /^0x[a-f0-9]+$/i,
    n = /^[+-]?infinity$/i,
    o = /^[+-]?\d*\.?\d*(e[+-]?\d+)?$/,
    r = /^\s+|\s+$/g,
    a = function(t, e) {
        if (t.indexOf)
            return t.indexOf(e);
        for (var i = 0, s = t.length; s > i; i++)
            if (t[i] === e)
                return i;
        return -1
    }
    ,
    l = function(t, e) {
        return t.substr(t.length - e.length) === e
    }
    ,
    h = function(t) {
        var i, s, n, o, r, a = arguments[0] || {}, l = 1, p = arguments.length, t = !1;
        for ("boolean" == typeof a && (t = a,
        a = arguments[1] || {},
        l = 2),
        "object" != typeof a && !d(a) && (a = {}); p > l; l++)
            if (null != (i = arguments[l]))
                for (s in i)
                    n = a[s],
                    o = i[s],
                    a !== o && (t && o && (u(o) || (r = c(o))) ? (r ? (r = !1,
                    n = n && c(n) ? n : []) : n = n && u(n) ? n : {},
                    a[s] = h(t, n, o)) : o !== e && (a[s] = o));
        return a
    }
    ,
    c = Array.isArray || function(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }
    ,
    d = function(t) {
        return "[object Function]" === Object.prototype.toString.call(t)
    }
    ,
    u = function(t) {
        return "[object Object]" === Object.prototype.toString.call(t)
    }
    ,
    p = function(t, e) {
        return 0 === t.indexOf(e)
    }
    ,
    f = function(t) {
        return (t + "").replace(r, "")
    }
    ,
    g = function(t) {
        return 0 | t
    }
    ,
    m = function(t, e, i) {
        var s;
        for (s = t.length; e > s; s += 1)
            t = i ? "0" + t : t + "0";
        return t
    }
    ,
    v = function(t, e) {
        for (var i = 0, s = !1, n = 0, o = t.length; o > n; n++) {
            var r = t.charAt(n);
            switch (r) {
            case "'":
                s ? e.push("'") : i++,
                s = !1;
                break;
            case "\\":
                s && e.push("\\"),
                s = !s;
                break;
            default:
                e.push(r),
                s = !1
            }
        }
        return i
    }
    ,
    y = function(t, e) {
        var i, e = e || "F";
        i = t.patterns;
        var s = e.length;
        if (1 === s) {
            if (i = i[e],
            !i)
                throw "Invalid date format string '" + e + "'.";
            e = i
        } else
            2 === s && "%" === e.charAt(0) && (e = e.charAt(1));
        return e
    }
    ,
    x = function(t, e, i) {
        function s(t, e) {
            var i;
            return i = t + "",
            e > 1 && i.length < e ? (i = f[e - 2] + i,
            i.substr(i.length - e, e)) : i
        }
        function n() {
            return c || d ? c : (c = g.test(e),
            d = !0,
            c)
        }
        function o(t, e) {
            if (u)
                return u[e];
            switch (e) {
            case 0:
                return t.getFullYear();
            case 1:
                return t.getMonth();
            case 2:
                return t.getDate()
            }
        }
        var r = i.calendar
          , a = r.convert;
        if (!e || !e.length || "i" === e) {
            if (i && i.name.length)
                if (a)
                    i = x(t, r.patterns.F, i);
                else {
                    var i = new Date(t.getTime())
                      , l = w(t, r.eras);
                    i.setFullYear(C(t, r, l)),
                    i = i.toLocaleString()
                }
            else
                i = t.toString();
            return i
        }
        var h, c, d, u, l = r.eras, p = "s" === e, e = y(r, e), i = [], f = ["0", "00", "000"], g = /([^d]|^)(d|dd)([^d]|$)/g, m = 0, b = k();
        for (!p && a && (u = a.fromGregorian(t)); h = b.lastIndex,
        a = b.exec(e),
        h = e.slice(h, a ? a.index : e.length),
        m += v(h, i),
        a; )
            if (m % 2)
                i.push(a[0]);
            else
                switch (h = a[0],
                a = h.length,
                h) {
                case "ddd":
                case "dddd":
                    i.push((3 === a ? r.days.namesAbbr : r.days.names)[t.getDay()]);
                    break;
                case "d":
                case "dd":
                    c = !0,
                    i.push(s(o(t, 2), a));
                    break;
                case "MMM":
                case "MMMM":
                    h = o(t, 1),
                    i.push(r.monthsGenitive && n() ? r.monthsGenitive[3 === a ? "namesAbbr" : "names"][h] : r.months[3 === a ? "namesAbbr" : "names"][h]);
                    break;
                case "M":
                case "MM":
                    i.push(s(o(t, 1) + 1, a));
                    break;
                case "y":
                case "yy":
                case "yyyy":
                    h = u ? u[0] : C(t, r, w(t, l), p),
                    4 > a && (h %= 100),
                    i.push(s(h, a));
                    break;
                case "h":
                case "hh":
                    h = t.getHours() % 12,
                    0 === h && (h = 12),
                    i.push(s(h, a));
                    break;
                case "H":
                case "HH":
                    i.push(s(t.getHours(), a));
                    break;
                case "m":
                case "mm":
                    i.push(s(t.getMinutes(), a));
                    break;
                case "s":
                case "ss":
                    i.push(s(t.getSeconds(), a));
                    break;
                case "t":
                case "tt":
                    h = t.getHours() < 12 ? r.AM ? r.AM[0] : " " : r.PM ? r.PM[0] : " ",
                    i.push(1 === a ? h.charAt(0) : h);
                    break;
                case "f":
                case "ff":
                case "fff":
                    i.push(s(t.getMilliseconds(), 3).substr(0, a));
                    break;
                case "z":
                case "zz":
                    h = t.getTimezoneOffset() / 60,
                    i.push((0 >= h ? "+" : "-") + s(Math.floor(Math.abs(h)), a));
                    break;
                case "zzz":
                    h = t.getTimezoneOffset() / 60,
                    i.push((0 >= h ? "+" : "-") + s(Math.floor(Math.abs(h)), 2) + ":" + s(Math.abs(t.getTimezoneOffset() % 60), 2));
                    break;
                case "g":
                case "gg":
                    r.eras && i.push(r.eras[w(t, l)].name);
                    break;
                case "/":
                    i.push(r["/"]);
                    break;
                default:
                    throw "Invalid date format pattern '" + h + "'."
                }
        return i.join("")
    }
    ,
    function() {
        var t;
        t = function(t, e, i) {
            var s = i.groupSizes
              , n = s[0]
              , o = 1
              , r = Math.pow(10, e)
              , a = Math.round(t * r) / r;
            for (isFinite(a) || (a = t),
            r = "",
            r = (a + "").split(/e/i),
            a = r.length > 1 ? parseInt(r[1], 10) : 0,
            t = r[0],
            r = t.split("."),
            t = r[0],
            r = r.length > 1 ? r[1] : "",
            a > 0 ? (r = m(r, a, !1),
            t += r.slice(0, a),
            r = r.substr(a)) : 0 > a && (a = -a,
            t = m(t, a + 1),
            r = t.slice(-a, t.length) + r,
            t = t.slice(0, -a)),
            r = e > 0 ? i["."] + (r.length > e ? r.slice(0, e) : m(r, e)) : "",
            e = t.length - 1,
            i = i[","],
            a = ""; e >= 0; ) {
                if (0 === n || n > e)
                    return t.slice(0, e + 1) + (a.length ? i + a + r : r);
                a = t.slice(e - n + 1, e + 1) + (a.length ? i + a : ""),
                e -= n,
                o < s.length && (n = s[o],
                o++)
            }
            return t.slice(0, e + 1) + i + a + r
        }
        ,
        b = function(e, i, s) {
            if (!isFinite(e))
                return 1 / 0 === e ? s.numberFormat.positiveInfinity : e === -1 / 0 ? s.numberFormat.negativeInfinity : s.numberFormat.NaN;
            if (!i || "i" === i)
                return s.name.length ? e.toLocaleString() : e.toString();
            var i = i || "D"
              , s = s.numberFormat
              , n = Math.abs(e)
              , o = -1;
            i.length > 1 && (o = parseInt(i.slice(1), 10));
            var r, a = i.charAt(0).toUpperCase();
            switch (a) {
            case "D":
                i = "n",
                n = g(n),
                -1 !== o && (n = m("" + n, o, !0)),
                0 > e && (n = "-" + n);
                break;
            case "N":
                r = s;
            case "C":
                r = r || s.currency;
            case "P":
                r = r || s.percent,
                i = 0 > e ? r.pattern[0] : r.pattern[1] || "n",
                -1 === o && (o = r.decimals),
                n = t(n * ("P" === a ? 100 : 1), o, r);
                break;
            default:
                throw "Bad number format specifier: " + a
            }
            for (e = /n|\$|-|%/g,
            r = ""; o = e.lastIndex,
            a = e.exec(i),
            r += i.slice(o, a ? a.index : i.length),
            a; )
                switch (a[0]) {
                case "n":
                    r += n;
                    break;
                case "$":
                    r += s.currency.symbol;
                    break;
                case "-":
                    /[1-9]/.test(n) && (r += s["-"]);
                    break;
                case "%":
                    r += s.percent.symbol
                }
            return r
        }
    }(),
    k = function() {
        return /\/|dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|y|hh|h|HH|H|mm|m|ss|s|tt|t|fff|ff|f|zzz|zz|z|gg|g/g
    }
    ,
    w = function(t, e) {
        if (!e)
            return 0;
        for (var i, s = t.getTime(), n = 0, o = e.length; o > n; n++)
            if (i = e[n].start,
            null === i || s >= i)
                return n;
        return 0
    }
    ,
    C = function(t, e, i, s) {
        return t = t.getFullYear(),
        !s && e.eras && (t -= e.eras[i].offset),
        t
    }
    ,
    function() {
        var t, e, i, s, n, o, r;
        t = function(t, e) {
            var i = new Date
              , s = w(i);
            if (100 > e) {
                var n = t.twoDigitYearMax
                  , n = "string" == typeof n ? (new Date).getFullYear() % 100 + parseInt(n, 10) : n
                  , i = C(i, t, s);
                e += i - i % 100,
                e > n && (e -= 100)
            }
            return e
        }
        ,
        e = function(t, e, i) {
            var s = t.days
              , n = t._upperDays;
            return n || (t._upperDays = n = [r(s.names), r(s.namesAbbr), r(s.namesShort)]),
            e = o(e),
            i ? (t = a(n[1], e),
            -1 === t && (t = a(n[2], e))) : t = a(n[0], e),
            t
        }
        ,
        i = function(t, e, i) {
            var s = t.months
              , n = t.monthsGenitive || t.months
              , l = t._upperMonths
              , h = t._upperMonthsGen;
            return l || (t._upperMonths = l = [r(s.names), r(s.namesAbbr)],
            t._upperMonthsGen = h = [r(n.names), r(n.namesAbbr)]),
            e = o(e),
            t = a(i ? l[1] : l[0], e),
            0 > t && (t = a(i ? h[1] : h[0], e)),
            t
        }
        ,
        s = function(t, e) {
            var i = t._parseRegExp;
            if (i) {
                var s = i[e];
                if (s)
                    return s
            } else
                t._parseRegExp = i = {};
            for (var n, s = y(t, e).replace(/([\^\$\.\*\+\?\|\[\]\(\)\{\}])/g, "\\\\$1"), o = ["^"], r = [], a = 0, l = 0, h = k(); null !== (n = h.exec(s)); ) {
                var c = s.slice(a, n.index)
                  , a = h.lastIndex;
                if (l += v(c, o),
                l % 2)
                    o.push(n[0]);
                else {
                    var c = n[0]
                      , d = c.length;
                    switch (c) {
                    case "dddd":
                    case "ddd":
                    case "MMMM":
                    case "MMM":
                    case "gg":
                    case "g":
                        c = "(\\D+)";
                        break;
                    case "tt":
                    case "t":
                        c = "(\\D*)";
                        break;
                    case "yyyy":
                    case "fff":
                    case "ff":
                    case "f":
                        c = "(\\d{" + d + "})";
                        break;
                    case "dd":
                    case "d":
                    case "MM":
                    case "M":
                    case "yy":
                    case "y":
                    case "HH":
                    case "H":
                    case "hh":
                    case "h":
                    case "mm":
                    case "m":
                    case "ss":
                    case "s":
                        c = "(\\d\\d?)";
                        break;
                    case "zzz":
                        c = "([+-]?\\d\\d?:\\d{2})";
                        break;
                    case "zz":
                    case "z":
                        c = "([+-]?\\d\\d?)";
                        break;
                    case "/":
                        c = "(\\" + t["/"] + ")";
                        break;
                    default:
                        throw "Invalid date format pattern '" + c + "'."
                    }
                    c && o.push(c),
                    r.push(n[0])
                }
            }
            return v(s.slice(a), o),
            o.push("$"),
            s = {
                regExp: o.join("").replace(/\s+/g, "\\s+"),
                groups: r
            },
            i[e] = s
        }
        ,
        n = function(t, e, i) {
            return e > t || t > i
        }
        ,
        o = function(t) {
            return t.split(" ").join(" ").toUpperCase()
        }
        ,
        r = function(t) {
            for (var e = [], i = 0, s = t.length; s > i; i++)
                e[i] = o(t[i]);
            return e
        }
        ,
        S = function(o, r, a) {
            var o = f(o)
              , a = a.calendar
              , r = s(a, r)
              , l = RegExp(r.regExp).exec(o);
            if (null === l)
                return null;
            var h, c = r.groups, d = r = o = null, u = null, g = null, m = 0, v = 0, y = 0, x = 0;
            h = null;
            for (var b = !1, k = 0, w = c.length; w > k; k++) {
                var C = l[k + 1];
                if (C) {
                    var S = c[k]
                      , T = S.length
                      , M = parseInt(C, 10);
                    switch (S) {
                    case "dd":
                    case "d":
                        if (u = M,
                        n(u, 1, 31))
                            return null;
                        break;
                    case "MMM":
                    case "MMMM":
                        if (d = i(a, C, 3 === T),
                        n(d, 0, 11))
                            return null;
                        break;
                    case "M":
                    case "MM":
                        if (d = M - 1,
                        n(d, 0, 11))
                            return null;
                        break;
                    case "y":
                    case "yy":
                    case "yyyy":
                        if (r = 4 > T ? t(a, M) : M,
                        n(r, 0, 9999))
                            return null;
                        break;
                    case "h":
                    case "hh":
                        if (m = M,
                        12 === m && (m = 0),
                        n(m, 0, 11))
                            return null;
                        break;
                    case "H":
                    case "HH":
                        if (m = M,
                        n(m, 0, 23))
                            return null;
                        break;
                    case "m":
                    case "mm":
                        if (v = M,
                        n(v, 0, 59))
                            return null;
                        break;
                    case "s":
                    case "ss":
                        if (y = M,
                        n(y, 0, 59))
                            return null;
                        break;
                    case "tt":
                    case "t":
                        if (b = a.PM && (C === a.PM[0] || C === a.PM[1] || C === a.PM[2]),
                        !b && (!a.AM || C !== a.AM[0] && C !== a.AM[1] && C !== a.AM[2]))
                            return null;
                        break;
                    case "f":
                    case "ff":
                    case "fff":
                        if (x = M * Math.pow(10, 3 - T),
                        n(x, 0, 999))
                            return null;
                        break;
                    case "ddd":
                    case "dddd":
                        if (g = e(a, C, 3 === T),
                        n(g, 0, 6))
                            return null;
                        break;
                    case "zzz":
                        if (S = C.split(/:/),
                        2 !== S.length)
                            return null;
                        if (h = parseInt(S[0], 10),
                        n(h, -12, 13))
                            return null;
                        if (S = parseInt(S[1], 10),
                        n(S, 0, 59))
                            return null;
                        h = 60 * h + (p(C, "-") ? -S : S);
                        break;
                    case "z":
                    case "zz":
                        if (h = M,
                        n(h, -12, 13))
                            return null;
                        h *= 60;
                        break;
                    case "g":
                    case "gg":
                        if (!C || !a.eras)
                            return null;
                        for (C = f(C.toLowerCase()),
                        S = 0,
                        T = a.eras.length; T > S; S++)
                            if (C === a.eras[S].name.toLowerCase()) {
                                o = S;
                                break
                            }
                        if (null === o)
                            return null
                    }
                }
            }
            if (l = new Date,
            c = (k = a.convert) ? k.fromGregorian(l)[0] : l.getFullYear(),
            null === r ? r = c : a.eras && (r += a.eras[o || 0].offset),
            null === d && (d = 0),
            null === u && (u = 1),
            k) {
                if (l = k.toGregorian(r, d, u),
                null === l)
                    return null
            } else {
                if (l.setFullYear(r, d, u),
                l.getDate() !== u)
                    return null;
                if (null !== g && l.getDay() !== g)
                    return null
            }
            return b && 12 > m && (m += 12),
            l.setHours(m, v, y, x),
            null !== h && (a = l.getMinutes() - (h + l.getTimezoneOffset()),
            l.setHours(l.getHours() + parseInt(a / 60, 10), a % 60)),
            l
        }
    }(),
    T = function(t, e, i) {
        var s, n = e["-"], e = e["+"];
        switch (i) {
        case "n -":
            n = " " + n,
            e = " " + e;
        case "n-":
            l(t, n) ? s = ["-", t.substr(0, t.length - n.length)] : l(t, e) && (s = ["+", t.substr(0, t.length - e.length)]);
            break;
        case "- n":
            n += " ",
            e += " ";
        case "-n":
            p(t, n) ? s = ["-", t.substr(n.length)] : p(t, e) && (s = ["+", t.substr(e.length)]);
            break;
        case "(n)":
            p(t, "(") && l(t, ")") && (s = ["-", t.substr(1, t.length - 2)])
        }
        return s || ["", t]
    }
    ,
    i.prototype.findClosestCulture = function(t) {
        return i.findClosestCulture.call(this, t)
    }
    ,
    i.prototype.format = function(t, e, s) {
        return i.format.call(this, t, e, s)
    }
    ,
    i.prototype.localize = function(t, e) {
        return i.localize.call(this, t, e)
    }
    ,
    i.prototype.parseInt = function(t, e, s) {
        return i.parseInt.call(this, t, e, s)
    }
    ,
    i.prototype.parseFloat = function(t, e, s) {
        return i.parseFloat.call(this, t, e, s)
    }
    ,
    i.prototype.culture = function(t) {
        return i.culture.call(this, t)
    }
    ,
    i.addCultureInfo = function(t, e, i) {
        var s = {}
          , n = !1;
        "string" != typeof t ? (i = t,
        t = this.culture().name,
        s = this.cultures[t]) : "string" != typeof e ? (i = e,
        n = null == this.cultures[t],
        s = this.cultures[t] || this.cultures["default"]) : (n = !0,
        s = this.cultures[e]),
        this.cultures[t] = h(!0, {}, s, i),
        n && (this.cultures[t].calendar = this.cultures[t].calendars.standard)
    }
    ,
    i.findClosestCulture = function(t) {
        var e;
        if (!t)
            return this.cultures[this.cultureSelector] || this.cultures["default"];
        if ("string" == typeof t && (t = t.split(",")),
        c(t)) {
            var i, s, n = this.cultures, o = t, r = o.length, a = [];
            for (s = 0; r > s; s++)
                t = f(o[s]),
                t = t.split(";"),
                i = f(t[0]),
                1 === t.length ? t = 1 : (t = f(t[1]),
                0 === t.indexOf("q=") ? (t = t.substr(2),
                t = parseFloat(t),
                t = isNaN(t) ? 0 : t) : t = 1),
                a.push({
                    lang: i,
                    pri: t
                });
            for (a.sort(function(t, e) {
                return t.pri < e.pri ? 1 : -1
            }),
            s = 0; r > s; s++)
                if (i = a[s].lang,
                e = n[i])
                    return e;
            for (s = 0; r > s; s++)
                for (i = a[s].lang; ; ) {
                    if (o = i.lastIndexOf("-"),
                    -1 === o)
                        break;
                    if (i = i.substr(0, o),
                    e = n[i])
                        return e
                }
            for (s = 0; r > s; s++) {
                i = a[s].lang;
                for (var l in n)
                    if (o = n[l],
                    o.language == i)
                        return o
            }
        } else if ("object" == typeof t)
            return t;
        return e || null
    }
    ,
    i.format = function(t, e, i) {
        return culture = this.findClosestCulture(i),
        t instanceof Date ? t = x(t, e, culture) : "number" == typeof t && (t = b(t, e, culture)),
        t
    }
    ,
    i.localize = function(t, e) {
        return this.findClosestCulture(e).messages[t] || this.cultures["default"].messages.key
    }
    ,
    i.parseDate = function(t, e, i) {
        var s, n, i = this.findClosestCulture(i);
        if (e) {
            if ("string" == typeof e && (e = [e]),
            e.length) {
                n = 0;
                for (var o = e.length; o > n; n++) {
                    var r = e[n];
                    if (r && (s = S(t, r, i)))
                        break
                }
            }
        } else
            for (n in e = i.calendar.patterns)
                if (s = S(t, e[n], i))
                    break;
        return s || null
    }
    ,
    i.parseInt = function(t, e, s) {
        return g(i.parseFloat(t, e, s))
    }
    ,
    i.parseFloat = function(t, e, i) {
        "number" != typeof e && (i = e,
        e = 10);
        var r = this.findClosestCulture(i)
          , i = 0 / 0
          , a = r.numberFormat;
        if (t.indexOf(r.numberFormat.currency.symbol) > -1 && (t = t.replace(r.numberFormat.currency.symbol, ""),
        t = t.replace(r.numberFormat.currency["."], r.numberFormat["."])),
        t = f(t),
        n.test(t))
            i = parseFloat(t);
        else if (!e && s.test(t))
            i = parseInt(t, 16);
        else {
            r = T(t, a, a.pattern[0]),
            e = r[0],
            r = r[1],
            "" === e && "-n" !== a.pattern[0] && (r = T(t, a, "-n"),
            e = r[0],
            r = r[1]);
            var l, e = e || "+", t = r.indexOf("e");
            0 > t && (t = r.indexOf("E")),
            0 > t ? (l = r,
            t = null) : (l = r.substr(0, t),
            t = r.substr(t + 1));
            var h = a["."]
              , c = l.indexOf(h);
            0 > c ? (r = l,
            l = null) : (r = l.substr(0, c),
            l = l.substr(c + h.length)),
            h = a[","],
            r = r.split(h).join(""),
            c = h.replace(/\u00A0/g, " "),
            h !== c && (r = r.split(c).join("")),
            e += r,
            null !== l && (e += "." + l),
            null !== t && (a = T(t, a, "-n"),
            e += "e" + (a[0] || "+") + a[1]),
            o.test(e) && (i = parseFloat(e))
        }
        return i
    }
    ,
    i.culture = function(t) {
        return "undefined" != typeof t && (this.cultureSelector = t),
        this.findClosestCulture(t) || this.culture["default"]
    }
}(this),
function(t) {
    var e;
    e = "undefined" != typeof require && "undefined" != typeof exports && "undefined" != typeof module ? require("globalize") : t.Globalize,
    e.addCultureInfo("en-IN", "default", {
        name: "en-IN",
        englishName: "English (India)",
        nativeName: "English (India)",
        numberFormat: {
            groupSizes: [3, 2],
            percent: {
                groupSizes: [3, 2]
            },
            currency: {
                pattern: ["$ -n", "$ n"],
                groupSizes: [3, 2],
                symbol: "Rs."
            }
        },
        calendars: {
            standard: {
                "/": "-",
                firstDay: 1,
                patterns: {
                    d: "dd-MM-yyyy",
                    D: "dd MMMM yyyy",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    f: "dd MMMM yyyy HH:mm",
                    F: "dd MMMM yyyy HH:mm:ss",
                    M: "dd MMMM"
                }
            }
        }
    })
}(this),
function(t, e) {
    "object" == typeof module && module.exports ? module.exports = t.document ? e(t) : e : t.Highcharts = e(t)
}("undefined" != typeof window ? window : this, function(t) {
    function e(e, i) {
        var s = "Highcharts error #" + e + ": www.highcharts.com/errors/" + e;
        if (i)
            throw Error(s);
        t.console && console.log(s)
    }
    function i(t, e, i) {
        this.options = e,
        this.elem = t,
        this.prop = i
    }
    function s() {
        var t, e, i = arguments, s = {}, n = function(t, e) {
            var i, s;
            "object" != typeof t && (t = {});
            for (s in e)
                e.hasOwnProperty(s) && (i = e[s],
                t[s] = i && "object" == typeof i && "[object Array]" !== Object.prototype.toString.call(i) && "renderTo" !== s && "number" != typeof i.nodeType ? n(t[s] || {}, i) : e[s]);
            return t
        };
        for (i[0] === !0 && (s = i[1],
        i = Array.prototype.slice.call(i, 2)),
        e = i.length,
        t = 0; e > t; t++)
            s = n(s, i[t]);
        return s
    }
    function n(t, e) {
        return parseInt(t, e || 10)
    }
    function o(t) {
        return "string" == typeof t
    }
    function r(t) {
        return t && "object" == typeof t
    }
    function a(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }
    function l(t) {
        return "number" == typeof t
    }
    function h(t) {
        return le.log(t) / le.LN10
    }
    function c(t) {
        return le.pow(10, t)
    }
    function d(t, e) {
        for (var i = t.length; i--; )
            if (t[i] === e) {
                t.splice(i, 1);
                break
            }
    }
    function u(t) {
        return t !== _ && null !== t
    }
    function p(t, e, i) {
        var s, n;
        if (o(e))
            u(i) ? t.setAttribute(e, i) : t && t.getAttribute && (n = t.getAttribute(e));
        else if (u(e) && r(e))
            for (s in e)
                t.setAttribute(s, e[s]);
        return n
    }
    function f(t) {
        return a(t) ? t : [t]
    }
    function g(t, e, i) {
        return e ? setTimeout(t, e, i) : void t.call(0, i)
    }
    function m(t, e) {
        ke && !De && e && e.opacity !== _ && (e.filter = "alpha(opacity=" + 100 * e.opacity + ")"),
        Ze(t.style, e)
    }
    function v(t, e, i, s, n) {
        return t = ae.createElement(t),
        e && Ze(t, e),
        n && m(t, {
            padding: 0,
            border: "none",
            margin: 0
        }),
        i && m(t, i),
        s && s.appendChild(t),
        t
    }
    function y(t, e) {
        var i = function() {};
        return i.prototype = new t,
        Ze(i.prototype, e),
        i
    }
    function x(t, e) {
        return Array((e || 2) + 1 - String(t).length).join(0) + t
    }
    function b(t) {
        return 6e4 * (X && X(t) || U || 0)
    }
    function k(t, e) {
        for (var i, s, n, o, r, a = "{", l = !1, h = []; -1 !== (a = t.indexOf(a)); ) {
            if (i = t.slice(0, a),
            l) {
                for (s = i.split(":"),
                n = s.shift().split("."),
                r = n.length,
                i = e,
                o = 0; r > o; o++)
                    i = i[n[o]];
                s.length && (s = s.join(":"),
                n = /\.([0-9])/,
                o = W.lang,
                r = void 0,
                /f$/.test(s) ? (r = (r = s.match(n)) ? r[1] : -1,
                null !== i && (i = re.numberFormat(i, r, o.decimalPoint, s.indexOf(",") > -1 ? o.thousandsSep : ""))) : i = N(s, i))
            }
            h.push(i),
            t = t.slice(a + 1),
            a = (l = !l) ? "}" : "{"
        }
        return h.push(t),
        h.join("")
    }
    function w(t) {
        return le.pow(10, ce(le.log(t) / le.LN10))
    }
    function C(t, e, i, s, n) {
        var o, r = t, i = Je(i, 1);
        for (o = t / i,
        e || (e = [1, 2, 2.5, 5, 10],
        s === !1 && (1 === i ? e = [1, 2, 5, 10] : .1 >= i && (e = [1 / i]))),
        s = 0; s < e.length && (r = e[s],
        !(n && r * i >= t || !n && o <= (e[s] + (e[s + 1] || e[s])) / 2)); s++)
            ;
        return r *= i
    }
    function S(t, e) {
        var i, s, n = t.length;
        for (s = 0; n > s; s++)
            t[s].safeI = s;
        for (t.sort(function(t, s) {
            return i = e(t, s),
            0 === i ? t.safeI - s.safeI : i
        }),
        s = 0; n > s; s++)
            delete t[s].safeI
    }
    function T(t) {
        for (var e = t.length, i = t[0]; e--; )
            t[e] < i && (i = t[e]);
        return i
    }
    function M(t) {
        for (var e = t.length, i = t[0]; e--; )
            t[e] > i && (i = t[e]);
        return i
    }
    function D(t, e) {
        for (var i in t)
            t[i] && t[i] !== e && t[i].destroy && t[i].destroy(),
            delete t[i]
    }
    function A(t) {
        R || (R = v(Fe)),
        t && R.appendChild(t),
        R.innerHTML = ""
    }
    function L(t, e) {
        return parseFloat(t.toPrecision(e || 14))
    }
    function P(t, e) {
        e.renderer.globalAnimation = Je(t, e.animation)
    }
    function I() {
        var e = W.global
          , i = e.useUTC
          , s = i ? "getUTC" : "get"
          , n = i ? "setUTC" : "set";
        Y = e.Date || t.Date,
        U = i && e.timezoneOffset,
        X = i && e.getTimezoneOffset,
        G = function(t, e, s, n, o, r) {
            var a;
            return i ? (a = Y.UTC.apply(0, arguments),
            a += b(a)) : a = new Y(t,e,Je(s, 1),Je(n, 0),Je(o, 0),Je(r, 0)).getTime(),
            a
        }
        ,
        V = s + "Minutes",
        j = s + "Hours",
        q = s + "Day",
        K = s + "Date",
        Z = s + "Month",
        J = s + "FullYear",
        Q = n + "Milliseconds",
        te = n + "Seconds",
        ee = n + "Minutes",
        ie = n + "Hours",
        se = n + "Date",
        ne = n + "Month",
        oe = n + "FullYear"
    }
    function z(t) {
        return this instanceof z ? void this.init(t) : new z(t)
    }
    function O() {}
    function E(t, e, i, s) {
        this.axis = t,
        this.pos = e,
        this.type = i || "",
        this.isNew = !0,
        !i && !s && this.addLabel()
    }
    function F(t, e, i, s, n) {
        var o = t.chart.inverted;
        this.axis = t,
        this.isNegative = i,
        this.options = e,
        this.x = s,
        this.total = null,
        this.points = {},
        this.stack = n,
        this.rightCliff = this.leftCliff = 0,
        this.alignOptions = {
            align: e.align || (o ? i ? "left" : "right" : "center"),
            verticalAlign: e.verticalAlign || (o ? "middle" : i ? "bottom" : "top"),
            y: Je(e.y, o ? 4 : i ? 14 : -6),
            x: Je(e.x, o ? i ? -6 : 6 : 0)
        },
        this.textAlign = e.textAlign || (o ? i ? "right" : "left" : "center")
    }
    var _, H, B, R, W, N, $, Y, G, U, X, V, j, q, K, Z, J, Q, te, ee, ie, se, ne, oe, re, ae = t.document, le = Math, he = le.round, ce = le.floor, de = le.ceil, ue = le.max, pe = le.min, fe = le.abs, ge = le.cos, me = le.sin, ve = le.PI, ye = 2 * ve / 360, xe = t.navigator && t.navigator.userAgent || "", be = t.opera, ke = /(msie|trident|edge)/i.test(xe) && !be, we = ae && 8 === ae.documentMode, Ce = !ke && /AppleWebKit/.test(xe), Se = /Firefox/.test(xe), Te = /(Mobile|Android|Windows Phone)/.test(xe), Me = "http://www.w3.org/2000/svg", De = ae && ae.createElementNS && !!ae.createElementNS(Me, "svg").createSVGRect, Ae = Se && parseInt(xe.split("Firefox/")[1], 10) < 4, Le = ae && !De && !ke && !!ae.createElement("canvas").getContext, Pe = {}, Ie = 0, ze = function() {}, Oe = [], Ee = 0, Fe = "div", _e = /^[0-9]+$/, He = ["plotTop", "marginRight", "marginBottom", "plotLeft"], Be = {};
    re = t.Highcharts ? e(16, !0) : {
        win: t
    },
    re.seriesTypes = Be;
    var Re, We, Ne, $e, Ye, Ge, Ue, Xe, Ve, je, qe, Ke = [];
    i.prototype = {
        dSetter: function() {
            var t, e = this.paths[0], i = this.paths[1], s = [], n = this.now, o = e.length;
            if (1 === n)
                s = this.toD;
            else if (o === i.length && 1 > n)
                for (; o--; )
                    t = parseFloat(e[o]),
                    s[o] = isNaN(t) ? e[o] : n * parseFloat(i[o] - t) + t;
            else
                s = i;
            this.elem.attr("d", s)
        },
        update: function() {
            var t = this.elem
              , e = this.prop
              , i = this.now
              , s = this.options.step;
            this[e + "Setter"] ? this[e + "Setter"]() : t.attr ? t.element && t.attr(e, i) : t.style[e] = i + this.unit,
            s && s.call(t, i, this)
        },
        run: function(t, e, i) {
            var s, n = this, o = function(t) {
                return o.stopped ? !1 : n.step(t)
            };
            this.startTime = +new Y,
            this.start = t,
            this.end = e,
            this.unit = i,
            this.now = this.start,
            this.pos = 0,
            o.elem = this.elem,
            o() && 1 === Ke.push(o) && (o.timerId = setInterval(function() {
                for (s = 0; s < Ke.length; s++)
                    Ke[s]() || Ke.splice(s--, 1);
                Ke.length || clearInterval(o.timerId)
            }, 13))
        },
        step: function(t) {
            var e, i = +new Y, s = this.options;
            e = this.elem;
            var n, o = s.complete, r = s.duration, a = s.curAnim;
            if (e.attr && !e.element)
                e = !1;
            else if (t || i >= r + this.startTime) {
                this.now = this.end,
                this.pos = 1,
                this.update(),
                t = a[this.prop] = !0;
                for (n in a)
                    a[n] !== !0 && (t = !1);
                t && o && o.call(e),
                e = !1
            } else
                this.pos = s.easing((i - this.startTime) / r),
                this.now = this.start + (this.end - this.start) * this.pos,
                this.update(),
                e = !0;
            return e
        },
        initPath: function(t, e, i) {
            var s, e = e || "", n = t.shift, o = e.indexOf("C") > -1, r = o ? 7 : 3, e = e.split(" "), i = [].concat(i), a = t.isArea, l = a ? 2 : 1, h = function(t) {
                for (s = t.length; s--; )
                    ("M" === t[s] || "L" === t[s]) && t.splice(s + 1, 0, t[s + 1], t[s + 2], t[s + 1], t[s + 2])
            };
            if (o && (h(e),
            h(i)),
            n <= i.length / r && e.length === i.length)
                for (; n--; )
                    i = i.slice(0, r).concat(i),
                    a && (i = i.concat(i.slice(i.length - r)));
            if (t.shift = 0,
            e.length)
                for (t = i.length; e.length < t; )
                    n = e.slice().splice(e.length / l - r, r * l),
                    o && (n[r - 6] = n[r - 2],
                    n[r - 5] = n[r - 1]),
                    [].splice.apply(e, [e.length / l, 0].concat(n));
            return [e, i]
        }
    };
    var Ze = re.extend = function(t, e) {
        var i;
        t || (t = {});
        for (i in e)
            t[i] = e[i];
        return t
    }
      , Je = re.pick = function() {
        var t, e, i = arguments, s = i.length;
        for (t = 0; s > t; t++)
            if (e = i[t],
            e !== _ && null !== e)
                return e
    }
      , Qe = re.wrap = function(t, e, i) {
        var s = t[e];
        t[e] = function() {
            var t = Array.prototype.slice.call(arguments);
            return t.unshift(s),
            i.apply(this, t)
        }
    }
    ;
    N = function(t, e, i) {
        if (!u(e) || isNaN(e))
            return W.lang.invalidDate || "";
        var s, t = Je(t, "%Y-%m-%d %H:%M:%S"), n = new Y(e - b(e)), o = n[j](), r = n[q](), a = n[K](), l = n[Z](), h = n[J](), c = W.lang, d = c.weekdays, n = Ze({
            a: d[r].substr(0, 3),
            A: d[r],
            d: x(a),
            e: a,
            w: r,
            b: c.shortMonths[l],
            B: c.months[l],
            m: x(l + 1),
            y: h.toString().substr(2, 2),
            Y: h,
            H: x(o),
            k: o,
            I: x(o % 12 || 12),
            l: o % 12 || 12,
            M: x(n[V]()),
            p: 12 > o ? "AM" : "PM",
            P: 12 > o ? "am" : "pm",
            S: x(n.getSeconds()),
            L: x(he(e % 1e3), 3)
        }, re.dateFormats);
        for (s in n)
            for (; -1 !== t.indexOf("%" + s); )
                t = t.replace("%" + s, "function" == typeof n[s] ? n[s](e) : n[s]);
        return i ? t.substr(0, 1).toUpperCase() + t.substr(1) : t
    }
    ,
    $ = {
        millisecond: 1,
        second: 1e3,
        minute: 6e4,
        hour: 36e5,
        day: 864e5,
        week: 6048e5,
        month: 24192e5,
        year: 314496e5
    },
    re.numberFormat = function(t, e, i, s) {
        var o, r, t = +t || 0, a = W.lang, l = (t.toString().split(".")[1] || "").length, h = Math.abs(t);
        return -1 === e ? e = Math.min(l, 20) : isNaN(e) && (e = 2),
        o = String(n(h.toFixed(e))),
        r = o.length > 3 ? o.length % 3 : 0,
        i = Je(i, a.decimalPoint),
        s = Je(s, a.thousandsSep),
        t = 0 > t ? "-" : "",
        t += r ? o.substr(0, r) + s : "",
        t += o.substr(r).replace(/(\d{3})(?=\d)/g, "$1" + s),
        +e && (s = Math.abs(h - o + Math.pow(10, -Math.max(e, l) - 1)),
        t += i + s.toFixed(e).slice(2)),
        t
    }
    ,
    Math.easeInOutSine = function(t) {
        return -.5 * (Math.cos(Math.PI * t) - 1)
    }
    ,
    Re = function(e, i) {
        var s;
        return "width" === i ? Math.min(e.offsetWidth, e.scrollWidth) - Re(e, "padding-left") - Re(e, "padding-right") : "height" === i ? Math.min(e.offsetHeight, e.scrollHeight) - Re(e, "padding-top") - Re(e, "padding-bottom") : (s = t.getComputedStyle(e, void 0)) && n(s.getPropertyValue(i))
    }
    ,
    We = function(t, e) {
        return e.indexOf ? e.indexOf(t) : [].indexOf.call(e, t)
    }
    ,
    $e = function(t, e) {
        return [].filter.call(t, e)
    }
    ,
    Ge = function(t, e) {
        for (var i = [], s = 0, n = t.length; n > s; s++)
            i[s] = e.call(t[s], t[s], s, t);
        return i
    }
    ,
    Ye = function(e) {
        var i = ae.documentElement
          , e = e.getBoundingClientRect();
        return {
            top: e.top + (t.pageYOffset || i.scrollTop) - (i.clientTop || 0),
            left: e.left + (t.pageXOffset || i.scrollLeft) - (i.clientLeft || 0)
        }
    }
    ,
    qe = function(t) {
        for (var e = Ke.length; e--; )
            Ke[e].elem === t && (Ke[e].stopped = !0)
    }
    ,
    Ne = function(t, e) {
        return Array.prototype.forEach.call(t, e)
    }
    ,
    Ue = function(e, i, s) {
        function n(i) {
            i.target = i.srcElement || t,
            s.call(e, i)
        }
        var o = e.hcEvents = e.hcEvents || {};
        e.addEventListener ? e.addEventListener(i, s, !1) : e.attachEvent && (e.hcEventsIE || (e.hcEventsIE = {}),
        e.hcEventsIE[s.toString()] = n,
        e.attachEvent("on" + i, n)),
        o[i] || (o[i] = []),
        o[i].push(s)
    }
    ,
    Xe = function(t, e, i) {
        function s(e, i) {
            t.removeEventListener ? t.removeEventListener(e, i, !1) : t.attachEvent && (i = t.hcEventsIE[i.toString()],
            t.detachEvent("on" + e, i))
        }
        function n() {
            var i, n, o;
            if (t.nodeName)
                for (o in e ? (i = {},
                i[e] = !0) : i = a,
                i)
                    if (a[o])
                        for (n = a[o].length; n--; )
                            s(o, a[o][n])
        }
        var o, r, a = t.hcEvents;
        a && (e ? (o = a[e] || [],
        i ? (r = We(i, o),
        r > -1 && (o.splice(r, 1),
        a[e] = o),
        s(e, i)) : (n(),
        a[e] = [])) : (n(),
        t.hcEvents = {}))
    }
    ,
    Ve = function(t, e, i, s) {
        var n;
        n = t.hcEvents;
        var o, r, a, l, i = i || {};
        if (ae.createEvent && (t.dispatchEvent || t.fireEvent))
            n = ae.createEvent("Events"),
            n.initEvent(e, !0, !0),
            n.target = t,
            Ze(n, i),
            t.dispatchEvent ? t.dispatchEvent(n) : t.fireEvent(e, n);
        else if (n)
            for (n = n[e] || [],
            o = n.length,
            a = function() {
                i.defaultPrevented = !0
            }
            ,
            r = 0; o > r; r++) {
                if (l = n[r],
                i.stopped)
                    return;
                i.preventDefault = a,
                i.target = t,
                i.type || (i.type = e),
                l.call(t, i) === !1 && i.preventDefault()
            }
        s && !i.defaultPrevented && s(i)
    }
    ,
    je = function(t, e, n) {
        var o, a, h, c, d = "";
        r(n) || (o = arguments,
        n = {
            duration: o[2],
            easing: o[3],
            complete: o[4]
        }),
        l(n.duration) || (n.duration = 400),
        n.easing = Math[n.easing] || Math.easeInOutSine,
        n.curAnim = s(e);
        for (c in e)
            h = new i(t,n,c),
            a = null,
            "d" === c ? (h.paths = h.initPath(t, t.d, e.d),
            h.toD = e.d,
            o = 0,
            a = 1) : t.attr ? o = t.attr(c) : (o = parseFloat(Re(t, c)) || 0,
            "opacity" !== c && (d = "px")),
            a || (a = e[c]),
            a.match && a.match("px") && (a = a.replace(/px/g, "")),
            h.run(o, a, d)
    }
    ,
    t.jQuery && (t.jQuery.fn.highcharts = function() {
        var t = [].slice.call(arguments);
        return this[0] ? t[0] ? (new (re[o(t[0]) ? t.shift() : "Chart"])(this[0],t[0],t[1]),
        this) : Oe[p(this[0], "data-highcharts-chart")] : void 0
    }
    ),
    ae && !ae.defaultView && (Re = function(t, e) {
        var i;
        return i = {
            width: "clientWidth",
            height: "clientHeight"
        }[e],
        t.style[e] ? n(t.style[e]) : ("opacity" === e && (e = "filter"),
        i ? (t.style.zoom = 1,
        t[i] - 2 * Re(t, "padding")) : (i = t.currentStyle[e.replace(/\-(\w)/g, function(t, e) {
            return e.toUpperCase()
        })],
        "filter" === e && (i = i.replace(/alpha\(opacity=([0-9]+)\)/, function(t, e) {
            return e / 100
        })),
        "" === i ? 1 : n(i)))
    }
    ),
    Array.prototype.forEach || (Ne = function(t, e) {
        for (var i = 0, s = t.length; s > i; i++)
            if (e.call(t[i], t[i], i, t) === !1)
                return i
    }
    ),
    Array.prototype.indexOf || (We = function(t, e) {
        var i, s = 0;
        if (e)
            for (i = e.length; i > s; s++)
                if (e[s] === t)
                    return s;
        return -1
    }
    ),
    Array.prototype.filter || ($e = function(t, e) {
        for (var i = [], s = 0, n = t.length; n > s; s++)
            e(t[s], s) && i.push(t[s]);
        return i
    }
    ),
    re.Fx = i,
    re.inArray = We,
    re.each = Ne,
    re.grep = $e,
    re.offset = Ye,
    re.map = Ge,
    re.addEvent = Ue,
    re.removeEvent = Xe,
    re.fireEvent = Ve,
    re.animate = je,
    re.stop = qe,
    W = {
        colors: "#7cb5ec,#434348,#90ed7d,#f7a35c,#8085e9,#f15c80,#e4d354,#2b908f,#f45b5b,#91e8e1".split(","),
        symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
        lang: {
            loading: "Loading...",
            months: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
            shortMonths: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
            weekdays: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
            decimalPoint: ".",
            numericSymbols: "k,M,G,T,P,E".split(","),
            resetZoom: "Reset zoom",
            resetZoomTitle: "Reset zoom level 1:1",
            thousandsSep: " "
        },
        global: {
            useUTC: !0,
            canvasToolsURL: "http://code.highcharts.com/modules/canvas-tools.js",
            VMLRadialGradientURL: "http://code.highcharts.com/4.2.2/gfx/vml-radial-gradient.png"
        },
        chart: {
            borderColor: "#4572A7",
            borderRadius: 0,
            defaultSeriesType: "line",
            ignoreHiddenSeries: !0,
            spacing: [10, 10, 15, 10],
            backgroundColor: "#FFFFFF",
            plotBorderColor: "#C0C0C0",
            resetZoomButton: {
                theme: {
                    zIndex: 20
                },
                position: {
                    align: "right",
                    x: -10,
                    y: 10
                }
            }
        },
        title: {
            text: "Chart title",
            align: "center",
            margin: 15,
            style: {
                color: "#333333",
                fontSize: "18px"
            }
        },
        subtitle: {
            text: "",
            align: "center",
            style: {
                color: "#555555"
            }
        },
        plotOptions: {
            line: {
                allowPointSelect: !1,
                showCheckbox: !1,
                animation: {
                    duration: 1e3
                },
                events: {},
                lineWidth: 2,
                marker: {
                    lineWidth: 0,
                    radius: 4,
                    lineColor: "#FFFFFF",
                    states: {
                        hover: {
                            enabled: !0,
                            lineWidthPlus: 1,
                            radiusPlus: 2
                        },
                        select: {
                            fillColor: "#FFFFFF",
                            lineColor: "#000000",
                            lineWidth: 2
                        }
                    }
                },
                point: {
                    events: {}
                },
                dataLabels: {
                    align: "center",
                    formatter: function() {
                        return null === this.y ? "" : re.numberFormat(this.y, -1)
                    },
                    style: {
                        color: "contrast",
                        fontSize: "11px",
                        fontWeight: "bold",
                        textShadow: "0 0 6px contrast, 0 0 3px contrast"
                    },
                    verticalAlign: "bottom",
                    x: 0,
                    y: 0,
                    padding: 5
                },
                cropThreshold: 300,
                pointRange: 0,
                softThreshold: !0,
                states: {
                    hover: {
                        lineWidthPlus: 1,
                        marker: {},
                        halo: {
                            size: 10,
                            opacity: .25
                        }
                    },
                    select: {
                        marker: {}
                    }
                },
                stickyTracking: !0,
                turboThreshold: 1e3
            }
        },
        labels: {
            style: {
                position: "absolute",
                color: "#3E576F"
            }
        },
        legend: {
            enabled: !0,
            align: "center",
            layout: "horizontal",
            labelFormatter: function() {
                return this.name
            },
            borderColor: "#909090",
            borderRadius: 0,
            navigation: {
                activeColor: "#274b6d",
                inactiveColor: "#CCC"
            },
            shadow: !1,
            itemStyle: {
                color: "#333333",
                fontSize: "12px",
                fontWeight: "bold"
            },
            itemHoverStyle: {
                color: "#000"
            },
            itemHiddenStyle: {
                color: "#CCC"
            },
            itemCheckboxStyle: {
                position: "absolute",
                width: "13px",
                height: "13px"
            },
            symbolPadding: 5,
            verticalAlign: "bottom",
            x: 0,
            y: 0,
            title: {
                style: {
                    fontWeight: "bold"
                }
            }
        },
        loading: {
            labelStyle: {
                fontWeight: "bold",
                position: "relative",
                top: "45%"
            },
            style: {
                position: "absolute",
                backgroundColor: "white",
                opacity: .5,
                textAlign: "center"
            }
        },
        tooltip: {
            enabled: !0,
            animation: De,
            backgroundColor: "rgba(249, 249, 249, .85)",
            borderWidth: 1,
            borderRadius: 3,
            dateTimeLabelFormats: {
                millisecond: "%A, %b %e, %H:%M:%S.%L",
                second: "%A, %b %e, %H:%M:%S",
                minute: "%A, %b %e, %H:%M",
                hour: "%A, %b %e, %H:%M",
                day: "%A, %b %e, %Y",
                week: "Week from %A, %b %e, %Y",
                month: "%B %Y",
                year: "%Y"
            },
            footerFormat: "",
            headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
            pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y}</b><br/>',
            shadow: !0,
            snap: Te ? 25 : 10,
            style: {
                color: "#333333",
                cursor: "default",
                fontSize: "12px",
                padding: "8px",
                pointerEvents: "none",
                whiteSpace: "nowrap"
            }
        },
        credits: {
            enabled: !0,
            text: "Highcharts.com",
            href: "http://www.highcharts.com",
            position: {
                align: "right",
                x: -10,
                verticalAlign: "bottom",
                y: -5
            },
            style: {
                cursor: "pointer",
                color: "#909090",
                fontSize: "9px"
            }
        }
    };
    var ti = W.plotOptions
      , ei = ti.line;
    I(),
    z.prototype = {
        parsers: [{
            regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
            parse: function(t) {
                return [n(t[1]), n(t[2]), n(t[3]), parseFloat(t[4], 10)]
            }
        }, {
            regex: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
            parse: function(t) {
                return [n(t[1], 16), n(t[2], 16), n(t[3], 16), 1]
            }
        }, {
            regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
            parse: function(t) {
                return [n(t[1]), n(t[2]), n(t[3]), 1]
            }
        }],
        init: function(t) {
            var e, i, s, n;
            if ((this.input = t) && t.stops)
                this.stops = Ge(t.stops, function(t) {
                    return new z(t[1])
                });
            else
                for (s = this.parsers.length; s-- && !i; )
                    n = this.parsers[s],
                    (e = n.regex.exec(t)) && (i = n.parse(e));
            this.rgba = i || []
        },
        get: function(t) {
            var e, i = this.input, n = this.rgba;
            return this.stops ? (e = s(i),
            e.stops = [].concat(e.stops),
            Ne(this.stops, function(i, s) {
                e.stops[s] = [e.stops[s][0], i.get(t)]
            })) : e = n && !isNaN(n[0]) ? "rgb" === t || !t && 1 === n[3] ? "rgb(" + n[0] + "," + n[1] + "," + n[2] + ")" : "a" === t ? n[3] : "rgba(" + n.join(",") + ")" : i,
            e
        },
        brighten: function(t) {
            var e, i = this.rgba;
            if (this.stops)
                Ne(this.stops, function(e) {
                    e.brighten(t)
                });
            else if (l(t) && 0 !== t)
                for (e = 0; 3 > e; e++)
                    i[e] += n(255 * t),
                    i[e] < 0 && (i[e] = 0),
                    i[e] > 255 && (i[e] = 255);
            return this
        },
        setOpacity: function(t) {
            return this.rgba[3] = t,
            this
        }
    },
    O.prototype = {
        opacity: 1,
        textProps: "direction,fontSize,fontWeight,fontFamily,fontStyle,color,lineHeight,width,textDecoration,textOverflow,textShadow".split(","),
        init: function(t, e) {
            this.element = "span" === e ? v(e) : ae.createElementNS(Me, e),
            this.renderer = t
        },
        animate: function(t, e, i) {
            return e = Je(e, this.renderer.globalAnimation, !0),
            qe(this),
            e ? (e = s(e, {}),
            i && (e.complete = i),
            je(this, t, e)) : this.attr(t, null, i),
            this
        },
        colorGradient: function(t, e, i) {
            var n, o, r, l, h, c, d, p, f, g, m, v, y = this.renderer, x = [];
            if (t.linearGradient ? o = "linearGradient" : t.radialGradient && (o = "radialGradient"),
            o) {
                r = t[o],
                h = y.gradients,
                d = t.stops,
                g = i.radialReference,
                a(r) && (t[o] = r = {
                    x1: r[0],
                    y1: r[1],
                    x2: r[2],
                    y2: r[3],
                    gradientUnits: "userSpaceOnUse"
                }),
                "radialGradient" === o && g && !u(r.gradientUnits) && (l = r,
                r = s(r, y.getRadialAttr(g, l), {
                    gradientUnits: "userSpaceOnUse"
                }));
                for (m in r)
                    "id" !== m && x.push(m, r[m]);
                for (m in d)
                    x.push(d[m]);
                x = x.join(","),
                h[x] ? g = h[x].attr("id") : (r.id = g = "highcharts-" + Ie++,
                h[x] = c = y.createElement(o).attr(r).add(y.defs),
                c.radAttr = l,
                c.stops = [],
                Ne(d, function(t) {
                    0 === t[1].indexOf("rgba") ? (n = z(t[1]),
                    p = n.get("rgb"),
                    f = n.get("a")) : (p = t[1],
                    f = 1),
                    t = y.createElement("stop").attr({
                        offset: t[0],
                        "stop-color": p,
                        "stop-opacity": f
                    }).add(c),
                    c.stops.push(t)
                })),
                v = "url(" + y.url + "#" + g + ")",
                i.setAttribute(e, v),
                i.gradient = x,
                t.toString = function() {
                    return v
                }
            }
        },
        applyTextShadow: function(t) {
            var e, i = this.element, s = -1 !== t.indexOf("contrast"), o = {}, r = this.renderer.forExport, a = r || i.style.textShadow !== _ && !ke;
            s && (o.textShadow = t = t.replace(/contrast/g, this.renderer.getContrast(i.style.fill))),
            (Ce || r) && (o.textRendering = "geometricPrecision"),
            a ? this.css(o) : (this.fakeTS = !0,
            this.ySetter = this.xSetter,
            e = [].slice.call(i.getElementsByTagName("tspan")),
            Ne(t.split(/\s?,\s?/g), function(t) {
                var s, o, r = i.firstChild, t = t.split(" ");
                s = t[t.length - 1],
                (o = t[t.length - 2]) && Ne(e, function(t, e) {
                    var a;
                    0 === e && (t.setAttribute("x", i.getAttribute("x")),
                    e = i.getAttribute("y"),
                    t.setAttribute("y", e || 0),
                    null === e && i.setAttribute("y", 0)),
                    a = t.cloneNode(1),
                    p(a, {
                        "class": "highcharts-text-shadow",
                        fill: s,
                        stroke: s,
                        "stroke-opacity": 1 / ue(n(o), 3),
                        "stroke-width": o,
                        "stroke-linejoin": "round"
                    }),
                    i.insertBefore(a, r)
                })
            }))
        },
        attr: function(t, e, i) {
            var s, n, o, r = this.element, a = this;
            if ("string" == typeof t && e !== _ && (s = t,
            t = {},
            t[s] = e),
            "string" == typeof t)
                a = (this[t + "Getter"] || this._defaultGetter).call(this, t, r);
            else {
                for (s in t)
                    e = t[s],
                    o = !1,
                    this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(s) && (n || (this.symbolAttr(t),
                    n = !0),
                    o = !0),
                    !this.rotation || "x" !== s && "y" !== s || (this.doTransform = !0),
                    o || (o = this[s + "Setter"] || this._defaultSetter,
                    o.call(this, e, s, r),
                    this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(s) && this.updateShadows(s, e, o));
                this.doTransform && (this.updateTransform(),
                this.doTransform = !1)
            }
            return i && i(),
            a
        },
        updateShadows: function(t, e, i) {
            for (var s = this.shadows, n = s.length; n--; )
                i.call(null, "height" === t ? Math.max(e - (s[n].cutHeight || 0), 0) : "d" === t ? this.d : e, t, s[n])
        },
        addClass: function(t) {
            var e = this.element
              , i = p(e, "class") || "";
            return -1 === i.indexOf(t) && p(e, "class", i + " " + t),
            this
        },
        symbolAttr: function(t) {
            var e = this;
            Ne("x,y,r,start,end,width,height,innerR,anchorX,anchorY".split(","), function(i) {
                e[i] = Je(t[i], e[i])
            }),
            e.attr({
                d: e.renderer.symbols[e.symbolName](e.x, e.y, e.width, e.height, e)
            })
        },
        clip: function(t) {
            return this.attr("clip-path", t ? "url(" + this.renderer.url + "#" + t.id + ")" : "none")
        },
        crisp: function(t) {
            var e, i, s = {}, n = t.strokeWidth || this.strokeWidth || 0;
            i = he(n) % 2 / 2,
            t.x = ce(t.x || this.x || 0) + i,
            t.y = ce(t.y || this.y || 0) + i,
            t.width = ce((t.width || this.width || 0) - 2 * i),
            t.height = ce((t.height || this.height || 0) - 2 * i),
            t.strokeWidth = n;
            for (e in t)
                this[e] !== t[e] && (this[e] = s[e] = t[e]);
            return s
        },
        css: function(t) {
            var e, i, s = this.styles, o = {}, r = this.element, a = "";
            if (e = !s,
            t && t.color && (t.fill = t.color),
            s)
                for (i in t)
                    t[i] !== s[i] && (o[i] = t[i],
                    e = !0);
            if (e) {
                if (e = this.textWidth = t && t.width && "text" === r.nodeName.toLowerCase() && n(t.width) || this.textWidth,
                s && (t = Ze(s, o)),
                this.styles = t,
                e && (Le || !De && this.renderer.forExport) && delete t.width,
                ke && !De)
                    m(this.element, t);
                else {
                    s = function(t, e) {
                        return "-" + e.toLowerCase()
                    }
                    ;
                    for (i in t)
                        a += i.replace(/([A-Z])/g, s) + ":" + t[i] + ";";
                    p(r, "style", a)
                }
                e && this.added && this.renderer.buildText(this)
            }
            return this
        },
        on: function(t, e) {
            var i = this
              , s = i.element;
            return B && "click" === t ? (s.ontouchstart = function(t) {
                i.touchEventFired = Y.now(),
                t.preventDefault(),
                e.call(s, t)
            }
            ,
            s.onclick = function(t) {
                (-1 === xe.indexOf("Android") || Y.now() - (i.touchEventFired || 0) > 1100) && e.call(s, t)
            }
            ) : s["on" + t] = e,
            this
        },
        setRadialReference: function(t) {
            var e = this.renderer.gradients[this.element.gradient];
            return this.element.radialReference = t,
            e && e.radAttr && e.animate(this.renderer.getRadialAttr(t, e.radAttr)),
            this
        },
        translate: function(t, e) {
            return this.attr({
                translateX: t,
                translateY: e
            })
        },
        invert: function() {
            return this.inverted = !0,
            this.updateTransform(),
            this
        },
        updateTransform: function() {
            var t = this.translateX || 0
              , e = this.translateY || 0
              , i = this.scaleX
              , s = this.scaleY
              , n = this.inverted
              , o = this.rotation
              , r = this.element;
            n && (t += this.attr("width"),
            e += this.attr("height")),
            t = ["translate(" + t + "," + e + ")"],
            n ? t.push("rotate(90) scale(-1,1)") : o && t.push("rotate(" + o + " " + (r.getAttribute("x") || 0) + " " + (r.getAttribute("y") || 0) + ")"),
            (u(i) || u(s)) && t.push("scale(" + Je(i, 1) + " " + Je(s, 1) + ")"),
            t.length && r.setAttribute("transform", t.join(" "))
        },
        toFront: function() {
            var t = this.element;
            return t.parentNode.appendChild(t),
            this
        },
        align: function(t, e, i) {
            var s, n, r, a, l = {};
            return n = this.renderer,
            r = n.alignedObjects,
            t ? (this.alignOptions = t,
            this.alignByTranslate = e,
            (!i || o(i)) && (this.alignTo = s = i || "renderer",
            d(r, this),
            r.push(this),
            i = null)) : (t = this.alignOptions,
            e = this.alignByTranslate,
            s = this.alignTo),
            i = Je(i, n[s], n),
            s = t.align,
            n = t.verticalAlign,
            r = (i.x || 0) + (t.x || 0),
            a = (i.y || 0) + (t.y || 0),
            ("right" === s || "center" === s) && (r += (i.width - (t.width || 0)) / {
                right: 1,
                center: 2
            }[s]),
            l[e ? "translateX" : "x"] = he(r),
            ("bottom" === n || "middle" === n) && (a += (i.height - (t.height || 0)) / ({
                bottom: 1,
                middle: 2
            }[n] || 1)),
            l[e ? "translateY" : "y"] = he(a),
            this[this.placed ? "animate" : "attr"](l),
            this.placed = !0,
            this.alignAttr = l,
            this
        },
        getBBox: function(t, e) {
            var i, s, n, o, r = this.renderer, a = this.element, l = this.styles;
            s = this.textStr;
            var h, c, d, u = a.style, p = r.cache, f = r.cacheKeys;
            if (n = Je(e, this.rotation),
            o = n * ye,
            s !== _ && (d = ["", n || 0, l && l.fontSize, a.style.width].join(","),
            d = "" === s || _e.test(s) ? "num:" + s.toString().length + d : s + d),
            d && !t && (i = p[d]),
            !i) {
                if (a.namespaceURI === Me || r.forExport) {
                    try {
                        c = this.fakeTS && function(t) {
                            Ne(a.querySelectorAll(".highcharts-text-shadow"), function(e) {
                                e.style.display = t
                            })
                        }
                        ,
                        Se && u.textShadow ? (h = u.textShadow,
                        u.textShadow = "") : c && c("none"),
                        i = a.getBBox ? Ze({}, a.getBBox()) : {
                            width: a.offsetWidth,
                            height: a.offsetHeight
                        },
                        h ? u.textShadow = h : c && c("")
                    } catch (g) {}
                    (!i || i.width < 0) && (i = {
                        width: 0,
                        height: 0
                    })
                } else
                    i = this.htmlGetBBox();
                if (r.isSVG && (r = i.width,
                s = i.height,
                ke && l && "11px" === l.fontSize && "16.9" === s.toPrecision(3) && (i.height = s = 14),
                n && (i.width = fe(s * me(o)) + fe(r * ge(o)),
                i.height = fe(s * ge(o)) + fe(r * me(o)))),
                d) {
                    for (; f.length > 250; )
                        delete p[f.shift()];
                    p[d] || f.push(d),
                    p[d] = i
                }
            }
            return i
        },
        show: function(t) {
            return this.attr({
                visibility: t ? "inherit" : "visible"
            })
        },
        hide: function() {
            return this.attr({
                visibility: "hidden"
            })
        },
        fadeOut: function(t) {
            var e = this;
            e.animate({
                opacity: 0
            }, {
                duration: t || 150,
                complete: function() {
                    e.attr({
                        y: -9999
                    })
                }
            })
        },
        add: function(t) {
            var e, i = this.renderer, s = this.element;
            return t && (this.parentGroup = t),
            this.parentInverted = t && t.inverted,
            void 0 !== this.textStr && i.buildText(this),
            this.added = !0,
            (!t || t.handleZ || this.zIndex) && (e = this.zIndexSetter()),
            e || (t ? t.element : i.box).appendChild(s),
            this.onAdd && this.onAdd(),
            this
        },
        safeRemoveChild: function(t) {
            var e = t.parentNode;
            e && e.removeChild(t)
        },
        destroy: function() {
            var t, e, i = this, s = i.element || {}, n = i.shadows, o = i.renderer.isSVG && "SPAN" === s.nodeName && i.parentGroup;
            if (s.onclick = s.onmouseout = s.onmouseover = s.onmousemove = s.point = null,
            qe(i),
            i.clipPath && (i.clipPath = i.clipPath.destroy()),
            i.stops) {
                for (e = 0; e < i.stops.length; e++)
                    i.stops[e] = i.stops[e].destroy();
                i.stops = null
            }
            for (i.safeRemoveChild(s),
            n && Ne(n, function(t) {
                i.safeRemoveChild(t)
            }); o && o.div && 0 === o.div.childNodes.length; )
                s = o.parentGroup,
                i.safeRemoveChild(o.div),
                delete o.div,
                o = s;
            i.alignTo && d(i.renderer.alignedObjects, i);
            for (t in i)
                delete i[t];
            return null
        },
        shadow: function(t, e, i) {
            var s, n, o, r, a, l, h = [], c = this.element;
            if (t) {
                for (r = Je(t.width, 3),
                a = (t.opacity || .15) / r,
                l = this.parentInverted ? "(-1,-1)" : "(" + Je(t.offsetX, 1) + ", " + Je(t.offsetY, 1) + ")",
                s = 1; r >= s; s++)
                    n = c.cloneNode(0),
                    o = 2 * r + 1 - 2 * s,
                    p(n, {
                        isShadow: "true",
                        stroke: t.color || "black",
                        "stroke-opacity": a * s,
                        "stroke-width": o,
                        transform: "translate" + l,
                        fill: "none"
                    }),
                    i && (p(n, "height", ue(p(n, "height") - o, 0)),
                    n.cutHeight = o),
                    e ? e.element.appendChild(n) : c.parentNode.insertBefore(n, c),
                    h.push(n);
                this.shadows = h
            }
            return this
        },
        xGetter: function(t) {
            return "circle" === this.element.nodeName && (t = {
                x: "cx",
                y: "cy"
            }[t] || t),
            this._defaultGetter(t)
        },
        _defaultGetter: function(t) {
            return t = Je(this[t], this.element ? this.element.getAttribute(t) : null, 0),
            /^[\-0-9\.]+$/.test(t) && (t = parseFloat(t)),
            t
        },
        dSetter: function(t, e, i) {
            t && t.join && (t = t.join(" ")),
            /(NaN| {2}|^$)/.test(t) && (t = "M 0 0"),
            i.setAttribute(e, t),
            this[e] = t
        },
        dashstyleSetter: function(t) {
            var e;
            if (t = t && t.toLowerCase()) {
                for (t = t.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(","),
                e = t.length; e--; )
                    t[e] = n(t[e]) * this["stroke-width"];
                t = t.join(",").replace("NaN", "none"),
                this.element.setAttribute("stroke-dasharray", t)
            }
        },
        alignSetter: function(t) {
            this.element.setAttribute("text-anchor", {
                left: "start",
                center: "middle",
                right: "end"
            }[t])
        },
        opacitySetter: function(t, e, i) {
            this[e] = t,
            i.setAttribute(e, t)
        },
        titleSetter: function(t) {
            var e = this.element.getElementsByTagName("title")[0];
            e || (e = ae.createElementNS(Me, "title"),
            this.element.appendChild(e)),
            e.appendChild(ae.createTextNode(String(Je(t), "").replace(/<[^>]*>/g, "")))
        },
        textSetter: function(t) {
            t !== this.textStr && (delete this.bBox,
            this.textStr = t,
            this.added && this.renderer.buildText(this))
        },
        fillSetter: function(t, e, i) {
            "string" == typeof t ? i.setAttribute(e, t) : t && this.colorGradient(t, e, i)
        },
        visibilitySetter: function(t, e, i) {
            "inherit" === t ? i.removeAttribute(e) : i.setAttribute(e, t)
        },
        zIndexSetter: function(t, e) {
            var i, s, o, r = this.renderer, a = this.parentGroup, r = (a || r).element || r.box, l = this.element;
            i = this.added;
            var h;
            if (u(t) && (l.setAttribute(e, t),
            t = +t,
            this[e] === t && (i = !1),
            this[e] = t),
            i) {
                for ((t = this.zIndex) && a && (a.handleZ = !0),
                a = r.childNodes,
                h = 0; h < a.length && !o; h++)
                    i = a[h],
                    s = p(i, "zIndex"),
                    i !== l && (n(s) > t || !u(t) && u(s)) && (r.insertBefore(l, i),
                    o = !0);
                o || r.appendChild(l)
            }
            return o
        },
        _defaultSetter: function(t, e, i) {
            i.setAttribute(e, t)
        }
    },
    O.prototype.yGetter = O.prototype.xGetter,
    O.prototype.translateXSetter = O.prototype.translateYSetter = O.prototype.rotationSetter = O.prototype.verticalAlignSetter = O.prototype.scaleXSetter = O.prototype.scaleYSetter = function(t, e) {
        this[e] = t,
        this.doTransform = !0
    }
    ,
    O.prototype["stroke-widthSetter"] = O.prototype.strokeSetter = function(t, e, i) {
        this[e] = t,
        this.stroke && this["stroke-width"] ? (this.strokeWidth = this["stroke-width"],
        O.prototype.fillSetter.call(this, this.stroke, "stroke", i),
        i.setAttribute("stroke-width", this["stroke-width"]),
        this.hasStroke = !0) : "stroke-width" === e && 0 === t && this.hasStroke && (i.removeAttribute("stroke"),
        this.hasStroke = !1)
    }
    ;
    var ii = function() {
        this.init.apply(this, arguments)
    };
    ii.prototype = {
        Element: O,
        init: function(e, i, s, n, o, r) {
            var a, n = this.createElement("svg").attr({
                version: "1.1"
            }).css(this.getStyle(n));
            a = n.element,
            e.appendChild(a),
            -1 === e.innerHTML.indexOf("xmlns") && p(a, "xmlns", Me),
            this.isSVG = !0,
            this.box = a,
            this.boxWrapper = n,
            this.alignedObjects = [],
            this.url = (Se || Ce) && ae.getElementsByTagName("base").length ? t.location.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "",
            this.createElement("desc").add().element.appendChild(ae.createTextNode("Created with Highcharts 4.2.2")),
            this.defs = this.createElement("defs").add(),
            this.allowHTML = r,
            this.forExport = o,
            this.gradients = {},
            this.cache = {},
            this.cacheKeys = [],
            this.imgCount = 0,
            this.setSize(i, s, !1);
            var l;
            Se && e.getBoundingClientRect && (this.subPixelFix = i = function() {
                m(e, {
                    left: 0,
                    top: 0
                }),
                l = e.getBoundingClientRect(),
                m(e, {
                    left: de(l.left) - l.left + "px",
                    top: de(l.top) - l.top + "px"
                })
            }
            ,
            i(),
            Ue(t, "resize", i))
        },
        getStyle: function(t) {
            return this.style = Ze({
                fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                fontSize: "12px"
            }, t)
        },
        isHidden: function() {
            return !this.boxWrapper.getBBox().width
        },
        destroy: function() {
            var e = this.defs;
            return this.box = null,
            this.boxWrapper = this.boxWrapper.destroy(),
            D(this.gradients || {}),
            this.gradients = null,
            e && (this.defs = e.destroy()),
            this.subPixelFix && Xe(t, "resize", this.subPixelFix),
            this.alignedObjects = null
        },
        createElement: function(t) {
            var e = new this.Element;
            return e.init(this, t),
            e
        },
        draw: function() {},
        getRadialAttr: function(t, e) {
            return {
                cx: t[0] - t[2] / 2 + e.cx * t[2],
                cy: t[1] - t[2] / 2 + e.cy * t[2],
                r: e.r * t[2]
            }
        },
        buildText: function(t) {
            for (var e, i, s = t.element, o = this, r = o.forExport, a = Je(t.textStr, "").toString(), l = -1 !== a.indexOf("<"), h = s.childNodes, c = p(s, "x"), d = t.styles, u = t.textWidth, f = d && d.lineHeight, g = d && d.textShadow, v = d && "ellipsis" === d.textOverflow, y = h.length, x = u && !t.added && this.box, b = function(t) {
                return f ? n(f) : o.fontMetrics(/(px|em)$/.test(t && t.style.fontSize) ? t.style.fontSize : d && d.fontSize || o.style.fontSize || 12, t).h
            }, k = function(t) {
                return t.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
            }; y--; )
                s.removeChild(h[y]);
            l || g || v || -1 !== a.indexOf(" ") ? (e = /<.*style="([^"]+)".*>/,
            i = /<.*href="(http[^"]+)".*>/,
            x && x.appendChild(s),
            a = l ? a.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(/<br.*?>/g) : [a],
            "" === a[a.length - 1] && a.pop(),
            Ne(a, function(n, a) {
                var l, h = 0, n = n.replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||");
                l = n.split("|||"),
                Ne(l, function(n) {
                    if ("" !== n || 1 === l.length) {
                        var f, g = {}, y = ae.createElementNS(Me, "tspan");
                        if (e.test(n) && (f = n.match(e)[1].replace(/(;| |^)color([ :])/, "$1fill$2"),
                        p(y, "style", f)),
                        i.test(n) && !r && (p(y, "onclick", 'location.href="' + n.match(i)[1] + '"'),
                        m(y, {
                            cursor: "pointer"
                        })),
                        n = k(n.replace(/<(.|\n)*?>/g, "") || " "),
                        " " !== n) {
                            if (y.appendChild(ae.createTextNode(n)),
                            h ? g.dx = 0 : a && null !== c && (g.x = c),
                            p(y, g),
                            s.appendChild(y),
                            !h && a && (!De && r && m(y, {
                                display: "block"
                            }),
                            p(y, "dy", b(y))),
                            u) {
                                for (var x, w, C, g = n.replace(/([^\^])-/g, "$1- ").split(" "), S = l.length > 1 || a || g.length > 1 && "nowrap" !== d.whiteSpace, T = [], M = b(y), D = 1, A = t.rotation, L = n, P = L.length; (S || v) && (g.length || T.length); )
                                    t.rotation = 0,
                                    x = t.getBBox(!0),
                                    C = x.width,
                                    !De && o.forExport && (C = o.measureSpanWidth(y.firstChild.data, t.styles)),
                                    x = C > u,
                                    void 0 === w && (w = x),
                                    v && w ? (P /= 2,
                                    "" === L || !x && .5 > P ? g = [] : (x && (w = !0),
                                    L = n.substring(0, L.length + (x ? -1 : 1) * de(P)),
                                    g = [L + (u > 3 ? "…" : "")],
                                    y.removeChild(y.firstChild))) : x && 1 !== g.length ? (y.removeChild(y.firstChild),
                                    T.unshift(g.pop())) : (g = T,
                                    T = [],
                                    g.length && (D++,
                                    y = ae.createElementNS(Me, "tspan"),
                                    p(y, {
                                        dy: M,
                                        x: c
                                    }),
                                    f && p(y, "style", f),
                                    s.appendChild(y)),
                                    C > u && (u = C)),
                                    g.length && y.appendChild(ae.createTextNode(g.join(" ").replace(/- /g, "-")));
                                w && t.attr("title", t.textStr),
                                t.rotation = A
                            }
                            h++
                        }
                    }
                })
            }),
            x && x.removeChild(s),
            g && t.applyTextShadow && t.applyTextShadow(g)) : s.appendChild(ae.createTextNode(k(a)))
        },
        getContrast: function(t) {
            return t = z(t).rgba,
            t[0] + t[1] + t[2] > 384 ? "#000000" : "#FFFFFF"
        },
        button: function(t, e, i, n, o, r, a, l, h) {
            var c, d, u, p, f, g, m = this.label(t, e, i, h, null, null, null, null, "button"), v = 0, t = {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
            }, o = s({
                "stroke-width": 1,
                stroke: "#CCCCCC",
                fill: {
                    linearGradient: t,
                    stops: [[0, "#FEFEFE"], [1, "#F6F6F6"]]
                },
                r: 2,
                padding: 5,
                style: {
                    color: "black"
                }
            }, o);
            return u = o.style,
            delete o.style,
            r = s(o, {
                stroke: "#68A",
                fill: {
                    linearGradient: t,
                    stops: [[0, "#FFF"], [1, "#ACF"]]
                }
            }, r),
            p = r.style,
            delete r.style,
            a = s(o, {
                stroke: "#68A",
                fill: {
                    linearGradient: t,
                    stops: [[0, "#9BD"], [1, "#CDF"]]
                }
            }, a),
            f = a.style,
            delete a.style,
            l = s(o, {
                style: {
                    color: "#CCC"
                }
            }, l),
            g = l.style,
            delete l.style,
            Ue(m.element, ke ? "mouseover" : "mouseenter", function() {
                3 !== v && m.attr(r).css(p)
            }),
            Ue(m.element, ke ? "mouseout" : "mouseleave", function() {
                3 !== v && (c = [o, r, a][v],
                d = [u, p, f][v],
                m.attr(c).css(d))
            }),
            m.setState = function(t) {
                (m.state = v = t) ? 2 === t ? m.attr(a).css(f) : 3 === t && m.attr(l).css(g) : m.attr(o).css(u)
            }
            ,
            m.on("click", function(t) {
                3 !== v && n.call(m, t)
            }).attr(o).css(Ze({
                cursor: "default"
            }, u))
        },
        crispLine: function(t, e) {
            return t[1] === t[4] && (t[1] = t[4] = he(t[1]) - e % 2 / 2),
            t[2] === t[5] && (t[2] = t[5] = he(t[2]) + e % 2 / 2),
            t
        },
        path: function(t) {
            var e = {
                fill: "none"
            };
            return a(t) ? e.d = t : r(t) && Ze(e, t),
            this.createElement("path").attr(e)
        },
        circle: function(t, e, i) {
            return t = r(t) ? t : {
                x: t,
                y: e,
                r: i
            },
            e = this.createElement("circle"),
            e.xSetter = e.ySetter = function(t, e, i) {
                i.setAttribute("c" + e, t)
            }
            ,
            e.attr(t)
        },
        arc: function(t, e, i, s, n, o) {
            return r(t) && (e = t.y,
            i = t.r,
            s = t.innerR,
            n = t.start,
            o = t.end,
            t = t.x),
            t = this.symbol("arc", t || 0, e || 0, i || 0, i || 0, {
                innerR: s || 0,
                start: n || 0,
                end: o || 0
            }),
            t.r = i,
            t
        },
        rect: function(t, e, i, s, n, o) {
            var n = r(t) ? t.r : n
              , a = this.createElement("rect")
              , t = r(t) ? t : t === _ ? {} : {
                x: t,
                y: e,
                width: ue(i, 0),
                height: ue(s, 0)
            };
            return o !== _ && (t.strokeWidth = o,
            t = a.crisp(t)),
            n && (t.r = n),
            a.rSetter = function(t) {
                p(this.element, {
                    rx: t,
                    ry: t
                })
            }
            ,
            a.attr(t)
        },
        setSize: function(t, e, i) {
            var s = this.alignedObjects
              , n = s.length;
            for (this.width = t,
            this.height = e,
            this.boxWrapper[Je(i, !0) ? "animate" : "attr"]({
                width: t,
                height: e
            }); n--; )
                s[n].align()
        },
        g: function(t) {
            var e = this.createElement("g");
            return u(t) ? e.attr({
                "class": "highcharts-" + t
            }) : e
        },
        image: function(t, e, i, s, n) {
            var o = {
                preserveAspectRatio: "none"
            };
            return arguments.length > 1 && Ze(o, {
                x: e,
                y: i,
                width: s,
                height: n
            }),
            o = this.createElement("image").attr(o),
            o.element.setAttributeNS ? o.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", t) : o.element.setAttribute("hc-svg-href", t),
            o
        },
        symbol: function(t, e, i, s, n, o) {
            var r, a, l, h = this, c = this.symbols[t], c = c && c(he(e), he(i), s, n, o), d = /^url\((.*?)\)$/;
            return c ? (r = this.path(c),
            Ze(r, {
                symbolName: t,
                x: e,
                y: i,
                width: s,
                height: n
            }),
            o && Ze(r, o)) : d.test(t) && (l = function(t, e) {
                t.element && (t.attr({
                    width: e[0],
                    height: e[1]
                }),
                t.alignByTranslate || t.translate(he((s - e[0]) / 2), he((n - e[1]) / 2)))
            }
            ,
            a = t.match(d)[1],
            t = Pe[a] || o && o.width && o.height && [o.width, o.height],
            r = this.image(a).attr({
                x: e,
                y: i
            }),
            r.isImg = !0,
            t ? l(r, t) : (r.attr({
                width: 0,
                height: 0
            }),
            v("img", {
                onload: function() {
                    0 === this.width && (m(this, {
                        position: "absolute",
                        top: "-999em"
                    }),
                    ae.body.appendChild(this)),
                    l(r, Pe[a] = [this.width, this.height]),
                    this.parentNode && this.parentNode.removeChild(this),
                    h.imgCount--,
                    h.imgCount || Oe[h.chartIndex].onload()
                },
                src: a
            })),
            this.imgCount++),
            r
        },
        symbols: {
            circle: function(t, e, i, s) {
                var n = .166 * i;
                return ["M", t + i / 2, e, "C", t + i + n, e, t + i + n, e + s, t + i / 2, e + s, "C", t - n, e + s, t - n, e, t + i / 2, e, "Z"]
            },
            square: function(t, e, i, s) {
                return ["M", t, e, "L", t + i, e, t + i, e + s, t, e + s, "Z"]
            },
            triangle: function(t, e, i, s) {
                return ["M", t + i / 2, e, "L", t + i, e + s, t, e + s, "Z"]
            },
            "triangle-down": function(t, e, i, s) {
                return ["M", t, e, "L", t + i, e, t + i / 2, e + s, "Z"]
            },
            diamond: function(t, e, i, s) {
                return ["M", t + i / 2, e, "L", t + i, e + s / 2, t + i / 2, e + s, t, e + s / 2, "Z"]
            },
            arc: function(t, e, i, s, n) {
                var o = n.start
                  , i = n.r || i || s
                  , r = n.end - .001
                  , s = n.innerR
                  , a = n.open
                  , l = ge(o)
                  , h = me(o)
                  , c = ge(r)
                  , r = me(r)
                  , n = n.end - o < ve ? 0 : 1;
                return ["M", t + i * l, e + i * h, "A", i, i, 0, n, 1, t + i * c, e + i * r, a ? "M" : "L", t + s * c, e + s * r, "A", s, s, 0, n, 0, t + s * l, e + s * h, a ? "" : "Z"]
            },
            callout: function(t, e, i, s, n) {
                var o, r = pe(n && n.r || 0, i, s), a = r + 6, l = n && n.anchorX, n = n && n.anchorY;
                return o = ["M", t + r, e, "L", t + i - r, e, "C", t + i, e, t + i, e, t + i, e + r, "L", t + i, e + s - r, "C", t + i, e + s, t + i, e + s, t + i - r, e + s, "L", t + r, e + s, "C", t, e + s, t, e + s, t, e + s - r, "L", t, e + r, "C", t, e, t, e, t + r, e],
                l && l > i && n > e + a && e + s - a > n ? o.splice(13, 3, "L", t + i, n - 6, t + i + 6, n, t + i, n + 6, t + i, e + s - r) : l && 0 > l && n > e + a && e + s - a > n ? o.splice(33, 3, "L", t, n + 6, t - 6, n, t, n - 6, t, e + r) : n && n > s && l > t + a && t + i - a > l ? o.splice(23, 3, "L", l + 6, e + s, l, e + s + 6, l - 6, e + s, t + r, e + s) : n && 0 > n && l > t + a && t + i - a > l && o.splice(3, 3, "L", l - 6, e, l, e - 6, l + 6, e, i - r, e),
                o
            }
        },
        clipRect: function(t, e, i, s) {
            var n = "highcharts-" + Ie++
              , o = this.createElement("clipPath").attr({
                id: n
            }).add(this.defs)
              , t = this.rect(t, e, i, s, 0).add(o);
            return t.id = n,
            t.clipPath = o,
            t.count = 0,
            t
        },
        text: function(t, e, i, s) {
            var n = Le || !De && this.forExport
              , o = {};
            return !s || !this.allowHTML && this.forExport ? (o.x = Math.round(e || 0),
            i && (o.y = Math.round(i)),
            (t || 0 === t) && (o.text = t),
            t = this.createElement("text").attr(o),
            n && t.css({
                position: "absolute"
            }),
            s || (t.xSetter = function(t, e, i) {
                var s, n, o = i.getElementsByTagName("tspan"), r = i.getAttribute(e);
                for (n = 0; n < o.length; n++)
                    s = o[n],
                    s.getAttribute(e) === r && s.setAttribute(e, t);
                i.setAttribute(e, t)
            }
            ),
            t) : this.html(t, e, i)
        },
        fontMetrics: function(e, i) {
            var s, o, e = e || this.style.fontSize;
            return !e && i && t.getComputedStyle && (i = i.element || i,
            e = (s = t.getComputedStyle(i, "")) && s.fontSize),
            e = /px/.test(e) ? n(e) : /em/.test(e) ? 12 * parseFloat(e) : 12,
            s = 24 > e ? e + 3 : he(1.2 * e),
            o = he(.8 * s),
            {
                h: s,
                b: o,
                f: e
            }
        },
        rotCorr: function(t, e, i) {
            var s = t;
            return e && i && (s = ue(s * ge(e * ye), 4)),
            {
                x: -t / 3 * me(e * ye),
                y: s
            }
        },
        label: function(t, e, i, n, o, r, a, l, h) {
            var c, d, p, f, g, m, v, y, x, b, k, w = this, C = w.g(h), S = w.text("", 0, 0, a).attr({
                zIndex: 1
            }), T = 0, M = 3, D = 0, A = 0, L = {};
            x = function() {
                var t, e;
                t = S.element.style,
                d = (void 0 === p || void 0 === f || C.styles.textAlign) && u(S.textStr) && S.getBBox(),
                C.width = (p || d.width || 0) + 2 * M + D,
                C.height = (f || d.height || 0) + 2 * M,
                v = M + w.fontMetrics(t && t.fontSize, S).b,
                y && (c || (t = A,
                e = (l ? -v : 0) + A,
                C.box = c = n ? w.symbol(n, t, e, C.width, C.height, L) : w.rect(t, e, C.width, C.height, 0, L["stroke-width"]),
                c.isImg || c.attr("fill", "none"),
                c.add(C)),
                c.isImg || c.attr(Ze({
                    width: he(C.width),
                    height: he(C.height)
                }, L)),
                L = null)
            }
            ,
            b = function() {
                var t, e = C.styles, e = e && e.textAlign, i = D + M;
                t = l ? 0 : v,
                u(p) && d && ("center" === e || "right" === e) && (i += {
                    center: .5,
                    right: 1
                }[e] * (p - d.width)),
                (i !== S.x || t !== S.y) && (S.attr("x", i),
                t !== _ && S.attr("y", t)),
                S.x = i,
                S.y = t
            }
            ,
            k = function(t, e) {
                c ? c.attr(t, e) : L[t] = e
            }
            ,
            C.onAdd = function() {
                S.add(C),
                C.attr({
                    text: t || 0 === t ? t : "",
                    x: e,
                    y: i
                }),
                c && u(o) && C.attr({
                    anchorX: o,
                    anchorY: r
                })
            }
            ,
            C.widthSetter = function(t) {
                p = t
            }
            ,
            C.heightSetter = function(t) {
                f = t
            }
            ,
            C.paddingSetter = function(t) {
                u(t) && t !== M && (M = C.padding = t,
                b())
            }
            ,
            C.paddingLeftSetter = function(t) {
                u(t) && t !== D && (D = t,
                b())
            }
            ,
            C.alignSetter = function(t) {
                t = {
                    left: 0,
                    center: .5,
                    right: 1
                }[t],
                t !== T && (T = t,
                d && C.attr({
                    x: e
                }))
            }
            ,
            C.textSetter = function(t) {
                t !== _ && S.textSetter(t),
                x(),
                b()
            }
            ,
            C["stroke-widthSetter"] = function(t, e) {
                t && (y = !0),
                A = t % 2 / 2,
                k(e, t)
            }
            ,
            C.strokeSetter = C.fillSetter = C.rSetter = function(t, e) {
                "fill" === e && t && (y = !0),
                k(e, t)
            }
            ,
            C.anchorXSetter = function(t, e) {
                o = t,
                k(e, he(t) - A - g)
            }
            ,
            C.anchorYSetter = function(t, e) {
                r = t,
                k(e, t - m)
            }
            ,
            C.xSetter = function(t) {
                C.x = t,
                T && (t -= T * ((p || d.width) + 2 * M)),
                g = he(t),
                C.attr("translateX", g)
            }
            ,
            C.ySetter = function(t) {
                m = C.y = he(t),
                C.attr("translateY", m)
            }
            ;
            var P = C.css;
            return Ze(C, {
                css: function(t) {
                    if (t) {
                        var e = {}
                          , t = s(t);
                        Ne(C.textProps, function(i) {
                            t[i] !== _ && (e[i] = t[i],
                            delete t[i])
                        }),
                        S.css(e)
                    }
                    return P.call(C, t)
                },
                getBBox: function() {
                    return {
                        width: d.width + 2 * M,
                        height: d.height + 2 * M,
                        x: d.x - M,
                        y: d.y - M
                    }
                },
                shadow: function(t) {
                    return c && c.shadow(t),
                    C
                },
                destroy: function() {
                    Xe(C.element, "mouseenter"),
                    Xe(C.element, "mouseleave"),
                    S && (S = S.destroy()),
                    c && (c = c.destroy()),
                    O.prototype.destroy.call(C),
                    C = w = x = b = k = null
                }
            })
        }
    },
    H = ii,
    Ze(O.prototype, {
        htmlCss: function(t) {
            var e = this.element;
            return (e = t && "SPAN" === e.tagName && t.width) && (delete t.width,
            this.textWidth = e,
            this.updateTransform()),
            t && "ellipsis" === t.textOverflow && (t.whiteSpace = "nowrap",
            t.overflow = "hidden"),
            this.styles = Ze(this.styles, t),
            m(this.element, t),
            this
        },
        htmlGetBBox: function() {
            var t = this.element;
            return "text" === t.nodeName && (t.style.position = "absolute"),
            {
                x: t.offsetLeft,
                y: t.offsetTop,
                width: t.offsetWidth,
                height: t.offsetHeight
            }
        },
        htmlUpdateTransform: function() {
            if (this.added) {
                var t = this.renderer
                  , e = this.element
                  , i = this.translateX || 0
                  , s = this.translateY || 0
                  , o = this.x || 0
                  , r = this.y || 0
                  , a = this.textAlign || "left"
                  , l = {
                    left: 0,
                    center: .5,
                    right: 1
                }[a]
                  , h = this.shadows
                  , c = this.styles;
                if (m(e, {
                    marginLeft: i,
                    marginTop: s
                }),
                h && Ne(h, function(t) {
                    m(t, {
                        marginLeft: i + 1,
                        marginTop: s + 1
                    })
                }),
                this.inverted && Ne(e.childNodes, function(i) {
                    t.invertChild(i, e)
                }),
                "SPAN" === e.tagName) {
                    var h = this.rotation
                      , d = n(this.textWidth)
                      , p = c && c.whiteSpace
                      , f = [h, a, e.innerHTML, this.textWidth, this.textAlign].join(",");
                    f !== this.cTT && (c = t.fontMetrics(e.style.fontSize).b,
                    u(h) && this.setSpanRotation(h, l, c),
                    e.offsetWidth > d && /[ \-]/.test(e.textContent || e.innerText) ? (m(e, {
                        width: d + "px",
                        display: "block",
                        whiteSpace: p || "normal"
                    }),
                    this.hasTextWidth = !0) : this.hasTextWidth && (m(e, {
                        width: "",
                        display: "",
                        whiteSpace: p || "nowrap"
                    }),
                    this.hasTextWidth = !1),
                    this.getSpanCorrection(this.hasTextWidth ? d : e.offsetWidth, c, l, h, a)),
                    m(e, {
                        left: o + (this.xCorr || 0) + "px",
                        top: r + (this.yCorr || 0) + "px"
                    }),
                    Ce && (c = e.offsetHeight),
                    this.cTT = f
                }
            } else
                this.alignOnAdd = !0
        },
        setSpanRotation: function(t, e, i) {
            var s = {}
              , n = ke ? "-ms-transform" : Ce ? "-webkit-transform" : Se ? "MozTransform" : be ? "-o-transform" : "";
            s[n] = s.transform = "rotate(" + t + "deg)",
            s[n + (Se ? "Origin" : "-origin")] = s.transformOrigin = 100 * e + "% " + i + "px",
            m(this.element, s)
        },
        getSpanCorrection: function(t, e, i) {
            this.xCorr = -t * i,
            this.yCorr = -e
        }
    }),
    Ze(ii.prototype, {
        html: function(t, e, i) {
            var s = this.createElement("span")
              , n = s.element
              , o = s.renderer
              , r = function(t, e) {
                Ne(["opacity", "visibility"], function(i) {
                    Qe(t, i + "Setter", function(t, i, s, n) {
                        t.call(this, i, s, n),
                        e[s] = i
                    })
                })
            };
            return s.textSetter = function(t) {
                t !== n.innerHTML && delete this.bBox,
                n.innerHTML = this.textStr = t,
                s.htmlUpdateTransform()
            }
            ,
            r(s, s.element.style),
            s.xSetter = s.ySetter = s.alignSetter = s.rotationSetter = function(t, e) {
                "align" === e && (e = "textAlign"),
                s[e] = t,
                s.htmlUpdateTransform()
            }
            ,
            s.attr({
                text: t,
                x: he(e),
                y: he(i)
            }).css({
                position: "absolute",
                fontFamily: this.style.fontFamily,
                fontSize: this.style.fontSize
            }),
            n.style.whiteSpace = "nowrap",
            s.css = s.htmlCss,
            o.isSVG && (s.add = function(t) {
                var e, i = o.box.parentNode, a = [];
                if (this.parentGroup = t) {
                    if (e = t.div,
                    !e) {
                        for (; t; )
                            a.push(t),
                            t = t.parentGroup;
                        Ne(a.reverse(), function(t) {
                            var s, n = p(t.element, "class");
                            n && (n = {
                                className: n
                            }),
                            e = t.div = t.div || v(Fe, n, {
                                position: "absolute",
                                left: (t.translateX || 0) + "px",
                                top: (t.translateY || 0) + "px"
                            }, e || i),
                            s = e.style,
                            Ze(t, {
                                translateXSetter: function(e, i) {
                                    s.left = e + "px",
                                    t[i] = e,
                                    t.doTransform = !0
                                },
                                translateYSetter: function(e, i) {
                                    s.top = e + "px",
                                    t[i] = e,
                                    t.doTransform = !0
                                }
                            }),
                            r(t, s)
                        })
                    }
                } else
                    e = i;
                return e.appendChild(n),
                s.added = !0,
                s.alignOnAdd && s.htmlUpdateTransform(),
                s
            }
            ),
            s
        }
    });
    var si;
    if (!De && !Le) {
        si = {
            init: function(t, e) {
                var i = ["<", e, ' filled="f" stroked="f"']
                  , s = ["position: ", "absolute", ";"]
                  , n = e === Fe;
                ("shape" === e || n) && s.push("left:0;top:0;width:1px;height:1px;"),
                s.push("visibility: ", n ? "hidden" : "visible"),
                i.push(' style="', s.join(""), '"/>'),
                e && (i = n || "span" === e || "img" === e ? i.join("") : t.prepVML(i),
                this.element = v(i)),
                this.renderer = t
            },
            add: function(t) {
                var e = this.renderer
                  , i = this.element
                  , s = e.box
                  , n = t && t.inverted
                  , s = t ? t.element || t : s;
                return t && (this.parentGroup = t),
                n && e.invertChild(i, s),
                s.appendChild(i),
                this.added = !0,
                this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform(),
                this.onAdd && this.onAdd(),
                this
            },
            updateTransform: O.prototype.htmlUpdateTransform,
            setSpanRotation: function() {
                var t = this.rotation
                  , e = ge(t * ye)
                  , i = me(t * ye);
                m(this.element, {
                    filter: t ? ["progid:DXImageTransform.Microsoft.Matrix(M11=", e, ", M12=", -i, ", M21=", i, ", M22=", e, ", sizingMethod='auto expand')"].join("") : "none"
                })
            },
            getSpanCorrection: function(t, e, i, s, n) {
                var o, r = s ? ge(s * ye) : 1, a = s ? me(s * ye) : 0, l = Je(this.elemHeight, this.element.offsetHeight);
                this.xCorr = 0 > r && -t,
                this.yCorr = 0 > a && -l,
                o = 0 > r * a,
                this.xCorr += a * e * (o ? 1 - i : i),
                this.yCorr -= r * e * (s ? o ? i : 1 - i : 1),
                n && "left" !== n && (this.xCorr -= t * i * (0 > r ? -1 : 1),
                s && (this.yCorr -= l * i * (0 > a ? -1 : 1)),
                m(this.element, {
                    textAlign: n
                }))
            },
            pathToVML: function(t) {
                for (var e = t.length, i = []; e--; )
                    l(t[e]) ? i[e] = he(10 * t[e]) - 5 : "Z" === t[e] ? i[e] = "x" : (i[e] = t[e],
                    !t.isArc || "wa" !== t[e] && "at" !== t[e] || (i[e + 5] === i[e + 7] && (i[e + 7] += t[e + 7] > t[e + 5] ? 1 : -1),
                    i[e + 6] === i[e + 8] && (i[e + 8] += t[e + 8] > t[e + 6] ? 1 : -1)));
                return i.join(" ") || "x"
            },
            clip: function(t) {
                var e, i = this;
                return t ? (e = t.members,
                d(e, i),
                e.push(i),
                i.destroyClip = function() {
                    d(e, i)
                }
                ,
                t = t.getCSS(i)) : (i.destroyClip && i.destroyClip(),
                t = {
                    clip: we ? "inherit" : "rect(auto)"
                }),
                i.css(t)
            },
            css: O.prototype.htmlCss,
            safeRemoveChild: function(t) {
                t.parentNode && A(t)
            },
            destroy: function() {
                return this.destroyClip && this.destroyClip(),
                O.prototype.destroy.apply(this)
            },
            on: function(e, i) {
                return this.element["on" + e] = function() {
                    var e = t.event;
                    e.target = e.srcElement,
                    i(e)
                }
                ,
                this
            },
            cutOffPath: function(t, e) {
                var i, t = t.split(/[ ,]/);
                return i = t.length,
                (9 === i || 11 === i) && (t[i - 4] = t[i - 2] = n(t[i - 2]) - 10 * e),
                t.join(" ")
            },
            shadow: function(t, e, i) {
                var s, o, r, a, l, h, c, d = [], u = this.element, p = this.renderer, f = u.style, g = u.path;
                if (g && "string" != typeof g.value && (g = "x"),
                l = g,
                t) {
                    for (h = Je(t.width, 3),
                    c = (t.opacity || .15) / h,
                    s = 1; 3 >= s; s++)
                        a = 2 * h + 1 - 2 * s,
                        i && (l = this.cutOffPath(g.value, a + .5)),
                        r = ['<shape isShadow="true" strokeweight="', a, '" filled="false" path="', l, '" coordsize="10 10" style="', u.style.cssText, '" />'],
                        o = v(p.prepVML(r), null, {
                            left: n(f.left) + Je(t.offsetX, 1),
                            top: n(f.top) + Je(t.offsetY, 1)
                        }),
                        i && (o.cutOff = a + 1),
                        r = ['<stroke color="', t.color || "black", '" opacity="', c * s, '"/>'],
                        v(p.prepVML(r), null, null, o),
                        e ? e.element.appendChild(o) : u.parentNode.insertBefore(o, u),
                        d.push(o);
                    this.shadows = d
                }
                return this
            },
            updateShadows: ze,
            setAttr: function(t, e) {
                we ? this.element[t] = e : this.element.setAttribute(t, e)
            },
            classSetter: function(t) {
                this.element.className = t
            },
            dashstyleSetter: function(t, e, i) {
                (i.getElementsByTagName("stroke")[0] || v(this.renderer.prepVML(["<stroke/>"]), null, null, i))[e] = t || "solid",
                this[e] = t
            },
            dSetter: function(t, e, i) {
                var s = this.shadows
                  , t = t || [];
                if (this.d = t.join && t.join(" "),
                i.path = t = this.pathToVML(t),
                s)
                    for (i = s.length; i--; )
                        s[i].path = s[i].cutOff ? this.cutOffPath(t, s[i].cutOff) : t;
                this.setAttr(e, t)
            },
            fillSetter: function(t, e, i) {
                var s = i.nodeName;
                "SPAN" === s ? i.style.color = t : "IMG" !== s && (i.filled = "none" !== t,
                this.setAttr("fillcolor", this.renderer.color(t, i, e, this)))
            },
            "fill-opacitySetter": function(t, e, i) {
                v(this.renderer.prepVML(["<", e.split("-")[0], ' opacity="', t, '"/>']), null, null, i)
            },
            opacitySetter: ze,
            rotationSetter: function(t, e, i) {
                i = i.style,
                this[e] = i[e] = t,
                i.left = -he(me(t * ye) + 1) + "px",
                i.top = he(ge(t * ye)) + "px"
            },
            strokeSetter: function(t, e, i) {
                this.setAttr("strokecolor", this.renderer.color(t, i, e, this))
            },
            "stroke-widthSetter": function(t, e, i) {
                i.stroked = !!t,
                this[e] = t,
                l(t) && (t += "px"),
                this.setAttr("strokeweight", t)
            },
            titleSetter: function(t, e) {
                this.setAttr(e, t)
            },
            visibilitySetter: function(t, e, i) {
                "inherit" === t && (t = "visible"),
                this.shadows && Ne(this.shadows, function(i) {
                    i.style[e] = t
                }),
                "DIV" === i.nodeName && (t = "hidden" === t ? "-999em" : 0,
                we || (i.style[e] = t ? "visible" : "hidden"),
                e = "top"),
                i.style[e] = t
            },
            xSetter: function(t, e, i) {
                this[e] = t,
                "x" === e ? e = "left" : "y" === e && (e = "top"),
                this.updateClipping ? (this[e] = t,
                this.updateClipping()) : i.style[e] = t
            },
            zIndexSetter: function(t, e, i) {
                i.style[e] = t
            }
        },
        si["stroke-opacitySetter"] = si["fill-opacitySetter"],
        re.VMLElement = si = y(O, si),
        si.prototype.ySetter = si.prototype.widthSetter = si.prototype.heightSetter = si.prototype.xSetter;
        var ni = {
            Element: si,
            isIE8: xe.indexOf("MSIE 8.0") > -1,
            init: function(t, e, i, s) {
                var n;
                if (this.alignedObjects = [],
                s = this.createElement(Fe).css(Ze(this.getStyle(s), {
                    position: "relative"
                })),
                n = s.element,
                t.appendChild(s.element),
                this.isVML = !0,
                this.box = n,
                this.boxWrapper = s,
                this.gradients = {},
                this.cache = {},
                this.cacheKeys = [],
                this.imgCount = 0,
                this.setSize(e, i, !1),
                !ae.namespaces.hcv) {
                    ae.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
                    try {
                        ae.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    } catch (o) {
                        ae.styleSheets[0].cssText += "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    }
                }
            },
            isHidden: function() {
                return !this.box.offsetWidth
            },
            clipRect: function(t, e, i, s) {
                var n = this.createElement()
                  , o = r(t);
                return Ze(n, {
                    members: [],
                    count: 0,
                    left: (o ? t.x : t) + 1,
                    top: (o ? t.y : e) + 1,
                    width: (o ? t.width : i) - 1,
                    height: (o ? t.height : s) - 1,
                    getCSS: function(t) {
                        var e = t.element
                          , i = e.nodeName
                          , t = t.inverted
                          , s = this.top - ("shape" === i ? e.offsetTop : 0)
                          , n = this.left
                          , e = n + this.width
                          , o = s + this.height
                          , s = {
                            clip: "rect(" + he(t ? n : s) + "px," + he(t ? o : e) + "px," + he(t ? e : o) + "px," + he(t ? s : n) + "px)"
                        };
                        return !t && we && "DIV" === i && Ze(s, {
                            width: e + "px",
                            height: o + "px"
                        }),
                        s
                    },
                    updateClipping: function() {
                        Ne(n.members, function(t) {
                            t.element && t.css(n.getCSS(t))
                        })
                    }
                })
            },
            color: function(t, e, i, s) {
                var n, o, r, a = this, l = /^rgba/, h = "none";
                if (t && t.linearGradient ? r = "gradient" : t && t.radialGradient && (r = "pattern"),
                r) {
                    var c, d, u, p, f, g, m, y, x = t.linearGradient || t.radialGradient, b = "", t = t.stops, k = [], w = function() {
                        o = ['<fill colors="' + k.join(",") + '" opacity="', f, '" o:opacity2="', p, '" type="', r, '" ', b, 'focus="100%" method="any" />'],
                        v(a.prepVML(o), null, null, e)
                    };
                    if (u = t[0],
                    y = t[t.length - 1],
                    u[0] > 0 && t.unshift([0, u[1]]),
                    y[0] < 1 && t.push([1, y[1]]),
                    Ne(t, function(t, e) {
                        l.test(t[1]) ? (n = z(t[1]),
                        c = n.get("rgb"),
                        d = n.get("a")) : (c = t[1],
                        d = 1),
                        k.push(100 * t[0] + "% " + c),
                        e ? (f = d,
                        g = c) : (p = d,
                        m = c)
                    }),
                    "fill" === i)
                        if ("gradient" === r)
                            i = x.x1 || x[0] || 0,
                            t = x.y1 || x[1] || 0,
                            u = x.x2 || x[2] || 0,
                            x = x.y2 || x[3] || 0,
                            b = 'angle="' + (90 - 180 * le.atan((x - t) / (u - i)) / ve) + '"',
                            w();
                        else {
                            var C, h = x.r, S = 2 * h, T = 2 * h, M = x.cx, D = x.cy, A = e.radialReference, h = function() {
                                A && (C = s.getBBox(),
                                M += (A[0] - C.x) / C.width - .5,
                                D += (A[1] - C.y) / C.height - .5,
                                S *= A[2] / C.width,
                                T *= A[2] / C.height),
                                b = 'src="' + W.global.VMLRadialGradientURL + '" size="' + S + "," + T + '" origin="0.5,0.5" position="' + M + "," + D + '" color2="' + m + '" ',
                                w()
                            };
                            s.added ? h() : s.onAdd = h,
                            h = g
                        }
                    else
                        h = c
                } else
                    l.test(t) && "IMG" !== e.tagName ? (n = z(t),
                    s[i + "-opacitySetter"](n.get("a"), i, e),
                    h = n.get("rgb")) : (h = e.getElementsByTagName(i),
                    h.length && (h[0].opacity = 1,
                    h[0].type = "solid"),
                    h = t);
                return h
            },
            prepVML: function(t) {
                var e = this.isIE8
                  , t = t.join("");
                return e ? (t = t.replace("/>", ' xmlns="urn:schemas-microsoft-com:vml" />'),
                t = -1 === t.indexOf('style="') ? t.replace("/>", ' style="display:inline-block;behavior:url(#default#VML);" />') : t.replace('style="', 'style="display:inline-block;behavior:url(#default#VML);')) : t = t.replace("<", "<hcv:"),
                t
            },
            text: ii.prototype.html,
            path: function(t) {
                var e = {
                    coordsize: "10 10"
                };
                return a(t) ? e.d = t : r(t) && Ze(e, t),
                this.createElement("shape").attr(e)
            },
            circle: function(t, e, i) {
                var s = this.symbol("circle");
                return r(t) && (i = t.r,
                e = t.y,
                t = t.x),
                s.isCircle = !0,
                s.r = i,
                s.attr({
                    x: t,
                    y: e
                })
            },
            g: function(t) {
                var e;
                return t && (e = {
                    className: "highcharts-" + t,
                    "class": "highcharts-" + t
                }),
                this.createElement(Fe).attr(e)
            },
            image: function(t, e, i, s, n) {
                var o = this.createElement("img").attr({
                    src: t
                });
                return arguments.length > 1 && o.attr({
                    x: e,
                    y: i,
                    width: s,
                    height: n
                }),
                o
            },
            createElement: function(t) {
                return "rect" === t ? this.symbol(t) : ii.prototype.createElement.call(this, t)
            },
            invertChild: function(t, e) {
                var i = this
                  , s = e.style
                  , o = "IMG" === t.tagName && t.style;
                m(t, {
                    flip: "x",
                    left: n(s.width) - (o ? n(o.top) : 1),
                    top: n(s.height) - (o ? n(o.left) : 1),
                    rotation: -90
                }),
                Ne(t.childNodes, function(e) {
                    i.invertChild(e, t)
                })
            },
            symbols: {
                arc: function(t, e, i, s, n) {
                    var o = n.start
                      , r = n.end
                      , a = n.r || i || s
                      , i = n.innerR
                      , s = ge(o)
                      , l = me(o)
                      , h = ge(r)
                      , c = me(r);
                    return r - o === 0 ? ["x"] : (o = ["wa", t - a, e - a, t + a, e + a, t + a * s, e + a * l, t + a * h, e + a * c],
                    n.open && !i && o.push("e", "M", t, e),
                    o.push("at", t - i, e - i, t + i, e + i, t + i * h, e + i * c, t + i * s, e + i * l, "x", "e"),
                    o.isArc = !0,
                    o)
                },
                circle: function(t, e, i, s, n) {
                    return n && (i = s = 2 * n.r),
                    n && n.isCircle && (t -= i / 2,
                    e -= s / 2),
                    ["wa", t, e, t + i, e + s, t + i, e + s / 2, t + i, e + s / 2, "e"]
                },
                rect: function(t, e, i, s, n) {
                    return ii.prototype.symbols[u(n) && n.r ? "callout" : "square"].call(0, t, e, i, s, n)
                }
            }
        };
        re.VMLRenderer = si = function() {
            this.init.apply(this, arguments)
        }
        ,
        si.prototype = s(ii.prototype, ni),
        H = si
    }
    ii.prototype.measureSpanWidth = function(t, e) {
        var i, s = ae.createElement("span");
        return i = ae.createTextNode(t),
        s.appendChild(i),
        m(s, e),
        this.box.appendChild(s),
        i = s.offsetWidth,
        A(s),
        i
    }
    ;
    var oi;
    Le && (re.CanVGRenderer = si = function() {
        Me = "http://www.w3.org/1999/xhtml"
    }
    ,
    si.prototype.symbols = {},
    oi = function() {
        function t() {
            var t, i = e.length;
            for (t = 0; i > t; t++)
                e[t]();
            e = []
        }
        var e = [];
        return {
            push: function(i, s) {
                if (0 === e.length) {
                    var n = ae.getElementsByTagName("head")[0]
                      , o = ae.createElement("script");
                    o.type = "text/javascript",
                    o.src = s,
                    o.onload = t,
                    n.appendChild(o)
                }
                e.push(i)
            }
        }
    }(),
    H = si),
    E.prototype = {
        addLabel: function() {
            var t, e = this.axis, i = e.options, n = e.chart, o = e.categories, r = e.names, a = this.pos, l = i.labels, h = e.tickPositions, d = a === h[0], p = a === h[h.length - 1], r = o ? Je(o[a], r[a], a) : a, o = this.label, h = h.info;
            e.isDatetimeAxis && h && (t = i.dateTimeLabelFormats[h.higherRanks[a] || h.unitName]),
            this.isFirst = d,
            this.isLast = p,
            i = e.labelFormatter.call({
                axis: e,
                chart: n,
                isFirst: d,
                isLast: p,
                dateTimeLabelFormat: t,
                value: e.isLog ? L(c(r)) : r
            }),
            u(o) ? o && o.attr({
                text: i
            }) : (this.labelLength = (this.label = o = u(i) && l.enabled ? n.renderer.text(i, 0, 0, l.useHTML).css(s(l.style)).add(e.labelGroup) : null) && o.getBBox().width,
            this.rotation = 0)
        },
        getLabelSize: function() {
            return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
        },
        handleOverflow: function(t) {
            var e, i = this.axis, s = t.x, n = i.chart.chartWidth, o = i.chart.spacing, r = Je(i.labelLeft, pe(i.pos, o[3])), o = Je(i.labelRight, ue(i.pos + i.len, n - o[1])), a = this.label, l = this.rotation, h = {
                left: 0,
                center: .5,
                right: 1
            }[i.labelAlign], c = a.getBBox().width, d = i.slotWidth, u = 1, p = {};
            l ? 0 > l && r > s - h * c ? e = he(s / ge(l * ye) - r) : l > 0 && s + h * c > o && (e = he((n - s) / ge(l * ye))) : (n = s + (1 - h) * c,
            r > s - h * c ? d = t.x + d * (1 - h) - r : n > o && (d = o - t.x + d * h,
            u = -1),
            d = pe(i.slotWidth, d),
            d < i.slotWidth && "center" === i.labelAlign && (t.x += u * (i.slotWidth - d - h * (i.slotWidth - pe(c, d)))),
            (c > d || i.autoRotation && a.styles.width) && (e = d)),
            e && (p.width = e,
            i.options.labels.style.textOverflow || (p.textOverflow = "ellipsis"),
            a.css(p))
        },
        getPosition: function(t, e, i, s) {
            var n = this.axis
              , o = n.chart
              , r = s && o.oldChartHeight || o.chartHeight;
            return {
                x: t ? n.translate(e + i, null, null, s) + n.transB : n.left + n.offset + (n.opposite ? (s && o.oldChartWidth || o.chartWidth) - n.right - n.left : 0),
                y: t ? r - n.bottom + n.offset - (n.opposite ? n.height : 0) : r - n.translate(e + i, null, null, s) - n.transB
            }
        },
        getLabelPosition: function(t, e, i, s, n, o, r, a) {
            var l = this.axis
              , h = l.transA
              , c = l.reversed
              , d = l.staggerLines
              , p = l.tickRotCorr || {
                x: 0,
                y: 0
            }
              , f = n.y;
            return u(f) || (f = 2 === l.side ? p.y + 8 : f = ge(i.rotation * ye) * (p.y - i.getBBox(!1, 0).height / 2)),
            t = t + n.x + p.x - (o && s ? o * h * (c ? -1 : 1) : 0),
            e = e + f - (o && !s ? o * h * (c ? 1 : -1) : 0),
            d && (i = r / (a || 1) % d,
            l.opposite && (i = d - i - 1),
            e += i * (l.labelOffset / d)),
            {
                x: t,
                y: he(e)
            }
        },
        getMarkPath: function(t, e, i, s, n, o) {
            return o.crispLine(["M", t, e, "L", t + (n ? 0 : -i), e + (n ? i : 0)], s)
        },
        render: function(t, e, i) {
            var s = this.axis
              , n = s.options
              , o = s.chart.renderer
              , r = s.horiz
              , a = this.type
              , l = this.label
              , h = this.pos
              , c = n.labels
              , d = this.gridLine
              , u = a ? a + "Grid" : "grid"
              , p = a ? a + "Tick" : "tick"
              , f = n[u + "LineWidth"]
              , g = n[u + "LineColor"]
              , m = n[u + "LineDashStyle"]
              , v = n[p + "Length"]
              , u = Je(n[p + "Width"], !a && s.isXAxis ? 1 : 0)
              , y = n[p + "Color"]
              , x = n[p + "Position"]
              , p = this.mark
              , b = c.step
              , k = !0
              , w = s.tickmarkOffset
              , C = this.getPosition(r, h, w, e)
              , S = C.x
              , C = C.y
              , T = r && S === s.pos + s.len || !r && C === s.pos ? -1 : 1
              , i = Je(i, 1);
            this.isActive = !0,
            f && (h = s.getPlotLinePath(h + w, f * T, e, !0),
            d === _ && (d = {
                stroke: g,
                "stroke-width": f
            },
            m && (d.dashstyle = m),
            a || (d.zIndex = 1),
            e && (d.opacity = 0),
            this.gridLine = d = f ? o.path(h).attr(d).add(s.gridGroup) : null),
            !e && d && h && d[this.isNew ? "attr" : "animate"]({
                d: h,
                opacity: i
            })),
            u && v && ("inside" === x && (v = -v),
            s.opposite && (v = -v),
            a = this.getMarkPath(S, C, v, u * T, r, o),
            p ? p.animate({
                d: a,
                opacity: i
            }) : this.mark = o.path(a).attr({
                stroke: y,
                "stroke-width": u,
                opacity: i
            }).add(s.axisGroup)),
            l && !isNaN(S) && (l.xy = C = this.getLabelPosition(S, C, l, r, c, w, t, b),
            this.isFirst && !this.isLast && !Je(n.showFirstLabel, 1) || this.isLast && !this.isFirst && !Je(n.showLastLabel, 1) ? k = !1 : r && !s.isRadial && !c.step && !c.rotation && !e && 0 !== i && this.handleOverflow(C),
            b && t % b && (k = !1),
            k && !isNaN(C.y) ? (C.opacity = i,
            l[this.isNew ? "attr" : "animate"](C),
            this.isNew = !1) : l.attr("y", -9999))
        },
        destroy: function() {
            D(this, this.axis)
        }
    },
    re.PlotLineOrBand = function(t, e) {
        this.axis = t,
        e && (this.options = e,
        this.id = e.id)
    }
    ,
    re.PlotLineOrBand.prototype = {
        render: function() {
            var t, e = this, i = e.axis, n = i.horiz, o = e.options, r = o.label, a = e.label, l = o.width, c = o.to, d = o.from, p = u(d) && u(c), f = o.value, g = o.dashStyle, m = e.svgElem, v = [], y = o.color, x = Je(o.zIndex, 0), b = o.events, k = {}, w = i.chart.renderer;
            if (i.isLog && (d = h(d),
            c = h(c),
            f = h(f)),
            l)
                v = i.getPlotLinePath(f, l),
                k = {
                    stroke: y,
                    "stroke-width": l
                },
                g && (k.dashstyle = g);
            else {
                if (!p)
                    return;
                v = i.getPlotBandPath(d, c, o),
                y && (k.fill = y),
                o.borderWidth && (k.stroke = o.borderColor,
                k["stroke-width"] = o.borderWidth)
            }
            if (k.zIndex = x,
            m)
                v ? (m.show(),
                m.animate({
                    d: v
                })) : (m.hide(),
                a && (e.label = a = a.destroy()));
            else if (v && v.length && (e.svgElem = m = w.path(v).attr(k).add(),
            b))
                for (t in o = function(t) {
                    m.on(t, function(i) {
                        b[t].apply(e, [i])
                    })
                }
                ,
                b)
                    o(t);
            return r && u(r.text) && v && v.length && i.width > 0 && i.height > 0 && !v.flat ? (r = s({
                align: n && p && "center",
                x: n ? !p && 4 : 10,
                verticalAlign: !n && p && "middle",
                y: n ? p ? 16 : 10 : p ? 6 : -4,
                rotation: n && !p && 90
            }, r),
            this.renderLabel(r, v, p, x)) : a && a.hide(),
            e
        },
        renderLabel: function(t, e, i, s) {
            var n = this.label
              , o = this.axis.chart.renderer;
            n || (n = {
                align: t.textAlign || t.align,
                rotation: t.rotation
            },
            n.zIndex = s,
            this.label = n = o.text(t.text, 0, 0, t.useHTML).attr(n).css(t.style).add()),
            s = [e[1], e[4], i ? e[6] : e[1]],
            e = [e[2], e[5], i ? e[7] : e[2]],
            i = T(s),
            o = T(e),
            n.align(t, !1, {
                x: i,
                y: o,
                width: M(s) - i,
                height: M(e) - o
            }),
            n.show()
        },
        destroy: function() {
            d(this.axis.plotLinesAndBands, this),
            delete this.axis,
            D(this)
        }
    };
    var ri = re.Axis = function() {
        this.init.apply(this, arguments)
    }
    ;
    ri.prototype = {
        defaultOptions: {
            dateTimeLabelFormats: {
                millisecond: "%H:%M:%S.%L",
                second: "%H:%M:%S",
                minute: "%H:%M",
                hour: "%H:%M",
                day: "%e. %b",
                week: "%e. %b",
                month: "%b '%y",
                year: "%Y"
            },
            endOnTick: !1,
            gridLineColor: "#D8D8D8",
            labels: {
                enabled: !0,
                style: {
                    color: "#606060",
                    cursor: "default",
                    fontSize: "11px"
                },
                x: 0,
                y: 15
            },
            lineColor: "#C0D0E0",
            lineWidth: 1,
            minPadding: .01,
            maxPadding: .01,
            minorGridLineColor: "#E0E0E0",
            minorGridLineWidth: 1,
            minorTickColor: "#A0A0A0",
            minorTickLength: 2,
            minorTickPosition: "outside",
            startOfWeek: 1,
            startOnTick: !1,
            tickColor: "#C0D0E0",
            tickLength: 10,
            tickmarkPlacement: "between",
            tickPixelInterval: 100,
            tickPosition: "outside",
            title: {
                align: "middle",
                style: {
                    color: "#707070"
                }
            },
            type: "linear"
        },
        defaultYAxisOptions: {
            endOnTick: !0,
            gridLineWidth: 1,
            tickPixelInterval: 72,
            showLastLabel: !0,
            labels: {
                x: -8,
                y: 3
            },
            lineWidth: 0,
            maxPadding: .05,
            minPadding: .05,
            startOnTick: !0,
            title: {
                rotation: 270,
                text: "Values"
            },
            stackLabels: {
                enabled: !1,
                formatter: function() {
                    return re.numberFormat(this.total, -1)
                },
                style: s(ti.line.dataLabels.style, {
                    color: "#000000"
                })
            }
        },
        defaultLeftAxisOptions: {
            labels: {
                x: -15,
                y: null
            },
            title: {
                rotation: 270
            }
        },
        defaultRightAxisOptions: {
            labels: {
                x: 15,
                y: null
            },
            title: {
                rotation: 90
            }
        },
        defaultBottomAxisOptions: {
            labels: {
                autoRotation: [-45],
                x: 0,
                y: null
            },
            title: {
                rotation: 0
            }
        },
        defaultTopAxisOptions: {
            labels: {
                autoRotation: [-45],
                x: 0,
                y: -15
            },
            title: {
                rotation: 0
            }
        },
        init: function(t, e) {
            var i = e.isX;
            this.chart = t,
            this.horiz = t.inverted ? !i : i,
            this.coll = (this.isXAxis = i) ? "xAxis" : "yAxis",
            this.opposite = e.opposite,
            this.side = e.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3),
            this.setOptions(e);
            var s = this.options
              , n = s.type;
            this.labelFormatter = s.labels.formatter || this.defaultLabelFormatter,
            this.userOptions = e,
            this.minPixelPadding = 0,
            this.reversed = s.reversed,
            this.visible = s.visible !== !1,
            this.zoomEnabled = s.zoomEnabled !== !1,
            this.categories = s.categories || "category" === n,
            this.names = this.names || [],
            this.isLog = "logarithmic" === n,
            this.isDatetimeAxis = "datetime" === n,
            this.isLinked = u(s.linkedTo),
            this.ticks = {},
            this.labelEdge = [],
            this.minorTicks = {},
            this.plotLinesAndBands = [],
            this.alternateBands = {},
            this.len = 0,
            this.minRange = this.userMinRange = s.minRange || s.maxZoom,
            this.range = s.range,
            this.offset = s.offset || 0,
            this.stacks = {},
            this.oldStacks = {},
            this.stacksTouched = 0,
            this.min = this.max = null,
            this.crosshair = Je(s.crosshair, f(t.options.tooltip.crosshairs)[i ? 0 : 1], !1);
            var o, s = this.options.events;
            -1 === We(this, t.axes) && (i && !this.isColorAxis ? t.axes.splice(t.xAxis.length, 0, this) : t.axes.push(this),
            t[this.coll].push(this)),
            this.series = this.series || [],
            t.inverted && i && this.reversed === _ && (this.reversed = !0),
            this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
            for (o in s)
                Ue(this, o, s[o]);
            this.isLog && (this.val2lin = h,
            this.lin2val = c)
        },
        setOptions: function(t) {
            this.options = s(this.defaultOptions, this.isXAxis ? {} : this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], s(W[this.coll], t))
        },
        defaultLabelFormatter: function() {
            var t, e = this.axis, i = this.value, s = e.categories, n = this.dateTimeLabelFormat, o = W.lang.numericSymbols, r = o && o.length, a = e.options.labels.format, e = e.isLog ? i : e.tickInterval;
            if (a)
                t = k(a, this);
            else if (s)
                t = i;
            else if (n)
                t = N(n, i);
            else if (r && e >= 1e3)
                for (; r-- && t === _; )
                    s = Math.pow(1e3, r + 1),
                    e >= s && 10 * i % s === 0 && null !== o[r] && (t = re.numberFormat(i / s, -1) + o[r]);
            return t === _ && (t = fe(i) >= 1e4 ? re.numberFormat(i, -1) : re.numberFormat(i, -1, _, "")),
            t
        },
        getSeriesExtremes: function() {
            var t = this
              , e = t.chart;
            t.hasVisibleSeries = !1,
            t.dataMin = t.dataMax = t.threshold = null,
            t.softThreshold = !t.isXAxis,
            t.buildStacks && t.buildStacks(),
            Ne(t.series, function(i) {
                if (i.visible || !e.options.chart.ignoreHiddenSeries) {
                    var s, n = i.options, o = n.threshold;
                    t.hasVisibleSeries = !0,
                    t.isLog && 0 >= o && (o = null),
                    t.isXAxis ? (n = i.xData,
                    n.length && (t.dataMin = pe(Je(t.dataMin, n[0]), T(n)),
                    t.dataMax = ue(Je(t.dataMax, n[0]), M(n)))) : (i.getExtremes(),
                    s = i.dataMax,
                    i = i.dataMin,
                    u(i) && u(s) && (t.dataMin = pe(Je(t.dataMin, i), i),
                    t.dataMax = ue(Je(t.dataMax, s), s)),
                    u(o) && (t.threshold = o),
                    (!n.softThreshold || t.isLog) && (t.softThreshold = !1))
                }
            })
        },
        translate: function(t, e, i, s, n, o) {
            var r = this.linkedParent || this
              , a = 1
              , h = 0
              , c = s ? r.oldTransA : r.transA
              , s = s ? r.oldMin : r.min
              , d = r.minPixelPadding
              , n = (r.isOrdinal || r.isBroken || r.isLog && n) && r.lin2val;
            return c || (c = r.transA),
            i && (a *= -1,
            h = r.len),
            r.reversed && (a *= -1,
            h -= a * (r.sector || r.len)),
            e ? (t = t * a + h,
            t -= d,
            t = t / c + s,
            n && (t = r.lin2val(t))) : (n && (t = r.val2lin(t)),
            "between" === o && (o = .5),
            t = a * (t - s) * c + h + a * d + (l(o) ? c * o * r.pointRange : 0)),
            t
        },
        toPixels: function(t, e) {
            return this.translate(t, !1, !this.horiz, null, !0) + (e ? 0 : this.pos)
        },
        toValue: function(t, e) {
            return this.translate(t - (e ? 0 : this.pos), !0, !this.horiz, null, !0)
        },
        getPlotLinePath: function(t, e, i, s, n) {
            var o, r, a, l = this.chart, h = this.left, c = this.top, d = i && l.oldChartHeight || l.chartHeight, u = i && l.oldChartWidth || l.chartWidth;
            o = this.transB;
            var p = function(t, e, i) {
                return (e > t || t > i) && (s ? t = pe(ue(e, t), i) : a = !0),
                t
            }
              , n = Je(n, this.translate(t, null, null, i))
              , t = i = he(n + o);
            return o = r = he(d - n - o),
            isNaN(n) ? a = !0 : this.horiz ? (o = c,
            r = d - this.bottom,
            t = i = p(t, h, h + this.width)) : (t = h,
            i = u - this.right,
            o = r = p(o, c, c + this.height)),
            a && !s ? null : l.renderer.crispLine(["M", t, o, "L", i, r], e || 1)
        },
        getLinearTickPositions: function(t, e, i) {
            var s, n = L(ce(e / t) * t), o = L(de(i / t) * t), r = [];
            if (e === i && l(e))
                return [e];
            for (e = n; o >= e && (r.push(e),
            e = L(e + t),
            e !== s); )
                s = e;
            return r
        },
        getMinorTickPositions: function() {
            var t, e = this.options, i = this.tickPositions, s = this.minorTickInterval, n = [], o = this.pointRangePadding || 0;
            t = this.min - o;
            var o = this.max + o
              , r = o - t;
            if (r && r / s < this.len / 3)
                if (this.isLog)
                    for (o = i.length,
                    t = 1; o > t; t++)
                        n = n.concat(this.getLogTickPositions(s, i[t - 1], i[t], !0));
                else if (this.isDatetimeAxis && "auto" === e.minorTickInterval)
                    n = n.concat(this.getTimeTicks(this.normalizeTimeTickInterval(s), t, o, e.startOfWeek));
                else
                    for (i = t + (i[0] - t) % s; o >= i; i += s)
                        n.push(i);
            return 0 !== n.length && this.trimTicks(n, e.startOnTick, e.endOnTick),
            n
        },
        adjustForMinRange: function() {
            var t, e, i, s, n, o, r, a = this.options, l = this.min, h = this.max, c = this.dataMax - this.dataMin >= this.minRange;
            this.isXAxis && this.minRange === _ && !this.isLog && (u(a.min) || u(a.max) ? this.minRange = null : (Ne(this.series, function(t) {
                for (n = t.xData,
                i = o = t.xIncrement ? 1 : n.length - 1; i > 0; i--)
                    s = n[i] - n[i - 1],
                    (e === _ || e > s) && (e = s)
            }),
            this.minRange = pe(5 * e, this.dataMax - this.dataMin))),
            h - l < this.minRange && (r = this.minRange,
            t = (r - h + l) / 2,
            t = [l - t, Je(a.min, l - t)],
            c && (t[2] = this.dataMin),
            l = M(t),
            h = [l + r, Je(a.max, l + r)],
            c && (h[2] = this.dataMax),
            h = T(h),
            r > h - l && (t[0] = h - r,
            t[1] = Je(a.min, h - r),
            l = M(t))),
            this.min = l,
            this.max = h
        },
        setAxisTranslation: function(t) {
            var e, i = this, s = i.max - i.min, n = i.axisPointRange || 0, r = 0, a = 0, l = i.linkedParent, h = !!i.categories, c = i.transA, d = i.isXAxis;
            (d || h || n) && (l ? (r = l.minPointOffset,
            a = l.pointRangePadding) : (Ne(i.series, function(t) {
                var i = t.closestPointRange;
                !t.noSharedTooltip && u(i) && (e = u(e) ? pe(e, i) : i)
            }),
            Ne(i.series, function(t) {
                var s = h ? 1 : d ? Je(t.options.pointRange, e, 0) : i.axisPointRange || 0
                  , t = t.options.pointPlacement;
                n = ue(n, s),
                i.single || (r = ue(r, o(t) ? 0 : s / 2),
                a = ue(a, "on" === t ? 0 : s))
            })),
            l = i.ordinalSlope && e ? i.ordinalSlope / e : 1,
            i.minPointOffset = r *= l,
            i.pointRangePadding = a *= l,
            i.pointRange = pe(n, s),
            d && (i.closestPointRange = e)),
            t && (i.oldTransA = c),
            i.translationSlope = i.transA = c = i.len / (s + a || 1),
            i.transB = i.horiz ? i.left : i.bottom,
            i.minPixelPadding = c * r
        },
        minFromRange: function() {
            return this.max - this.range
        },
        setTickInterval: function(t) {
            var i, s, n, o, r = this, a = r.chart, c = r.options, d = r.isLog, p = r.isDatetimeAxis, f = r.isXAxis, g = r.isLinked, m = c.maxPadding, v = c.minPadding, y = c.tickInterval, x = c.tickPixelInterval, b = r.categories, k = r.threshold, S = r.softThreshold;
            !p && !b && !g && this.getTickAmount(),
            n = Je(r.userMin, c.min),
            o = Je(r.userMax, c.max),
            g ? (r.linkedParent = a[r.coll][c.linkedTo],
            a = r.linkedParent.getExtremes(),
            r.min = Je(a.min, a.dataMin),
            r.max = Je(a.max, a.dataMax),
            c.type !== r.linkedParent.options.type && e(11, 1)) : (!S && u(k) && (r.dataMin >= k ? (i = k,
            v = 0) : r.dataMax <= k && (s = k,
            m = 0)),
            r.min = Je(n, i, r.dataMin),
            r.max = Je(o, s, r.dataMax)),
            d && (!t && pe(r.min, Je(r.dataMin, r.min)) <= 0 && e(10, 1),
            r.min = L(h(r.min), 15),
            r.max = L(h(r.max), 15)),
            r.range && u(r.max) && (r.userMin = r.min = n = ue(r.min, r.minFromRange()),
            r.userMax = o = r.max,
            r.range = null),
            r.beforePadding && r.beforePadding(),
            r.adjustForMinRange(),
            b || r.axisPointRange || r.usePercentage || g || !u(r.min) || !u(r.max) || !(a = r.max - r.min) || (!u(n) && v && (r.min -= a * v),
            !u(o) && m && (r.max += a * m)),
            l(c.floor) && (r.min = ue(r.min, c.floor)),
            l(c.ceiling) && (r.max = pe(r.max, c.ceiling)),
            S && u(r.dataMin) && (k = k || 0,
            !u(n) && r.min < k && r.dataMin >= k ? r.min = k : !u(o) && r.max > k && r.dataMax <= k && (r.max = k)),
            r.tickInterval = r.min === r.max || void 0 === r.min || void 0 === r.max ? 1 : g && !y && x === r.linkedParent.options.tickPixelInterval ? y = r.linkedParent.tickInterval : Je(y, this.tickAmount ? (r.max - r.min) / ue(this.tickAmount - 1, 1) : void 0, b ? 1 : (r.max - r.min) * x / ue(r.len, x)),
            f && !t && Ne(r.series, function(t) {
                t.processData(r.min !== r.oldMin || r.max !== r.oldMax)
            }),
            r.setAxisTranslation(!0),
            r.beforeSetTickPositions && r.beforeSetTickPositions(),
            r.postProcessTickInterval && (r.tickInterval = r.postProcessTickInterval(r.tickInterval)),
            r.pointRange && !y && (r.tickInterval = ue(r.pointRange, r.tickInterval)),
            t = Je(c.minTickInterval, r.isDatetimeAxis && r.closestPointRange),
            !y && r.tickInterval < t && (r.tickInterval = t),
            p || d || y || (r.tickInterval = C(r.tickInterval, null, w(r.tickInterval), Je(c.allowDecimals, !(r.tickInterval > .5 && r.tickInterval < 5 && r.max > 1e3 && r.max < 9999)), !!this.tickAmount)),
            !this.tickAmount && this.len && (r.tickInterval = r.unsquish()),
            this.setTickPositions()
        },
        setTickPositions: function() {
            var t, e, i = this.options, s = i.tickPositions, n = i.tickPositioner, o = i.startOnTick, r = i.endOnTick;
            this.tickmarkOffset = this.categories && "between" === i.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0,
            this.minorTickInterval = "auto" === i.minorTickInterval && this.tickInterval ? this.tickInterval / 5 : i.minorTickInterval,
            this.tickPositions = t = s && s.slice(),
            !t && (t = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, i.units), this.min, this.max, i.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max),
            t.length > this.len && (t = [t[0], t.pop()]),
            this.tickPositions = t,
            n && (n = n.apply(this, [this.min, this.max]))) && (this.tickPositions = t = n),
            this.isLinked || (this.trimTicks(t, o, r),
            this.min === this.max && u(this.min) && !this.tickAmount && (e = !0,
            this.min -= .5,
            this.max += .5),
            this.single = e,
            !s && !n && this.adjustTickAmount())
        },
        trimTicks: function(t, e, i) {
            var s = t[0]
              , n = t[t.length - 1]
              , o = this.minPointOffset || 0;
            if (e)
                this.min = s;
            else
                for (; this.min - o > t[0]; )
                    t.shift();
            if (i)
                this.max = n;
            else
                for (; this.max + o < t[t.length - 1]; )
                    t.pop();
            0 === t.length && u(s) && t.push((n + s) / 2)
        },
        alignToOthers: function() {
            var t, e = {}, i = this.options;
            return this.chart.options.chart.alignTicks !== !1 && i.alignTicks !== !1 && Ne(this.chart[this.coll], function(i) {
                var s = i.options
                  , s = [i.horiz ? s.left : s.top, s.width, s.height, s.pane].join(",");
                i.series.length && (e[s] ? t = !0 : e[s] = 1)
            }),
            t
        },
        getTickAmount: function() {
            var t = this.options
              , e = t.tickAmount
              , i = t.tickPixelInterval;
            !u(t.tickInterval) && this.len < i && !this.isRadial && !this.isLog && t.startOnTick && t.endOnTick && (e = 2),
            !e && this.alignToOthers() && (e = de(this.len / i) + 1),
            4 > e && (this.finalTickAmt = e,
            e = 5),
            this.tickAmount = e
        },
        adjustTickAmount: function() {
            var t = this.tickInterval
              , e = this.tickPositions
              , i = this.tickAmount
              , s = this.finalTickAmt
              , n = e && e.length;
            if (i > n) {
                for (; e.length < i; )
                    e.push(L(e[e.length - 1] + t));
                this.transA *= (n - 1) / (i - 1),
                this.max = e[e.length - 1]
            } else
                n > i && (this.tickInterval *= 2,
                this.setTickPositions());
            if (u(s)) {
                for (t = i = e.length; t--; )
                    (3 === s && t % 2 === 1 || 2 >= s && t > 0 && i - 1 > t) && e.splice(t, 1);
                this.finalTickAmt = _
            }
        },
        setScale: function() {
            var t, e;
            this.oldMin = this.min,
            this.oldMax = this.max,
            this.oldAxisLength = this.len,
            this.setAxisSize(),
            e = this.len !== this.oldAxisLength,
            Ne(this.series, function(e) {
                (e.isDirtyData || e.isDirty || e.xAxis.isDirty) && (t = !0)
            }),
            e || t || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(),
            this.forceRedraw = !1,
            this.getSeriesExtremes(),
            this.setTickInterval(),
            this.oldUserMin = this.userMin,
            this.oldUserMax = this.userMax,
            this.isDirty || (this.isDirty = e || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks()
        },
        setExtremes: function(t, e, i, s, n) {
            var o = this
              , r = o.chart
              , i = Je(i, !0);
            Ne(o.series, function(t) {
                delete t.kdTree
            }),
            n = Ze(n, {
                min: t,
                max: e
            }),
            Ve(o, "setExtremes", n, function() {
                o.userMin = t,
                o.userMax = e,
                o.eventArgs = n,
                i && r.redraw(s)
            })
        },
        zoom: function(t, e) {
            var i = this.dataMin
              , s = this.dataMax
              , n = this.options
              , o = pe(i, Je(n.min, i))
              , n = ue(s, Je(n.max, s));
            return this.allowZoomOutside || (u(i) && o >= t && (t = o),
            u(s) && e >= n && (e = n)),
            this.displayBtn = t !== _ || e !== _,
            this.setExtremes(t, e, !1, _, {
                trigger: "zoom"
            }),
            !0
        },
        setAxisSize: function() {
            var t = this.chart
              , e = this.options
              , i = e.offsetLeft || 0
              , s = this.horiz
              , n = Je(e.width, t.plotWidth - i + (e.offsetRight || 0))
              , o = Je(e.height, t.plotHeight)
              , r = Je(e.top, t.plotTop)
              , e = Je(e.left, t.plotLeft + i)
              , i = /%$/;
            i.test(o) && (o = Math.round(parseFloat(o) / 100 * t.plotHeight)),
            i.test(r) && (r = Math.round(parseFloat(r) / 100 * t.plotHeight + t.plotTop)),
            this.left = e,
            this.top = r,
            this.width = n,
            this.height = o,
            this.bottom = t.chartHeight - o - r,
            this.right = t.chartWidth - n - e,
            this.len = ue(s ? n : o, 0),
            this.pos = s ? e : r
        },
        getExtremes: function() {
            var t = this.isLog;
            return {
                min: t ? L(c(this.min)) : this.min,
                max: t ? L(c(this.max)) : this.max,
                dataMin: this.dataMin,
                dataMax: this.dataMax,
                userMin: this.userMin,
                userMax: this.userMax
            }
        },
        getThreshold: function(t) {
            var e = this.isLog
              , i = e ? c(this.min) : this.min
              , e = e ? c(this.max) : this.max;
            return null === t ? t = 0 > e ? e : i : i > t ? t = i : t > e && (t = e),
            this.translate(t, 0, 1, 0, 1)
        },
        autoLabelAlign: function(t) {
            return t = (Je(t, 0) - 90 * this.side + 720) % 360,
            t > 15 && 165 > t ? "right" : t > 195 && 345 > t ? "left" : "center"
        },
        unsquish: function() {
            var t, e, i, s = this.ticks, n = this.options.labels, o = this.horiz, r = this.tickInterval, a = r, l = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / r), h = n.rotation, c = this.chart.renderer.fontMetrics(n.style.fontSize, s[0] && s[0].label), d = Number.MAX_VALUE, p = function(t) {
                return t /= l || 1,
                t = t > 1 ? de(t) : 1,
                t * r
            };
            return o ? (i = !n.staggerLines && !n.step && (u(h) ? [h] : l < Je(n.autoRotationLimit, 80) && n.autoRotation)) && Ne(i, function(i) {
                var s;
                (i === h || i && i >= -90 && 90 >= i) && (e = p(fe(c.h / me(ye * i))),
                s = e + fe(i / 360),
                d > s && (d = s,
                t = i,
                a = e))
            }) : n.step || (a = p(c.h)),
            this.autoRotation = i,
            this.labelRotation = Je(t, h),
            a
        },
        renderUnsquish: function() {
            var t, e, i, n = this.chart, r = n.renderer, a = this.tickPositions, l = this.ticks, h = this.options.labels, c = this.horiz, d = n.margin, u = this.categories ? a.length : a.length - 1, d = this.slotWidth = c && (h.step || 0) < 2 && !h.rotation && (this.staggerLines || 1) * n.plotWidth / u || !c && (d[3] && d[3] - n.spacing[3] || .33 * n.chartWidth), p = ue(1, he(d - 2 * (h.padding || 5))), f = {}, u = r.fontMetrics(h.style.fontSize, l[0] && l[0].label), g = h.style.textOverflow, m = 0;
            if (o(h.rotation) || (f.rotation = h.rotation || 0),
            this.autoRotation)
                Ne(a, function(t) {
                    (t = l[t]) && t.labelLength > m && (m = t.labelLength)
                }),
                m > p && m > u.h ? f.rotation = this.labelRotation : this.labelRotation = 0;
            else if (d && (t = {
                width: p + "px"
            },
            !g))
                for (t.textOverflow = "clip",
                e = a.length; !c && e--; )
                    i = a[e],
                    (p = l[i].label) && ("ellipsis" === p.styles.textOverflow && p.css({
                        textOverflow: "clip"
                    }),
                    (p.getBBox().height > this.len / a.length - (u.h - u.f) || l[i].labelLength > d) && (p.specCss = {
                        textOverflow: "ellipsis"
                    }));
            f.rotation && (t = {
                width: (m > .5 * n.chartHeight ? .33 * n.chartHeight : n.chartHeight) + "px"
            },
            !g) && (t.textOverflow = "ellipsis"),
            (this.labelAlign = h.align || this.autoLabelAlign(this.labelRotation)) && (f.align = this.labelAlign),
            Ne(a, function(e) {
                var i = (e = l[e]) && e.label;
                i && (i.attr(f),
                t && i.css(s(t, i.specCss)),
                delete i.specCss,
                e.rotation = f.rotation)
            }),
            this.tickRotCorr = r.rotCorr(u.b, this.labelRotation || 0, 0 !== this.side)
        },
        hasData: function() {
            return this.hasVisibleSeries || u(this.min) && u(this.max) && !!this.tickPositions
        },
        getOffset: function() {
            var t, e, i, s, n = this, o = n.chart, r = o.renderer, a = n.options, l = n.tickPositions, h = n.ticks, c = n.horiz, d = n.side, p = o.inverted ? [1, 0, 3, 2][d] : d, f = 0, g = 0, m = a.title, v = a.labels, y = 0, x = n.opposite, b = o.axisOffset, o = o.clipOffset, k = [-1, 1, 1, -1][d], w = n.axisParent;
            if (t = n.hasData(),
            n.showAxis = e = t || Je(a.showEmpty, !0),
            n.staggerLines = n.horiz && v.staggerLines,
            n.axisGroup || (n.gridGroup = r.g("grid").attr({
                zIndex: a.gridZIndex || 1
            }).add(w),
            n.axisGroup = r.g("axis").attr({
                zIndex: a.zIndex || 2
            }).add(w),
            n.labelGroup = r.g("axis-labels").attr({
                zIndex: v.zIndex || 7
            }).addClass("highcharts-" + n.coll.toLowerCase() + "-labels").add(w)),
            t || n.isLinked)
                Ne(l, function(t) {
                    h[t] ? h[t].addLabel() : h[t] = new E(n,t)
                }),
                n.renderUnsquish(),
                v.reserveSpace !== !1 && (0 === d || 2 === d || {
                    1: "left",
                    3: "right"
                }[d] === n.labelAlign || "center" === n.labelAlign) && Ne(l, function(t) {
                    y = ue(h[t].getLabelSize(), y)
                }),
                n.staggerLines && (y *= n.staggerLines,
                n.labelOffset = y * (n.opposite ? -1 : 1));
            else
                for (s in h)
                    h[s].destroy(),
                    delete h[s];
            m && m.text && m.enabled !== !1 && (n.axisTitle || (n.axisTitle = r.text(m.text, 0, 0, m.useHTML).attr({
                zIndex: 7,
                rotation: m.rotation || 0,
                align: m.textAlign || {
                    low: x ? "right" : "left",
                    middle: "center",
                    high: x ? "left" : "right"
                }[m.align]
            }).addClass("highcharts-" + this.coll.toLowerCase() + "-title").css(m.style).add(n.axisGroup),
            n.axisTitle.isNew = !0),
            e && (f = n.axisTitle.getBBox()[c ? "height" : "width"],
            i = m.offset,
            g = u(i) ? 0 : Je(m.margin, c ? 5 : 10)),
            n.axisTitle[e ? "show" : "hide"](!0)),
            n.offset = k * Je(a.offset, b[d]),
            n.tickRotCorr = n.tickRotCorr || {
                x: 0,
                y: 0
            },
            r = 2 === d ? n.tickRotCorr.y : 0,
            c = Math.abs(y) + g + (y && k * (c ? Je(v.y, n.tickRotCorr.y + 8) : v.x) - r),
            n.axisTitleMargin = Je(i, c),
            b[d] = ue(b[d], n.axisTitleMargin + f + k * n.offset, c),
            a = a.offset ? 0 : 2 * ce(a.lineWidth / 2),
            o[p] = ue(o[p], a)
        },
        getLinePath: function(t) {
            var e = this.chart
              , i = this.opposite
              , s = this.offset
              , n = this.horiz
              , o = this.left + (i ? this.width : 0) + s
              , s = e.chartHeight - this.bottom - (i ? this.height : 0) + s;
            return i && (t *= -1),
            e.renderer.crispLine(["M", n ? this.left : o, n ? s : this.top, "L", n ? e.chartWidth - this.right : o, n ? s : e.chartHeight - this.bottom], t)
        },
        getTitlePosition: function() {
            var t = this.horiz
              , e = this.left
              , i = this.top
              , s = this.len
              , o = this.options.title
              , r = t ? e : i
              , a = this.opposite
              , l = this.offset
              , h = o.x || 0
              , c = o.y || 0
              , d = n(o.style.fontSize || 12)
              , s = {
                low: r + (t ? 0 : s),
                middle: r + s / 2,
                high: r + (t ? s : 0)
            }[o.align]
              , e = (t ? i + this.height : e) + (t ? 1 : -1) * (a ? -1 : 1) * this.axisTitleMargin + (2 === this.side ? d : 0);
            return {
                x: t ? s + h : e + (a ? this.width : 0) + l + h,
                y: t ? e + c - (a ? this.height : 0) + l : s + c
            }
        },
        render: function() {
            var t, e, i, s = this, n = s.chart, o = n.renderer, r = s.options, a = s.isLog, l = s.isLinked, h = s.tickPositions, d = s.axisTitle, p = s.ticks, f = s.minorTicks, m = s.alternateBands, v = r.stackLabels, y = r.alternateGridColor, x = s.tickmarkOffset, b = r.lineWidth, k = n.hasRendered && u(s.oldMin) && !isNaN(s.oldMin), w = s.showAxis, C = o.globalAnimation;
            s.labelEdge.length = 0,
            s.overlap = !1,
            Ne([p, f, m], function(t) {
                for (var e in t)
                    t[e].isActive = !1
            }),
            (s.hasData() || l) && (s.minorTickInterval && !s.categories && Ne(s.getMinorTickPositions(), function(t) {
                f[t] || (f[t] = new E(s,t,"minor")),
                k && f[t].isNew && f[t].render(null, !0),
                f[t].render(null, !1, 1)
            }),
            h.length && (Ne(h, function(t, e) {
                (!l || t >= s.min && t <= s.max) && (p[t] || (p[t] = new E(s,t)),
                k && p[t].isNew && p[t].render(e, !0, .1),
                p[t].render(e))
            }),
            x && (0 === s.min || s.single)) && (p[-1] || (p[-1] = new E(s,-1,null,!0)),
            p[-1].render(-1)),
            y && Ne(h, function(t, o) {
                i = h[o + 1] !== _ ? h[o + 1] + x : s.max - x,
                o % 2 === 0 && t < s.max && i <= s.max + (n.polar ? -x : x) && (m[t] || (m[t] = new re.PlotLineOrBand(s)),
                e = t + x,
                m[t].options = {
                    from: a ? c(e) : e,
                    to: a ? c(i) : i,
                    color: y
                },
                m[t].render(),
                m[t].isActive = !0)
            }),
            s._addedPlotLB || (Ne((r.plotLines || []).concat(r.plotBands || []), function(t) {
                s.addPlotBandOrLine(t)
            }),
            s._addedPlotLB = !0)),
            Ne([p, f, m], function(t) {
                var e, i, s = [], o = C ? C.duration || 500 : 0;
                for (e in t)
                    t[e].isActive || (t[e].render(e, !1, 0),
                    t[e].isActive = !1,
                    s.push(e));
                g(function() {
                    for (i = s.length; i--; )
                        t[s[i]] && !t[s[i]].isActive && (t[s[i]].destroy(),
                        delete t[s[i]])
                }, t !== m && n.hasRendered && o ? o : 0)
            }),
            b && (t = s.getLinePath(b),
            s.axisLine ? s.axisLine.animate({
                d: t
            }) : s.axisLine = o.path(t).attr({
                stroke: r.lineColor,
                "stroke-width": b,
                zIndex: 7
            }).add(s.axisGroup),
            s.axisLine[w ? "show" : "hide"](!0)),
            d && w && (d[d.isNew ? "attr" : "animate"](s.getTitlePosition()),
            d.isNew = !1),
            v && v.enabled && s.renderStackTotals(),
            s.isDirty = !1
        },
        redraw: function() {
            this.visible && (this.render(),
            Ne(this.plotLinesAndBands, function(t) {
                t.render()
            })),
            Ne(this.series, function(t) {
                t.isDirty = !0
            })
        },
        destroy: function(t) {
            var e, i = this, s = i.stacks, n = i.plotLinesAndBands;
            t || Xe(i);
            for (e in s)
                D(s[e]),
                s[e] = null;
            for (Ne([i.ticks, i.minorTicks, i.alternateBands], function(t) {
                D(t)
            }),
            t = n.length; t--; )
                n[t].destroy();
            Ne("stackTotalGroup,axisLine,axisTitle,axisGroup,cross,gridGroup,labelGroup".split(","), function(t) {
                i[t] && (i[t] = i[t].destroy())
            }),
            this.cross && this.cross.destroy()
        },
        drawCrosshair: function(t, e) {
            var i, s, n, o = this.crosshair;
            this.crosshair && (u(e) || !Je(o.snap, !0)) !== !1 ? (Je(o.snap, !0) ? u(e) && (i = this.isXAxis ? e.plotX : this.len - e.plotY) : i = this.horiz ? t.chartX - this.pos : this.len - t.chartY + this.pos,
            i = this.isRadial ? this.getPlotLinePath(this.isXAxis ? e.x : Je(e.stackY, e.y)) || null : this.getPlotLinePath(null, null, null, null, i) || null,
            null === i ? this.hideCrosshair() : (s = this.categories && !this.isRadial,
            n = Je(o.width, s ? this.transA : 1),
            this.cross ? this.cross.attr({
                d: i,
                visibility: "visible",
                "stroke-width": n
            }) : (s = {
                "stroke-width": n,
                stroke: o.color || (s ? "rgba(155,200,255,0.2)" : "#C0C0C0"),
                zIndex: Je(o.zIndex, 2)
            },
            o.dashStyle && (s.dashstyle = o.dashStyle),
            this.cross = this.chart.renderer.path(i).attr(s).add()))) : this.hideCrosshair()
        },
        hideCrosshair: function() {
            this.cross && this.cross.hide()
        }
    },
    Ze(ri.prototype, {
        getPlotBandPath: function(t, e) {
            var i = this.getPlotLinePath(e, null, null, !0)
              , s = this.getPlotLinePath(t, null, null, !0);
            return s && i ? (s.flat = s.toString() === i.toString(),
            s.push(i[4], i[5], i[1], i[2])) : s = null,
            s
        },
        addPlotBand: function(t) {
            return this.addPlotBandOrLine(t, "plotBands")
        },
        addPlotLine: function(t) {
            return this.addPlotBandOrLine(t, "plotLines")
        },
        addPlotBandOrLine: function(t, e) {
            var i = new re.PlotLineOrBand(this,t).render()
              , s = this.userOptions;
            return i && (e && (s[e] = s[e] || [],
            s[e].push(t)),
            this.plotLinesAndBands.push(i)),
            i
        },
        removePlotBandOrLine: function(t) {
            for (var e = this.plotLinesAndBands, i = this.options, s = this.userOptions, n = e.length; n--; )
                e[n].id === t && e[n].destroy();
            Ne([i.plotLines || [], s.plotLines || [], i.plotBands || [], s.plotBands || []], function(e) {
                for (n = e.length; n--; )
                    e[n].id === t && d(e, e[n])
            })
        }
    }),
    ri.prototype.getTimeTicks = function(t, e, i, s) {
        var n, o = [], r = {}, a = W.global.useUTC, l = new Y(e - b(e)), h = t.unitRange, c = t.count;
        if (u(e)) {
            l[Q](h >= $.second ? 0 : c * ce(l.getMilliseconds() / c)),
            h >= $.second && l[te](h >= $.minute ? 0 : c * ce(l.getSeconds() / c)),
            h >= $.minute && l[ee](h >= $.hour ? 0 : c * ce(l[V]() / c)),
            h >= $.hour && l[ie](h >= $.day ? 0 : c * ce(l[j]() / c)),
            h >= $.day && l[se](h >= $.month ? 1 : c * ce(l[K]() / c)),
            h >= $.month && (l[ne](h >= $.year ? 0 : c * ce(l[Z]() / c)),
            n = l[J]()),
            h >= $.year && (n -= n % c,
            l[oe](n)),
            h === $.week && l[se](l[K]() - l[q]() + Je(s, 1)),
            e = 1,
            (U || X) && (l = l.getTime(),
            l = new Y(l + b(l))),
            n = l[J]();
            for (var s = l.getTime(), d = l[Z](), p = l[K](), f = !a || !!X, g = ($.day + (a ? b(l) : 6e4 * l.getTimezoneOffset())) % $.day; i > s; )
                o.push(s),
                h === $.year ? s = G(n + e * c, 0) : h === $.month ? s = G(n, d + e * c) : !f || h !== $.day && h !== $.week ? s += h * c : s = G(n, d, p + e * c * (h === $.day ? 1 : 7)),
                e++;
            o.push(s),
            Ne($e(o, function(t) {
                return h <= $.hour && t % $.day === g
            }), function(t) {
                r[t] = "day"
            })
        }
        return o.info = Ze(t, {
            higherRanks: r,
            totalRange: h * c
        }),
        o
    }
    ,
    ri.prototype.normalizeTimeTickInterval = function(t, e) {
        var i, s = e || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]], n = s[s.length - 1], o = $[n[0]], r = n[1];
        for (i = 0; i < s.length && (n = s[i],
        o = $[n[0]],
        r = n[1],
        !(s[i + 1] && t <= (o * r[r.length - 1] + $[s[i + 1][0]]) / 2)); i++)
            ;
        return o === $.year && 5 * o > t && (r = [1, 2, 5]),
        s = C(t / o, r, "year" === n[0] ? ue(w(t / o), 1) : 1),
        {
            unitRange: o,
            count: s,
            unitName: n[0]
        }
    }
    ,
    ri.prototype.getLogTickPositions = function(t, e, i, s) {
        var n = this.options
          , o = this.len
          , r = [];
        if (s || (this._minorAutoInterval = null),
        t >= .5)
            t = he(t),
            r = this.getLinearTickPositions(t, e, i);
        else if (t >= .08)
            for (var a, l, d, u, p, o = ce(e), n = t > .3 ? [1, 2, 4] : t > .15 ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; i + 1 > o && !p; o++)
                for (l = n.length,
                a = 0; l > a && !p; a++)
                    d = h(c(o) * n[a]),
                    d > e && (!s || i >= u) && u !== _ && r.push(u),
                    u > i && (p = !0),
                    u = d;
        else
            e = c(e),
            i = c(i),
            t = n[s ? "minorTickInterval" : "tickInterval"],
            t = Je("auto" === t ? null : t, this._minorAutoInterval, (i - e) * (n.tickPixelInterval / (s ? 5 : 1)) / ((s ? o / this.tickPositions.length : o) || 1)),
            t = C(t, null, w(t)),
            r = Ge(this.getLinearTickPositions(t, e, i), h),
            s || (this._minorAutoInterval = t / 5);
        return s || (this.tickInterval = t),
        r
    }
    ;
    var ai = re.Tooltip = function() {
        this.init.apply(this, arguments)
    }
    ;
    ai.prototype = {
        init: function(t, e) {
            var i = e.borderWidth
              , s = e.style
              , o = n(s.padding);
            this.chart = t,
            this.options = e,
            this.crosshairs = [],
            this.now = {
                x: 0,
                y: 0
            },
            this.isHidden = !0,
            this.label = t.renderer.label("", 0, 0, e.shape || "callout", null, null, e.useHTML, null, "tooltip").attr({
                padding: o,
                fill: e.backgroundColor,
                "stroke-width": i,
                r: e.borderRadius,
                zIndex: 8
            }).css(s).css({
                padding: 0
            }).add().attr({
                y: -9999
            }),
            Le || this.label.shadow(e.shadow),
            this.shared = e.shared
        },
        destroy: function() {
            this.label && (this.label = this.label.destroy()),
            clearTimeout(this.hideTimer),
            clearTimeout(this.tooltipTimeout)
        },
        move: function(t, e, i, s) {
            var n = this
              , o = n.now
              , r = n.options.animation !== !1 && !n.isHidden && (fe(t - o.x) > 1 || fe(e - o.y) > 1)
              , a = n.followPointer || n.len > 1;
            Ze(o, {
                x: r ? (2 * o.x + t) / 3 : t,
                y: r ? (o.y + e) / 2 : e,
                anchorX: a ? _ : r ? (2 * o.anchorX + i) / 3 : i,
                anchorY: a ? _ : r ? (o.anchorY + s) / 2 : s
            }),
            n.label.attr(o),
            r && (clearTimeout(this.tooltipTimeout),
            this.tooltipTimeout = setTimeout(function() {
                n && n.move(t, e, i, s)
            }, 32))
        },
        hide: function(t) {
            var e = this;
            clearTimeout(this.hideTimer),
            t = Je(t, this.options.hideDelay, 500),
            this.isHidden || (this.hideTimer = g(function() {
                e.label[t ? "fadeOut" : "hide"](),
                e.isHidden = !0
            }, t))
        },
        getAnchor: function(t, e) {
            var i, s, n, o = this.chart, r = o.inverted, a = o.plotTop, l = o.plotLeft, h = 0, c = 0, t = f(t);
            return i = t[0].tooltipPos,
            this.followPointer && e && (e.chartX === _ && (e = o.pointer.normalize(e)),
            i = [e.chartX - o.plotLeft, e.chartY - a]),
            i || (Ne(t, function(t) {
                s = t.series.yAxis,
                n = t.series.xAxis,
                h += t.plotX + (!r && n ? n.left - l : 0),
                c += (t.plotLow ? (t.plotLow + t.plotHigh) / 2 : t.plotY) + (!r && s ? s.top - a : 0)
            }),
            h /= t.length,
            c /= t.length,
            i = [r ? o.plotWidth - c : h, this.shared && !r && t.length > 1 && e ? e.chartY - a : r ? o.plotHeight - h : c]),
            Ge(i, he)
        },
        getPosition: function(t, e, i) {
            var s, n = this.chart, o = this.distance, r = {}, a = i.h || 0, l = ["y", n.chartHeight, e, i.plotY + n.plotTop, n.plotTop, n.plotTop + n.plotHeight], h = ["x", n.chartWidth, t, i.plotX + n.plotLeft, n.plotLeft, n.plotLeft + n.plotWidth], c = Je(i.ttBelow, n.inverted && !i.negative || !n.inverted && i.negative), d = function(t, e, i, s, n, l) {
                var h = s - o > i
                  , d = e > s + o + i
                  , u = s - o - i;
                if (s += o,
                c && d)
                    r[t] = s;
                else if (!c && h)
                    r[t] = u;
                else if (h)
                    r[t] = pe(l - i, 0 > u - a ? u : u - a);
                else {
                    if (!d)
                        return !1;
                    r[t] = ue(n, s + a + i > e ? s : s + a)
                }
            }, u = function(t, e, i, s) {
                var n;
                return o > s || s > e - o ? n = !1 : r[t] = i / 2 > s ? 1 : s > e - i / 2 ? e - i - 2 : s - i / 2,
                n
            }, p = function(t) {
                var e = l;
                l = h,
                h = e,
                s = t
            }, f = function() {
                d.apply(0, l) !== !1 ? u.apply(0, h) === !1 && !s && (p(!0),
                f()) : s ? r.x = r.y = 0 : (p(!0),
                f())
            };
            return (n.inverted || this.len > 1) && p(),
            f(),
            r
        },
        defaultFormatter: function(t) {
            var e, i = this.points || f(this);
            return e = [t.tooltipFooterHeaderFormatter(i[0])],
            e = e.concat(t.bodyFormatter(i)),
            e.push(t.tooltipFooterHeaderFormatter(i[0], !0)),
            e.join("")
        },
        refresh: function(t, e) {
            var i, s, n, o, r = this.chart, a = this.label, l = this.options, h = {}, c = [];
            o = l.formatter || this.defaultFormatter;
            var d, h = r.hoverPoints, u = this.shared;
            clearTimeout(this.hideTimer),
            this.followPointer = f(t)[0].series.tooltipOptions.followPointer,
            n = this.getAnchor(t, e),
            i = n[0],
            s = n[1],
            !u || t.series && t.series.noSharedTooltip ? h = t.getLabelConfig() : (r.hoverPoints = t,
            h && Ne(h, function(t) {
                t.setState()
            }),
            Ne(t, function(t) {
                t.setState("hover"),
                c.push(t.getLabelConfig())
            }),
            h = {
                x: t[0].category,
                y: t[0].y
            },
            h.points = c,
            this.len = c.length,
            t = t[0]),
            o = o.call(h, this),
            h = t.series,
            this.distance = Je(h.tooltipOptions.distance, 16),
            o === !1 ? this.hide() : (this.isHidden && (qe(a),
            a.attr("opacity", 1).show()),
            a.attr({
                text: o
            }),
            d = l.borderColor || t.color || h.color || "#606060",
            a.attr({
                stroke: d
            }),
            this.updatePosition({
                plotX: i,
                plotY: s,
                negative: t.negative,
                ttBelow: t.ttBelow,
                h: n[2] || 0
            }),
            this.isHidden = !1),
            Ve(r, "tooltipRefresh", {
                text: o,
                x: i + r.plotLeft,
                y: s + r.plotTop,
                borderColor: d
            })
        },
        updatePosition: function(t) {
            var e = this.chart
              , i = this.label
              , i = (this.options.positioner || this.getPosition).call(this, i.width, i.height, t);
            this.move(he(i.x), he(i.y || 0), t.plotX + e.plotLeft, t.plotY + e.plotTop)
        },
        getXDateFormat: function(t, e, i) {
            var s, n, o, e = e.dateTimeLabelFormats, r = i && i.closestPointRange, a = {
                millisecond: 15,
                second: 12,
                minute: 9,
                hour: 6,
                day: 3
            }, l = "millisecond";
            if (r) {
                o = N("%m-%d %H:%M:%S.%L", t.x);
                for (n in $) {
                    if (r === $.week && +N("%w", t.x) === i.options.startOfWeek && "00:00:00.000" === o.substr(6)) {
                        n = "week";
                        break
                    }
                    if ($[n] > r) {
                        n = l;
                        break
                    }
                    if (a[n] && o.substr(a[n]) !== "01-01 00:00:00.000".substr(a[n]))
                        break;
                    "week" !== n && (l = n)
                }
                n && (s = e[n])
            } else
                s = e.day;
            return s || e.year
        },
        tooltipFooterHeaderFormatter: function(t, e) {
            var i = e ? "footer" : "header"
              , s = t.series
              , n = s.tooltipOptions
              , o = n.xDateFormat
              , r = s.xAxis
              , a = r && "datetime" === r.options.type && l(t.key)
              , i = n[i + "Format"];
            return a && !o && (o = this.getXDateFormat(t, n, r)),
            a && o && (i = i.replace("{point.key}", "{point.key:" + o + "}")),
            k(i, {
                point: t,
                series: s
            })
        },
        bodyFormatter: function(t) {
            return Ge(t, function(t) {
                var e = t.series.tooltipOptions;
                return (e.pointFormatter || t.point.tooltipFormatter).call(t.point, e.pointFormat)
            })
        }
    };
    var li;
    B = ae && ae.documentElement.ontouchstart !== _;
    var hi = re.Pointer = function(t, e) {
        this.init(t, e)
    }
    ;
    if (hi.prototype = {
        init: function(t, e) {
            var i, s = e.chart, n = s.events, o = Le ? "" : s.zoomType, s = t.inverted;
            this.options = e,
            this.chart = t,
            this.zoomX = i = /x/.test(o),
            this.zoomY = o = /y/.test(o),
            this.zoomHor = i && !s || o && s,
            this.zoomVert = o && !s || i && s,
            this.hasZoom = i || o,
            this.runChartClick = n && !!n.click,
            this.pinchDown = [],
            this.lastValidTouch = {},
            re.Tooltip && e.tooltip.enabled && (t.tooltip = new ai(t,e.tooltip),
            this.followTouchMove = Je(e.tooltip.followTouchMove, !0)),
            this.setDOMEvents()
        },
        normalize: function(e, i) {
            var s, n, e = e || t.event;
            return e.target || (e.target = e.srcElement),
            n = e.touches ? e.touches.length ? e.touches.item(0) : e.changedTouches[0] : e,
            i || (this.chartPosition = i = Ye(this.chart.container)),
            n.pageX === _ ? (s = ue(e.x, e.clientX - i.left),
            n = e.y) : (s = n.pageX - i.left,
            n = n.pageY - i.top),
            Ze(e, {
                chartX: he(s),
                chartY: he(n)
            })
        },
        getCoordinates: function(t) {
            var e = {
                xAxis: [],
                yAxis: []
            };
            return Ne(this.chart.axes, function(i) {
                e[i.isXAxis ? "xAxis" : "yAxis"].push({
                    axis: i,
                    value: i.toValue(t[i.horiz ? "chartX" : "chartY"])
                })
            }),
            e
        },
        runPointActions: function(t) {
            var e, i, s, n = this.chart, o = n.series, r = n.tooltip, a = r ? r.shared : !1, l = n.hoverPoint, h = n.hoverSeries, c = [Number.MAX_VALUE, Number.MAX_VALUE], d = [], u = [];
            if (!a && !h)
                for (n = 0; n < o.length; n++)
                    (o[n].directTouch || !o[n].options.stickyTracking) && (o = []);
            if (h && (a ? h.noSharedTooltip : h.directTouch) && l ? u = [l] : (Ne(o, function(n) {
                e = n.noSharedTooltip && a,
                i = !a && n.directTouch,
                n.visible && !e && !i && Je(n.options.enableMouseTracking, !0) && (s = n.searchPoint(t, !e && 1 === n.kdDimensions)) && d.push(s)
            }),
            Ne(d, function(t) {
                t && Ne(["dist", "distX"], function(e, i) {
                    "number" == typeof t[e] && t[e] < c[i] && (c[i] = t[e],
                    u[i] = t)
                })
            })),
            a)
                for (n = d.length; n--; )
                    (d[n].clientX !== u[1].clientX || d[n].series.noSharedTooltip) && d.splice(n, 1);
            u[0] && (u[0] !== this.prevKDPoint || r && r.isHidden) ? a && !u[0].series.noSharedTooltip ? (d.length && r && r.refresh(d, t),
            Ne(d, function(e) {
                e.onMouseOver(t, e !== (h && h.directTouch && l || u[0]))
            }),
            this.prevKDPoint = u[1]) : (r && r.refresh(u[0], t),
            h && h.directTouch || u[0].onMouseOver(t),
            this.prevKDPoint = u[0]) : (o = h && h.tooltipOptions.followPointer,
            r && o && !r.isHidden && (o = r.getAnchor([{}], t),
            r.updatePosition({
                plotX: o[0],
                plotY: o[1]
            }))),
            this._onDocumentMouseMove || (this._onDocumentMouseMove = function(t) {
                Oe[li] && Oe[li].pointer.onDocumentMouseMove(t)
            }
            ,
            Ue(ae, "mousemove", this._onDocumentMouseMove)),
            Ne(a ? d : [Je(u[1], l)], function(e) {
                var i = e && e.series;
                i && Ne(["xAxis", "yAxis", "colorAxis"], function(s) {
                    i[s] && i[s].drawCrosshair(t, e)
                })
            })
        },
        reset: function(t, e) {
            var i = this.chart
              , s = i.hoverSeries
              , n = i.hoverPoint
              , o = i.hoverPoints
              , r = i.tooltip
              , a = r && r.shared ? o : n;
            (t = t && r && a) && Ne(f(a), function(e) {
                void 0 === e.plotX && (t = !1)
            }),
            t ? (r.refresh(a),
            n && (n.setState(n.state, !0),
            Ne(i.axes, function(t) {
                Je(t.options.crosshair && t.options.crosshair.snap, !0) ? t.drawCrosshair(null, n) : t.hideCrosshair()
            }))) : (n && n.onMouseOut(),
            o && Ne(o, function(t) {
                t.setState()
            }),
            s && s.onMouseOut(),
            r && r.hide(e),
            this._onDocumentMouseMove && (Xe(ae, "mousemove", this._onDocumentMouseMove),
            this._onDocumentMouseMove = null),
            Ne(i.axes, function(t) {
                t.hideCrosshair()
            }),
            this.hoverX = i.hoverPoints = i.hoverPoint = null)
        },
        scaleGroups: function(t, e) {
            var i, s = this.chart;
            Ne(s.series, function(n) {
                i = t || n.getPlotBox(),
                n.xAxis && n.xAxis.zoomEnabled && (n.group.attr(i),
                n.markerGroup && (n.markerGroup.attr(i),
                n.markerGroup.clip(e ? s.clipRect : null)),
                n.dataLabelsGroup && n.dataLabelsGroup.attr(i))
            }),
            s.clipRect.attr(e || s.clipBox)
        },
        dragStart: function(t) {
            var e = this.chart;
            e.mouseIsDown = t.type,
            e.cancelClick = !1,
            e.mouseDownX = this.mouseDownX = t.chartX,
            e.mouseDownY = this.mouseDownY = t.chartY
        },
        drag: function(t) {
            var e, i = this.chart, s = i.options.chart, n = t.chartX, o = t.chartY, r = this.zoomHor, a = this.zoomVert, l = i.plotLeft, h = i.plotTop, c = i.plotWidth, d = i.plotHeight, u = this.selectionMarker, p = this.mouseDownX, f = this.mouseDownY, g = s.panKey && t[s.panKey + "Key"];
            u && u.touch || (l > n ? n = l : n > l + c && (n = l + c),
            h > o ? o = h : o > h + d && (o = h + d),
            this.hasDragged = Math.sqrt(Math.pow(p - n, 2) + Math.pow(f - o, 2)),
            this.hasDragged > 10 && (e = i.isInsidePlot(p - l, f - h),
            i.hasCartesianSeries && (this.zoomX || this.zoomY) && e && !g && !u && (this.selectionMarker = u = i.renderer.rect(l, h, r ? 1 : c, a ? 1 : d, 0).attr({
                fill: s.selectionMarkerFill || "rgba(69,114,167,0.25)",
                zIndex: 7
            }).add()),
            u && r && (n -= p,
            u.attr({
                width: fe(n),
                x: (n > 0 ? 0 : n) + p
            })),
            u && a && (n = o - f,
            u.attr({
                height: fe(n),
                y: (n > 0 ? 0 : n) + f
            })),
            e && !u && s.panning && i.pan(t, s.panning)))
        },
        drop: function(t) {
            var e = this
              , i = this.chart
              , s = this.hasPinched;
            if (this.selectionMarker) {
                var n, o = {
                    originalEvent: t,
                    xAxis: [],
                    yAxis: []
                }, r = this.selectionMarker, a = r.attr ? r.attr("x") : r.x, l = r.attr ? r.attr("y") : r.y, h = r.attr ? r.attr("width") : r.width, c = r.attr ? r.attr("height") : r.height;
                (this.hasDragged || s) && (Ne(i.axes, function(i) {
                    if (i.zoomEnabled && u(i.min) && (s || e[{
                        xAxis: "zoomX",
                        yAxis: "zoomY"
                    }[i.coll]])) {
                        var r = i.horiz
                          , d = "touchend" === t.type ? i.minPixelPadding : 0
                          , p = i.toValue((r ? a : l) + d)
                          , r = i.toValue((r ? a + h : l + c) - d);
                        o[i.coll].push({
                            axis: i,
                            min: pe(p, r),
                            max: ue(p, r)
                        }),
                        n = !0
                    }
                }),
                n && Ve(i, "selection", o, function(t) {
                    i.zoom(Ze(t, s ? {
                        animation: !1
                    } : null))
                })),
                this.selectionMarker = this.selectionMarker.destroy(),
                s && this.scaleGroups()
            }
            i && (m(i.container, {
                cursor: i._cursor
            }),
            i.cancelClick = this.hasDragged > 10,
            i.mouseIsDown = this.hasDragged = this.hasPinched = !1,
            this.pinchDown = [])
        },
        onContainerMouseDown: function(t) {
            t = this.normalize(t),
            t.preventDefault && t.preventDefault(),
            this.dragStart(t)
        },
        onDocumentMouseUp: function(t) {
            Oe[li] && Oe[li].pointer.drop(t)
        },
        onDocumentMouseMove: function(t) {
            var e = this.chart
              , i = this.chartPosition
              , t = this.normalize(t, i);
            i && !this.inClass(t.target, "highcharts-tracker") && !e.isInsidePlot(t.chartX - e.plotLeft, t.chartY - e.plotTop) && this.reset()
        },
        onContainerMouseLeave: function(t) {
            var e = Oe[li];
            e && (t.relatedTarget || t.toElement) && (e.pointer.reset(),
            e.pointer.chartPosition = null)
        },
        onContainerMouseMove: function(t) {
            var e = this.chart;
            u(li) && Oe[li].mouseIsDown || (li = e.index),
            t = this.normalize(t),
            t.returnValue = !1,
            "mousedown" === e.mouseIsDown && this.drag(t),
            (this.inClass(t.target, "highcharts-tracker") || e.isInsidePlot(t.chartX - e.plotLeft, t.chartY - e.plotTop)) && !e.openMenu && this.runPointActions(t)
        },
        inClass: function(t, e) {
            for (var i; t; ) {
                if (i = p(t, "class")) {
                    if (-1 !== i.indexOf(e))
                        return !0;
                    if (-1 !== i.indexOf("highcharts-container"))
                        return !1
                }
                t = t.parentNode
            }
        },
        onTrackerMouseOut: function(t) {
            var e = this.chart.hoverSeries
              , t = t.relatedTarget || t.toElement;
            !e || !t || e.options.stickyTracking || this.inClass(t, "highcharts-tooltip") || this.inClass(t, "highcharts-series-" + e.index) || e.onMouseOut()
        },
        onContainerClick: function(t) {
            var e = this.chart
              , i = e.hoverPoint
              , s = e.plotLeft
              , n = e.plotTop
              , t = this.normalize(t);
            e.cancelClick || (i && this.inClass(t.target, "highcharts-tracker") ? (Ve(i.series, "click", Ze(t, {
                point: i
            })),
            e.hoverPoint && i.firePointEvent("click", t)) : (Ze(t, this.getCoordinates(t)),
            e.isInsidePlot(t.chartX - s, t.chartY - n) && Ve(e, "click", t)))
        },
        setDOMEvents: function() {
            var t = this
              , e = t.chart.container;
            e.onmousedown = function(e) {
                t.onContainerMouseDown(e)
            }
            ,
            e.onmousemove = function(e) {
                t.onContainerMouseMove(e)
            }
            ,
            e.onclick = function(e) {
                t.onContainerClick(e)
            }
            ,
            Ue(e, "mouseleave", t.onContainerMouseLeave),
            1 === Ee && Ue(ae, "mouseup", t.onDocumentMouseUp),
            B && (e.ontouchstart = function(e) {
                t.onContainerTouchStart(e)
            }
            ,
            e.ontouchmove = function(e) {
                t.onContainerTouchMove(e)
            }
            ,
            1 === Ee && Ue(ae, "touchend", t.onDocumentTouchEnd))
        },
        destroy: function() {
            var t;
            Xe(this.chart.container, "mouseleave", this.onContainerMouseLeave),
            Ee || (Xe(ae, "mouseup", this.onDocumentMouseUp),
            Xe(ae, "touchend", this.onDocumentTouchEnd)),
            clearInterval(this.tooltipTimeout);
            for (t in this)
                this[t] = null
        }
    },
    Ze(re.Pointer.prototype, {
        pinchTranslate: function(t, e, i, s, n, o) {
            (this.zoomHor || this.pinchHor) && this.pinchTranslateDirection(!0, t, e, i, s, n, o),
            (this.zoomVert || this.pinchVert) && this.pinchTranslateDirection(!1, t, e, i, s, n, o)
        },
        pinchTranslateDirection: function(t, e, i, s, n, o, r, a) {
            var l, h, c, d = this.chart, u = t ? "x" : "y", p = t ? "X" : "Y", f = "chart" + p, g = t ? "width" : "height", m = d["plot" + (t ? "Left" : "Top")], v = a || 1, y = d.inverted, x = d.bounds[t ? "h" : "v"], b = 1 === e.length, k = e[0][f], w = i[0][f], C = !b && e[1][f], S = !b && i[1][f], i = function() {
                !b && fe(k - C) > 20 && (v = a || fe(w - S) / fe(k - C)),
                h = (m - w) / v + k,
                l = d["plot" + (t ? "Width" : "Height")] / v
            };
            i(),
            e = h,
            e < x.min ? (e = x.min,
            c = !0) : e + l > x.max && (e = x.max - l,
            c = !0),
            c ? (w -= .8 * (w - r[u][0]),
            b || (S -= .8 * (S - r[u][1])),
            i()) : r[u] = [w, S],
            y || (o[u] = h - m,
            o[g] = l),
            o = y ? 1 / v : v,
            n[g] = l,
            n[u] = e,
            s[y ? t ? "scaleY" : "scaleX" : "scale" + p] = v,
            s["translate" + p] = o * m + (w - o * k)
        },
        pinch: function(t) {
            var e = this
              , i = e.chart
              , s = e.pinchDown
              , n = t.touches
              , o = n.length
              , r = e.lastValidTouch
              , a = e.hasZoom
              , l = e.selectionMarker
              , h = {}
              , c = 1 === o && (e.inClass(t.target, "highcharts-tracker") && i.runTrackerClick || e.runChartClick)
              , d = {};
            o > 1 && (e.initiated = !0),
            a && e.initiated && !c && t.preventDefault(),
            Ge(n, function(t) {
                return e.normalize(t)
            }),
            "touchstart" === t.type ? (Ne(n, function(t, e) {
                s[e] = {
                    chartX: t.chartX,
                    chartY: t.chartY
                }
            }),
            r.x = [s[0].chartX, s[1] && s[1].chartX],
            r.y = [s[0].chartY, s[1] && s[1].chartY],
            Ne(i.axes, function(t) {
                if (t.zoomEnabled) {
                    var e = i.bounds[t.horiz ? "h" : "v"]
                      , s = t.minPixelPadding
                      , n = t.toPixels(Je(t.options.min, t.dataMin))
                      , o = t.toPixels(Je(t.options.max, t.dataMax))
                      , r = pe(n, o)
                      , n = ue(n, o);
                    e.min = pe(t.pos, r - s),
                    e.max = ue(t.pos + t.len, n + s)
                }
            }),
            e.res = !0) : s.length && (l || (e.selectionMarker = l = Ze({
                destroy: ze,
                touch: !0
            }, i.plotBox)),
            e.pinchTranslate(s, n, h, l, d, r),
            e.hasPinched = a,
            e.scaleGroups(h, d),
            !a && e.followTouchMove && 1 === o ? this.runPointActions(e.normalize(t)) : e.res && (e.res = !1,
            this.reset(!1, 0)))
        },
        touch: function(t, e) {
            var i = this.chart;
            li = i.index,
            1 === t.touches.length ? (t = this.normalize(t),
            i.isInsidePlot(t.chartX - i.plotLeft, t.chartY - i.plotTop) && !i.openMenu ? (e && this.runPointActions(t),
            this.pinch(t)) : e && this.reset()) : 2 === t.touches.length && this.pinch(t)
        },
        onContainerTouchStart: function(t) {
            this.touch(t, !0)
        },
        onContainerTouchMove: function(t) {
            this.touch(t)
        },
        onDocumentTouchEnd: function(t) {
            Oe[li] && Oe[li].pointer.drop(t)
        }
    }),
    t.PointerEvent || t.MSPointerEvent) {
        var ci = {}
          , di = !!t.PointerEvent
          , ui = function() {
            var t, e = [];
            e.item = function(t) {
                return this[t]
            }
            ;
            for (t in ci)
                ci.hasOwnProperty(t) && e.push({
                    pageX: ci[t].pageX,
                    pageY: ci[t].pageY,
                    target: ci[t].target
                });
            return e
        }
          , pi = function(t, e, i, s) {
            "touch" !== t.pointerType && t.pointerType !== t.MSPOINTER_TYPE_TOUCH || !Oe[li] || (s(t),
            s = Oe[li].pointer,
            s[e]({
                type: i,
                target: t.currentTarget,
                preventDefault: ze,
                touches: ui()
            }))
        };
        Ze(hi.prototype, {
            onContainerPointerDown: function(t) {
                pi(t, "onContainerTouchStart", "touchstart", function(t) {
                    ci[t.pointerId] = {
                        pageX: t.pageX,
                        pageY: t.pageY,
                        target: t.currentTarget
                    }
                })
            },
            onContainerPointerMove: function(t) {
                pi(t, "onContainerTouchMove", "touchmove", function(t) {
                    ci[t.pointerId] = {
                        pageX: t.pageX,
                        pageY: t.pageY
                    },
                    ci[t.pointerId].target || (ci[t.pointerId].target = t.currentTarget)
                })
            },
            onDocumentPointerUp: function(t) {
                pi(t, "onDocumentTouchEnd", "touchend", function(t) {
                    delete ci[t.pointerId]
                })
            },
            batchMSEvents: function(t) {
                t(this.chart.container, di ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown),
                t(this.chart.container, di ? "pointermove" : "MSPointerMove", this.onContainerPointerMove),
                t(ae, di ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
            }
        }),
        Qe(hi.prototype, "init", function(t, e, i) {
            t.call(this, e, i),
            this.hasZoom && m(e.container, {
                "-ms-touch-action": "none",
                "touch-action": "none"
            })
        }),
        Qe(hi.prototype, "setDOMEvents", function(t) {
            t.apply(this),
            (this.hasZoom || this.followTouchMove) && this.batchMSEvents(Ue)
        }),
        Qe(hi.prototype, "destroy", function(t) {
            this.batchMSEvents(Xe),
            t.call(this)
        })
    }
    var fi = re.Legend = function(t, e) {
        this.init(t, e)
    }
    ;
    fi.prototype = {
        init: function(t, e) {
            var i = this
              , n = e.itemStyle
              , o = e.itemMarginTop || 0;
            this.options = e,
            e.enabled && (i.itemStyle = n,
            i.itemHiddenStyle = s(n, e.itemHiddenStyle),
            i.itemMarginTop = o,
            i.padding = n = Je(e.padding, 8),
            i.initialItemX = n,
            i.initialItemY = n - 5,
            i.maxItemWidth = 0,
            i.chart = t,
            i.itemHeight = 0,
            i.symbolWidth = Je(e.symbolWidth, 16),
            i.pages = [],
            i.render(),
            Ue(i.chart, "endResize", function() {
                i.positionCheckboxes()
            }))
        },
        colorizeItem: function(t, e) {
            var i, s = this.options, n = t.legendItem, o = t.legendLine, r = t.legendSymbol, a = this.itemHiddenStyle.color, s = e ? s.itemStyle.color : a, l = e ? t.legendColor || t.color || "#CCC" : a, a = t.options && t.options.marker, h = {
                fill: l
            };
            if (n && n.css({
                fill: s,
                color: s
            }),
            o && o.attr({
                stroke: l
            }),
            r) {
                if (a && r.isMarker)
                    for (i in h.stroke = l,
                    a = t.convertAttribs(a))
                        n = a[i],
                        n !== _ && (h[i] = n);
                r.attr(h)
            }
        },
        positionItem: function(t) {
            var e = this.options
              , i = e.symbolPadding
              , e = !e.rtl
              , s = t._legendItemPos
              , n = s[0]
              , s = s[1]
              , o = t.checkbox;
            (t = t.legendGroup) && t.element && t.translate(e ? n : this.legendWidth - n - 2 * i - 4, s),
            o && (o.x = n,
            o.y = s)
        },
        destroyItem: function(t) {
            var e = t.checkbox;
            Ne(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function(e) {
                t[e] && (t[e] = t[e].destroy())
            }),
            e && A(t.checkbox)
        },
        destroy: function() {
            var t = this.group
              , e = this.box;
            e && (this.box = e.destroy()),
            t && (this.group = t.destroy())
        },
        positionCheckboxes: function(t) {
            var e, i = this.group.alignAttr, s = this.clipHeight || this.legendHeight, n = this.titleHeight;
            i && (e = i.translateY,
            Ne(this.allItems, function(o) {
                var r, a = o.checkbox;
                a && (r = e + n + a.y + (t || 0) + 3,
                m(a, {
                    left: i.translateX + o.checkboxOffset + a.x - 20 + "px",
                    top: r + "px",
                    display: r > e - 6 && e + s - 6 > r ? "" : "none"
                }))
            }))
        },
        renderTitle: function() {
            var t = this.padding
              , e = this.options.title
              , i = 0;
            e.text && (this.title || (this.title = this.chart.renderer.label(e.text, t - 3, t - 4, null, null, null, null, null, "legend-title").attr({
                zIndex: 1
            }).css(e.style).add(this.group)),
            t = this.title.getBBox(),
            i = t.height,
            this.offsetWidth = t.width,
            this.contentGroup.attr({
                translateY: i
            })),
            this.titleHeight = i
        },
        setText: function(t) {
            var e = this.options;
            t.legendItem.attr({
                text: e.labelFormat ? k(e.labelFormat, t) : e.labelFormatter.call(t)
            })
        },
        renderItem: function(t) {
            var e = this.chart
              , i = e.renderer
              , n = this.options
              , o = "horizontal" === n.layout
              , r = this.symbolWidth
              , a = n.symbolPadding
              , l = this.itemStyle
              , h = this.itemHiddenStyle
              , c = this.padding
              , d = o ? Je(n.itemDistance, 20) : 0
              , u = !n.rtl
              , p = n.width
              , f = n.itemMarginBottom || 0
              , g = this.itemMarginTop
              , m = this.initialItemX
              , v = t.legendItem
              , y = t.series && t.series.drawLegendSymbol ? t.series : t
              , x = y.options
              , x = this.createCheckboxForItem && x && x.showCheckbox
              , b = n.useHTML;
            v || (t.legendGroup = i.g("legend-item").attr({
                zIndex: 1
            }).add(this.scrollGroup),
            t.legendItem = v = i.text("", u ? r + a : -a, this.baseline || 0, b).css(s(t.visible ? l : h)).attr({
                align: u ? "left" : "right",
                zIndex: 2
            }).add(t.legendGroup),
            this.baseline || (this.fontMetrics = i.fontMetrics(l.fontSize, v),
            this.baseline = this.fontMetrics.f + 3 + g,
            v.attr("y", this.baseline)),
            y.drawLegendSymbol(this, t),
            this.setItemEvents && this.setItemEvents(t, v, b, l, h),
            x && this.createCheckboxForItem(t)),
            this.colorizeItem(t, t.visible),
            this.setText(t),
            i = v.getBBox(),
            r = t.checkboxOffset = n.itemWidth || t.legendItemWidth || r + a + i.width + d + (x ? 20 : 0),
            this.itemHeight = a = he(t.legendItemHeight || i.height),
            o && this.itemX - m + r > (p || e.chartWidth - 2 * c - m - n.x) && (this.itemX = m,
            this.itemY += g + this.lastLineHeight + f,
            this.lastLineHeight = 0),
            this.maxItemWidth = ue(this.maxItemWidth, r),
            this.lastItemY = g + this.itemY + f,
            this.lastLineHeight = ue(a, this.lastLineHeight),
            t._legendItemPos = [this.itemX, this.itemY],
            o ? this.itemX += r : (this.itemY += g + a + f,
            this.lastLineHeight = a),
            this.offsetWidth = p || ue((o ? this.itemX - m - d : r) + c, this.offsetWidth)
        },
        getAllItems: function() {
            var t = [];
            return Ne(this.chart.series, function(e) {
                var i = e.options;
                Je(i.showInLegend, u(i.linkedTo) ? !1 : _, !0) && (t = t.concat(e.legendItems || ("point" === i.legendType ? e.data : e)))
            }),
            t
        },
        adjustMargins: function(t, e) {
            var i = this.chart
              , s = this.options
              , n = s.align.charAt(0) + s.verticalAlign.charAt(0) + s.layout.charAt(0);
            this.display && !s.floating && Ne([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function(o, r) {
                o.test(n) && !u(t[r]) && (i[He[r]] = ue(i[He[r]], i.legend[(r + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][r] * s[r % 2 ? "x" : "y"] + Je(s.margin, 12) + e[r]))
            })
        },
        render: function() {
            var t, e, i, s, n = this, o = n.chart, r = o.renderer, a = n.group, l = n.box, h = n.options, c = n.padding, d = h.borderWidth, u = h.backgroundColor;
            n.itemX = n.initialItemX,
            n.itemY = n.initialItemY,
            n.offsetWidth = 0,
            n.lastItemY = 0,
            a || (n.group = a = r.g("legend").attr({
                zIndex: 7
            }).add(),
            n.contentGroup = r.g().attr({
                zIndex: 1
            }).add(a),
            n.scrollGroup = r.g().add(n.contentGroup)),
            n.renderTitle(),
            t = n.getAllItems(),
            S(t, function(t, e) {
                return (t.options && t.options.legendIndex || 0) - (e.options && e.options.legendIndex || 0)
            }),
            h.reversed && t.reverse(),
            n.allItems = t,
            n.display = e = !!t.length,
            n.lastLineHeight = 0,
            Ne(t, function(t) {
                n.renderItem(t)
            }),
            i = (h.width || n.offsetWidth) + c,
            s = n.lastItemY + n.lastLineHeight + n.titleHeight,
            s = n.handleOverflow(s),
            s += c,
            (d || u) && (l ? i > 0 && s > 0 && (l[l.isNew ? "attr" : "animate"](l.crisp({
                width: i,
                height: s
            })),
            l.isNew = !1) : (n.box = l = r.rect(0, 0, i, s, h.borderRadius, d || 0).attr({
                stroke: h.borderColor,
                "stroke-width": d || 0,
                fill: u || "none"
            }).add(a).shadow(h.shadow),
            l.isNew = !0),
            l[e ? "show" : "hide"]()),
            n.legendWidth = i,
            n.legendHeight = s,
            Ne(t, function(t) {
                n.positionItem(t)
            }),
            e && a.align(Ze({
                width: i,
                height: s
            }, h), !0, "spacingBox"),
            o.isResizing || this.positionCheckboxes()
        },
        handleOverflow: function(t) {
            var e, i, s = this, n = this.chart, o = n.renderer, r = this.options, a = r.y, a = n.spacingBox.height + ("top" === r.verticalAlign ? -a : a) - this.padding, l = r.maxHeight, h = this.clipRect, c = r.navigation, d = Je(c.animation, !0), u = c.arrowSize || 12, p = this.nav, f = this.pages, g = this.padding, m = this.allItems, v = function(t) {
                h.attr({
                    height: t
                }),
                s.contentGroup.div && (s.contentGroup.div.style.clip = "rect(" + g + "px,9999px," + (g + t) + "px,0)")
            };
            return "horizontal" === r.layout && (a /= 2),
            l && (a = pe(a, l)),
            f.length = 0,
            t > a ? (this.clipHeight = e = ue(a - 20 - this.titleHeight - g, 0),
            this.currentPage = Je(this.currentPage, 1),
            this.fullHeight = t,
            Ne(m, function(t, s) {
                var n = t._legendItemPos[1]
                  , o = he(t.legendItem.getBBox().height)
                  , r = f.length;
                (!r || n - f[r - 1] > e && (i || n) !== f[r - 1]) && (f.push(i || n),
                r++),
                s === m.length - 1 && n + o - f[r - 1] > e && f.push(n),
                n !== i && (i = n)
            }),
            h || (h = s.clipRect = o.clipRect(0, g, 9999, 0),
            s.contentGroup.clip(h)),
            v(e),
            p || (this.nav = p = o.g().attr({
                zIndex: 1
            }).add(this.group),
            this.up = o.symbol("triangle", 0, 0, u, u).on("click", function() {
                s.scroll(-1, d)
            }).add(p),
            this.pager = o.text("", 15, 10).css(c.style).add(p),
            this.down = o.symbol("triangle-down", 0, 0, u, u).on("click", function() {
                s.scroll(1, d)
            }).add(p)),
            s.scroll(0),
            t = a) : p && (v(n.chartHeight),
            p.hide(),
            this.scrollGroup.attr({
                translateY: 1
            }),
            this.clipHeight = 0),
            t
        },
        scroll: function(t, e) {
            var i = this.pages
              , s = i.length
              , n = this.currentPage + t
              , o = this.clipHeight
              , r = this.options.navigation
              , a = r.activeColor
              , r = r.inactiveColor
              , l = this.pager
              , h = this.padding;
            n > s && (n = s),
            n > 0 && (e !== _ && P(e, this.chart),
            this.nav.attr({
                translateX: h,
                translateY: o + this.padding + 7 + this.titleHeight,
                visibility: "visible"
            }),
            this.up.attr({
                fill: 1 === n ? r : a
            }).css({
                cursor: 1 === n ? "default" : "pointer"
            }),
            l.attr({
                text: n + "/" + s
            }),
            this.down.attr({
                x: 18 + this.pager.getBBox().width,
                fill: n === s ? r : a
            }).css({
                cursor: n === s ? "default" : "pointer"
            }),
            i = -i[n - 1] + this.initialItemY,
            this.scrollGroup.animate({
                translateY: i
            }),
            this.currentPage = n,
            this.positionCheckboxes(i))
        }
    },
    si = re.LegendSymbolMixin = {
        drawRectangle: function(t, e) {
            var i = t.options.symbolHeight || t.fontMetrics.f;
            e.legendSymbol = this.chart.renderer.rect(0, t.baseline - i + 1, t.symbolWidth, i, t.options.symbolRadius || 0).attr({
                zIndex: 3
            }).add(e.legendGroup)
        },
        drawLineMarker: function(t) {
            var e, i = this.options, s = i.marker, n = t.symbolWidth, o = this.chart.renderer, r = this.legendGroup, t = t.baseline - he(.3 * t.fontMetrics.b);
            i.lineWidth && (e = {
                "stroke-width": i.lineWidth
            },
            i.dashStyle && (e.dashstyle = i.dashStyle),
            this.legendLine = o.path(["M", 0, t, "L", n, t]).attr(e).add(r)),
            s && s.enabled !== !1 && (i = s.radius,
            this.legendSymbol = s = o.symbol(this.symbol, n / 2 - i, t - i, 2 * i, 2 * i, s).add(r),
            s.isMarker = !0)
        }
    },
    (/Trident\/7\.0/.test(xe) || Se) && Qe(fi.prototype, "positionItem", function(t, e) {
        var i = this
          , s = function() {
            e._legendItemPos && t.call(i, e)
        };
        s(),
        setTimeout(s)
    });
    var gi = re.Chart = function() {
        this.getArgs.apply(this, arguments)
    }
    ;
    re.chart = function(t, e, i) {
        return new gi(t,e,i)
    }
    ,
    gi.prototype = {
        callbacks: [],
        getArgs: function() {
            var t = [].slice.call(arguments);
            (o(t[0]) || t[0].nodeName) && (this.renderTo = t.shift()),
            this.init(t[0], t[1])
        },
        init: function(t, e) {
            var i, n = t.series;
            t.series = null,
            i = s(W, t),
            i.series = t.series = n,
            this.userOptions = t,
            n = i.chart,
            this.margin = this.splashArray("margin", n),
            this.spacing = this.splashArray("spacing", n);
            var o = n.events;
            this.bounds = {
                h: {},
                v: {}
            },
            this.callback = e,
            this.isResizing = 0,
            this.options = i,
            this.axes = [],
            this.series = [],
            this.hasCartesianSeries = n.showAxes;
            var r, a = this;
            if (a.index = Oe.length,
            Oe.push(a),
            Ee++,
            n.reflow !== !1 && Ue(a, "load", function() {
                a.initReflow()
            }),
            o)
                for (r in o)
                    Ue(a, r, o[r]);
            a.xAxis = [],
            a.yAxis = [],
            a.animation = Le ? !1 : Je(n.animation, !0),
            a.pointCount = a.colorCounter = a.symbolCounter = 0,
            a.firstRender()
        },
        initSeries: function(t) {
            var i = this.options.chart;
            return (i = Be[t.type || i.type || i.defaultSeriesType]) || e(17, !0),
            i = new i,
            i.init(this, t),
            i
        },
        isInsidePlot: function(t, e, i) {
            var s = i ? e : t
              , t = i ? t : e;
            return s >= 0 && s <= this.plotWidth && t >= 0 && t <= this.plotHeight
        },
        redraw: function(t) {
            var e, i, s = this.axes, n = this.series, o = this.pointer, r = this.legend, a = this.isDirtyLegend, l = this.hasCartesianSeries, h = this.isDirtyBox, c = n.length, d = c, u = this.renderer, p = u.isHidden(), f = [];
            for (P(t, this),
            p && this.cloneRenderTo(),
            this.layOutTitles(); d--; )
                if (t = n[d],
                t.options.stacking && (e = !0,
                t.isDirty)) {
                    i = !0;
                    break
                }
            if (i)
                for (d = c; d--; )
                    t = n[d],
                    t.options.stacking && (t.isDirty = !0);
            Ne(n, function(t) {
                t.isDirty && "point" === t.options.legendType && (t.updateTotals && t.updateTotals(),
                a = !0)
            }),
            a && r.options.enabled && (r.render(),
            this.isDirtyLegend = !1),
            e && this.getStacks(),
            l && !this.isResizing && (this.maxTicks = null,
            Ne(s, function(t) {
                t.setScale()
            })),
            this.getMargins(),
            l && (Ne(s, function(t) {
                t.isDirty && (h = !0)
            }),
            Ne(s, function(t) {
                var i = t.min + "," + t.max;
                t.extKey !== i && (t.extKey = i,
                f.push(function() {
                    Ve(t, "afterSetExtremes", Ze(t.eventArgs, t.getExtremes())),
                    delete t.eventArgs
                })),
                (h || e) && t.redraw()
            })),
            h && this.drawChartBox(),
            Ne(n, function(t) {
                t.isDirty && t.visible && (!t.isCartesian || t.xAxis) && t.redraw()
            }),
            o && o.reset(!0),
            u.draw(),
            Ve(this, "redraw"),
            p && this.cloneRenderTo(!0),
            Ne(f, function(t) {
                t.call()
            })
        },
        get: function(t) {
            var e, i, s = this.axes, n = this.series;
            for (e = 0; e < s.length; e++)
                if (s[e].options.id === t)
                    return s[e];
            for (e = 0; e < n.length; e++)
                if (n[e].options.id === t)
                    return n[e];
            for (e = 0; e < n.length; e++)
                for (i = n[e].points || [],
                s = 0; s < i.length; s++)
                    if (i[s].id === t)
                        return i[s];
            return null
        },
        getAxes: function() {
            var t = this
              , e = this.options
              , i = e.xAxis = f(e.xAxis || {})
              , e = e.yAxis = f(e.yAxis || {});
            Ne(i, function(t, e) {
                t.index = e,
                t.isX = !0
            }),
            Ne(e, function(t, e) {
                t.index = e
            }),
            i = i.concat(e),
            Ne(i, function(e) {
                new ri(t,e)
            })
        },
        getSelectedPoints: function() {
            var t = [];
            return Ne(this.series, function(e) {
                t = t.concat($e(e.points || [], function(t) {
                    return t.selected
                }))
            }),
            t
        },
        getSelectedSeries: function() {
            return $e(this.series, function(t) {
                return t.selected
            })
        },
        setTitle: function(t, e, i) {
            var n, o, r = this, a = r.options;
            o = a.title = s(a.title, t),
            n = a.subtitle = s(a.subtitle, e),
            a = n,
            Ne([["title", t, o], ["subtitle", e, a]], function(t) {
                var e = t[0]
                  , i = r[e]
                  , s = t[1]
                  , t = t[2];
                i && s && (r[e] = i = i.destroy()),
                t && t.text && !i && (r[e] = r.renderer.text(t.text, 0, 0, t.useHTML).attr({
                    align: t.align,
                    "class": "highcharts-" + e,
                    zIndex: t.zIndex || 4
                }).css(t.style).add())
            }),
            r.layOutTitles(i)
        },
        layOutTitles: function(t) {
            var e = 0
              , i = this.title
              , s = this.subtitle
              , n = this.options
              , o = n.title
              , n = n.subtitle
              , r = this.renderer
              , a = this.spacingBox.width - 44;
            !i || (i.css({
                width: (o.width || a) + "px"
            }).align(Ze({
                y: r.fontMetrics(o.style.fontSize, i).b - 3
            }, o), !1, "spacingBox"),
            o.floating || o.verticalAlign) || (e = i.getBBox().height),
            s && (s.css({
                width: (n.width || a) + "px"
            }).align(Ze({
                y: e + (o.margin - 13) + r.fontMetrics(n.style.fontSize, i).b
            }, n), !1, "spacingBox"),
            !n.floating && !n.verticalAlign && (e = de(e + s.getBBox().height))),
            i = this.titleOffset !== e,
            this.titleOffset = e,
            !this.isDirtyBox && i && (this.isDirtyBox = i,
            this.hasRendered && Je(t, !0) && this.isDirtyBox && this.redraw())
        },
        getChartSize: function() {
            var t = this.options.chart
              , e = t.width
              , t = t.height
              , i = this.renderToClone || this.renderTo;
            u(e) || (this.containerWidth = Re(i, "width")),
            u(t) || (this.containerHeight = Re(i, "height")),
            this.chartWidth = ue(0, e || this.containerWidth || 600),
            this.chartHeight = ue(0, Je(t, this.containerHeight > 19 ? this.containerHeight : 400))
        },
        cloneRenderTo: function(t) {
            var e = this.renderToClone
              , i = this.container;
            t ? e && (this.renderTo.appendChild(i),
            A(e),
            delete this.renderToClone) : (i && i.parentNode === this.renderTo && this.renderTo.removeChild(i),
            this.renderToClone = e = this.renderTo.cloneNode(0),
            m(e, {
                position: "absolute",
                top: "-9999px",
                display: "block"
            }),
            e.style.setProperty && e.style.setProperty("display", "block", "important"),
            ae.body.appendChild(e),
            i && e.appendChild(i))
        },
        getContainer: function() {
            var t, i, s, r = this.options, a = r.chart;
            t = this.renderTo;
            var l = "highcharts-" + Ie++;
            t || (this.renderTo = t = a.renderTo),
            o(t) && (this.renderTo = t = ae.getElementById(t)),
            t || e(13, !0),
            i = n(p(t, "data-highcharts-chart")),
            !isNaN(i) && Oe[i] && Oe[i].hasRendered && Oe[i].destroy(),
            p(t, "data-highcharts-chart", this.index),
            t.innerHTML = "",
            !a.skipClone && !t.offsetWidth && this.cloneRenderTo(),
            this.getChartSize(),
            i = this.chartWidth,
            s = this.chartHeight,
            this.container = t = v(Fe, {
                className: "highcharts-container" + (a.className ? " " + a.className : ""),
                id: l
            }, Ze({
                position: "relative",
                overflow: "hidden",
                width: i + "px",
                height: s + "px",
                textAlign: "left",
                lineHeight: "normal",
                zIndex: 0,
                "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
            }, a.style), this.renderToClone || t),
            this._cursor = t.style.cursor,
            this.renderer = new (re[a.renderer] || H)(t,i,s,a.style,a.forExport,r.exporting && r.exporting.allowHTML),
            Le && this.renderer.create(this, t, i, s),
            this.renderer.chartIndex = this.index
        },
        getMargins: function(t) {
            var e = this.spacing
              , i = this.margin
              , s = this.titleOffset;
            this.resetMargins(),
            s && !u(i[0]) && (this.plotTop = ue(this.plotTop, s + this.options.title.margin + e[0])),
            this.legend.adjustMargins(i, e),
            this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin),
            this.extraTopMargin && (this.plotTop += this.extraTopMargin),
            t || this.getAxisMargins()
        },
        getAxisMargins: function() {
            var t = this
              , e = t.axisOffset = [0, 0, 0, 0]
              , i = t.margin;
            t.hasCartesianSeries && Ne(t.axes, function(t) {
                t.visible && t.getOffset()
            }),
            Ne(He, function(s, n) {
                u(i[n]) || (t[s] += e[n])
            }),
            t.setChartSize()
        },
        reflow: function(e) {
            var i = this
              , s = i.options.chart
              , n = i.renderTo
              , o = s.width || Re(n, "width")
              , r = s.height || Re(n, "height")
              , s = e ? e.target : t;
            i.hasUserSize || i.isPrinting || !o || !r || s !== t && s !== ae || ((o !== i.containerWidth || r !== i.containerHeight) && (clearTimeout(i.reflowTimeout),
            i.reflowTimeout = g(function() {
                i.container && (i.setSize(o, r, !1),
                i.hasUserSize = null)
            }, e ? 100 : 0)),
            i.containerWidth = o,
            i.containerHeight = r)
        },
        initReflow: function() {
            var e = this
              , i = function(t) {
                e.reflow(t)
            };
            Ue(t, "resize", i),
            Ue(e, "destroy", function() {
                Xe(t, "resize", i)
            })
        },
        setSize: function(t, e, i) {
            var s, n, o = this, r = o.renderer;
            o.isResizing += 1,
            P(i, o),
            o.oldChartHeight = o.chartHeight,
            o.oldChartWidth = o.chartWidth,
            u(t) && (o.chartWidth = s = ue(0, he(t)),
            o.hasUserSize = !!s),
            u(e) && (o.chartHeight = n = ue(0, he(e))),
            t = r.globalAnimation,
            (t ? je : m)(o.container, {
                width: s + "px",
                height: n + "px"
            }, t),
            o.setChartSize(!0),
            r.setSize(s, n, i),
            o.maxTicks = null,
            Ne(o.axes, function(t) {
                t.isDirty = !0,
                t.setScale()
            }),
            Ne(o.series, function(t) {
                t.isDirty = !0
            }),
            o.isDirtyLegend = !0,
            o.isDirtyBox = !0,
            o.layOutTitles(),
            o.getMargins(),
            o.redraw(i),
            o.oldChartHeight = null,
            Ve(o, "resize"),
            t = r.globalAnimation,
            g(function() {
                o && Ve(o, "endResize", null, function() {
                    o.isResizing -= 1
                })
            }, t === !1 ? 0 : t && t.duration || 500)
        },
        setChartSize: function(t) {
            var e, i, s, n, o = this.inverted, r = this.renderer, a = this.chartWidth, l = this.chartHeight, h = this.options.chart, c = this.spacing, d = this.clipOffset;
            this.plotLeft = e = he(this.plotLeft),
            this.plotTop = i = he(this.plotTop),
            this.plotWidth = s = ue(0, he(a - e - this.marginRight)),
            this.plotHeight = n = ue(0, he(l - i - this.marginBottom)),
            this.plotSizeX = o ? n : s,
            this.plotSizeY = o ? s : n,
            this.plotBorderWidth = h.plotBorderWidth || 0,
            this.spacingBox = r.spacingBox = {
                x: c[3],
                y: c[0],
                width: a - c[3] - c[1],
                height: l - c[0] - c[2]
            },
            this.plotBox = r.plotBox = {
                x: e,
                y: i,
                width: s,
                height: n
            },
            a = 2 * ce(this.plotBorderWidth / 2),
            o = de(ue(a, d[3]) / 2),
            r = de(ue(a, d[0]) / 2),
            this.clipBox = {
                x: o,
                y: r,
                width: ce(this.plotSizeX - ue(a, d[1]) / 2 - o),
                height: ue(0, ce(this.plotSizeY - ue(a, d[2]) / 2 - r))
            },
            t || Ne(this.axes, function(t) {
                t.setAxisSize(),
                t.setAxisTranslation()
            })
        },
        resetMargins: function() {
            var t = this;
            Ne(He, function(e, i) {
                t[e] = Je(t.margin[i], t.spacing[i])
            }),
            t.axisOffset = [0, 0, 0, 0],
            t.clipOffset = [0, 0, 0, 0]
        },
        drawChartBox: function() {
            var t, e = this.options.chart, i = this.renderer, s = this.chartWidth, n = this.chartHeight, o = this.chartBackground, r = this.plotBackground, a = this.plotBorder, l = this.plotBGImage, h = e.borderWidth || 0, c = e.backgroundColor, d = e.plotBackgroundColor, u = e.plotBackgroundImage, p = e.plotBorderWidth || 0, f = this.plotLeft, g = this.plotTop, m = this.plotWidth, v = this.plotHeight, y = this.plotBox, x = this.clipRect, b = this.clipBox;
            t = h + (e.shadow ? 8 : 0),
            (h || c) && (o ? o.animate(o.crisp({
                width: s - t,
                height: n - t
            })) : (o = {
                fill: c || "none"
            },
            h && (o.stroke = e.borderColor,
            o["stroke-width"] = h),
            this.chartBackground = i.rect(t / 2, t / 2, s - t, n - t, e.borderRadius, h).attr(o).addClass("highcharts-background").add().shadow(e.shadow))),
            d && (r ? r.animate(y) : this.plotBackground = i.rect(f, g, m, v, 0).attr({
                fill: d
            }).add().shadow(e.plotShadow)),
            u && (l ? l.animate(y) : this.plotBGImage = i.image(u, f, g, m, v).add()),
            x ? x.animate({
                width: b.width,
                height: b.height
            }) : this.clipRect = i.clipRect(b),
            p && (a ? a.animate(a.crisp({
                x: f,
                y: g,
                width: m,
                height: v,
                strokeWidth: -p
            })) : this.plotBorder = i.rect(f, g, m, v, 0, -p).attr({
                stroke: e.plotBorderColor,
                "stroke-width": p,
                fill: "none",
                zIndex: 1
            }).add()),
            this.isDirtyBox = !1
        },
        propFromSeries: function() {
            var t, e, i, s = this, n = s.options.chart, o = s.options.series;
            Ne(["inverted", "angular", "polar"], function(r) {
                for (t = Be[n.type || n.defaultSeriesType],
                i = s[r] || n[r] || t && t.prototype[r],
                e = o && o.length; !i && e--; )
                    (t = Be[o[e].type]) && t.prototype[r] && (i = !0);
                s[r] = i
            })
        },
        linkSeries: function() {
            var t = this
              , e = t.series;
            Ne(e, function(t) {
                t.linkedSeries.length = 0
            }),
            Ne(e, function(e) {
                var i = e.options.linkedTo;
                o(i) && (i = ":previous" === i ? t.series[e.index - 1] : t.get(i)) && (i.linkedSeries.push(e),
                e.linkedParent = i,
                e.visible = Je(e.options.visible, i.options.visible, e.visible))
            })
        },
        renderSeries: function() {
            Ne(this.series, function(t) {
                t.translate(),
                t.render()
            })
        },
        renderLabels: function() {
            var t = this
              , e = t.options.labels;
            e.items && Ne(e.items, function(i) {
                var s = Ze(e.style, i.style)
                  , o = n(s.left) + t.plotLeft
                  , r = n(s.top) + t.plotTop + 12;
                delete s.left,
                delete s.top,
                t.renderer.text(i.html, o, r).attr({
                    zIndex: 2
                }).css(s).add()
            })
        },
        render: function() {
            var t, e, i, s, n = this.axes, o = this.renderer, r = this.options;
            this.setTitle(),
            this.legend = new fi(this,r.legend),
            this.getStacks && this.getStacks(),
            this.getMargins(!0),
            this.setChartSize(),
            t = this.plotWidth,
            e = this.plotHeight -= 21,
            Ne(n, function(t) {
                t.setScale()
            }),
            this.getAxisMargins(),
            i = t / this.plotWidth > 1.1,
            s = e / this.plotHeight > 1.05,
            (i || s) && (this.maxTicks = null,
            Ne(n, function(t) {
                (t.horiz && i || !t.horiz && s) && t.setTickInterval(!0)
            }),
            this.getMargins()),
            this.drawChartBox(),
            this.hasCartesianSeries && Ne(n, function(t) {
                t.visible && t.render()
            }),
            this.seriesGroup || (this.seriesGroup = o.g("series-group").attr({
                zIndex: 3
            }).add()),
            this.renderSeries(),
            this.renderLabels(),
            this.showCredits(r.credits),
            this.hasRendered = !0
        },
        showCredits: function(e) {
            e.enabled && !this.credits && (this.credits = this.renderer.text(e.text, 0, 0).on("click", function() {
                e.href && (t.location.href = e.href)
            }).attr({
                align: e.position.align,
                zIndex: 8
            }).css(e.style).add().align(e.position))
        },
        destroy: function() {
            var t, e = this, i = e.axes, s = e.series, n = e.container, o = n && n.parentNode;
            for (Ve(e, "destroy"),
            Oe[e.index] = _,
            Ee--,
            e.renderTo.removeAttribute("data-highcharts-chart"),
            Xe(e),
            t = i.length; t--; )
                i[t] = i[t].destroy();
            for (t = s.length; t--; )
                s[t] = s[t].destroy();
            Ne("title,subtitle,chartBackground,plotBackground,plotBGImage,plotBorder,seriesGroup,clipRect,credits,pointer,scroller,rangeSelector,legend,resetZoomButton,tooltip,renderer".split(","), function(t) {
                var i = e[t];
                i && i.destroy && (e[t] = i.destroy())
            }),
            n && (n.innerHTML = "",
            Xe(n),
            o && A(n));
            for (t in e)
                delete e[t]
        },
        isReadyToRender: function() {
            var e = this;
            return !De && t == t.top && "complete" !== ae.readyState || Le && !t.canvg ? (Le ? oi.push(function() {
                e.firstRender()
            }, e.options.global.canvasToolsURL) : ae.attachEvent("onreadystatechange", function() {
                ae.detachEvent("onreadystatechange", e.firstRender),
                "complete" === ae.readyState && e.firstRender()
            }),
            !1) : !0
        },
        firstRender: function() {
            var t = this
              , e = t.options;
            t.isReadyToRender() && (t.getContainer(),
            Ve(t, "init"),
            t.resetMargins(),
            t.setChartSize(),
            t.propFromSeries(),
            t.getAxes(),
            Ne(e.series || [], function(e) {
                t.initSeries(e)
            }),
            t.linkSeries(),
            Ve(t, "beforeRender"),
            re.Pointer && (t.pointer = new hi(t,e)),
            t.render(),
            t.renderer.draw(),
            t.renderer.imgCount || t.onload(),
            t.cloneRenderTo(!0))
        },
        onload: function() {
            var t = this;
            Ne([this.callback].concat(this.callbacks), function(e) {
                e && void 0 !== t.index && e.apply(t, [t])
            }),
            t.renderer.imgCount || Ve(t, "load")
        },
        splashArray: function(t, e) {
            var i = e[t]
              , i = r(i) ? i : [i, i, i, i];
            return [Je(e[t + "Top"], i[0]), Je(e[t + "Right"], i[1]), Je(e[t + "Bottom"], i[2]), Je(e[t + "Left"], i[3])]
        }
    };
    var ni = re.CenteredSeriesMixin = {
        getCenter: function() {
            var t, e, i = this.options, s = this.chart, n = 2 * (i.slicedOffset || 0), o = s.plotWidth - 2 * n, s = s.plotHeight - 2 * n, r = i.center, r = [Je(r[0], "50%"), Je(r[1], "50%"), i.size || "100%", i.innerSize || 0], a = pe(o, s);
            for (t = 0; 4 > t; ++t)
                e = r[t],
                i = 2 > t || 2 === t && /%$/.test(e),
                r[t] = (/%$/.test(e) ? [o, s, a, r[2]][t] * parseFloat(e) / 100 : parseFloat(e)) + (i ? n : 0);
            return r[3] > r[2] && (r[3] = r[2]),
            r
        }
    }
      , mi = function() {};
    mi.prototype = {
        init: function(t, e, i) {
            return this.series = t,
            this.color = t.color,
            this.applyOptions(e, i),
            this.pointAttr = {},
            t.options.colorByPoint && (e = t.options.colors || t.chart.options.colors,
            this.color = this.color || e[t.colorCounter++],
            t.colorCounter === e.length) && (t.colorCounter = 0),
            t.chart.pointCount++,
            this
        },
        applyOptions: function(t, e) {
            var i = this.series
              , s = i.options.pointValKey || i.pointValKey
              , t = mi.prototype.optionsToObject.call(this, t);
            return Ze(this, t),
            this.options = this.options ? Ze(this.options, t) : t,
            s && (this.y = this[s]),
            this.isNull = null === this.y,
            this.x === _ && i && (this.x = e === _ ? i.autoIncrement() : e),
            this
        },
        optionsToObject: function(t) {
            var e = {}
              , i = this.series
              , s = i.options.keys
              , n = s || i.pointArrayMap || ["y"]
              , o = n.length
              , r = 0
              , l = 0;
            if ("number" == typeof t || null === t)
                e[n[0]] = t;
            else if (a(t))
                for (!s && t.length > o && (i = typeof t[0],
                "string" === i ? e.name = t[0] : "number" === i && (e.x = t[0]),
                r++); o > l; )
                    s && void 0 === t[r] || (e[n[l]] = t[r]),
                    r++,
                    l++;
            else
                "object" == typeof t && (e = t,
                t.dataLabels && (i._hasPointLabels = !0),
                t.marker && (i._hasPointMarkers = !0));
            return e
        },
        destroy: function() {
            var t, e = this.series.chart, i = e.hoverPoints;
            e.pointCount--,
            i && (this.setState(),
            d(i, this),
            !i.length) && (e.hoverPoints = null),
            this === e.hoverPoint && this.onMouseOut(),
            (this.graphic || this.dataLabel) && (Xe(this),
            this.destroyElements()),
            this.legendItem && e.legend.destroyItem(this);
            for (t in this)
                this[t] = null
        },
        destroyElements: function() {
            for (var t, e = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], i = 6; i--; )
                t = e[i],
                this[t] && (this[t] = this[t].destroy())
        },
        getLabelConfig: function() {
            return {
                x: this.category,
                y: this.y,
                color: this.color,
                key: this.name || this.category,
                series: this.series,
                point: this,
                percentage: this.percentage,
                total: this.total || this.stackTotal
            }
        },
        tooltipFormatter: function(t) {
            var e = this.series
              , i = e.tooltipOptions
              , s = Je(i.valueDecimals, "")
              , n = i.valuePrefix || ""
              , o = i.valueSuffix || "";
            return Ne(e.pointArrayMap || ["y"], function(e) {
                e = "{point." + e,
                (n || o) && (t = t.replace(e + "}", n + e + "}" + o)),
                t = t.replace(e + "}", e + ":,." + s + "f}")
            }),
            k(t, {
                point: this,
                series: this.series
            })
        },
        firePointEvent: function(t, e, i) {
            var s = this
              , n = this.series.options;
            (n.point.events[t] || s.options && s.options.events && s.options.events[t]) && this.importEvents(),
            "click" === t && n.allowPointSelect && (i = function(t) {
                s.select && s.select(null, t.ctrlKey || t.metaKey || t.shiftKey)
            }
            ),
            Ve(this, t, e, i)
        },
        visible: !0
    };
    var vi = re.Series = function() {}
    ;
    vi.prototype = {
        isCartesian: !0,
        type: "line",
        pointClass: mi,
        sorted: !0,
        requireSorting: !0,
        pointAttrToOptions: {
            stroke: "lineColor",
            "stroke-width": "lineWidth",
            fill: "fillColor",
            r: "radius"
        },
        directTouch: !1,
        axisTypes: ["xAxis", "yAxis"],
        colorCounter: 0,
        parallelArrays: ["x", "y"],
        init: function(t, e) {
            var i, s, n = this, o = t.series, r = function(t, e) {
                return Je(t.options.index, t._i) - Je(e.options.index, e._i)
            };
            n.chart = t,
            n.options = e = n.setOptions(e),
            n.linkedSeries = [],
            n.bindAxes(),
            Ze(n, {
                name: e.name,
                state: "",
                pointAttr: {},
                visible: e.visible !== !1,
                selected: e.selected === !0
            }),
            Le && (e.animation = !1),
            s = e.events;
            for (i in s)
                Ue(n, i, s[i]);
            (s && s.click || e.point && e.point.events && e.point.events.click || e.allowPointSelect) && (t.runTrackerClick = !0),
            n.getColor(),
            n.getSymbol(),
            Ne(n.parallelArrays, function(t) {
                n[t + "Data"] = []
            }),
            n.setData(e.data, !1),
            n.isCartesian && (t.hasCartesianSeries = !0),
            o.push(n),
            n._i = o.length - 1,
            S(o, r),
            this.yAxis && S(this.yAxis.series, r),
            Ne(o, function(t, e) {
                t.index = e,
                t.name = t.name || "Series " + (e + 1)
            })
        },
        bindAxes: function() {
            var t, i = this, s = i.options, n = i.chart;
            Ne(i.axisTypes || [], function(o) {
                Ne(n[o], function(e) {
                    t = e.options,
                    (s[o] === t.index || s[o] !== _ && s[o] === t.id || s[o] === _ && 0 === t.index) && (e.series.push(i),
                    i[o] = e,
                    e.isDirty = !0)
                }),
                !i[o] && i.optionalAxis !== o && e(18, !0)
            })
        },
        updateParallelArrays: function(t, e) {
            var i = t.series
              , s = arguments;
            Ne(i.parallelArrays, "number" == typeof e ? function(s) {
                var n = "y" === s && i.toYData ? i.toYData(t) : t[s];
                i[s + "Data"][e] = n
            }
            : function(t) {
                Array.prototype[e].apply(i[t + "Data"], Array.prototype.slice.call(s, 2))
            }
            )
        },
        autoIncrement: function() {
            var t, e = this.options, i = this.xIncrement, s = e.pointIntervalUnit, i = Je(i, e.pointStart, 0);
            return this.pointInterval = t = Je(this.pointInterval, e.pointInterval, 1),
            ("month" === s || "year" === s) && (e = new Y(i),
            e = "month" === s ? +e[ne](e[Z]() + t) : +e[oe](e[J]() + t),
            t = e - i),
            this.xIncrement = i + t,
            i
        },
        setOptions: function(t) {
            var e = this.chart
              , i = e.options.plotOptions
              , e = e.userOptions || {}
              , n = e.plotOptions || {}
              , o = i[this.type];
            return this.userOptions = t,
            i = s(o, i.series, t),
            this.tooltipOptions = s(W.tooltip, W.plotOptions[this.type].tooltip, e.tooltip, n.series && n.series.tooltip, n[this.type] && n[this.type].tooltip, t.tooltip),
            null === o.marker && delete i.marker,
            this.zoneAxis = i.zoneAxis,
            t = this.zones = (i.zones || []).slice(),
            !i.negativeColor && !i.negativeFillColor || i.zones || t.push({
                value: i[this.zoneAxis + "Threshold"] || i.threshold || 0,
                color: i.negativeColor,
                fillColor: i.negativeFillColor
            }),
            t.length && u(t[t.length - 1].value) && t.push({
                color: this.color,
                fillColor: this.fillColor
            }),
            i
        },
        getCyclic: function(t, e, i) {
            var s = this.userOptions
              , n = "_" + t + "Index"
              , o = t + "Counter";
            e || (u(s[n]) ? e = s[n] : (s[n] = e = this.chart[o] % i.length,
            this.chart[o] += 1),
            e = i[e]),
            this[t] = e
        },
        getColor: function() {
            this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || ti[this.type].color, this.chart.options.colors)
        },
        getSymbol: function() {
            var t = this.options.marker;
            this.getCyclic("symbol", t.symbol, this.chart.options.symbols),
            /^url/.test(this.symbol) && (t.radius = 0)
        },
        drawLegendSymbol: si.drawLineMarker,
        setData: function(t, i, s, n) {
            var r, h = this, c = h.points, d = c && c.length || 0, p = h.options, f = h.chart, g = null, m = h.xAxis, v = m && !!m.categories, y = p.turboThreshold, x = this.xData, b = this.yData, k = (r = h.pointArrayMap) && r.length, t = t || [];
            if (r = t.length,
            i = Je(i, !0),
            n !== !1 && r && d === r && !h.cropped && !h.hasGroupedData && h.visible)
                Ne(t, function(t, e) {
                    c[e].update && t !== p.data[e] && c[e].update(t, !1, null, !1)
                });
            else {
                if (h.xIncrement = null,
                h.colorCounter = 0,
                Ne(this.parallelArrays, function(t) {
                    h[t + "Data"].length = 0
                }),
                y && r > y) {
                    for (s = 0; null === g && r > s; )
                        g = t[s],
                        s++;
                    if (l(g)) {
                        for (v = Je(p.pointStart, 0),
                        g = Je(p.pointInterval, 1),
                        s = 0; r > s; s++)
                            x[s] = v,
                            b[s] = t[s],
                            v += g;
                        h.xIncrement = v
                    } else if (a(g))
                        if (k)
                            for (s = 0; r > s; s++)
                                g = t[s],
                                x[s] = g[0],
                                b[s] = g.slice(1, k + 1);
                        else
                            for (s = 0; r > s; s++)
                                g = t[s],
                                x[s] = g[0],
                                b[s] = g[1];
                    else
                        e(12)
                } else
                    for (s = 0; r > s; s++)
                        t[s] !== _ && (g = {
                            series: h
                        },
                        h.pointClass.prototype.applyOptions.apply(g, [t[s]]),
                        h.updateParallelArrays(g, s),
                        v && u(g.name)) && (m.names[g.x] = g.name);
                for (o(b[0]) && e(14, !0),
                h.data = [],
                h.options.data = h.userOptions.data = t,
                s = d; s--; )
                    c[s] && c[s].destroy && c[s].destroy();
                m && (m.minRange = m.userMinRange),
                h.isDirty = h.isDirtyData = f.isDirtyBox = !0,
                s = !1
            }
            "point" === p.legendType && (this.processData(),
            this.generatePoints()),
            i && f.redraw(s)
        },
        processData: function(t) {
            var i, s = this.xData, n = this.yData, o = s.length;
            i = 0;
            var r, a, l, h = this.xAxis, c = this.options;
            l = c.cropThreshold;
            var d, u, p = this.getExtremesFromAll || c.getExtremesFromAll, f = this.isCartesian, c = h && h.val2lin, g = h && h.isLog;
            if (f && !this.isDirty && !h.isDirty && !this.yAxis.isDirty && !t)
                return !1;
            for (h && (t = h.getExtremes(),
            d = t.min,
            u = t.max),
            f && this.sorted && !p && (!l || o > l || this.forceCrop) && (s[o - 1] < d || s[0] > u ? (s = [],
            n = []) : (s[0] < d || s[o - 1] > u) && (i = this.cropData(this.xData, this.yData, d, u),
            s = i.xData,
            n = i.yData,
            i = i.start,
            r = !0)),
            l = s.length || 1; --l; )
                o = g ? c(s[l]) - c(s[l - 1]) : s[l] - s[l - 1],
                o > 0 && (a === _ || a > o) ? a = o : 0 > o && this.requireSorting && e(15);
            this.cropped = r,
            this.cropStart = i,
            this.processedXData = s,
            this.processedYData = n,
            this.closestPointRange = a
        },
        cropData: function(t, e, i, s) {
            var n, o = t.length, r = 0, a = o, l = Je(this.cropShoulder, 1);
            for (n = 0; o > n; n++)
                if (t[n] >= i) {
                    r = ue(0, n - l);
                    break
                }
            for (i = n; o > i; i++)
                if (t[i] > s) {
                    a = i + l;
                    break
                }
            return {
                xData: t.slice(r, a),
                yData: e.slice(r, a),
                start: r,
                end: a
            }
        },
        generatePoints: function() {
            var t, e, i, s, n = this.options.data, o = this.data, r = this.processedXData, a = this.processedYData, l = this.pointClass, h = r.length, c = this.cropStart || 0, d = this.hasGroupedData, u = [];
            for (o || d || (o = [],
            o.length = n.length,
            o = this.data = o),
            s = 0; h > s; s++)
                e = c + s,
                d ? u[s] = (new l).init(this, [r[s]].concat(f(a[s]))) : (o[e] ? i = o[e] : n[e] !== _ && (o[e] = i = (new l).init(this, n[e], r[s])),
                u[s] = i),
                u[s].index = e;
            if (o && (h !== (t = o.length) || d))
                for (s = 0; t > s; s++)
                    s === c && !d && (s += h),
                    o[s] && (o[s].destroyElements(),
                    o[s].plotX = _);
            this.data = o,
            this.points = u
        },
        getExtremes: function(t) {
            var e, i = this.yAxis, s = this.processedXData, n = [], o = 0;
            e = this.xAxis.getExtremes();
            var r, a, l, h, c = e.min, d = e.max, t = t || this.stackedYData || this.processedYData;
            for (e = t.length,
            h = 0; e > h; h++)
                if (a = s[h],
                l = t[h],
                r = null !== l && l !== _ && (!i.isLog || l.length || l > 0),
                a = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (s[h + 1] || a) >= c && (s[h - 1] || a) <= d,
                r && a)
                    if (r = l.length)
                        for (; r--; )
                            null !== l[r] && (n[o++] = l[r]);
                    else
                        n[o++] = l;
            this.dataMin = T(n),
            this.dataMax = M(n)
        },
        translate: function() {
            this.processedXData || this.processData(),
            this.generatePoints();
            for (var t, i, s, n, o = this.options, r = o.stacking, a = this.xAxis, h = a.categories, c = this.yAxis, d = this.points, p = d.length, f = !!this.modifyValue, g = o.pointPlacement, m = "between" === g || l(g), v = o.threshold, y = o.startFromThreshold ? v : 0, x = Number.MAX_VALUE, o = 0; p > o; o++) {
                var b = d[o]
                  , k = b.x
                  , w = b.y;
                i = b.low;
                var C = r && c.stacks[(this.negStacks && (y ? 0 : v) > w ? "-" : "") + this.stackKey];
                c.isLog && null !== w && 0 >= w && (b.y = w = null,
                e(10)),
                b.plotX = t = pe(ue(-1e5, a.translate(k, 0, 0, 0, 1, g, "flags" === this.type)), 1e5),
                r && this.visible && !b.isNull && C && C[k] && (n = this.getStackIndicator(n, k, this.index),
                C = C[k],
                w = C.points[n.key],
                i = w[0],
                w = w[1],
                i === y && (i = Je(v, c.min)),
                c.isLog && 0 >= i && (i = null),
                b.total = b.stackTotal = C.total,
                b.percentage = C.total && b.y / C.total * 100,
                b.stackY = w,
                C.setOffset(this.pointXOffset || 0, this.barW || 0)),
                b.yBottom = u(i) ? c.translate(i, 0, 1, 0, 1) : null,
                f && (w = this.modifyValue(w, b)),
                b.plotY = i = "number" == typeof w && 1 / 0 !== w ? pe(ue(-1e5, c.translate(w, 0, 1, 0, 1)), 1e5) : _,
                b.isInside = i !== _ && i >= 0 && i <= c.len && t >= 0 && t <= a.len,
                b.clientX = m ? a.translate(k, 0, 0, 0, 1) : t,
                b.negative = b.y < (v || 0),
                b.category = h && h[b.x] !== _ ? h[b.x] : b.x,
                o && (x = pe(x, fe(t - s))),
                s = t
            }
            this.closestPointRangePx = x
        },
        getValidPoints: function() {
            return $e(this.points, function(t) {
                return !t.isNull
            })
        },
        setClip: function(t) {
            var e = this.chart
              , i = this.options
              , s = e.renderer
              , n = e.inverted
              , o = this.clipBox
              , r = o || e.clipBox
              , a = this.sharedClipKey || ["_sharedClip", t && t.duration, t && t.easing, r.height, i.xAxis, i.yAxis].join(",")
              , l = e[a]
              , h = e[a + "m"];
            l || (t && (r.width = 0,
            e[a + "m"] = h = s.clipRect(-99, n ? -e.plotLeft : -e.plotTop, 99, n ? e.chartWidth : e.chartHeight)),
            e[a] = l = s.clipRect(r)),
            t && (l.count += 1),
            i.clip !== !1 && (this.group.clip(t || o ? l : e.clipRect),
            this.markerGroup.clip(h),
            this.sharedClipKey = a),
            t || (l.count -= 1,
            l.count <= 0 && a && e[a] && (o || (e[a] = e[a].destroy()),
            e[a + "m"] && (e[a + "m"] = e[a + "m"].destroy())))
        },
        animate: function(t) {
            var e, i = this.chart, s = this.options.animation;
            s && !r(s) && (s = ti[this.type].animation),
            t ? this.setClip(s) : (e = this.sharedClipKey,
            (t = i[e]) && t.animate({
                width: i.plotSizeX
            }, s),
            i[e + "m"] && i[e + "m"].animate({
                width: i.plotSizeX + 99
            }, s),
            this.animate = null)
        },
        afterAnimate: function() {
            this.setClip(),
            Ve(this, "afterAnimate")
        },
        drawPoints: function() {
            var t, e, i, s, n, o, r, a, l, h, c, d, u = this.points, p = this.chart, f = this.options.marker, g = this.pointAttr[""], m = this.markerGroup, v = Je(f.enabled, this.xAxis.isRadial, this.closestPointRangePx > 2 * f.radius);
            if (f.enabled !== !1 || this._hasPointMarkers)
                for (s = u.length; s--; )
                    n = u[s],
                    e = ce(n.plotX),
                    i = n.plotY,
                    l = n.graphic,
                    h = n.marker || {},
                    c = !!n.marker,
                    t = v && h.enabled === _ || h.enabled,
                    d = n.isInside,
                    t && i !== _ && !isNaN(i) && null !== n.y ? (t = n.pointAttr[n.selected ? "select" : ""] || g,
                    o = t.r,
                    r = Je(h.symbol, this.symbol),
                    a = 0 === r.indexOf("url"),
                    l ? l[d ? "show" : "hide"](!0).attr(t).animate(Ze({
                        x: e - o,
                        y: i - o
                    }, l.symbolName ? {
                        width: 2 * o,
                        height: 2 * o
                    } : {})) : d && (o > 0 || a) && (n.graphic = p.renderer.symbol(r, e - o, i - o, 2 * o, 2 * o, c ? h : f).attr(t).add(m))) : l && (n.graphic = l.destroy())
        },
        convertAttribs: function(t, e, i, s) {
            var n, o, r = this.pointAttrToOptions, a = {}, t = t || {}, e = e || {}, i = i || {}, s = s || {};
            for (n in r)
                o = r[n],
                a[n] = Je(t[o], e[n], i[n], s[n]);
            return a
        },
        getAttribs: function() {
            var t, e = this, i = e.options, s = ti[e.type].marker ? i.marker : i, n = s.states, o = n.hover, r = e.color, a = e.options.negativeColor;
            t = {
                stroke: r,
                fill: r
            };
            var l, h, c = e.points || [], d = [], p = e.pointAttrToOptions;
            l = e.hasPointSpecificOptions;
            var f = s.lineColor
              , g = s.fillColor;
            h = i.turboThreshold;
            var m, v = e.zones, y = e.zoneAxis || "y";
            if (i.marker ? (o.radius = o.radius || s.radius + o.radiusPlus,
            o.lineWidth = o.lineWidth || s.lineWidth + o.lineWidthPlus) : (o.color = o.color || z(o.color || r).brighten(o.brightness).get(),
            o.negativeColor = o.negativeColor || z(o.negativeColor || a).brighten(o.brightness).get()),
            d[""] = e.convertAttribs(s, t),
            Ne(["hover", "select"], function(t) {
                d[t] = e.convertAttribs(n[t], d[""])
            }),
            e.pointAttr = d,
            r = c.length,
            !h || h > r || l)
                for (; r--; ) {
                    if (h = c[r],
                    (s = h.options && h.options.marker || h.options) && s.enabled === !1 && (s.radius = 0),
                    v.length) {
                        for (l = 0,
                        t = v[l]; h[y] >= t.value; )
                            t = v[++l];
                        h.color = h.fillColor = Je(t.color, e.color)
                    }
                    if (l = i.colorByPoint || h.color,
                    h.options)
                        for (m in p)
                            u(s[p[m]]) && (l = !0);
                    l ? (s = s || {},
                    l = [],
                    n = s.states || {},
                    t = n.hover = n.hover || {},
                    (!i.marker || h.negative && !t.fillColor && !o.fillColor) && (t[e.pointAttrToOptions.fill] = t.color || !h.options.color && o[h.negative && a ? "negativeColor" : "color"] || z(h.color).brighten(t.brightness || o.brightness).get()),
                    t = {
                        color: h.color
                    },
                    g || (t.fillColor = h.color),
                    f || (t.lineColor = h.color),
                    s.hasOwnProperty("color") && !s.color && delete s.color,
                    l[""] = e.convertAttribs(Ze(t, s), d[""]),
                    l.hover = e.convertAttribs(n.hover, d.hover, l[""]),
                    l.select = e.convertAttribs(n.select, d.select, l[""])) : l = d,
                    h.pointAttr = l
                }
        },
        destroy: function() {
            var t, e, i, s, n = this, o = n.chart, r = /AppleWebKit\/533/.test(xe), a = n.data || [];
            for (Ve(n, "destroy"),
            Xe(n),
            Ne(n.axisTypes || [], function(t) {
                (s = n[t]) && (d(s.series, n),
                s.isDirty = s.forceRedraw = !0)
            }),
            n.legendItem && n.chart.legend.destroyItem(n),
            t = a.length; t--; )
                (e = a[t]) && e.destroy && e.destroy();
            n.points = null,
            clearTimeout(n.animationTimeout);
            for (i in n)
                n[i]instanceof O && !n[i].survive && (t = r && "group" === i ? "hide" : "destroy",
                n[i][t]());
            o.hoverSeries === n && (o.hoverSeries = null),
            d(o.series, n);
            for (i in n)
                delete n[i]
        },
        getGraphPath: function(t, e, i) {
            var s, n = this, o = n.options, r = o.step, a = [], t = t || n.points;
            return Ne(t, function(l, h) {
                var c = l.plotX
                  , d = l.plotY
                  , p = t[h - 1];
                (l.leftCliff || p && p.rightCliff) && !i && (s = !0),
                l.isNull && !u(e) && h > 0 ? s = !o.connectNulls : l.isNull && !e ? s = !0 : (0 === h || s ? p = ["M", l.plotX, l.plotY] : n.getPointSpline ? p = n.getPointSpline(t, l, h) : r ? (p = "right" === r ? ["L", p.plotX, d] : "center" === r ? ["L", (p.plotX + c) / 2, p.plotY, "L", (p.plotX + c) / 2, d] : ["L", c, p.plotY],
                p.push("L", c, d)) : p = ["L", c, d],
                a.push.apply(a, p),
                s = !1)
            }),
            n.graphPath = a
        },
        drawGraph: function() {
            var t = this
              , e = this.options
              , i = [["graph", e.lineColor || this.color, e.dashStyle]]
              , s = e.lineWidth
              , n = "square" !== e.linecap
              , o = (this.gappedPath || this.getGraphPath).call(this)
              , r = this.fillGraph && this.color || "none";
            Ne(this.zones, function(s, n) {
                i.push(["zoneGraph" + n, s.color || t.color, s.dashStyle || e.dashStyle])
            }),
            Ne(i, function(i, a) {
                var l = i[0]
                  , h = t[l];
                h ? h.animate({
                    d: o
                }) : (s || r) && o.length && (h = {
                    stroke: i[1],
                    "stroke-width": s,
                    fill: r,
                    zIndex: 1
                },
                i[2] ? h.dashstyle = i[2] : n && (h["stroke-linecap"] = h["stroke-linejoin"] = "round"),
                t[l] = t.chart.renderer.path(o).attr(h).add(t.group).shadow(2 > a && e.shadow))
            })
        },
        applyZones: function() {
            var t, e, i, s, n, o, r, a = this, l = this.chart, h = l.renderer, c = this.zones, d = this.clips || [], u = this.graph, p = this.area, f = ue(l.chartWidth, l.chartHeight), g = this[(this.zoneAxis || "y") + "Axis"], m = g.reversed, v = l.inverted, y = g.horiz, x = !1;
            c.length && (u || p) && g.min !== _ && (u && u.hide(),
            p && p.hide(),
            s = g.getExtremes(),
            Ne(c, function(c, b) {
                t = m ? y ? l.plotWidth : 0 : y ? 0 : g.toPixels(s.min),
                t = pe(ue(Je(e, t), 0), f),
                e = pe(ue(he(g.toPixels(Je(c.value, s.max), !0)), 0), f),
                x && (t = e = g.toPixels(s.max)),
                n = Math.abs(t - e),
                o = pe(t, e),
                r = ue(t, e),
                g.isXAxis ? (i = {
                    x: v ? r : o,
                    y: 0,
                    width: n,
                    height: f
                },
                y || (i.x = l.plotHeight - i.x)) : (i = {
                    x: 0,
                    y: v ? r : o,
                    width: f,
                    height: n
                },
                y && (i.y = l.plotWidth - i.y)),
                l.inverted && h.isVML && (i = g.isXAxis ? {
                    x: 0,
                    y: m ? o : r,
                    height: i.width,
                    width: l.chartWidth
                } : {
                    x: i.y - l.plotLeft - l.spacingBox.x,
                    y: 0,
                    width: i.height,
                    height: l.chartHeight
                }),
                d[b] ? d[b].animate(i) : (d[b] = h.clipRect(i),
                u && a["zoneGraph" + b].clip(d[b]),
                p && a["zoneArea" + b].clip(d[b])),
                x = c.value > s.max
            }),
            this.clips = d)
        },
        invertGroups: function() {
            function t() {
                var t = {
                    width: e.yAxis.len,
                    height: e.xAxis.len
                };
                Ne(["group", "markerGroup"], function(i) {
                    e[i] && e[i].attr(t).invert()
                })
            }
            var e = this
              , i = e.chart;
            e.xAxis && (Ue(i, "resize", t),
            Ue(e, "destroy", function() {
                Xe(i, "resize", t)
            }),
            t(),
            e.invertGroups = t)
        },
        plotGroup: function(t, e, i, s, n) {
            var o = this[t]
              , r = !o;
            return r && (this[t] = o = this.chart.renderer.g(e).attr({
                zIndex: s || .1
            }).add(n),
            o.addClass("highcharts-series-" + this.index)),
            o.attr({
                visibility: i
            })[r ? "attr" : "animate"](this.getPlotBox()),
            o
        },
        getPlotBox: function() {
            var t = this.chart
              , e = this.xAxis
              , i = this.yAxis;
            return t.inverted && (e = i,
            i = this.xAxis),
            {
                translateX: e ? e.left : t.plotLeft,
                translateY: i ? i.top : t.plotTop,
                scaleX: 1,
                scaleY: 1
            }
        },
        render: function() {
            var t, e = this, i = e.chart, s = e.options, n = (t = s.animation) && !!e.animate && i.renderer.isSVG && Je(t.duration, 500) || 0, o = e.visible ? "inherit" : "hidden", r = s.zIndex, a = e.hasRendered, l = i.seriesGroup;
            t = e.plotGroup("group", "series", o, r, l),
            e.markerGroup = e.plotGroup("markerGroup", "markers", o, r, l),
            n && e.animate(!0),
            e.getAttribs(),
            t.inverted = e.isCartesian ? i.inverted : !1,
            e.drawGraph && (e.drawGraph(),
            e.applyZones()),
            Ne(e.points, function(t) {
                t.redraw && t.redraw()
            }),
            e.drawDataLabels && e.drawDataLabels(),
            e.visible && e.drawPoints(),
            e.drawTracker && e.options.enableMouseTracking !== !1 && e.drawTracker(),
            i.inverted && e.invertGroups(),
            s.clip !== !1 && !e.sharedClipKey && !a && t.clip(i.clipRect),
            n && e.animate(),
            a || (e.animationTimeout = g(function() {
                e.afterAnimate()
            }, n)),
            e.isDirty = e.isDirtyData = !1,
            e.hasRendered = !0
        },
        redraw: function() {
            var t = this.chart
              , e = this.isDirtyData
              , i = this.isDirty
              , s = this.group
              , n = this.xAxis
              , o = this.yAxis;
            s && (t.inverted && s.attr({
                width: t.plotWidth,
                height: t.plotHeight
            }),
            s.animate({
                translateX: Je(n && n.left, t.plotLeft),
                translateY: Je(o && o.top, t.plotTop)
            })),
            this.translate(),
            this.render(),
            e && Ve(this, "updatedData"),
            (i || e) && delete this.kdTree
        },
        kdDimensions: 1,
        kdAxisArray: ["clientX", "plotY"],
        searchPoint: function(t, e) {
            var i = this.xAxis
              , s = this.yAxis
              , n = this.chart.inverted;
            return this.searchKDTree({
                clientX: n ? i.len - t.chartY + i.pos : t.chartX - i.pos,
                plotY: n ? s.len - t.chartX + s.pos : t.chartY - s.pos
            }, e)
        },
        buildKDTree: function() {
            function t(i, s, n) {
                var o, r;
                return (r = i && i.length) ? (o = e.kdAxisArray[s % n],
                i.sort(function(t, e) {
                    return t[o] - e[o]
                }),
                r = Math.floor(r / 2),
                {
                    point: i[r],
                    left: t(i.slice(0, r), s + 1, n),
                    right: t(i.slice(r + 1), s + 1, n)
                }) : void 0
            }
            var e = this
              , i = e.kdDimensions;
            delete e.kdTree,
            g(function() {
                var s = $e(e.points || [], function(t) {
                    return null !== t.y
                });
                e.kdTree = t(s, i, i)
            }, e.options.kdNow ? 0 : 1)
        },
        searchKDTree: function(t, e) {
            function i(t, e, a, l) {
                var h, c, d = e.point, p = s.kdAxisArray[a % l], f = d;
                return c = u(t[n]) && u(d[n]) ? Math.pow(t[n] - d[n], 2) : null,
                h = u(t[o]) && u(d[o]) ? Math.pow(t[o] - d[o], 2) : null,
                h = (c || 0) + (h || 0),
                d.dist = u(h) ? Math.sqrt(h) : Number.MAX_VALUE,
                d.distX = u(c) ? Math.sqrt(c) : Number.MAX_VALUE,
                p = t[p] - d[p],
                h = 0 > p ? "left" : "right",
                c = 0 > p ? "right" : "left",
                e[h] && (h = i(t, e[h], a + 1, l),
                f = h[r] < f[r] ? h : d),
                e[c] && Math.sqrt(p * p) < f[r] && (t = i(t, e[c], a + 1, l),
                f = t[r] < f[r] ? t : f),
                f
            }
            var s = this
              , n = this.kdAxisArray[0]
              , o = this.kdAxisArray[1]
              , r = e ? "distX" : "dist";
            return this.kdTree || this.buildKDTree(),
            this.kdTree ? i(t, this.kdTree, this.kdDimensions, this.kdDimensions) : void 0
        }
    },
    F.prototype = {
        destroy: function() {
            D(this, this.axis)
        },
        render: function(t) {
            var e = this.options
              , i = e.format
              , i = i ? k(i, this) : e.formatter.call(this);
            this.label ? this.label.attr({
                text: i,
                visibility: "hidden"
            }) : this.label = this.axis.chart.renderer.text(i, null, null, e.useHTML).css(e.style).attr({
                align: this.textAlign,
                rotation: e.rotation,
                visibility: "hidden"
            }).add(t)
        },
        setOffset: function(t, e) {
            var i = this.axis
              , s = i.chart
              , n = s.inverted
              , o = i.reversed
              , o = this.isNegative && !o || !this.isNegative && o
              , r = i.translate(i.usePercentage ? 100 : this.total, 0, 0, 0, 1)
              , i = i.translate(0)
              , i = fe(r - i)
              , a = s.xAxis[0].translate(this.x) + t
              , l = s.plotHeight
              , o = {
                x: n ? o ? r : r - i : a,
                y: n ? l - a - e : o ? l - r - i : l - r,
                width: n ? i : e,
                height: n ? e : i
            };
            (n = this.label) && (n.align(this.alignOptions, null, o),
            o = n.alignAttr,
            n[this.options.crop === !1 || s.isInsidePlot(o.x, o.y) ? "show" : "hide"](!0))
        }
    },
    gi.prototype.getStacks = function() {
        var t = this;
        Ne(t.yAxis, function(t) {
            t.stacks && t.hasVisibleSeries && (t.oldStacks = t.stacks)
        }),
        Ne(t.series, function(e) {
            !e.options.stacking || e.visible !== !0 && t.options.chart.ignoreHiddenSeries !== !1 || (e.stackKey = e.type + Je(e.options.stack, ""))
        })
    }
    ,
    ri.prototype.buildStacks = function() {
        var t, e, i = this.series, s = Je(this.options.reversedStacks, !0), n = i.length;
        if (!this.isXAxis) {
            for (this.usePercentage = !1,
            e = n; e--; )
                i[s ? e : n - e - 1].setStackedPoints();
            for (e = n; e--; )
                t = i[s ? e : n - e - 1],
                t.setStackCliffs && t.setStackCliffs();
            if (this.usePercentage)
                for (e = 0; n > e; e++)
                    i[e].setPercentStacks()
        }
    }
    ,
    ri.prototype.renderStackTotals = function() {
        var t, e, i = this.chart, s = i.renderer, n = this.stacks, o = this.stackTotalGroup;
        o || (this.stackTotalGroup = o = s.g("stack-labels").attr({
            visibility: "visible",
            zIndex: 6
        }).add()),
        o.translate(i.plotLeft, i.plotTop);
        for (t in n)
            for (e in i = n[t])
                i[e].render(o)
    }
    ,
    ri.prototype.resetStacks = function() {
        var t, e, i = this.stacks;
        if (!this.isXAxis)
            for (t in i)
                for (e in i[t])
                    i[t][e].touched < this.stacksTouched ? (i[t][e].destroy(),
                    delete i[t][e]) : (i[t][e].total = null,
                    i[t][e].cum = 0)
    }
    ,
    ri.prototype.cleanStacks = function() {
        var t, e, i;
        if (!this.isXAxis) {
            this.oldStacks && (t = this.stacks = this.oldStacks);
            for (e in t)
                for (i in t[e])
                    t[e][i].cum = t[e][i].total
        }
    }
    ,
    vi.prototype.setStackedPoints = function() {
        if (this.options.stacking && (this.visible === !0 || this.chart.options.chart.ignoreHiddenSeries === !1)) {
            var t, e, i, s, n, o, r, a = this.processedXData, l = this.processedYData, h = [], c = l.length, d = this.options, u = d.threshold, p = d.startFromThreshold ? u : 0, f = d.stack, d = d.stacking, g = this.stackKey, m = "-" + g, v = this.negStacks, y = this.yAxis, x = y.stacks, b = y.oldStacks;
            for (y.stacksTouched += 1,
            n = 0; c > n; n++)
                o = a[n],
                r = l[n],
                t = this.getStackIndicator(t, o, this.index),
                s = t.key,
                i = (e = v && (p ? 0 : u) > r) ? m : g,
                x[i] || (x[i] = {}),
                x[i][o] || (b[i] && b[i][o] ? (x[i][o] = b[i][o],
                x[i][o].total = null) : x[i][o] = new F(y,y.options.stackLabels,e,o,f)),
                i = x[i][o],
                null !== r && (i.points[s] = i.points[this.index] = [Je(i.cum, p)],
                i.touched = y.stacksTouched,
                t.index > 0 && this.singleStacks === !1 && (i.points[s][0] = i.points[this.index + "," + o + ",0"][0])),
                "percent" === d ? (e = e ? g : m,
                v && x[e] && x[e][o] ? (e = x[e][o],
                i.total = e.total = ue(e.total, i.total) + fe(r) || 0) : i.total = L(i.total + (fe(r) || 0))) : i.total = L(i.total + (r || 0)),
                i.cum = Je(i.cum, p) + (r || 0),
                null !== r && i.points[s].push(i.cum),
                h[n] = i.cum;
            "percent" === d && (y.usePercentage = !0),
            this.stackedYData = h,
            y.oldStacks = {}
        }
    }
    ,
    vi.prototype.setPercentStacks = function() {
        var t, e = this, i = e.stackKey, s = e.yAxis.stacks, n = e.processedXData;
        Ne([i, "-" + i], function(i) {
            for (var o, r, a, l = n.length; l--; )
                r = n[l],
                t = e.getStackIndicator(t, r, e.index),
                o = (a = s[i] && s[i][r]) && a.points[t.key],
                (r = o) && (a = a.total ? 100 / a.total : 0,
                r[0] = L(r[0] * a),
                r[1] = L(r[1] * a),
                e.stackedYData[l] = r[1])
        })
    }
    ,
    vi.prototype.getStackIndicator = function(t, e, i) {
        return u(t) && t.x === e ? t.index++ : t = {
            x: e,
            index: 0
        },
        t.key = [i, e, t.index].join(","),
        t
    }
    ,
    Ze(gi.prototype, {
        addSeries: function(t, e, i) {
            var s, n = this;
            return t && (e = Je(e, !0),
            Ve(n, "addSeries", {
                options: t
            }, function() {
                s = n.initSeries(t),
                n.isDirtyLegend = !0,
                n.linkSeries(),
                e && n.redraw(i)
            })),
            s
        },
        addAxis: function(t, e, i, n) {
            var o = e ? "xAxis" : "yAxis"
              , r = this.options;
            new ri(this,s(t, {
                index: this[o].length,
                isX: e
            })),
            r[o] = f(r[o] || {}),
            r[o].push(t),
            Je(i, !0) && this.redraw(n)
        },
        showLoading: function(t) {
            var e = this
              , i = e.options
              , s = e.loadingDiv
              , n = i.loading
              , o = function() {
                s && m(s, {
                    left: e.plotLeft + "px",
                    top: e.plotTop + "px",
                    width: e.plotWidth + "px",
                    height: e.plotHeight + "px"
                })
            };
            s || (e.loadingDiv = s = v(Fe, {
                className: "highcharts-loading"
            }, Ze(n.style, {
                zIndex: 10,
                display: "none"
            }), e.container),
            e.loadingSpan = v("span", null, n.labelStyle, s),
            Ue(e, "redraw", o)),
            e.loadingSpan.innerHTML = t || i.lang.loading,
            e.loadingShown || (m(s, {
                opacity: 0,
                display: ""
            }),
            je(s, {
                opacity: n.style.opacity
            }, {
                duration: n.showDuration || 0
            }),
            e.loadingShown = !0),
            o()
        },
        hideLoading: function() {
            var t = this.options
              , e = this.loadingDiv;
            e && je(e, {
                opacity: 0
            }, {
                duration: t.loading.hideDuration || 100,
                complete: function() {
                    m(e, {
                        display: "none"
                    })
                }
            }),
            this.loadingShown = !1
        }
    }),
    Ze(mi.prototype, {
        update: function(t, e, i, s) {
            function n() {
                l.applyOptions(t),
                null === l.y && c && (l.graphic = c.destroy()),
                r(t) && !a(t) && (l.redraw = function() {
                    c && c.element && t && t.marker && t.marker.symbol && (l.graphic = c.destroy()),
                    t && t.dataLabels && l.dataLabel && (l.dataLabel = l.dataLabel.destroy()),
                    l.redraw = null
                }
                ),
                o = l.index,
                h.updateParallelArrays(l, o),
                p && l.name && (p[l.x] = l.name),
                u.data[o] = r(u.data[o]) ? l.options : t,
                h.isDirty = h.isDirtyData = !0,
                !h.fixedBox && h.hasCartesianSeries && (d.isDirtyBox = !0),
                "point" === u.legendType && (d.isDirtyLegend = !0),
                e && d.redraw(i)
            }
            var o, l = this, h = l.series, c = l.graphic, d = h.chart, u = h.options, p = h.xAxis && h.xAxis.names, e = Je(e, !0);
            s === !1 ? n() : l.firePointEvent("update", {
                options: t
            }, n)
        },
        remove: function(t, e) {
            this.series.removePoint(We(this, this.series.data), t, e)
        }
    }),
    Ze(vi.prototype, {
        addPoint: function(t, e, i, s) {
            var n, o = this, r = o.options, a = o.data, l = o.graph, h = o.area, c = o.chart, d = o.xAxis && o.xAxis.names, u = l && l.shift || 0, p = ["graph", "area"], l = r.data, f = o.xData;
            if (P(s, c),
            i) {
                for (s = o.zones.length; s--; )
                    p.push("zoneGraph" + s, "zoneArea" + s);
                Ne(p, function(t) {
                    o[t] && (o[t].shift = u + (r.step ? 2 : 1))
                })
            }
            if (h && (h.isArea = !0),
            e = Je(e, !0),
            h = {
                series: o
            },
            o.pointClass.prototype.applyOptions.apply(h, [t]),
            p = h.x,
            s = f.length,
            o.requireSorting && p < f[s - 1])
                for (n = !0; s && f[s - 1] > p; )
                    s--;
            o.updateParallelArrays(h, "splice", s, 0, 0),
            o.updateParallelArrays(h, s),
            d && h.name && (d[p] = h.name),
            l.splice(s, 0, t),
            n && (o.data.splice(s, 0, null),
            o.processData()),
            "point" === r.legendType && o.generatePoints(),
            i && (a[0] && a[0].remove ? a[0].remove(!1) : (a.shift(),
            o.updateParallelArrays(h, "shift"),
            l.shift())),
            o.isDirty = !0,
            o.isDirtyData = !0,
            e && (o.getAttribs(),
            c.redraw())
        },
        removePoint: function(t, e, i) {
            var s = this
              , n = s.data
              , o = n[t]
              , r = s.points
              , a = s.chart
              , l = function() {
                r && r.length === n.length && r.splice(t, 1),
                n.splice(t, 1),
                s.options.data.splice(t, 1),
                s.updateParallelArrays(o || {
                    series: s
                }, "splice", t, 1),
                o && o.destroy(),
                s.isDirty = !0,
                s.isDirtyData = !0,
                e && a.redraw()
            };
            P(i, a),
            e = Je(e, !0),
            o ? o.firePointEvent("remove", null, l) : l()
        },
        remove: function(t, e) {
            var i = this
              , s = i.chart;
            Ve(i, "remove", null, function() {
                i.destroy(),
                s.isDirtyLegend = s.isDirtyBox = !0,
                s.linkSeries(),
                Je(t, !0) && s.redraw(e)
            })
        },
        update: function(t, e) {
            var i, n = this, o = this.chart, r = this.userOptions, a = this.type, l = Be[a].prototype, h = ["group", "markerGroup", "dataLabelsGroup"];
            (t.type && t.type !== a || void 0 !== t.zIndex) && (h.length = 0),
            Ne(h, function(t) {
                h[t] = n[t],
                delete n[t]
            }),
            t = s(r, {
                animation: !1,
                index: this.index,
                pointStart: this.xData[0]
            }, {
                data: this.options.data
            }, t),
            this.remove(!1);
            for (i in l)
                this[i] = _;
            Ze(this, Be[t.type || a].prototype),
            Ne(h, function(t) {
                n[t] = h[t]
            }),
            this.init(o, t),
            o.linkSeries(),
            Je(e, !0) && o.redraw(!1)
        }
    }),
    Ze(ri.prototype, {
        update: function(t, e) {
            var i = this.chart
              , t = i.options[this.coll][this.options.index] = s(this.userOptions, t);
            this.destroy(!0),
            this._addedPlotLB = this.chart._labelPanes = _,
            this.init(i, Ze(t, {
                events: _
            })),
            i.isDirtyBox = !0,
            Je(e, !0) && i.redraw()
        },
        remove: function(t) {
            for (var e = this.chart, i = this.coll, s = this.series, n = s.length; n--; )
                s[n] && s[n].remove(!1);
            d(e.axes, this),
            d(e[i], this),
            e.options[i].splice(this.options.index, 1),
            Ne(e[i], function(t, e) {
                t.options.index = e
            }),
            this.destroy(),
            e.isDirtyBox = !0,
            Je(t, !0) && e.redraw()
        },
        setTitle: function(t, e) {
            this.update({
                title: t
            }, e)
        },
        setCategories: function(t, e) {
            this.update({
                categories: t
            }, e)
        }
    });
    var yi = y(vi);
    Be.line = yi,
    ti.area = s(ei, {
        softThreshold: !1,
        threshold: 0
    });
    var xi = y(vi, {
        type: "area",
        singleStacks: !1,
        getStackPoints: function() {
            var t, e, i, s = [], n = [], o = this.xAxis, r = this.yAxis, a = r.stacks[this.stackKey], l = {}, h = this.points, c = this.index, d = r.series, u = d.length, p = Je(r.options.reversedStacks, !0) ? 1 : -1;
            if (this.options.stacking) {
                for (e = 0; e < h.length; e++)
                    l[h[e].x] = h[e];
                for (i in a)
                    null !== a[i].total && n.push(+i);
                n.sort(function(t, e) {
                    return t - e
                }),
                t = Ge(d, function() {
                    return this.visible
                }),
                Ne(n, function(i, h) {
                    var d, f, g = 0;
                    if (l[i] && !l[i].isNull)
                        s.push(l[i]),
                        Ne([-1, 1], function(s) {
                            var o = 1 === s ? "rightNull" : "leftNull"
                              , r = 0
                              , g = a[n[h + s]];
                            if (g)
                                for (e = c; e >= 0 && u > e; )
                                    d = g.points[e],
                                    d || (e === c ? l[i][o] = !0 : t[e] && (f = a[i].points[e]) && (r -= f[1] - f[0])),
                                    e += p;
                            l[i][1 === s ? "rightCliff" : "leftCliff"] = r
                        });
                    else {
                        for (e = c; e >= 0 && u > e; ) {
                            if (d = a[i].points[e]) {
                                g = d[1];
                                break
                            }
                            e += p
                        }
                        g = r.toPixels(g, !0),
                        s.push({
                            isNull: !0,
                            plotX: o.toPixels(i, !0),
                            plotY: g,
                            yBottom: g
                        })
                    }
                })
            }
            return s
        },
        getGraphPath: function(t) {
            var e, i, s, n, o = vi.prototype.getGraphPath, r = this.options, a = r.stacking, l = this.yAxis, h = [], c = [], d = this.index, u = l.stacks[this.stackKey], p = r.threshold, f = l.getThreshold(r.threshold), r = r.connectNulls || "percent" === a, g = function(e, i, n) {
                var o, r, g = t[e], e = a && u[g.x].points[d], m = g[n + "Null"] || 0, n = g[n + "Cliff"] || 0, g = !0;
                n || m ? (o = (m ? e[0] : e[1]) + n,
                r = e[0] + n,
                g = !!m) : !a && t[i] && t[i].isNull && (o = r = p),
                void 0 !== o && (c.push({
                    plotX: s,
                    plotY: null === o ? f : l.toPixels(o, !0),
                    isNull: g
                }),
                h.push({
                    plotX: s,
                    plotY: null === r ? f : l.toPixels(r, !0)
                }))
            }, t = t || this.points;
            for (a && (t = this.getStackPoints()),
            e = 0; e < t.length; e++)
                i = t[e].isNull,
                s = Je(t[e].rectPlotX, t[e].plotX),
                n = Je(t[e].yBottom, f),
                (!i || r) && (r || g(e, e - 1, "left"),
                i && !a && r || (c.push(t[e]),
                h.push({
                    x: e,
                    plotX: s,
                    plotY: n
                })),
                r || g(e, e + 1, "right"));
            return e = o.call(this, c, !0, !0),
            i = o.call(this, h.reverse(), !0, !0),
            i.length && (i[0] = "L"),
            e = e.concat(i),
            o = o.call(this, c, !1, r),
            this.areaPath = e,
            o
        },
        drawGraph: function() {
            this.areaPath = [],
            vi.prototype.drawGraph.apply(this);
            var t = this
              , e = this.areaPath
              , i = this.options
              , s = [["area", this.color, i.fillColor]];
            Ne(this.zones, function(e, n) {
                s.push(["zoneArea" + n, e.color || t.color, e.fillColor || i.fillColor])
            }),
            Ne(s, function(s) {
                var n = s[0]
                  , o = t[n];
                o ? o.animate({
                    d: e
                }) : (o = {
                    fill: s[2] || s[1],
                    zIndex: 0
                },
                s[2] || (o["fill-opacity"] = Je(i.fillOpacity, .75)),
                t[n] = t.chart.renderer.path(e).attr(o).add(t.group))
            })
        },
        drawLegendSymbol: si.drawRectangle
    });
    return Be.area = xi,
    ti.spline = s(ei),
    yi = y(vi, {
        type: "spline",
        getPointSpline: function(t, e, i) {
            var s, n, o, r, a = e.plotX, l = e.plotY, h = t[i - 1], i = t[i + 1];
            if (h && !h.isNull && i && !i.isNull) {
                t = h.plotY,
                o = i.plotX;
                var c, i = i.plotY;
                s = (1.5 * a + h.plotX) / 2.5,
                n = (1.5 * l + t) / 2.5,
                o = (1.5 * a + o) / 2.5,
                r = (1.5 * l + i) / 2.5,
                c = (r - n) * (o - a) / (o - s) + l - r,
                n += c,
                r += c,
                n > t && n > l ? (n = ue(t, l),
                r = 2 * l - n) : t > n && l > n && (n = pe(t, l),
                r = 2 * l - n),
                r > i && r > l ? (r = ue(i, l),
                n = 2 * l - r) : i > r && l > r && (r = pe(i, l),
                n = 2 * l - r),
                e.rightContX = o,
                e.rightContY = r
            }
            return e = ["C", Je(h.rightContX, h.plotX), Je(h.rightContY, h.plotY), Je(s, a), Je(n, l), a, l],
            h.rightContX = h.rightContY = null,
            e
        }
    }),
    Be.spline = yi,
    ti.areaspline = s(ti.area),
    xi = xi.prototype,
    yi = y(yi, {
        type: "areaspline",
        getStackPoints: xi.getStackPoints,
        getGraphPath: xi.getGraphPath,
        setStackCliffs: xi.setStackCliffs,
        drawGraph: xi.drawGraph,
        drawLegendSymbol: si.drawRectangle
    }),
    Be.areaspline = yi,
    ti.column = s(ei, {
        borderColor: "#FFFFFF",
        borderRadius: 0,
        groupPadding: .2,
        marker: null,
        pointPadding: .1,
        minPointLength: 0,
        cropThreshold: 50,
        pointRange: null,
        states: {
            hover: {
                brightness: .1,
                shadow: !1,
                halo: !1
            },
            select: {
                color: "#C0C0C0",
                borderColor: "#000000",
                shadow: !1
            }
        },
        dataLabels: {
            align: null,
            verticalAlign: null,
            y: null
        },
        softThreshold: !1,
        startFromThreshold: !0,
        stickyTracking: !1,
        tooltip: {
            distance: 6
        },
        threshold: 0
    }),
    yi = y(vi, {
        type: "column",
        pointAttrToOptions: {
            stroke: "borderColor",
            fill: "color",
            r: "borderRadius"
        },
        cropShoulder: 0,
        directTouch: !0,
        trackerGroups: ["group", "dataLabelsGroup"],
        negStacks: !0,
        init: function() {
            vi.prototype.init.apply(this, arguments);
            var t = this
              , e = t.chart;
            e.hasRendered && Ne(e.series, function(e) {
                e.type === t.type && (e.isDirty = !0)
            })
        },
        getColumnMetrics: function() {
            var t, e = this, i = e.options, s = e.xAxis, n = e.yAxis, o = s.reversed, r = {}, a = 0;
            i.grouping === !1 ? a = 1 : Ne(e.chart.series, function(i) {
                var s, o = i.options, l = i.yAxis;
                i.type === e.type && i.visible && n.len === l.len && n.pos === l.pos && (o.stacking ? (t = i.stackKey,
                r[t] === _ && (r[t] = a++),
                s = r[t]) : o.grouping !== !1 && (s = a++),
                i.columnIndex = s)
            });
            var l = pe(fe(s.transA) * (s.ordinalSlope || i.pointRange || s.closestPointRange || s.tickInterval || 1), s.len)
              , h = l * i.groupPadding
              , c = (l - 2 * h) / a
              , i = pe(i.maxPointWidth || s.len, Je(i.pointWidth, c * (1 - 2 * i.pointPadding)));
            return e.columnMetrics = {
                width: i,
                offset: (c - i) / 2 + (h + ((e.columnIndex || 0) + (o ? 1 : 0)) * c - l / 2) * (o ? -1 : 1)
            },
            e.columnMetrics
        },
        crispCol: function(t, e, i, s) {
            var n = this.chart
              , o = this.borderWidth
              , r = -(o % 2 ? .5 : 0)
              , o = o % 2 ? .5 : 1;
            return n.inverted && n.renderer.isVML && (o += 1),
            i = Math.round(t + i) + r,
            t = Math.round(t) + r,
            i -= t,
            s = Math.round(e + s) + o,
            r = fe(e) <= .5 && s > .5,
            e = Math.round(e) + o,
            s -= e,
            r && (e -= 1,
            s += 1),
            {
                x: t,
                y: e,
                width: i,
                height: s
            }
        },
        translate: function() {
            var t = this
              , e = t.chart
              , i = t.options
              , s = t.borderWidth = Je(i.borderWidth, t.closestPointRange * t.xAxis.transA < 2 ? 0 : 1)
              , n = t.yAxis
              , o = t.translatedThreshold = n.getThreshold(i.threshold)
              , r = Je(i.minPointLength, 5)
              , a = t.getColumnMetrics()
              , l = a.width
              , h = t.barW = ue(l, 1 + 2 * s)
              , c = t.pointXOffset = a.offset;
            e.inverted && (o -= .5),
            i.pointPadding && (h = de(h)),
            vi.prototype.translate.apply(t),
            Ne(t.points, function(i) {
                var s, a = pe(Je(i.yBottom, o), 9e4), d = 999 + fe(a), d = pe(ue(-d, i.plotY), n.len + d), u = i.plotX + c, p = h, f = pe(d, a), g = ue(d, a) - f;
                fe(g) < r && r && (g = r,
                s = !n.reversed && !i.negative || n.reversed && i.negative,
                f = fe(f - o) > r ? a - r : o - (s ? r : 0)),
                i.barX = u,
                i.pointWidth = l,
                i.tooltipPos = e.inverted ? [n.len + n.pos - e.plotLeft - d, t.xAxis.len - u - p / 2, g] : [u + p / 2, d + n.pos - e.plotTop, g],
                i.shapeType = "rect",
                i.shapeArgs = t.crispCol(u, f, p, g)
            })
        },
        getSymbol: ze,
        drawLegendSymbol: si.drawRectangle,
        drawGraph: ze,
        drawPoints: function() {
            var t, e, i = this, n = this.chart, o = i.options, r = n.renderer, a = o.animationLimit || 250;
            Ne(i.points, function(l) {
                var h = l.plotY
                  , c = l.graphic;
                h === _ || isNaN(h) || null === l.y ? c && (l.graphic = c.destroy()) : (t = l.shapeArgs,
                h = u(i.borderWidth) ? {
                    "stroke-width": i.borderWidth
                } : {},
                e = l.pointAttr[l.selected ? "select" : ""] || i.pointAttr[""],
                c ? (qe(c),
                c.attr(h).attr(e)[n.pointCount < a ? "animate" : "attr"](s(t))) : l.graphic = r[l.shapeType](t).attr(h).attr(e).add(l.group || i.group).shadow(o.shadow, null, o.stacking && !o.borderRadius))
            })
        },
        animate: function(t) {
            var e = this.yAxis
              , i = this.options
              , s = this.chart.inverted
              , n = {};
            De && (t ? (n.scaleY = .001,
            t = pe(e.pos + e.len, ue(e.pos, e.toPixels(i.threshold))),
            s ? n.translateX = t - e.len : n.translateY = t,
            this.group.attr(n)) : (n.scaleY = 1,
            n[s ? "translateX" : "translateY"] = e.pos,
            this.group.animate(n, this.options.animation),
            this.animate = null))
        },
        remove: function() {
            var t = this
              , e = t.chart;
            e.hasRendered && Ne(e.series, function(e) {
                e.type === t.type && (e.isDirty = !0)
            }),
            vi.prototype.remove.apply(t, arguments)
        }
    }),
    Be.column = yi,
    ti.bar = s(ti.column),
    xi = y(yi, {
        type: "bar",
        inverted: !0
    }),
    Be.bar = xi,
    ti.scatter = s(ei, {
        lineWidth: 0,
        marker: {
            enabled: !0
        },
        tooltip: {
            headerFormat: '<span style="color:{point.color}">●</span> <span style="font-size: 10px;"> {series.name}</span><br/>',
            pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
        }
    }),
    xi = y(vi, {
        type: "scatter",
        sorted: !1,
        requireSorting: !1,
        noSharedTooltip: !0,
        trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
        takeOrdinalPosition: !1,
        kdDimensions: 2,
        drawGraph: function() {
            this.options.lineWidth && vi.prototype.drawGraph.call(this)
        }
    }),
    Be.scatter = xi,
    ti.pie = s(ei, {
        borderColor: "#FFFFFF",
        borderWidth: 1,
        center: [null, null],
        clip: !1,
        colorByPoint: !0,
        dataLabels: {
            distance: 30,
            enabled: !0,
            formatter: function() {
                return null === this.y ? void 0 : this.point.name
            },
            x: 0
        },
        ignoreHiddenPoint: !0,
        legendType: "point",
        marker: null,
        size: null,
        showInLegend: !1,
        slicedOffset: 10,
        states: {
            hover: {
                brightness: .1,
                shadow: !1
            }
        },
        stickyTracking: !1,
        tooltip: {
            followPointer: !0
        }
    }),
    ei = {
        type: "pie",
        isCartesian: !1,
        pointClass: y(mi, {
            init: function() {
                mi.prototype.init.apply(this, arguments);
                var t, e = this;
                return e.name = Je(e.name, "Slice"),
                t = function(t) {
                    e.slice("select" === t.type)
                }
                ,
                Ue(e, "select", t),
                Ue(e, "unselect", t),
                e
            },
            setVisible: function(t, e) {
                var i = this
                  , s = i.series
                  , n = s.chart
                  , o = s.options.ignoreHiddenPoint
                  , e = Je(e, o);
                t !== i.visible && (i.visible = i.options.visible = t = t === _ ? !i.visible : t,
                s.options.data[We(i, s.data)] = i.options,
                Ne(["graphic", "dataLabel", "connector", "shadowGroup"], function(e) {
                    i[e] && i[e][t ? "show" : "hide"](!0)
                }),
                i.legendItem && n.legend.colorizeItem(i, t),
                !t && "hover" === i.state && i.setState(""),
                o && (s.isDirty = !0),
                e && n.redraw())
            },
            slice: function(t, e, i) {
                var s = this.series;
                P(i, s.chart),
                Je(e, !0),
                this.sliced = this.options.sliced = t = u(t) ? t : !this.sliced,
                s.options.data[We(this, s.data)] = this.options,
                t = t ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                },
                this.graphic.animate(t),
                this.shadowGroup && this.shadowGroup.animate(t)
            },
            haloPath: function(t) {
                var e = this.shapeArgs
                  , i = this.series.chart;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(i.plotLeft + e.x, i.plotTop + e.y, e.r + t, e.r + t, {
                    innerR: this.shapeArgs.r,
                    start: e.start,
                    end: e.end
                })
            }
        }),
        requireSorting: !1,
        directTouch: !0,
        noSharedTooltip: !0,
        trackerGroups: ["group", "dataLabelsGroup"],
        axisTypes: [],
        pointAttrToOptions: {
            stroke: "borderColor",
            "stroke-width": "borderWidth",
            fill: "color"
        },
        animate: function(t) {
            var e = this
              , i = e.points
              , s = e.startAngleRad;
            t || (Ne(i, function(t) {
                var i = t.graphic
                  , n = t.shapeArgs;
                i && (i.attr({
                    r: t.startR || e.center[3] / 2,
                    start: s,
                    end: s
                }),
                i.animate({
                    r: n.r,
                    start: n.start,
                    end: n.end
                }, e.options.animation))
            }),
            e.animate = null)
        },
        updateTotals: function() {
            var t, e, i = 0, s = this.points, n = s.length, o = this.options.ignoreHiddenPoint;
            for (t = 0; n > t; t++)
                e = s[t],
                i += o && !e.visible ? 0 : e.y;
            for (this.total = i,
            t = 0; n > t; t++)
                e = s[t],
                e.percentage = i > 0 && (e.visible || !o) ? e.y / i * 100 : 0,
                e.total = i
        },
        generatePoints: function() {
            vi.prototype.generatePoints.call(this),
            this.updateTotals()
        },
        translate: function(t) {
            this.generatePoints();
            var e, i, s, n, o, r = 0, a = this.options, l = a.slicedOffset, h = l + a.borderWidth, c = a.startAngle || 0, d = this.startAngleRad = ve / 180 * (c - 90), c = (this.endAngleRad = ve / 180 * (Je(a.endAngle, c + 360) - 90)) - d, u = this.points, p = a.dataLabels.distance, a = a.ignoreHiddenPoint, f = u.length;
            for (t || (this.center = t = this.getCenter()),
            this.getX = function(e, i) {
                return s = le.asin(pe((e - t[1]) / (t[2] / 2 + p), 1)),
                t[0] + (i ? -1 : 1) * ge(s) * (t[2] / 2 + p)
            }
            ,
            n = 0; f > n; n++)
                o = u[n],
                e = d + r * c,
                (!a || o.visible) && (r += o.percentage / 100),
                i = d + r * c,
                o.shapeType = "arc",
                o.shapeArgs = {
                    x: t[0],
                    y: t[1],
                    r: t[2] / 2,
                    innerR: t[3] / 2,
                    start: he(1e3 * e) / 1e3,
                    end: he(1e3 * i) / 1e3
                },
                s = (i + e) / 2,
                s > 1.5 * ve ? s -= 2 * ve : -ve / 2 > s && (s += 2 * ve),
                o.slicedTranslation = {
                    translateX: he(ge(s) * l),
                    translateY: he(me(s) * l)
                },
                e = ge(s) * t[2] / 2,
                i = me(s) * t[2] / 2,
                o.tooltipPos = [t[0] + .7 * e, t[1] + .7 * i],
                o.half = -ve / 2 > s || s > ve / 2 ? 1 : 0,
                o.angle = s,
                h = pe(h, p / 2),
                o.labelPos = [t[0] + e + ge(s) * p, t[1] + i + me(s) * p, t[0] + e + ge(s) * h, t[1] + i + me(s) * h, t[0] + e, t[1] + i, 0 > p ? "center" : o.half ? "right" : "left", s]
        },
        drawGraph: null,
        drawPoints: function() {
            var t, e, i, s, n, o, r = this, a = r.chart.renderer, l = r.options.shadow;
            l && !r.shadowGroup && (r.shadowGroup = a.g("shadow").add(r.group)),
            Ne(r.points, function(h) {
                null !== h.y && (e = h.graphic,
                n = h.shapeArgs,
                i = h.shadowGroup,
                s = h.pointAttr[h.selected ? "select" : ""],
                s.stroke || (s.stroke = s.fill),
                l && !i && (i = h.shadowGroup = a.g("shadow").add(r.shadowGroup)),
                t = h.sliced ? h.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                },
                i && i.attr(t),
                e ? e.setRadialReference(r.center).attr(s).animate(Ze(n, t)) : (o = {
                    "stroke-linejoin": "round"
                },
                h.visible || (o.visibility = "hidden"),
                h.graphic = e = a[h.shapeType](n).setRadialReference(r.center).attr(s).attr(o).attr(t).add(r.group).shadow(l, i)))
            })
        },
        searchPoint: ze,
        sortByAngle: function(t, e) {
            t.sort(function(t, i) {
                return void 0 !== t.angle && (i.angle - t.angle) * e
            })
        },
        drawLegendSymbol: si.drawRectangle,
        getCenter: ni.getCenter,
        getSymbol: ze
    },
    ei = y(vi, ei),
    Be.pie = ei,
    vi.prototype.drawDataLabels = function() {
        var t, e, i, n, o = this, r = o.options, a = r.cursor, l = r.dataLabels, h = o.points, c = o.hasRendered || 0, d = o.chart.renderer;
        (l.enabled || o._hasPointLabels) && (o.dlProcessOptions && o.dlProcessOptions(l),
        n = o.plotGroup("dataLabelsGroup", "data-labels", l.defer ? "hidden" : "visible", l.zIndex || 6),
        Je(l.defer, !0) && (n.attr({
            opacity: +c
        }),
        c || Ue(o, "afterAnimate", function() {
            o.visible && n.show(),
            n[r.animation ? "animate" : "attr"]({
                opacity: 1
            }, {
                duration: 200
            })
        })),
        e = l,
        Ne(h, function(h) {
            var c, p, f, g, m = h.dataLabel, v = h.connector, y = !0, x = {};
            if (t = h.dlOptions || h.options && h.options.dataLabels,
            c = Je(t && t.enabled, e.enabled) && null !== h.y,
            m && !c)
                h.dataLabel = m.destroy();
            else if (c) {
                if (l = s(e, t),
                g = l.style,
                c = l.rotation,
                p = h.getLabelConfig(),
                i = l.format ? k(l.format, p) : l.formatter.call(p, l),
                g.color = Je(l.color, g.color, o.color, "black"),
                m)
                    u(i) ? (m.attr({
                        text: i
                    }),
                    y = !1) : (h.dataLabel = m = m.destroy(),
                    v && (h.connector = v.destroy()));
                else if (u(i)) {
                    m = {
                        fill: l.backgroundColor,
                        stroke: l.borderColor,
                        "stroke-width": l.borderWidth,
                        r: l.borderRadius || 0,
                        rotation: c,
                        padding: l.padding,
                        zIndex: 1
                    },
                    "contrast" === g.color && (x.color = l.inside || l.distance < 0 || r.stacking ? d.getContrast(h.color || o.color) : "#000000"),
                    a && (x.cursor = a);
                    for (f in m)
                        m[f] === _ && delete m[f];
                    m = h.dataLabel = d[c ? "text" : "label"](i, 0, -9999, l.shape, null, null, l.useHTML).attr(m).css(Ze(g, x)).add(n).shadow(l.shadow)
                }
                m && o.alignDataLabel(h, m, l, null, y)
            }
        }))
    }
    ,
    vi.prototype.alignDataLabel = function(t, e, i, s, n) {
        var o = this.chart
          , r = o.inverted
          , a = Je(t.plotX, -9999)
          , l = Je(t.plotY, -9999)
          , h = e.getBBox()
          , c = o.renderer.fontMetrics(i.style.fontSize).b
          , d = i.rotation
          , u = i.align
          , p = this.visible && (t.series.forceDL || o.isInsidePlot(a, he(l), r) || s && o.isInsidePlot(a, r ? s.x + 1 : s.y + s.height - 1, r))
          , f = "justify" === Je(i.overflow, "justify");
        p && (s = Ze({
            x: r ? o.plotWidth - l : a,
            y: he(r ? o.plotHeight - a : l),
            width: 0,
            height: 0
        }, s),
        Ze(i, {
            width: h.width,
            height: h.height
        }),
        d ? (f = !1,
        r = o.renderer.rotCorr(c, d),
        r = {
            x: s.x + i.x + s.width / 2 + r.x,
            y: s.y + i.y + s.height / 2
        },
        e[n ? "attr" : "animate"](r).attr({
            align: i.align
        }),
        a = (d + 720) % 360,
        a = a > 180 && 360 > a,
        "left" === u ? r.y -= a ? h.height : 0 : "center" === u ? (r.x -= h.width / 2,
        r.y -= h.height / 2) : "right" === u && (r.x -= h.width,
        r.y -= a ? 0 : h.height)) : (e.align(i, null, s),
        r = e.alignAttr),
        f ? this.justifyDataLabel(e, i, r, h, s, n) : Je(i.crop, !0) && (p = o.isInsidePlot(r.x, r.y) && o.isInsidePlot(r.x + h.width, r.y + h.height)),
        i.shape && !d && e.attr({
            anchorX: t.plotX,
            anchorY: t.plotY
        })),
        p || (qe(e),
        e.attr({
            y: -9999
        }),
        e.placed = !1)
    }
    ,
    vi.prototype.justifyDataLabel = function(t, e, i, s, n, o) {
        var r, a, l = this.chart, h = e.align, c = e.verticalAlign, d = t.box ? 0 : t.padding || 0;
        r = i.x + d,
        0 > r && ("right" === h ? e.align = "left" : e.x = -r,
        a = !0),
        r = i.x + s.width - d,
        r > l.plotWidth && ("left" === h ? e.align = "right" : e.x = l.plotWidth - r,
        a = !0),
        r = i.y + d,
        0 > r && ("bottom" === c ? e.verticalAlign = "top" : e.y = -r,
        a = !0),
        r = i.y + s.height - d,
        r > l.plotHeight && ("top" === c ? e.verticalAlign = "bottom" : e.y = l.plotHeight - r,
        a = !0),
        a && (t.placed = !o,
        t.align(e, null, n))
    }
    ,
    Be.pie && (Be.pie.prototype.drawDataLabels = function() {
        var t, e, i, s, n, o, r, a, l, h, c, d = this, u = d.data, p = d.chart, f = d.options.dataLabels, g = Je(f.connectorPadding, 10), m = Je(f.connectorWidth, 1), v = p.plotWidth, y = p.plotHeight, x = Je(f.softConnector, !0), b = f.distance, k = d.center, w = k[2] / 2, C = k[1], S = b > 0, T = [[], []], D = [0, 0, 0, 0], A = function(t, e) {
            return e.y - t.y
        };
        if (d.visible && (f.enabled || d._hasPointLabels)) {
            for (vi.prototype.drawDataLabels.apply(d),
            Ne(u, function(t) {
                t.dataLabel && t.visible && (T[t.half].push(t),
                t.dataLabel._pos = null)
            }),
            h = 2; h--; ) {
                var L, P = [], I = [], z = T[h], O = z.length;
                if (O) {
                    for (d.sortByAngle(z, h - .5),
                    c = u = 0; !u && z[c]; )
                        u = z[c] && z[c].dataLabel && (z[c].dataLabel.getBBox().height || 21),
                        c++;
                    if (b > 0) {
                        for (n = pe(C + w + b, p.plotHeight),
                        c = ue(0, C - w - b); n >= c; c += u)
                            P.push(c);
                        if (n = P.length,
                        O > n) {
                            for (t = [].concat(z),
                            t.sort(A),
                            c = O; c--; )
                                t[c].rank = c;
                            for (c = O; c--; )
                                z[c].rank >= n && z.splice(c, 1);
                            O = z.length
                        }
                        for (c = 0; O > c; c++) {
                            t = z[c],
                            o = t.labelPos,
                            t = 9999;
                            var E, F;
                            for (F = 0; n > F; F++)
                                E = fe(P[F] - o[1]),
                                t > E && (t = E,
                                L = F);
                            if (c > L && null !== P[c])
                                L = c;
                            else
                                for (O - c + L > n && null !== P[c] && (L = n - O + c); null === P[L]; )
                                    L++;
                            I.push({
                                i: L,
                                y: P[L]
                            }),
                            P[L] = null
                        }
                        I.sort(A)
                    }
                    for (c = 0; O > c; c++)
                        t = z[c],
                        o = t.labelPos,
                        s = t.dataLabel,
                        l = t.visible === !1 ? "hidden" : "inherit",
                        t = o[1],
                        b > 0 ? (n = I.pop(),
                        L = n.i,
                        a = n.y,
                        (t > a && null !== P[L + 1] || a > t && null !== P[L - 1]) && (a = pe(ue(0, t), p.plotHeight))) : a = t,
                        r = f.justify ? k[0] + (h ? -1 : 1) * (w + b) : d.getX(a === C - w - b || a === C + w + b ? t : a, h),
                        s._attr = {
                            visibility: l,
                            align: o[6]
                        },
                        s._pos = {
                            x: r + f.x + ({
                                left: g,
                                right: -g
                            }[o[6]] || 0),
                            y: a + f.y - 10
                        },
                        s.connX = r,
                        s.connY = a,
                        null === this.options.size && (n = s.width,
                        g > r - n ? D[3] = ue(he(n - r + g), D[3]) : r + n > v - g && (D[1] = ue(he(r + n - v + g), D[1])),
                        0 > a - u / 2 ? D[0] = ue(he(-a + u / 2), D[0]) : a + u / 2 > y && (D[2] = ue(he(a + u / 2 - y), D[2])))
                }
            }
            (0 === M(D) || this.verifyDataLabelOverflow(D)) && (this.placeDataLabels(),
            S && m && Ne(this.points, function(t) {
                e = t.connector,
                o = t.labelPos,
                (s = t.dataLabel) && s._pos && t.visible ? (l = s._attr.visibility,
                r = s.connX,
                a = s.connY,
                i = x ? ["M", r + ("left" === o[6] ? 5 : -5), a, "C", r, a, 2 * o[2] - o[4], 2 * o[3] - o[5], o[2], o[3], "L", o[4], o[5]] : ["M", r + ("left" === o[6] ? 5 : -5), a, "L", o[2], o[3], "L", o[4], o[5]],
                e ? (e.animate({
                    d: i
                }),
                e.attr("visibility", l)) : t.connector = e = d.chart.renderer.path(i).attr({
                    "stroke-width": m,
                    stroke: f.connectorColor || t.color || "#606060",
                    visibility: l
                }).add(d.dataLabelsGroup)) : e && (t.connector = e.destroy())
            }))
        }
    }
    ,
    Be.pie.prototype.placeDataLabels = function() {
        Ne(this.points, function(t) {
            var e = t.dataLabel;
            e && t.visible && ((t = e._pos) ? (e.attr(e._attr),
            e[e.moved ? "animate" : "attr"](t),
            e.moved = !0) : e && e.attr({
                y: -9999
            }))
        })
    }
    ,
    Be.pie.prototype.alignDataLabel = ze,
    Be.pie.prototype.verifyDataLabelOverflow = function(t) {
        var e, i = this.center, s = this.options, n = s.center, o = s.minSize || 80, r = o;
        return null !== n[0] ? r = ue(i[2] - ue(t[1], t[3]), o) : (r = ue(i[2] - t[1] - t[3], o),
        i[0] += (t[3] - t[1]) / 2),
        null !== n[1] ? r = ue(pe(r, i[2] - ue(t[0], t[2])), o) : (r = ue(pe(r, i[2] - t[0] - t[2]), o),
        i[1] += (t[0] - t[2]) / 2),
        r < i[2] ? (i[2] = r,
        i[3] = Math.min(/%$/.test(s.innerSize || 0) ? r * parseFloat(s.innerSize || 0) / 100 : parseFloat(s.innerSize || 0), r),
        this.translate(i),
        this.drawDataLabels && this.drawDataLabels()) : e = !0,
        e
    }
    ),
    Be.column && (Be.column.prototype.alignDataLabel = function(t, e, i, n, o) {
        var r = this.chart.inverted
          , a = t.series
          , l = t.dlBox || t.shapeArgs
          , h = Je(t.below, t.plotY > Je(this.translatedThreshold, a.yAxis.len))
          , c = Je(i.inside, !!this.options.stacking);
        l && (n = s(l),
        n.y < 0 && (n.height += n.y,
        n.y = 0),
        l = n.y + n.height - a.yAxis.len,
        l > 0 && (n.height -= l),
        r && (n = {
            x: a.yAxis.len - n.y - n.height,
            y: a.xAxis.len - n.x - n.width,
            width: n.height,
            height: n.width
        }),
        c || (r ? (n.x += h ? 0 : n.width,
        n.width = 0) : (n.y += h ? n.height : 0,
        n.height = 0))),
        i.align = Je(i.align, !r || c ? "center" : h ? "right" : "left"),
        i.verticalAlign = Je(i.verticalAlign, r || c ? "middle" : h ? "top" : "bottom"),
        vi.prototype.alignDataLabel.call(this, t, e, i, n, o)
    }
    ),
    function(t) {
        var e = t.Chart
          , i = t.each
          , s = t.pick
          , n = t.addEvent;
        e.prototype.callbacks.push(function(t) {
            function e() {
                var e = [];
                i(t.series, function(t) {
                    var n = t.options.dataLabels
                      , o = t.dataLabelCollections || ["dataLabel"];
                    (n.enabled || t._hasPointLabels) && !n.allowOverlap && t.visible && i(o, function(n) {
                        i(t.points, function(t) {
                            t[n] && (t[n].labelrank = s(t.labelrank, t.shapeArgs && t.shapeArgs.height),
                            e.push(t[n]))
                        })
                    })
                }),
                t.hideOverlappingLabels(e)
            }
            e(),
            n(t, "redraw", e)
        }),
        e.prototype.hideOverlappingLabels = function(t) {
            var e, s, n, o, r, a, l, h, c, d = t.length;
            for (s = 0; d > s; s++)
                (e = t[s]) && (e.oldOpacity = e.opacity,
                e.newOpacity = 1);
            for (t.sort(function(t, e) {
                return (e.labelrank || 0) - (t.labelrank || 0)
            }),
            s = 0; d > s; s++)
                for (n = t[s],
                e = s + 1; d > e; ++e)
                    o = t[e],
                    n && o && n.placed && o.placed && 0 !== n.newOpacity && 0 !== o.newOpacity && (r = n.alignAttr,
                    a = o.alignAttr,
                    l = n.parentGroup,
                    h = o.parentGroup,
                    c = 2 * (n.box ? 0 : n.padding),
                    r = !(a.x + h.translateX > r.x + l.translateX + (n.width - c) || a.x + h.translateX + (o.width - c) < r.x + l.translateX || a.y + h.translateY > r.y + l.translateY + (n.height - c) || a.y + h.translateY + (o.height - c) < r.y + l.translateY)) && ((n.labelrank < o.labelrank ? n : o).newOpacity = 0);
            i(t, function(t) {
                var e, i;
                t && (i = t.newOpacity,
                t.oldOpacity !== i && t.placed && (i ? t.show(!0) : e = function() {
                    t.hide()
                }
                ,
                t.alignAttr.opacity = i,
                t[t.isOld ? "animate" : "attr"](t.alignAttr, null, e)),
                t.isOld = !0)
            })
        }
    }(re),
    ei = re.TrackerMixin = {
        drawTrackerPoint: function() {
            var t = this
              , e = t.chart
              , i = e.pointer
              , s = t.options.cursor
              , n = s && {
                cursor: s
            }
              , o = function(t) {
                for (var i, s = t.target; s && !i; )
                    i = s.point,
                    s = s.parentNode;
                i !== _ && i !== e.hoverPoint && i.onMouseOver(t)
            };
            Ne(t.points, function(t) {
                t.graphic && (t.graphic.element.point = t),
                t.dataLabel && (t.dataLabel.element.point = t)
            }),
            t._hasTracking || (Ne(t.trackerGroups, function(e) {
                t[e] && (t[e].addClass("highcharts-tracker").on("mouseover", o).on("mouseout", function(t) {
                    i.onTrackerMouseOut(t)
                }).css(n),
                B) && t[e].on("touchstart", o)
            }),
            t._hasTracking = !0)
        },
        drawTrackerGraph: function() {
            var t = this
              , e = t.options
              , i = e.trackByArea
              , s = [].concat(i ? t.areaPath : t.graphPath)
              , n = s.length
              , o = t.chart
              , r = o.pointer
              , a = o.renderer
              , l = o.options.tooltip.snap
              , h = t.tracker
              , c = e.cursor
              , d = c && {
                cursor: c
            }
              , u = function() {
                o.hoverSeries !== t && t.onMouseOver()
            }
              , p = "rgba(192,192,192," + (De ? 1e-4 : .002) + ")";
            if (n && !i)
                for (c = n + 1; c--; )
                    "M" === s[c] && s.splice(c + 1, 0, s[c + 1] - l, s[c + 2], "L"),
                    (c && "M" === s[c] || c === n) && s.splice(c, 0, "L", s[c - 2] + l, s[c - 1]);
            h ? h.attr({
                d: s
            }) : (t.tracker = a.path(s).attr({
                "stroke-linejoin": "round",
                visibility: t.visible ? "visible" : "hidden",
                stroke: p,
                fill: i ? p : "none",
                "stroke-width": e.lineWidth + (i ? 0 : 2 * l),
                zIndex: 2
            }).add(t.group),
            Ne([t.tracker, t.markerGroup], function(t) {
                t.addClass("highcharts-tracker").on("mouseover", u).on("mouseout", function(t) {
                    r.onTrackerMouseOut(t)
                }).css(d),
                B && t.on("touchstart", u)
            }))
        }
    },
    Be.column && (yi.prototype.drawTracker = ei.drawTrackerPoint),
    Be.pie && (Be.pie.prototype.drawTracker = ei.drawTrackerPoint),
    Be.scatter && (xi.prototype.drawTracker = ei.drawTrackerPoint),
    Ze(fi.prototype, {
        setItemEvents: function(t, e, i, s, n) {
            var o = this;
            (i ? e : t.legendGroup).on("mouseover", function() {
                t.setState("hover"),
                e.css(o.options.itemHoverStyle)
            }).on("mouseout", function() {
                e.css(t.visible ? s : n),
                t.setState()
            }).on("click", function(e) {
                var i = function() {
                    t.setVisible && t.setVisible()
                }
                  , e = {
                    browserEvent: e
                };
                t.firePointEvent ? t.firePointEvent("legendItemClick", e, i) : Ve(t, "legendItemClick", e, i)
            })
        },
        createCheckboxForItem: function(t) {
            t.checkbox = v("input", {
                type: "checkbox",
                checked: t.selected,
                defaultChecked: t.selected
            }, this.options.itemCheckboxStyle, this.chart.container),
            Ue(t.checkbox, "click", function(e) {
                Ve(t.series || t, "checkboxClick", {
                    checked: e.target.checked,
                    item: t
                }, function() {
                    t.select()
                })
            })
        }
    }),
    W.legend.itemStyle.cursor = "pointer",
    Ze(gi.prototype, {
        showResetZoom: function() {
            var t = this
              , e = W.lang
              , i = t.options.chart.resetZoomButton
              , s = i.theme
              , n = s.states
              , o = "chart" === i.relativeTo ? null : "plotBox";
            this.resetZoomButton = t.renderer.button(e.resetZoom, null, null, function() {
                t.zoomOut()
            }, s, n && n.hover).attr({
                align: i.position.align,
                title: e.resetZoomTitle
            }).add().align(i.position, !1, o)
        },
        zoomOut: function() {
            var t = this;
            Ve(t, "selection", {
                resetSelection: !0
            }, function() {
                t.zoom()
            })
        },
        zoom: function(t) {
            var e, i, s = this.pointer, n = !1;
            !t || t.resetSelection ? Ne(this.axes, function(t) {
                e = t.zoom()
            }) : Ne(t.xAxis.concat(t.yAxis), function(t) {
                var i = t.axis
                  , o = i.isXAxis;
                (s[o ? "zoomX" : "zoomY"] || s[o ? "pinchX" : "pinchY"]) && (e = i.zoom(t.min, t.max),
                i.displayBtn && (n = !0))
            }),
            i = this.resetZoomButton,
            n && !i ? this.showResetZoom() : !n && r(i) && (this.resetZoomButton = i.destroy()),
            e && this.redraw(Je(this.options.chart.animation, t && t.animation, this.pointCount < 100))
        },
        pan: function(t, e) {
            var i, s = this, n = s.hoverPoints;
            n && Ne(n, function(t) {
                t.setState()
            }),
            Ne("xy" === e ? [1, 0] : [1], function(e) {
                var e = s[e ? "xAxis" : "yAxis"][0]
                  , n = e.horiz
                  , o = t[n ? "chartX" : "chartY"]
                  , n = n ? "mouseDownX" : "mouseDownY"
                  , r = s[n]
                  , a = (e.pointRange || 0) / 2
                  , l = e.getExtremes()
                  , h = e.toValue(r - o, !0) + a
                  , a = e.toValue(r + e.len - o, !0) - a
                  , r = r > o;
                e.series.length && (r || h > pe(l.dataMin, l.min)) && (!r || a < ue(l.dataMax, l.max)) && (e.setExtremes(h, a, !1, !1, {
                    trigger: "pan"
                }),
                i = !0),
                s[n] = o
            }),
            i && s.redraw(!1),
            m(s.container, {
                cursor: "move"
            })
        }
    }),
    Ze(mi.prototype, {
        select: function(t, e) {
            var i = this
              , s = i.series
              , n = s.chart
              , t = Je(t, !i.selected);
            i.firePointEvent(t ? "select" : "unselect", {
                accumulate: e
            }, function() {
                i.selected = i.options.selected = t,
                s.options.data[We(i, s.data)] = i.options,
                i.setState(t && "select"),
                e || Ne(n.getSelectedPoints(), function(t) {
                    t.selected && t !== i && (t.selected = t.options.selected = !1,
                    s.options.data[We(t, s.data)] = t.options,
                    t.setState(""),
                    t.firePointEvent("unselect"))
                })
            })
        },
        onMouseOver: function(t, e) {
            var i = this.series
              , s = i.chart
              , n = s.tooltip
              , o = s.hoverPoint;
            s.hoverSeries !== i && i.onMouseOver(),
            o && o !== this && o.onMouseOut(),
            this.series && (this.firePointEvent("mouseOver"),
            n && (!n.shared || i.noSharedTooltip) && n.refresh(this, t),
            this.setState("hover"),
            !e) && (s.hoverPoint = this)
        },
        onMouseOut: function() {
            var t = this.series.chart
              , e = t.hoverPoints;
            this.firePointEvent("mouseOut"),
            e && -1 !== We(this, e) || (this.setState(),
            t.hoverPoint = null)
        },
        importEvents: function() {
            if (!this.hasImportedEvents) {
                var t, e = s(this.series.options.point, this.options).events;
                this.events = e;
                for (t in e)
                    Ue(this, t, e[t]);
                this.hasImportedEvents = !0
            }
        },
        setState: function(t, e) {
            var i, n = ce(this.plotX), o = this.plotY, r = this.series, a = r.options.states, l = ti[r.type].marker && r.options.marker, h = l && !l.enabled, c = l && l.states[t], d = c && c.enabled === !1, u = r.stateMarkerGraphic, p = this.marker || {}, f = r.chart, g = r.halo, t = t || "";
            i = this.pointAttr[t] || r.pointAttr[t],
            t === this.state && !e || this.selected && "select" !== t || a[t] && a[t].enabled === !1 || t && (d || h && c.enabled === !1) || t && p.states && p.states[t] && p.states[t].enabled === !1 || (this.graphic ? (l = l && this.graphic.symbolName && i.r,
            this.graphic.attr(s(i, l ? {
                x: n - l,
                y: o - l,
                width: 2 * l,
                height: 2 * l
            } : {})),
            u && u.hide()) : (t && c && (l = c.radius,
            p = p.symbol || r.symbol,
            u && u.currentSymbol !== p && (u = u.destroy()),
            u ? u[e ? "animate" : "attr"]({
                x: n - l,
                y: o - l
            }) : p && (r.stateMarkerGraphic = u = f.renderer.symbol(p, n - l, o - l, 2 * l, 2 * l).attr(i).add(r.markerGroup),
            u.currentSymbol = p)),
            u && (u[t && f.isInsidePlot(n, o, f.inverted) ? "show" : "hide"](),
            u.element.point = this)),
            (n = a[t] && a[t].halo) && n.size ? (g || (r.halo = g = f.renderer.path().add(f.seriesGroup)),
            g.attr(Ze({
                fill: this.color || r.color,
                "fill-opacity": n.opacity,
                zIndex: -1
            }, n.attributes))[e ? "animate" : "attr"]({
                d: this.haloPath(n.size)
            })) : g && g.attr({
                d: []
            }),
            this.state = t)
        },
        haloPath: function(t) {
            var e = this.series
              , i = e.chart
              , s = e.getPlotBox()
              , n = i.inverted
              , o = Math.floor(this.plotX);
            return i.renderer.symbols.circle(s.translateX + (n ? e.yAxis.len - this.plotY : o) - t, s.translateY + (n ? e.xAxis.len - o : this.plotY) - t, 2 * t, 2 * t)
        }
    }),
    Ze(vi.prototype, {
        onMouseOver: function() {
            var t = this.chart
              , e = t.hoverSeries;
            e && e !== this && e.onMouseOut(),
            this.options.events.mouseOver && Ve(this, "mouseOver"),
            this.setState("hover"),
            t.hoverSeries = this
        },
        onMouseOut: function() {
            var t = this.options
              , e = this.chart
              , i = e.tooltip
              , s = e.hoverPoint;
            e.hoverSeries = null,
            s && s.onMouseOut(),
            this && t.events.mouseOut && Ve(this, "mouseOut"),
            i && !t.stickyTracking && (!i.shared || this.noSharedTooltip) && i.hide(),
            this.setState()
        },
        setState: function(t) {
            var e = this.options
              , i = this.graph
              , s = e.states
              , n = e.lineWidth
              , e = 0
              , t = t || "";
            if (this.state !== t && (this.state = t,
            !(s[t] && s[t].enabled === !1) && (t && (n = s[t].lineWidth || n + (s[t].lineWidthPlus || 0)),
            i && !i.dashstyle)))
                for (t = {
                    "stroke-width": n
                },
                i.attr(t); this["zoneGraph" + e]; )
                    this["zoneGraph" + e].attr(t),
                    e += 1
        },
        setVisible: function(t, e) {
            var i, s = this, n = s.chart, o = s.legendItem, r = n.options.chart.ignoreHiddenSeries, a = s.visible;
            i = (s.visible = t = s.userOptions.visible = t === _ ? !a : t) ? "show" : "hide",
            Ne(["group", "dataLabelsGroup", "markerGroup", "tracker"], function(t) {
                s[t] && s[t][i]()
            }),
            (n.hoverSeries === s || (n.hoverPoint && n.hoverPoint.series) === s) && s.onMouseOut(),
            o && n.legend.colorizeItem(s, t),
            s.isDirty = !0,
            s.options.stacking && Ne(n.series, function(t) {
                t.options.stacking && t.visible && (t.isDirty = !0)
            }),
            Ne(s.linkedSeries, function(e) {
                e.setVisible(t, !1)
            }),
            r && (n.isDirtyBox = !0),
            e !== !1 && n.redraw(),
            Ve(s, i)
        },
        show: function() {
            this.setVisible(!0)
        },
        hide: function() {
            this.setVisible(!1)
        },
        select: function(t) {
            this.selected = t = t === _ ? !this.selected : t,
            this.checkbox && (this.checkbox.checked = t),
            Ve(this, t ? "select" : "unselect")
        },
        drawTracker: ei.drawTrackerGraph
    }),
    Ze(re, {
        Color: z,
        Point: mi,
        Tick: E,
        Renderer: H,
        SVGElement: O,
        SVGRenderer: ii,
        arrayMin: T,
        arrayMax: M,
        charts: Oe,
        dateFormat: N,
        error: e,
        format: k,
        pathAnim: void 0,
        getOptions: function() {
            return W
        },
        hasBidiBug: Ae,
        isTouchDevice: Te,
        setOptions: function(t) {
            return W = s(!0, W, t),
            I(),
            W
        },
        addEvent: Ue,
        removeEvent: Xe,
        createElement: v,
        discardElement: A,
        css: m,
        each: Ne,
        map: Ge,
        merge: s,
        splat: f,
        stableSort: S,
        extendClass: y,
        pInt: n,
        svg: De,
        canvas: Le,
        vml: !De && !Le,
        product: "Highcharts",
        version: "4.2.2"
    }),
    re
}),
Highcharts.c = {
    colors: "#ED8C2B #88A825 #CF4A30 #5E3969 #914611 #DB843D #92A8CD #A47D7C #1E2C93".split(" "),
    chart: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#CCCCCC",
        borderRadius: 0,
        plotBackgroundColor: "transparent",
        plotShadow: !1,
        plotBorderWidth: 1,
        style: {
            fontFamily: "Lato, Helvetica Neue, Helvetica, Arial, sans-serif",
            fontSize: "12px",
            fontWeight: "bold",
            color: "#333333"
        }
    },
    tooltip: {
        style: {
            color: "#333333",
            font: "14px Lato, Helvetica Neue, Helvetica, Arial, sans-serif"
        }
    },
    title: {
        style: {
            color: "#333333",
            font: "bold 14px Lato, Helvetica Neue, Helvetica, Arial, sans-serif"
        }
    },
    subtitle: {
        style: {
            color: "#333333",
            font: "12px Lato, Helvetica Neue, Helvetica, Arial, sans-serif"
        }
    },
    xAxis: {
        gridLineWidth: 0,
        lineColor: "#000",
        tickColor: "#000",
        labels: {
            style: {
                color: "#000",
                font: "11px Lato, Helvetica Neue, Helvetica, Arial, sans-serif"
            }
        },
        title: {
            style: {
                color: "#333333",
                fontWeight: "bold",
                fontSize: "12px",
                fontFamily: "Lato, Helvetica Neue, Helvetica, Arial, sans-serif"
            }
        }
    },
    yAxis: {
        gridLineWidth: 1,
        lineColor: "#000",
        lineWidth: 1,
        tickWidth: 1,
        tickColor: "#000",
        labels: {
            style: {
                color: "#333333",
                font: "12px Lato, Helvetica Neue, Helvetica, Arial, sans-serif"
            }
        },
        title: {
            style: {
                color: "#333333",
                fontWeight: "bold",
                fontSize: "12px",
                fontFamily: "Lato, Helvetica Neue, Helvetica, Arial, sans-serif"
            }
        }
    },
    credits: {
        enabled: !1
    },
    legend: {
        borderColor: "#DDDDDD",
        borderWidth: 1,
        style: {
            color: "#333333",
            fontWeight: "bold",
            fontSize: "12px",
            fontFamily: "Lato, Helvetica Neue, Helvetica, Arial, sans-serif"
        },
        itemStyle: {
            color: "#333333",
            fontWeight: "bold",
            fontSize: "12px",
            fontFamily: "Lato, Helvetica Neue, Helvetica, Arial, sans-serif"
        },
        itemHoverStyle: {
            color: "#333333",
            fontWeight: "bold",
            fontSize: "12px",
            fontFamily: "Lato, Helvetica Neue, Helvetica, Arial, sans-serif"
        },
        itemHiddenStyle: {
            color: "gray",
            fontWeight: "bold",
            fontSize: "12px",
            fontFamily: "Lato, Helvetica Neue, Helvetica, Arial, sans-serif"
        }
    },
    labels: {
        style: {
            color: "#333333"
        }
    }
},
Highcharts.setOptions(Highcharts.c);
