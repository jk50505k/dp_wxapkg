function e(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

var r = function() {
    function e(e, r) {
        for (var i = 0; i < r.length; i++) {
            var t = r[i];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(e, t.key, t);
        }
    }
    return function(r, i, t) {
        return i && e(r.prototype, i), t && e(r, t), r;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = require("../npm/@dp/sparrow/index.js"), t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../npm/@dp/logan-wxapp/build/wxlogan.js")), n = require("../config/index"), s = function() {
    function s() {
        e(this, s), this.idPromises = {}, this.shopIdDTOs = {};
    }
    return r(s, [ {
        key: "isUuid",
        value: function(e) {
            return "string" == typeof e && /[0-9a-zA-Z]{16}/.test(e);
        }
    }, {
        key: "checkUrlUuid",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", r = arguments[1], t = !1, n = i.url.parse(e), s = n.uri, u = n.query, o = void 0 === u ? {} : u, a = n.hash, d = o && (o[r] || o.id || o.shopid);
            return this.isUuid(d) && (t = !0), {
                hasUuid: t,
                uri: s,
                query: o,
                hash: a
            };
        }
    }, {
        key: "transferShopId",
        value: function(e, r, t) {
            var n = this, s = this.checkUrlUuid(e), u = s.hasUuid, o = s.uri, a = s.query, d = s.hash, h = a && (a[t] || a.id || a.shopid);
            if (u && h) {
                var l = this.shopIdDTOs["" + h];
                return l ? (a = this.dealQuery(a, l), Promise.resolve(i.url.stringify(o, a, d))) : (this.idPromises["" + h] || (this.idPromises["" + h] = new Promise(function(e) {
                    n.shopIdPromise(h, r).then(function(r) {
                        a = n.dealQuery(a, r), n.shopIdDTOs["" + r] = r, e(i.url.stringify(o, a, d));
                    });
                })), this.idPromises["" + h]);
            }
            return Promise.resolve(e);
        }
    }, {
        key: "shopIdPromise",
        value: function(e, r) {
            return new Promise(function(s) {
                return i.request.mina({
                    url: n.DOMAIN + n.API.SHOP_ID,
                    data: {
                        shopuuid: e,
                        source: r
                    }
                }).then(function(r) {
                    s(r && r.data && r.data.shopId ? r.data.shopId : e);
                }).catch(function(r) {
                    t.default.log("shopIdPromise error:", r), s(e);
                });
            });
        }
    }, {
        key: "dealQuery",
        value: function(e, r) {
            return this.tag ? e[this.tag] = r : (e.id = r, e.shopid = r), e;
        }
    } ]), s;
}();

exports.default = new s();