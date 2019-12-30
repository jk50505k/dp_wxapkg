Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getCurrentPageUrl = function() {
    var e = getCurrentPages();
    return e[e.length - 1].route;
}, exports.getCurrentPageUrlWithArgs = function() {
    var e = getCurrentPages(), r = e[e.length - 1], t = r.route, n = r.options, u = t + "?";
    for (var g in n) u += g + "=" + n[g] + "&";
    return u = u.substring(0, u.length - 1);
};