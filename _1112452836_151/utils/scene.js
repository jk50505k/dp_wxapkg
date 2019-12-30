var t = require("./query"), u = {
    u_s: "utm_source",
    u_t: "utm_term",
    u_m: "utm_media",
    u_ct: "utm_content",
    u_cp: "utm_campaign"
};

module.exports = {
    parse: function(e) {
        if (void 0 !== e && "" !== e) {
            var r = void 0;
            try {
                r = t(decodeURIComponent(e));
            } catch (t) {
                r = {};
            }
            for (var m in r) u[m] && (r[u[m]] = r[m]);
            return r;
        }
    }
};