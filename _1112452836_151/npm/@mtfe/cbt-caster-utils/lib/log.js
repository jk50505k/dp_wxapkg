Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = exports.metaLog = [];

exports.log = function(n, r) {
    return function() {
        var t = arguments, o = r.apply(this, arguments), u = function(r) {
            return e.push(n + "[url: " + t[0].url + "][hash: " + (r && r.hash || "-") + "]");
        };
        return o && o.then ? o.then(u) : u(o), o;
    };
};

wx.onMemoryWarning && wx.onMemoryWarning(function(n) {
    e.push("[Warning]memory warning, level: " + n.level || "-"), e.splice(0, e.length - 50);
});