function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(t) {
    var r = {
        onError: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = this;
            e.default.trigger("ON_APP_ERROR", {
                context: o,
                options: t
            });
        },
        onLaunch: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = this;
            e.default.trigger("ON_APP_LAUNCH", {
                context: o,
                options: t
            });
        },
        onShow: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = this;
            e.default.trigger("ON_APP_SHOW", {
                context: o,
                options: t
            });
        },
        onHide: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = this;
            e.default.trigger("ON_APP_HIDE", {
                context: o,
                options: t
            });
        },
        onPageNotFound: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = this;
            e.default.trigger("ON_APP_PAGENOTFOUNd", {
                context: o,
                options: t
            });
        }
    };
    for (var i in t) !function(e) {
        if (r[e]) {
            var i = r[e], a = t[e];
            t[e] = function() {
                try {
                    i.apply(this, arguments), a.apply(this, arguments);
                } catch (i) {
                    var t = "小程序生命周期函数:" + e + "中js执行异常", r = i.stack || i.toString();
                    console.error(r), n.default.log(t + r), o.owl.error.addError(t, r);
                }
            }, delete r[e];
        }
    }(i);
    for (var i in r) t[i] = r[i];
    return t;
};

var e = t(require("../event/index")), o = require("../../owl-wxapp/es6/index.js"), n = t(require("../../logan-wxapp/build/wxlogan.js"));