var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, a = require("../../npm/@dp/sparrow/index.js"), o = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../npm/@dp/logan-wxapp/build/wxlogan.js")), e = {
    coloseMCBid: "b_dianping_nova_zra9qt87_mc",
    gotoAppMCBid: "b_dianping_nova_bqp6fjqw_mc",
    noBtnMCBid: "b_dianping_nova_nrlckqxr_mc",
    popMVBid: "b_dianping_nova_8b7tmpt1_mv",
    sideMVBid: "b_dianping_nova_8b7tmpt1_mv",
    sideMCBid: "b_dianping_nova_8r7tvr48_mc"
};

Component({
    properties: {
        lxData: {
            type: Object
        },
        gotoApp: {
            type: Boolean,
            observer: "_gotoAppChange"
        },
        cardData: {
            type: Object,
            observer: "_cardDataChange"
        }
    },
    methods: {
        _gotoAppChange: function(t, o) {
            if (t) {
                var i = this.needShowPop();
                this.triggerEvent("showpop", {
                    showPop: i
                }), i && a.lxmina.moduleView(e.popMVBid, this.data.lxData);
            }
        },
        _cardDataChange: function(o) {
            if (o && o.popData && o.cardData) {
                this.lxData = Object.assign({}, this.data.lxData, o.cardData.valLab || {});
                var i = this.dealPopData(this.data.cardData.popData);
                Date.now() > 1577807999e3 && (i.side = null), this.setData({
                    showPop: o.showPop,
                    popData: i,
                    _cardData: "object" == t(this.data.cardData.cardData) ? JSON.stringify(this.data.cardData.cardData) : this.data.cardData.cardData
                }), o.showPop && a.lxmina.moduleView(e.popMVBid, this.lxData), o.popData.side && a.lxmina.moduleView(e.sideMVBid, this.lxData);
            }
        },
        handleContact: function(t) {
            console.log("abtest 携带card信息", this.data._cardData), this.setData({
                showPop: !1
            }), a.lxmina.moduleClick(e.gotoAppMCBid, this.lxData), o.default.log("gotoContact, path: " + JSON.stringify(t.path));
        },
        dealPopData: function(t) {
            var a = t.title, o = t.subtitle;
            return "string" == typeof a && (a = [ {
                text: a
            } ]), "string" == typeof o && (o = {
                text: o
            }), t.title = a, t.subtitle = o, t.img = t.img || "https://p0.meituan.net/scarlett/dfeb53c2b0902113fc200fa000f8e6a2826711.gif", 
            t.shareImg = t.shareImg || "https://p0.meituan.net/scarlett/49a0fd8564ca1dc8b02f3690b2be6bd212606.png", 
            t;
        },
        close: function() {
            a.lxmina.moduleClick(e.coloseMCBid, this.lxData), this.setData({
                showPop: !1
            }), o.default.log("Custom-Card close");
        },
        refuseTap: function() {
            var t = this.data.popData;
            if (a.lxmina.moduleClick(e.noBtnMCBid, this.lxData), t && t.silentTime) {
                this.triggerEvent("showpop", {
                    showPop: !1,
                    gotoMina: !0
                });
                var o = Date.now();
                this.setData({
                    showPop: !1
                }), a.cache.setStorage("dp_contact_card_day", {
                    hasRefused: !0,
                    addTime: o
                });
            }
        },
        openPop: function() {
            this.setData({
                showPop: !0
            }), a.lxmina.moduleView(e.popMVBid, this.lxData), a.lxmina.moduleClick(e.sideMCBid, this.lxData);
        },
        needShowPop: function() {
            var t = !0, o = a.cache.getStorageSync("dp_contact_card_day");
            return o && o.hasRefused && o.addTime && Math.floor((Date.now() - o.addTime) / 1728e5) < 1 && (t = !1), 
            console.log("是否出弹窗", t), t;
        }
    }
});