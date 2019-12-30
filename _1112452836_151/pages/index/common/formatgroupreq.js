var e = require("../../../npm/@dp/sparrow/index.js");

module.exports = function() {
    var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, s = e.login.getDPUserSync(), n = wx.getSystemInfoSync(), o = {
        userid: s && s.userId || 0,
        version_name: "10.5.0",
        utm_medium: n && n.platform || "",
        userSys: "DP",
        platform: "dpapp",
        resource: "groupby",
        source: 1
    };
    return Object.assign(r, o);
};