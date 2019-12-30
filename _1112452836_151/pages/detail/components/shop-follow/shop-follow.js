var o = require("../../../../npm/@dp/sparrow/index.js"), t = require("../../../../npm/@dp/owl-wxapp/es6/index.js"), e = function(o) {
    return o && o.__esModule ? o : {
        default: o
    };
}(require("../../../../npm/@mtfe/wxapp-rohr/dist/rohr.js")), n = require("../../../../npm/@dp/logan-wxapp/build/wxlogan.js"), a = require("../../../../config/index"), i = {
    shareView: "b_lnejopkx",
    closeClick: "b_uee7sjdx",
    avatarClick: "b_2q9kowrb",
    followClick: "b_lyuhsq64",
    couponMVBid: "b_smb76xxv",
    couponMCBid: "b_u11p9cws",
    couponRuleMCBid: "b_65w6wp3v",
    myCenterMCBid: "b_8uclqnvt"
}, s = {
    PERSONAL_INFO: "/wxmapi/user/userinfo",
    FETCH_COUPONS: "/wxmapi/shop/couponlist",
    GET_COUPON: "/wxmapi/shop/getcoupon"
}, u = void 0;

Component({
    properties: {
        offuserid: {
            type: Number
        },
        moduleConfig: {
            type: Object,
            value: {}
        },
        shopOptions: {
            type: Object,
            observer: "_shopOptionsChange"
        },
        lxData: {
            type: Object,
            value: {}
        }
    },
    data: {
        userInfo: {},
        showFollow: !1,
        hasFollowed: 0
    },
    ready: function() {},
    methods: {
        _shopOptionsChange: function(t) {
            var e = this;
            if (t && t.offuserId) {
                var a = "ads_fenxiao" == t.adspro_name ? [ this.fetchRelationShip(t), this.fetchCouponList(t) ] : [ this.fetchRelationShip(t) ];
                try {
                    Promise.all(a).then(function(t) {
                        var a = t && t[0], s = t && t[1], u = a && a.data, l = s && s.data && s.data.couponData;
                        if (u && u.showFollow && l && l.showModule) e.dealCouponList(s), e.setData({
                            userInfo: u.userInfo,
                            hasFollowed: u.userInfo.isFriend ? 1 : 0,
                            showFollow: u.showFollow,
                            mutiType: !0,
                            noButton: !!u.userInfo.isme
                        }); else {
                            if (a && 200 === a.statusCode) {
                                if (200 === u.code && (e.setData({
                                    userInfo: u.userInfo,
                                    hasFollowed: u.userInfo.isFriend ? 1 : 0,
                                    showFollow: u.showFollow,
                                    mutiType: !1,
                                    noButton: !!u.userInfo.isme
                                }), u.showFollow)) {
                                    var r = o.lxmina.getLxData();
                                    o.lxmina.moduleView(i.shareView, r);
                                }
                            } else n.log("shopfollow statusCode error" + JSON.stringify(a));
                            e.dealCouponList(s);
                        }
                    });
                } catch (o) {
                    console.log(o), n.log("shopfollow error", o);
                }
            }
        },
        fetchCouponList: function(t) {
            var e = this, n = {}, a = t.shopId, i = t.shopUuid;
            i ? n.shopUuid = i : n.shopId = a, n.offuserId = this.data.shopOptions.offuserId || t.offuserId, 
            n.token = o.login.getTokenSync();
            var s = o.login.getOpenIdSync();
            return new Promise(function(t) {
                s ? (n.openId = s, e.getCouponList(n).then(function(o) {
                    return t(o);
                })) : o.login.getOpenId().then(function(o) {
                    n.openId = o && o.openId, e.getCouponList(n).then(function(o) {
                        return t(o);
                    });
                }), e.couponParams = n;
            });
        },
        dealCouponList: function(t) {
            if (t && 200 == t.data.code && t.data && t.data.couponData) {
                var e = t.data.couponData;
                if (this.setData({
                    couponData: e,
                    params: this.couponParams
                }), e.showModule) {
                    var a = Object.assign({}, this.data.shopOptions, this.data.lxData);
                    o.lxmina.moduleView(i.couponMVBid, a, Object.assign({}, {
                        shopType: e.shopType,
                        categoryId: e.categoryId
                    }));
                }
            } else n.log("couponList result: " + JSON.stringify(t));
        },
        fetchRelationShip: function(e) {
            if (e.offuserId) return new Promise(function(n) {
                o.login.tryHard().then(function() {
                    o.request.mina({
                        url: a.DOMAIN + a.API.PERSONAL_INFO,
                        data: {
                            offuserId: e.offuserId,
                            from: "detail"
                        }
                    }).then(function(o) {
                        n(o);
                    }).catch(function(o) {
                        n(), t.owl.error.addError("获取用户信息失败", o);
                    });
                });
            });
        },
        closeShare: function() {
            this.setData({
                showFollow: !1
            });
            var t = o.lxmina.getLxData();
            o.lxmina.moduleClick(i.closeClick, t);
        },
        followFriends: function(e) {
            var n = this, s = this;
            o.request.mina({
                url: a.DOMAIN + a.API.USER_FOLLOW,
                data: {
                    offuserId: this.data.offuserid,
                    follow: e
                }
            }).then(function(t) {
                if (t && t.data && 200 === t.statusCode) {
                    var a = t.data;
                    200 === a.code ? 0 === e ? (a.title && wx.showToast({
                        title: a.title,
                        icon: "none",
                        duration: 2e3
                    }), s.setData({
                        hasFollowed: 1
                    })) : (a.title && wx.showToast({
                        title: a.title,
                        icon: "none",
                        duration: 2e3
                    }), s.setData({
                        hasFollowed: 0
                    })) : 201 === a.code ? (s.setData({
                        noButton: !0
                    }), a.title && wx.showToast({
                        title: a.title,
                        icon: "none",
                        duration: 2e3
                    })) : 222 === a.code ? (a.title && wx.showToast({
                        title: a.title,
                        icon: "none",
                        duration: 2e3
                    }), s.setData({
                        hasFollowed: 1
                    })) : 223 === a.code ? (a.title && wx.showToast({
                        title: a.title,
                        icon: "none",
                        duration: 2e3
                    }), n.setData({
                        hasFollowed: 0
                    })) : 200 !== a.loginCode && (o.login.logout(), o.login.must().then(function() {
                        n.followFriends(e);
                    }));
                }
                var u = o.lxmina.getLxData();
                o.lxmina.moduleClick(i.followClick, u);
            }).catch(function(o) {
                wx.showToast({
                    title: "网络错误, 请刷新再试",
                    icon: "none"
                }), t.owl.error.addError("关注/取消关注用户失败", o);
            });
        },
        triggerFollow: function() {
            var o = this, t = this.data.hasFollowed;
            clearTimeout(u), t ? wx.showModal({
                content: "确定不再关注TA吗？",
                success: function() {
                    u = setTimeout(function() {
                        o.followFriends(t);
                    }, 1e3);
                }
            }) : u = setTimeout(function() {
                o.followFriends(t);
            }, 1e3);
        },
        seeItspage: function() {
            var t = this.data.offuserid;
            if (t) {
                o.navigation.navigateTo({
                    url: "/packages/user/pages/personal/personal?offuserId=" + t
                });
                var e = o.lxmina.getLxData();
                o.lxmina.moduleClick(i.avatarClick, e);
            } else wx.showToast({
                title: "获取id错误",
                icon: "none"
            });
        },
        _getDomain: function() {
            return a.DOMAIN.indexOf("51ping") > 0 ? "https://m.51ping.com" : "https://m.dianping.com";
        },
        ruleTap: function() {
            var t = this.data.couponData && this.data.couponData.rulePageUrl;
            t && o.navigation.navigateTo({
                url: t
            });
            var e = Object.assign({}, this.data.shopOptions, this.data.lxData);
            o.lxmina.moduleClick(i.couponRuleMCBid, e);
        },
        couponTap: function(t) {
            var e = this;
            this.flag = !0;
            var n = {}, a = t.currentTarget.dataset.type, i = t.currentTarget.dataset.index;
            n.couponType = a;
            var s = this.data.shopOptions, u = s.shopId, l = s.shopUuid;
            l ? n.shopUuid = l : n.shopId = u, Object.assign({}, this.data.shopOptions, this.data.lxData).index = i, 
            n.offuserId = this.data.shopOptions.offuserId;
            var r = o.login.getTokenSync();
            n.openId = o.login.getOpenIdSync(), getApp().getFigure().then(function(t) {
                n.cx = t, r ? (n.token = r, e.getCoupon(n, i)) : o.login.ensure().then(function(o) {
                    n.token = o.token, e.getCoupon(n, i);
                });
            });
        },
        getCouponList: function(t) {
            var e = this;
            return new Promise(function(a) {
                o.request.mina({
                    url: e._getDomain() + s.FETCH_COUPONS,
                    data: t,
                    method: "POST"
                }).then(function(o) {
                    a(o);
                }).catch(function(o) {
                    a(), n.log("getCouponList error: " + JSON.stringify(o) + "==" + JSON.stringify(t));
                });
            });
        },
        gotoMyCenter: function() {
            o.lxmina.moduleClick(i.myCenterMCBid, this.data.lxData), o.login.getDPUser().then(function(t) {
                if (t.userId) {
                    var e = "/packages/user/pages/personal/personal?userId=" + t.userId;
                    e && o.navigation.navigateTo({
                        url: e
                    });
                }
            });
        },
        getCoupon: function(t) {
            var a = this;
            this.flag && (this.flag = !1, t._token = encodeURIComponent(e.default.r(t)), o.request.mina({
                url: this._getDomain() + s.GET_COUPON,
                data: t,
                method: "POST"
            }).then(function(t) {
                if (a.flag = !0, t && 200 == t.data.code && t.data && t.data.couponIssue) {
                    var e = a.data.params;
                    e.token = o.login.getTokenSync() || o.login.getTokenCacheSync(), a.fetchCouponList(e).then(function(o) {
                        o && a.dealCouponList(o);
                    });
                    var s = Object.assign({}, a.data.lxData, {
                        coupon_id: t.data.couponIssue.couponId
                    });
                    o.lxmina.moduleClick(i.couponMCBid, s), a.setData({
                        couponIssue: t.data.couponIssue,
                        showModal: !0
                    }), setTimeout(function() {
                        a.setData({
                            showModal: !1
                        });
                    }, 1500);
                } else a.setData({
                    couponIssue: {
                        msg: "呜呜，领券失败"
                    },
                    showModal: !0
                }), o.lxmina.moduleClick(i.couponMCBid, Object.assign(a.data.lxData, {
                    coupon_id: "0"
                })), setTimeout(function() {
                    a.setData({
                        showModal: !1
                    });
                }, 1500);
                n.log("getCoupon result: " + JSON.stringify(t));
            }).catch(function(o) {
                a.flag = !0, n.log("getCoupon error: " + JSON.stringify(o) + "==" + JSON.stringify(t));
            }));
        }
    }
});