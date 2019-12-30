module.exports = function() {
    for (var r = {}, o = void 0, t = arguments.length, e = 0; e < t; e++) {
        o = arguments[e];
        for (var i in o) void 0 !== o[i] && (r[i] = o[i]);
    }
    return r;
};