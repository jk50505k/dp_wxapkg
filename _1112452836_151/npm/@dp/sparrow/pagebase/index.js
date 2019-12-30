function o(o) {
    return o && o.__esModule ? o : {
        default: o
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(o) {
    var r = {
        onLoad: function() {
            var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = this;
            t.default.trigger("onLoad", {
                context: e,
                option: o
            });
        },
        onReady: function() {
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        },
        onShow: function() {
            var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = this;
            t.default.trigger("onShow", {
                context: e,
                option: o
            });
        },
        onHide: function() {
            var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = this;
            t.default.trigger("onHide", {
                context: e,
                option: o
            });
        },
        onUnload: function() {
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        }
    };
    for (var i in o) !function(t) {
        if (r[t]) {
            var i = r[t], a = o[t];
            o[t] = function() {
                try {
                    i.apply(this, arguments), a.apply(this, arguments);
                } catch (i) {
                    var o = "页面生命周期函数:" + t + "中js执行异常", r = i.stack || i.toString();
                    console.error(r), n.default.log(o + r), e.owl.error.addError(o, r);
                }
            }, delete r[t];
        }
    }(i);
    for (var i in r) o[i] = r[i];
    return o;
};

var t = o(require("../event/index")), e = require("../../owl-wxapp/es6/index.js"), n = o(require("../../logan-wxapp/build/wxlogan.js"));