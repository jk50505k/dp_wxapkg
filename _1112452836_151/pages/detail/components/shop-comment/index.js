var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var o = arguments[t];
        for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (e[a] = o[a]);
    }
    return e;
}, t = require("../../../../npm/@dp/sparrow/index.js"), o = require("../../../../npm/@dp/owl-wxapp/es6/index.js"), a = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../utils/access_token")), i = require("../../../../utils/crypto"), n = require("../../../../config/index"), s = require("../../../../npm/@dp/logan-wxapp/build/wxlogan.js"), r = require("../../../../common/request"), d = {
    FAVORITE_SHOP: "/wxmapi/favorite/favorite",
    REMOVE_FAVORITE: "/wxmapi/favorite/remove",
    SHOP_IM: "/wxmapi/shop/shopim",
    IMPORT_DATA: "/wxmapi/recommend/importdata"
}, p = {
    writeCommentBid: "b_kqkc0qtz",
    favorBid: "b_p28sod8l",
    unFavorBid: "b_epsdh96o",
    imBid: "b_idgiqluy",
    momentClick: "b_ng1kujrn",
    shareClick: "b_w8dj8v5s",
    sharePanelView: "b_uudr4u1y",
    shareToFriendsClick: "b_qfdt8sn0",
    shareToGoodsClick: "b_dianping_nova_a7kswmkf_mc"
};

