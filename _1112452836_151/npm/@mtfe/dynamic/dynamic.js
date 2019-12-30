var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./config")), t = require("../cbt-caster-utils/lib/init.js"), r = require("./tags"), i = r.tags, u = r.evs;

Component((0, t.getDynamicCompOpt)(e.default, {
    tags: i,
    evs: u,
    require: require
}));