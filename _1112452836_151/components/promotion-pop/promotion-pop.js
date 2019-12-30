var o = require("../../npm/@dp/sparrow/index.js"), e = require("../../config/index"), t = require("../../utils/lx_wrap"), i = require("../../public/logan"), a = {
    promotionMVBid: "b_yor84zoi",
    promotionOpenBid: "b_2na1jt27",
    promotionCloseBid: "b_zww0nyly"
};

Component({
    properties: {
        promotionData: {
            type: Object,
            value: {},
            observer: "_dataChange"
        },
        isSupportMiniPro: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        showModule: !1,
        proData: {}
    },
    methods: {
        _dataChange: function(o, e) {
            if (o && Object.keys(o).length) if (o.needReport) this._show(o), this._uploadAction(o.bizId, 3); else {
                var t = new Date(), i = o.dayTimes, a = {
                    popId: o.popId,
                    addtime: t.getTime()
                }, n = wx.getStorageSync("dp_index_popad");
                if (n && n.popId && o.popId === n.popId) {
                    var r = Math.floor((t.getTime() - n.addtime) / 864e5);
                    0 === i || r < i ? this.setData({
                        showModule: !1
                    }) : (wx.setStorage({
                        key: "dp_index_popad",
                        data: a
                    }), this._show(o));
                } else wx.setStorage({
                    key: "dp_index_popad",
                    data: a
                }), this._show(o);
            } else this.setData({
                showModule: !1
            });
        },
        _show: function(e) {
            var n = this;
            this.setData({
                showModule: !0,
                proData: Object.assign({
                    urlData: o.navigation.parse({
                        url: e.url
                    })
                }, e)
            }, function() {
                n.triggerEvent("noscroll");
            }), i.log("PopAd: 展示运营弹窗"), t.moduleView(a.promotionMVBid);
        },
        _openPromotion: function() {
            i.log("PopAd: 打开活动弹窗"), console.log("打开活动弹窗");
            var e = this.data.proData;
            if (e) {
                var n = e.url, r = e.urlData;
                this.data.isSupportMiniPro && r.appId || !n || o.navigation.navigateTo({
                    url: n
                });
            }
            t.moduleClick(a.promotionOpenBid), this.setData({
                showModule: !1
            }), this.triggerEvent("close"), e.needReport && this._uploadAction(e.bizId, 2);
        },
        _closePromotion: function() {
            i.log("PopAd: 关闭活动弹窗"), console.log("关闭活动弹窗"), t.moduleClick(a.promotionCloseBid), 
            this.setData({
                showModule: !1
            }), this.triggerEvent("close"), this.data.proData.needReport && this._uploadAction(this.data.proData.bizId, 1);
        },
        _uploadAction: function(t, i) {
            this._checkOpenId().then(function(a) {
                var n = {
                    type: i,
                    bizId: t || ""
                };
                a && (n.code = a);
                var r = {
                    url: e.DOMAIN + e.API.USER_ACTION_UPLOAD,
                    data: n
                };
                return o.request.custom(r);
            }).then(function(o) {
                o && 200 === o.statusCode && 200 === o.data.code ? console.log("上报弹窗行为成功") : console.log("上报弹窗行为失败：" + o.data.errorMsg);
            }).catch(function(o) {
                console.error("上报弹窗行为异常", o);
            });
        },
        _checkOpenId: function() {
            return new Promise(function(e) {
                o.login.getOpenIdCacheSync() ? e() : o.wxp.login().then(function(o) {
                    o.code ? e(o.code) : (e(), console.log("登录失败！" + o.errMsg));
                }).catch(function(o) {
                    e(), console.log("登录接口调用失败！" + o);
                });
            });
        }
    }
});