Component({
    properties: {
        shopOptions: {
            type: Object,
            value: {},
            observer: "_OptionsChange"
        },
        moduleConfig: {
            type: Object,
            value: {}
        },
        imData: {
            type: Object,
            value: {},
            observer: "_imDataChange"
        },
        lxData: {
            type: Object
        },
        isFavorite: {
            type: Boolean
        },
        categoryId: {
            type: Number
        },
        reviewCount: {
            type: Number
        },
        shopName: {
            type: String
        },
        shopType: {
            type: Number
        },
        branchName: {
            type: String
        },
        shopPic: {
            type: Array
        },
        shopGeo: {
            type: Object
        }
    },
    data: {
        showModule: 0,
        supportGoods: !1,
        showPopTip: !1
    },
    ready: function() {
        var e = t.cache.getStorageSync("dp_shop_pop") || !1;
        this.setData({
            showDyBook: !0,
            dyShopInfo: JSON.stringify({
                dyLxData: Object.assign({}, this.data.lxData),
                dyLoadOptions: Object.assign({}, this.data.shopOptions),
                moduleNums: this.data.moduleConfig.moduleNums
            }),
            supportGoods: !!wx.openBusinessView,
            showPopTip: !e
        }), e || t.cache.setStorage("dp_shop_pop", !0);
    },
    methods: {
        _OptionsChange: function(e) {
            if (e) {
                var o = void 0, a = e.shopUuid, i = e.shopId, n = {
                    appId: "wxd2dc491d7e28fe28",
                    path: o = a ? "pages/index/index?shopUuid=" + a + "&utm_source=dianping-wxapp&from=" + e.utm_source : "pages/index/index?shopId=" + i + "&utm_source=dianping-wxapp&from=" + e.utm_source,
                    extraData: {
                        referType: "0",
                        referId: "0",
                        source: "dianping-wxapp"
                    }
                }, s = wx.getSystemInfoSync().SDKVersion, r = !0;
                -1 === t.semver.compare(s, "2.0.7") && (r = !1), this.setData({
                    miniData: n,
                    isNewNav: r
                });
            }
        },
        gotoCommentWxApp: function() {
            if (this.data.isNewNav) t.lxmina.moduleClick(p.writeCommentBid); else {
                var e = void 0, o = this.data.shopOptions, a = o.shopUuid, i = o.shopId;
                e = a ? "pages/index/index?shopUuid=" + a + "&utm_source=dianping-wxapp" : "pages/index/index?shopId=" + i + "&utm_source=dianping-wxapp", 
                t.lxmina.moduleClick(p.writeCommentBid), wx.navigateToMiniProgram && t.wxp.navigateToMiniProgram({
                    appId: "wxd2dc491d7e28fe28",
                    path: e,
                    extraData: {
                        referType: "0",
                        referId: "0",
                        source: "dianping-wxapp"
                    }
                }).then(function() {
                    console.log("跳转到写点评小程序成功");
                }, function(e) {
                    console.log("跳转到写点评小程序失败", e);
                }).catch(function(e) {
                    console.log("跳转失败：" + e);
                });
            }
        },
        _imDataChange: function(e) {
            if (e) {
                var t = wx.getSystemInfoSync() || {}, o = !1;
                if (t.model && -1 != t.model.indexOf("iPhone X") && (o = !0), e.hasIM) {
                    var a = this.data.moduleConfig;
                    a.moduleNums = a.moduleNums + 1, this.setData({
                        showModule: 1,
                        imData: e,
                        isIpx: o,
                        moduleConfig: a
                    });
                } else this.setData({
                    showModule: 1,
                    isIpx: o
                });
            }
        },
        triggerFavor: function() {
            var e = this, o = this.data.preventFavorite, a = this.data.shopOptions && (this.data.shopOptions.shopUuid || this.data.shopOptions.shopId), i = getApp().getCity(), n = i && i.cityId, s = getApp().getToken();
            !o && a && (this.setData({
                preventFavorite: !0
            }), s ? this.favorShop(a, n, this.data.isFavorite) : t.login.ensure().then(function() {
                e.favorShop(a, n, e.data.isFavorite);
            }));
        },
        favorShop: function(e, a, i) {
            var n = this;
            i ? r({
                url: this._getDomain() + d.REMOVE_FAVORITE,
                data: {
                    cityId: a,
                    shopUuid: e
                }
            }).then(function(a) {
                s.log("detail unfavorite resCode: " + (a && a.data && a.data.code).toString()), 
                a && a.data && 200 == a.data.code ? (wx.showToast({
                    title: "取消收藏成功",
                    icon: "none"
                }), n.setData({
                    isFavorite: !1,
                    preventFavorite: !1
                })) : a && a.data && 100 == a.data.loginCode ? (t.login.logout(), t.login.must().then(function(e) {
                    e && 200 == e.code ? (n.setData({
                        preventFavorite: !1
                    }), n.triggerFavor()) : n.setData({
                        preventFavorite: !1
                    });
                })) : (wx.showToast({
                    title: "取消收藏失败",
                    icon: "none"
                }), n.setData({
                    preventFavorite: !1
                }), o.owl.error.addError("detail page => unfavorite shop error: ", a)), t.lxmina.moduleClick(p.unFavorBid, {
                    shop_id: e
                });
            }).catch(function(e) {
                wx.showToast({
                    title: "取消收藏失败",
                    icon: "none"
                }), n.setData({
                    preventFavorite: !1
                }), o.owl.error.addError("detail page => remove favorite shop error: ", e);
            }) : r({
                url: this._getDomain() + d.FAVORITE_SHOP,
                data: {
                    cityId: a,
                    shopUuid: e
                }
            }).then(function(a) {
                s.log("detail favorite resCode: " + (a && a.data && a.data.code).toString()), a && a.data && 200 == a.data.code ? (wx.showToast({
                    title: "收藏店铺成功",
                    icon: "none"
                }), n.setData({
                    isFavorite: !0,
                    preventFavorite: !1
                }), t.lxmina.moduleClick(p.favorBid, {
                    shop_id: e
                })) : a && a.data && 100 == a.data.loginCode ? (t.login.logout(), t.login.must().then(function(e) {
                    e && 200 == e.code ? (n.setData({
                        preventFavorite: !1
                    }), n.triggerFavor()) : n.setData({
                        preventFavorite: !1
                    });
                })) : (wx.showToast({
                    title: "收藏店铺失败",
                    icon: "none"
                }), n.setData({
                    preventFavorite: !1
                }), o.owl.error.addError("detail page => favorite shop error: ", a));
            }).catch(function(e) {
                wx.showToast({
                    title: "收藏店铺失败",
                    icon: "none"
                }), n.setData({
                    preventFavorite: !1
                }), s.log("detail favorite resCode: " + JSON.stringify(e)), o.owl.error.addError("detail page => favorite shop error: ", e);
            });
        },
        formSubmit: function(e) {
            var o = this;
            if (!this.data.preventIM) {
                this.setData({
                    preventIM: !0
                });
                var a = {}, i = e.detail.formId, n = this.data.shopOptions, s = n.shopUuid, r = n.shopId;
                a.formId = i, s ? a.shopUuid = s : a.shopId = r;
                var d = t.login.getTokenSync();
                d ? (a.token = d, this.fetchIM(a)) : t.login.ensure().then(function() {
                    o.fetchIM(a);
                }), t.lxmina.moduleClick(p.imBid, {
                    poi_id: this.data.shopUuid || this.data.shopId
                });
            }
        },
        fetchIM: function(e) {
            var o = this;
            r({
                url: this._getDomain() + d.SHOP_IM,
                data: e
            }).then(function(e) {
                if (s.log("detail im resCode: " + (e && e.data && e.data.code).toString()), e && e.data && 200 == e.data.code) {
                    o.setData({
                        preventIM: !1
                    });
                    var a = e.data.redirectUrl;
                    a ? t.navigation.navigateTo({
                        url: a
                    }) : e && e.data && 100 == e.data.loginCode ? (t.login.logout(), t.login.must()) : (wx.showToast({
                        title: "咨询服务失败",
                        icon: "none"
                    }), o.setData({
                        preventIM: !1
                    }));
                }
            }).catch(function(e) {
                wx.showToast({
                    title: "咨询服务失败",
                    icon: "none"
                }), o.setData({
                    preventIM: !1
                }), s.log("detail shopim resCode: " + JSON.stringify(e));
            });
        },
        promptMask: function() {
            this.tiggerEvent("promptMask");
        },
        hideMask: function() {
            this.triggerEvent("hideMask");
        },
        _getDomain: function() {
            return n.DOMAIN.indexOf("51ping") > 0 ? "https://m.51ping.com" : "https://m.dianping.com";
        },
        triggerSharePanel: function() {
            var e = t.lxmina.getLxData();
            this.data.showSharePanel || t.lxmina.moduleView(p.sharePanelView, e), t.lxmina.moduleClick(p.shareClick, e), 
            this.setData({
                showSharePanel: !this.data.showSharePanel
            });
        },
        navToShare: function() {
            var e = this.data.shopOptions && (this.data.shopOptions.shopId || this.data.shopOptions.shopUuid), o = t.lxmina.getLxData();
            this.setData({
                showSharePanel: !1
            }), t.lxmina.moduleClick(p.momentClick, o), t.navigation.navigateTo({
                url: "/packages/share/pages/share/share?shopUuid=" + e + "&reviewCount=" + this.data.reviewCount
            });
        },
        shareFriends: function() {
            var o = t.lxmina.getLxData();
            t.lxmina.moduleClick(p.shareToFriendsClick, e({}, o, {
                from: "share_panel"
            })), this.setData({
                showSharePanel: !this.data.showSharePanel
            });
        },
        closePopTip: function() {
            this.setData({
                showPopTip: !1
            });
        },
        shareToGoods: function() {
            var e = this, n = this.data, h = n.shopOptions, l = n.shopName, u = n.shopType, c = n.branchName, m = n.shopPic, g = n.shopGeo;
            h = h || {}, l = l || "", c = c || "", m = m || [];
            var v = h.shopId || h.shopUuid || "", f = "pages/detail/detail";
            h.shopId ? f += "?shopId=" + v : h.shopUuid && (f += "?shopUuid=" + v);
            var w = (0, i.encrypt)(v), x = c ? l + "(" + c + ")" : l, _ = m.length > 5 ? m.slice(0, 5) : m;
            _.length > 1 && (_ = _.map(function(e) {
                return e.url || e.thumbUrl;
            })), _ = _.filter(function(e) {
                return !!e;
            }).map(function(e) {
                return 0 === e.indexOf("http://") ? e.replace("http://", "https://") : e;
            });
            var D = {
                sku_id: l,
                price: 0,
                status: 1
            };
            g && g.lng && (D.poi_list = [ {
                longitude: g.lng,
                latitude: g.lat,
                radius: 100,
                business_name: l
            } ]);
            var y = {
                item_code: w,
                title: x,
                category_list: [ u ],
                image_list: _,
                src_wxapp_path: f,
                sku_list: [ D ]
            };
            (0, a.default)().then(function(t) {
                return r({
                    url: e._getDomain() + d.IMPORT_DATA,
                    method: "POST",
                    data: {
                        accessToken: t,
                        product: y
                    }
                });
            }).then(function(e) {
                e && 200 === e.statusCode && e.data && 200 === e.data.code && 0 === e.data.data.errcode ? wx.openBusinessView({
                    businessType: "friendGoodsRecommend",
                    extraData: {
                        product: {
                            item_code: w,
                            title: x,
                            image_list: _
                        }
                    },
                    success: function(e) {
                        console.log("openBusinessView success", e);
                    },
                    fail: function(e) {
                        console.log("openBusinessView fail", e), s.log("openBusinessView fail: " + JSON.stringify(e)), 
                        o.owl.error.addError("openBusinessView fail: ", e);
                    }
                }) : (s.log("import product error: " + JSON.stringify(e)), o.owl.error.addError("import product error: ", e));
            }).catch(function(e) {
                s.log("shareToGoods error: " + JSON.stringify(e)), o.owl.error.addError("shareToGoods error: ", e);
            });
            var O = t.lxmina.getLxData();
            t.lxmina.moduleClick(p.shareToGoodsClick, O);
        }
    }
});