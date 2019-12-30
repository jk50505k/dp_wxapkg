var e = require("../../../common/formatpicurl");

module.exports = function() {
    var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], o = [];
    return i && i.length && (o = i.map(function(i) {
        return {
            campaignId: i.campaiginId,
            dealId: i.dpGroupId,
            shopId: i.shopId,
            shopName: i.poiName,
            distance: n ? t(i.distance) : i.tradeName,
            image: e(i.image, {
                width: 136,
                height: 136,
                needProtocol: !0
            }),
            title: i.title,
            ptPrice: parseFloat(i.ptPrice),
            singlePrice: parseFloat(i.price),
            ptNumber: r(i.ptNumber) || i.ptNumber ? i.ptNumber + "人团" : "",
            ptOrderCount: r(i.ptOrderCount) || i.ptOrderCount ? "已拼" + i.ptOrderCount : "",
            discount: i.disCount ? i.disCount.replace(/\s+/g, "") : ""
        };
    })), o;
};

var t = function(e) {
    if (e < 0 && (e = 0 - e), !e) return "";
    return (e = parseInt(e)) <= 100 ? "<100m" : e < 1e3 ? e + "m" : e < 1e5 ? parseFloat(e / 1e3).toFixed(1) + "km" : ">100km";
}, r = function(e) {
    return 0 === e || 0 === e;
};