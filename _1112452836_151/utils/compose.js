module.exports = function() {
    for (var r = {}, o = void 0, t = arguments.length; t >= 0; t--) {
        o = arguments[t];
        for (var e in o) r[e] = o[e];
    }
    return r;
};