﻿/*! FileSaver.js v1.3.6
 *
 * A saveAs() FileSaver implementation.
 *
 * By Travis Clarke, https://travismclarke.com
 * By Eli Grey, http://eligrey.com
 *
 * License: MIT (https://github.com/clarketm/FileSaver.js/blob/master/LICENSE.md)
 */
(function (e, t) {
    if (typeof exports === "object" && typeof exports.nodeName !== "string") {
        module.exports = e.document ? t(e, true) : function (e) {
            if (!e.document) {
                throw new Error("FileSaver requires a window with a document")
            } return t(e)
        }
    } else {
        t(e)
    }
})
(window || this, function (e, t) {
"use strict"; if (typeof e === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) 
{
return 
} var n = e.document, r = function () 
{ return e.URL || e.webkitURL || e 
}, o = n.createElementNS("http://www.w3.org/1999/xhtml", "a"), i = "download" in o, a = function (e) {
    var t = new MouseEvent("click"); e.dispatchEvent(t)
}, f = /constructor/i.test(e.HTMLElement) || e.safari, u = /CriOS\/[\d]+/.test(navigator.userAgent), c = function (t) {
    (e.setImmediate || e.setTimeout)(function () { throw t }, 0)
}, d = "application/octet-stream", s = 1e3 * 40, l = function (e) {
var t = function () { if (typeof e === "string") { r().revokeObjectURL(e) 
    } else { e.remove() }
}; setTimeout(t, s)
}, p = function (e, t, n) {
    t = [].concat(t); var r = t.length; while (r--) { var o = e["on" + t[r]]; if (typeof o === "function") { try { o.call(e, n || e) } catch (e) { c(e) } } }
}, w = function (e) {
    if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)) {
        return new Blob([String.fromCharCode(65279), e], { type: e.type })
    } return e
}, m = function (t, n, c) {
    if (!c) { t = w(t) } var s = this, m = t.type, v = m === d, y, h = function () {
        p(s, "writestart progress write writeend".split(" "))
    }, S = function () {
        if ((u || v && f) && e.FileReader) {
            var n = new FileReader; n.onloadend = function () {
                var t = u ? n.result : n.result.replace(/^data:[^;]*;/, "data:attachment/file;"); var r = e.open(t, "_blank"); if (!r) e.location.href = t; t = undefined; s.readyState = s.DONE; h()
            }; n.readAsDataURL(t); s.readyState = s.INIT; return
        } if (!y) { y = r().createObjectURL(t) } if (v) { e.location.href = y } else { var o = e.open(y, "_blank"); if (!o) { e.location.href = y } } s.readyState = s.DONE; h(); l(y)
    }; s.readyState = s.INIT; if (i) {
        y = r().createObjectURL(t); setTimeout(function () { o.href = y; o.download = n; a(o); h(); l(y); s.readyState = s.DONE }); return
    } S()
}, v = m.prototype, y = function (e, t, n) {
    return new m(e, t || e.name || "download", n)
}; if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
    y = function (e, t, n) {
        t = t || e.name || "download"; if (!n) { e = w(e) } return navigator.msSaveOrOpenBlob(e, t)
    }
} v.abort = function () {
}; v.readyState = v.INIT = 0;
v.WRITING = 1; v.DONE = 2;
v.error = v.onwritestart = v.onprogress = v.onwrite = v.onabort = v.onerror = v.onwriteend = null; if (typeof define === "function" && define.amd) { 
    define("file-saverjs", [], function () { return y }) } if (typeof t === "undefined") { e.saveAs = y } return y
});