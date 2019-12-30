var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, e = function() {
    function t(t, e) {
        var i = [], r = !0, o = !1, n = void 0;
        try {
            for (var a, l = t[Symbol.iterator](); !(r = (a = l.next()).done) && (i.push(a.value), 
            !e || i.length !== e); r = !0) ;
        } catch (t) {
            o = !0, n = t;
        } finally {
            try {
                !r && l.return && l.return();
            } finally {
                if (o) throw n;
            }
        }
        return i;
    }
    return function(e, i) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, i);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), i = [], r = [], o = 0, n = 0, a = 0, l = 0, f = 0, s = 0, p = !1;

Component({
    properties: {
        styleConfig: {
            type: Object,
            value: {}
        },
        data: {
            type: Array,
            value: [],
            observer: "computeInitData"
        },
        loadHeight: {
            type: Number,
            value: 600
        },
        refresh: {
            type: Boolean,
            value: !1
        },
        loadMore: {
            type: Boolean,
            value: !0
        },
        isEnd: {
            type: Boolean,
            value: !1
        },
        pageError: {
            type: Boolean,
            value: !1
        }
    },
    attached: function() {},
    data: {
        leftList: [],
        rightList: []
    },
    methods: {
        computeInitData: function(t) {
            if (t && t.length) {
                var e = this.data, a = e.refresh, l = e.paddingStyle;
                s && l || this.getStyleInfo(), a && (i = [], r = [], o = 0, n = 0);
                for (var f = [], p = [], h = i.length, u = r.length, c = 0; c < t.length; c++) {
                    var y = t[c];
                    y.originalWidth = parseInt(y.picWidth), y.originalHeight = parseInt(y.picHeight), 
                    y.picWidth = s;
                    var g = y.originalWidth / y.picWidth;
                    y.picHeight = y.originalHeight / g, o <= n ? (i.push(y), f.push(y), o += y.picHeight) : (r.push(y), 
                    p.push(y), n += y.picHeight);
                }
                this.setListData(f, h, p, u);
            }
        },
        setListData: function(t, i, r, o) {
            var n = {};
            if (i) {
                var a = !0, l = !1, f = void 0;
                try {
                    for (var s, h = t.entries()[Symbol.iterator](); !(a = (s = h.next()).done); a = !0) {
                        var u = e(s.value, 2), c = u[0], y = u[1];
                        n["leftList[" + (i + c) + "]"] = y;
                    }
                } catch (t) {
                    l = !0, f = t;
                } finally {
                    try {
                        !a && h.return && h.return();
                    } finally {
                        if (l) throw f;
                    }
                }
            } else n.leftList = t;
            if (o) {
                var g = !0, d = !1, v = void 0;
                try {
                    for (var m, b = r.entries()[Symbol.iterator](); !(g = (m = b.next()).done); g = !0) {
                        var x = e(m.value, 2), c = x[0], y = x[1];
                        n["rightList[" + (o + c) + "]"] = y;
                    }
                } catch (t) {
                    d = !0, v = t;
                } finally {
                    try {
                        !g && b.return && b.return();
                    } finally {
                        if (d) throw v;
                    }
                }
            } else n.rightList = r;
            this.setData(n, function() {
                p = !0;
            });
        },
        getStyleInfo: function() {
            var e = wx.getSystemInfoSync();
            l = e.windowWidth, f = e.windowHeight, a = 750 / l;
            var i = this.data.styleConfig || {}, r = i.padding, o = i.itemGap, n = 0, p = 0, h = "", u = "";
            if (r && "object" === (void 0 === r ? "undefined" : t(r))) {
                for (var c in r) r[c] = r[c] / a;
                n = r.left + r.right, h = r.top + "px " + r.right + "px " + r.bottom + "px " + r.left + "px";
            } else r && "number" == typeof r ? (n = 2 * (r /= a), h = r + "px") : (r = 0, h = "0px");
            if (o && "object" === (void 0 === o ? "undefined" : t(o))) {
                for (var y in o) o[y] = o[y] / a;
                p = 2 * (o.left + o.right), u = o.top + "px " + o.right + "px " + o.bottom + "px " + o.left + "px";
            } else o && "number" == typeof o ? (p = 4 * (o /= a), u = o + "px") : (o = 0, u = "0px");
            s = (l - n - p) / 2, this.setData({
                paddingStyle: h,
                itemGapStyle: u
            });
        },
        getScrollOffset: function() {
            var t = this;
            if (p && this.data.loadMore && this.data.leftList.length && !this.data.isEnd) {
                var e = this.selector;
                try {
                    e || (e = this.createSelectorQuery().select("#list").boundingClientRect(function(e) {
                        f - e.top >= e.height - t.data.loadHeight && (t.triggerEvent("nextpage"), p = !1);
                    }), this.selector = e), e.exec();
                } catch (t) {
                    console.log("Selector error", t);
                }
            }
        },
        pageErrTap: function() {
            this.triggerEvent("nextpage"), p = !1;
        }
    }
});