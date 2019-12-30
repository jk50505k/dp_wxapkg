Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.defaultReport = void 0;

var r = require("./importer"), e = function() {
    var t = (0, r.$import)("caster-report|common").catch(e);
    return e = function() {
        return t;
    }, t;
};

exports.defaultReport = function(r) {
    return e().then(function(e) {
        return e(r);
    });
};