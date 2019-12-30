Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.prefixVerify = function(e, i) {
    var r = [], p = [];
    e.map(function(e) {
        e.prefix && r.push(e.prefix), e.unique && p.push(e.unique);
    });
    var n = r.some(function(e) {
        return i.indexOf(e) > -1;
    }), o = p.some(function(e) {
        return i === e;
    });
    if (!n && !o) {
        var t = [];
        return e.map(function(e) {
            var i = e.prefix;
            i && t.push(i);
        }), console.warn("当前" + i + "命名不规范或不存在，校验未通过,请确认是否为公共key或带有如下业务前缀: " + t.join(", ")), 
        !1;
    }
    return !0;
}, exports.prefList = [ {
    prefix: "dp_",
    description: "主包前缀"
}, {
    prefix: "rank_",
    description: "排行榜子包前缀"
}, {
    prefix: "_lx_",
    description: "灵犀打点前缀"
}, {
    prefix: "trip_",
    description: "景点门票子包前缀"
}, {
    prefix: "movie_",
    description: "猫眼电影子包前缀"
}, {
    prefix: "msdeal_",
    description: "到综团购子包前缀"
}, {
    prefix: "pin-wxapp_",
    description: "拼团子包前缀"
}, {
    prefix: "receivecoupon_",
    description: "运营活动子包前缀"
}, {
    prefix: "freefoods_",
    description: "免费菜子包前缀"
} ];