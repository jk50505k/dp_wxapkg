Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.compileRules = function(u) {
    return u.forEach(function(u) {
        u.query = u.query || u.selector.reduce(function(u, t) {
            return u === r.falseFunc ? u : e.RuleMatch[t.type] ? e.RuleMatch[t.type](u, t) : r.falseFunc;
        }, r.trueFunc);
    }), u;
};

var e = require("./general"), r = require("./util");