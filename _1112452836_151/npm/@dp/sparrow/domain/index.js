function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../env/index")), i = function() {
    function i(t) {
        e(this, i), this.domains = {}, this.add(t);
    }
    return t(i, [ {
        key: "add",
        value: function(e) {
            var t = this;
            e && (e instanceof Array || (e = [ e ]), e.map(function(e) {
                if (t.domains[e.key]) {
                    var n = t.domains[e.key];
                    console.warn("域名" + e.key + "已经被" + n.product + "使用");
                } else t.domains[e.key] = {
                    product: e.product,
                    test: e.test
                };
            }));
        }
    }, {
        key: "get",
        value: function(e) {
            if (this.domains[e]) return "test" === n.default.get() && this.domains[e].test ? this.domains[e].test : this.domains[e].product;
        }
    }, {
        key: "findTestDomain",
        value: function(e) {
            for (var t in this.domains) {
                var n = this.domains(t);
                if (n.product === e) return n.test;
            }
        }
    } ]), i;
}();

exports.default = new i();