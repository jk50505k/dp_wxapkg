function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var s = 0; s < e.length; s++) {
            var r = e[s];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, r.key, r);
        }
    }
    return function(e, s, r) {
        return s && t(e.prototype, s), r && t(e, r), e;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var s = require("../util/util"), r = function() {
    function r(e) {
        t(this, r), this.cfgManager = e, this.tags = {}, this.kvs = {};
    }
    return e(r, [ {
        key: "setTags",
        value: function(t) {
            this.tags = Object.assign(this.tags, t);
        }
    }, {
        key: "getTags",
        value: function(t) {
            return t ? this.tags[t] : this.tags;
        }
    }, {
        key: "setMetric",
        value: function(t, e) {
            return "string" != typeof t ? console.log("metric名称必须是string类型") : "number" != typeof e ? console.log("metric值必须是number类型,当前为" + t + "-" + e) : (this.kvs[t] || (this.kvs[t] = []), 
            void this.kvs[t].push(e));
        }
    }, {
        key: "getMetric",
        value: function(t) {
            return t ? this.kvs[t] : this.kvs;
        }
    }, {
        key: "clearMetric",
        value: function() {
            this.kvs = {};
        }
    }, {
        key: "clearTags",
        value: function() {
            this.tags = {};
        }
    }, {
        key: "_rollbackMetric",
        value: function(t) {
            for (var e in t) t.hasOwnProperty(e) && (this.kvs[e] = t[e].concat(this.kvs[e] || []));
        }
    }, {
        key: "_rollbackTags",
        value: function(t) {
            this.tags = t || {};
        }
    }, {
        key: "report",
        value: function() {
            var t = this, e = this.cfgManager;
            try {
                if (!this.kvs || 0 === Object.keys(this.kvs).length) return;
                var r = {
                    kvs: this.kvs,
                    tags: this.tags,
                    ts: parseInt(+new Date() / 1e3)
                }, n = this.tags;
                this.clearTags();
                var i = e.getApiPath("metric");
                (0, s.requestQueue)({
                    url: i + "&p=" + e.config.project,
                    method: "POST",
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: "data=" + encodeURIComponent(JSON.stringify(r)),
                    fail: function() {
                        t._rollbackTags(n);
                    }
                });
            } catch (t) {
                console.log("metre report err");
            }
        }
    } ]), r;
}();

exports.default = r;