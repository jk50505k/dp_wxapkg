Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.inlineWxss = function(r, t) {
    var n = {};
    return (r = (0, e.compileRules)(r)).forEach(function(e) {
        !function r(t) {
            t.forEach(function(t) {
                t[2] && (e.query && e.query(t) && (n[t[3]] = e.cssText + (n[t[3]] || t[1].style || "")), 
                r(t[2]));
            });
        }(t);
    }), n;
};

var e = require("./compile");