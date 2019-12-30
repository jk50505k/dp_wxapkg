Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../env"), o = void 0, l = !1, r = {
    queue: [],
    ready: function() {
        var r = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        try {
            var g = t.LoganAPI, n = t.project, u = t.loganConfig;
            l = !0;
            g ? (o = g, function() {
                for (u && (o = o.config(u)), o.log("[新小程序项目]：项目-> " + n + " 对应页面-> " + (0, e.getPageUrl)()); r.queue.length; ) {
                    var l = r.queue.shift();
                    o.log(l);
                }
            }()) : console.log("当前暂不支持log");
        } catch (e) {
            console.log("logan ready err");
        }
    },
    log: function(e) {
        arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        if (l) try {
            o ? o.log(e, "owl") : this.queue.push(e);
        } catch (e) {
            console.log("logan log err");
        }
    }
};

exports.default = r;