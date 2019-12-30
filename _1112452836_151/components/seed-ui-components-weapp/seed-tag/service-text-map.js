function e(e, E, r) {
    return E in e ? Object.defineProperty(e, E, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[E] = r, e;
}

var E;

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = function(e) {
    if (e && e.__esModule) return e;
    var E = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (E[r] = e[r]);
    return E.default = e, E;
}(require("./services.js"));

exports.default = (E = {}, e(E, r.BUY, null), e(E, r.GROUP_PURCHASE, "团"), e(E, r.CASH_BACK, "返"), 
e(E, r.COUPON, "券"), e(E, r.PAYMENT, "付"), e(E, r.TICKET, "票"), e(E, r.REDUCE, "减"), 
e(E, r.GIFT, "礼"), e(E, r.TOUR, "游"), e(E, r.RENT, "租"), e(E, r.ACTIVITY, "活动"), 
e(E, r.NEW, "新"), e(E, r.SALE, "促"), e(E, r.SELL, "售"), e(E, r.BANK_CARD, "银"), 
e(E, r.PRICE, "价"), e(E, r.VOUCHER, "抵"), e(E, r.PACKAGE, "套餐"), e(E, r.SMART, "智"), 
e(E, r.BOOKING, "订"), e(E, r.TICKET2, "票"), e(E, r.HOME, "家"), e(E, r.ENDORSEMENT, "签"), 
e(E, r.SEAT, "座"), e(E, r.PHOTO, "照"), e(E, r.CERTIFICATE, "证"), e(E, r.CARD, "卡"), 
e(E, r.NUMBER, "号"), e(E, r.COURSE, "课"), e(E, r.TAKEAWAY, "外"), e(E, r.ORDER, "点"), 
e(E, r.QUEUE, "排"), e(E, r.PIECE, "拼"), e(E, r.STYLE, "款"), e(E, r.WEDDING_RECEPTION, "宴"), 
e(E, r.SUNSHINE_RESTAURANT, null), E);