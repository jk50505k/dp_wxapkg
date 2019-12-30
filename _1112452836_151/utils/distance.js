module.exports = function(t, a) {
    var i = -1, s = 3.141592653589793, n = t.latitude / 180 * s, e = t.longitude / 180 * s, h = a.latitude / 180 * s, M = a.longitude / 180 * s;
    if (0 !== h && 0 !== M && 0 !== n && 0 !== h) {
        var r = h - n, u = M - e, o = Math.sin(r / 2) * Math.sin(r / 2) + Math.cos(n) * Math.cos(h) * Math.sin(u / 2) * Math.sin(u / 2);
        i = 6371e3 * (2 * Math.atan2(Math.sqrt(o), Math.sqrt(1 - o)));
    }
    return i;
};