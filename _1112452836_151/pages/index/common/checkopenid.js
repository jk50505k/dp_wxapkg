var n = require("../../../npm/@dp/sparrow/index.js"), e = require("../../../npm/@dp/logan-wxapp/build/wxlogan.js"), o = null;

module.exports = function() {
    if (o) return o;
    var i = new Promise(function(o) {
        n.login.getOpenIdSync() || n.login.getOpenIdCacheSync() ? o() : n.login.getOpenId().then(function(i) {
            i && 200 === i.code ? o() : (e.log("首页获取openId失败===>" + JSON.stringify(i)), n.wxp.login().then(function(n) {
                n.code ? o(n.code) : (o(), e.log("首页微信登录失败===>" + n.errMsg));
            }).catch(function(n) {
                o(), e.log("首页微信登录接口调用失败===>" + JSON.stringify(n));
            }));
        });
    });
    return o = i;
};