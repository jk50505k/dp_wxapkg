Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(t, a) {
    var e = -1, s = 3.141592653589793, i = t.latitude / 180 * s, n = t.longitude / 180 * s, r = a.latitude / 180 * s, u = a.longitude / 180 * s;
    if (0 !== r && 0 !== u && 0 !== i && 0 !== r) {
        var M = r - i, h = u - n, o = Math.sin(M / 2) * Math.sin(M / 2) + Math.cos(i) * Math.cos(r) * Math.sin(h / 2) * Math.sin(h / 2);
        e = 6371e3 * (2 * Math.atan2(Math.sqrt(o), Math.sqrt(1 - o)));
    }
    return e;
};