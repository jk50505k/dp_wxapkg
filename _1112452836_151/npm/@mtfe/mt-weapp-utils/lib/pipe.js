function e(e, t) {
    return function() {
        return t.call(this, e.apply(this, arguments));
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = function() {
    return [].slice.call(arguments).reduce(function(t, r) {
        return e(t, r);
    });
};