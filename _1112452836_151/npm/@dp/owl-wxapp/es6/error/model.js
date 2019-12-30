function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var r = 0; r < e.length; r++) {
            var i = e[r];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, r, i) {
        return r && t(e.prototype, r), i && t(e, i), e;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = require("../util/util"), i = {
    ERROR: "error"
}, n = {
    SCRIPT: "jsError",
    AJAX: "ajaxError"
}, a = [ "project", "pageUrl", "resourceUrl", "category", "sec_category", "level", "timestamp", "content" ], o = [ "rowNum", "colNum" ].concat(a), s = function() {
    function s(e) {
        if (t(this, s), e) {
            for (var r in e) e.hasOwnProperty(r) && (this[r] = e[r]);
            this.parse(e);
        }
    }
    return e(s, [ {
        key: "parse",
        value: function() {
            this.category || (this.category = n.SCRIPT), this.level || (this.level = i.ERROR), 
            this.timestamp || (this.timestamp = Date.now()), this.sec_category || (this.sec_category = "default");
        }
    }, {
        key: "isEqual",
        value: function(t) {
            return this.sec_category === t.sec_category && this.resourceUrl === t.resourceUrl && this.content === t.content;
        }
    }, {
        key: "update",
        value: function(t) {
            for (var e in t) void 0 !== t[e] && -1 !== o.indexOf(e) && (this[e] = t[e]);
            return this;
        }
    }, {
        key: "updateTags",
        value: function(t) {
            var e = (0, r.extend)(this.tags || {}, t);
            return this.tags = e, this;
        }
    }, {
        key: "toJson",
        value: function() {
            var t = this, e = this.rowNum, i = this.colNum, o = {};
            return a.map(function(e) {
                void 0 !== t[e] && (o[e] = t[e]);
            }), o.category === n.SCRIPT && e && i && (o.dynamicMetric = {
                rowNum: e,
                colNum: i
            }), this.tags && (o.dynamicMetric = (0, r.extend)(o.dynamicMetric || {}, this.tags)), 
            o;
        }
    } ]), s;
}();

s.LEVEL = i, s.CATEGORY = n, exports.default = s;