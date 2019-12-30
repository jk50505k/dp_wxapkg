var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var o = arguments[t];
        for (var r in o) Object.prototype.hasOwnProperty.call(o, r) && (e[r] = o[r]);
    }
    return e;
}, t = require("../../public/login"), o = require("../../common/nav"), r = require("../../common/request"), i = require("../../config/index"), n = require("../../utils/lx_wrap"), a = require("../../public/logan"), s = getApp(), d = {
    DO_NOTE_LIKE: "/wxmapi/follow/switchIsSendFlower",
    DO_USER_FOLLOW: "/wxmapi/follow/addFollow",
    DO_USER_UNFOLLOW: "/wxmapi/follow/cancelAttention",
    DO_DELETE_NOTE: "/wxmapi/follow/deleteNote"
};

Component({
    options: {
        multipleSlots: !0
    },
    externalClasses: [ "my-class" ],
    data: {
        conWidth: 375
    },
    properties: {
        config: {
            type: Object,
            value: {}
        },
        carditem: {
            type: Object,
            value: {}
        },
        cardidx: {
            type: Number
        },
        pageType: {
            type: Number
        },
        cityId: {
            type: Number
        },
        isNearby: {
            value: !1,
            type: Boolean
        }
    },
    attached: function() {
        var e = 690 * wx.getSystemInfoSync().windowWidth / 375;
        this.setData({
            conWidth: e
        });
    },
    moved: function() {},
    detached: function() {},
    methods: {
        preventTap: function(e) {},
        addFollow: function(e) {
            var t = this.data.carditem, o = e.currentTarget.dataset.addFollow || !1, r = o ? i.DOMAIN + d.DO_USER_FOLLOW : i.DOMAIN + d.DO_USER_UNFOLLOW;
            if (t.user && t.user.userId) {
                var n = {
                    friendUserId: t.user.userId,
                    source: "SMP"
                };
                if (o) this.addFollowFn(e, r, n, o); else {
                    n = {
                        friendUserId: t.user.userId,
                        friendRelationType: 1
                    };
                    var a = this;
                    wx.showModal({
                        content: "确定不再关注TA吗？",
                        success: function(t) {
                            t.confirm && a.addFollowFn(e, r, n, o);
                        }
                    });
                }
            }
        },
        addFollowFn: function(e, o, i, n) {
            var s = this, d = this.data.carditem, l = this.data.pageType;
            t.ensure().then(function(e) {
                a.log("[card]addfollowloginensure:" + JSON.stringify(e)), r({
                    url: o,
                    data: i,
                    method: "GET"
                }).then(function(e) {
                    if ((e && e.data ? e.data : {}).result) {
                        n = n && 5 === l ? "temp" : n, d.user.isFollow = n;
                        var t = n ? "关注成功" : "取消关注成功";
                        wx.showToast({
                            icon: "none",
                            title: t,
                            duration: 3e3
                        }), s.triggerEvent("followuser", {
                            isFollow: n,
                            userId: d.user.userId
                        }), s.setData({
                            carditem: d
                        });
                    } else {
                        var o = n ? "关注失败，请稍后再试" : "取消关注失败，请稍后再试";
                        wx.showToast({
                            icon: "none",
                            title: o,
                            duration: 3e3
                        });
                    }
                }).catch(function(e) {
                    a.log("[card]addfollowerr:" + JSON.stringify(e));
                    var t = n ? "关注失败，请稍后再试" : "取消关注失败，请稍后再试";
                    wx.showToast({
                        icon: "none",
                        title: t,
                        duration: 3e3
                    });
                });
            }).catch(function(e) {
                wx.showToast({
                    icon: "none",
                    title: "登录失败，请稍后再试",
                    duration: 3e3
                }), a.log("[card]addfollowlogin err:" + JSON.stringify(e));
            });
        },
        doSendFlower: function() {
            var e = this;
            if (!this.isFlowering) {
                n.moduleView("b_nu733p6m"), this.isFlowering = !0;
                var o = this.data.carditem;
                t.ensure().then(function() {
                    s.getFigure().then(function(t) {
                        a.log("[card-" + o.noteId + "]doSendFlower: " + t), r({
                            url: i.DOMAIN + d.DO_NOTE_LIKE,
                            method: "POST",
                            header: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            data: {
                                cx: t,
                                bizType: o.bizType || "",
                                isSendFlower: !o.isSendFlower,
                                mainId: o.noteId,
                                originUserId: o.user ? o.user.userId : o.anonymous && o.anonymousUser && o.anonymousUser.userId ? o.anonymousUser.userId : ""
                            }
                        }).then(function(t) {
                            e.isFlowering = !1;
                            var r = t && t.data ? t.data : {}, i = r.loginUser || {};
                            if (r && r.result) {
                                if (o.flowerCount = o.flowerCount + (o.isSendFlower ? -1 : 1), o.isSendFlower = !o.isSendFlower, 
                                o.flowerUsers || (o.flowerUsers = []), o.isSendFlower) o.flowerUsers.unshift({
                                    userFace: i.userFace || "",
                                    userId: i.userId
                                }); else {
                                    for (var n = o.flowerUsers, a = 0; a < 3; a++) if (i.userId === n[a].userId) {
                                        n.splice(a, 1);
                                        break;
                                    }
                                    o.flowerUsers = n;
                                }
                                e.setData({
                                    carditem: o
                                });
                            } else wx.showToast({
                                icon: "none",
                                title: "点赞失败，请稍后再试",
                                duration: 3e3
                            });
                        }).catch(function(t) {
                            e.isFlowering = !1, a.log("[card-" + o.noteId + "]doSendFlower err: " + t);
                        });
                    }).catch(function() {
                        wx.showToast({
                            icon: "none",
                            title: "点赞失败，稍后再试",
                            duration: 3e3
                        });
                    });
                }).catch(function(e) {
                    wx.showToast({
                        icon: "none",
                        title: "登录失败，请稍后再试",
                        duration: 3e3
                    }), a.log("[card]doSendFlowerlogin err:" + JSON.stringify(e));
                });
            }
        },
        onPhotoTap: function(e) {
            var t = this.data.carditem.pics;
            if (t && t.length) {
                var o = t.map(function(e) {
                    return e.url;
                }), r = e.currentTarget.dataset.itemIndex;
                wx.previewImage({
                    current: o[r],
                    urls: o
                }), this.triggerEvent("cardpreview", {
                    cardidx: this.data.cardidx,
                    index: r
                });
            }
        },
        onVideoPreviewTap: function(e) {
            var t = this.data.carditem;
            t.video && t.video.url ? o({
                url: "/packages/video-preview/pages/index/index?video=" + t.video.url
            }) : wx.showToast({
                icon: "none",
                title: "预览失败，请稍后再试",
                duration: 3e3
            });
        },
        gotoShop: function(t) {
            var r = (this.data && this.data.carditem).target;
            if (n.moduleView("b_3y47vdqx"), r) if ("internal" === r.type) {
                var i = r.url;
                i && o({
                    url: i
                });
            } else {
                var a = r.externalInfo;
                wx.navigateToMiniProgram(e({}, a));
            }
            n.moduleClick("b_51hc4oo9");
        },
        gotoNote: function(e) {
            var t = this.data.carditem, r = t.noteId, i = t.bizType, a = e.currentTarget.dataset.comment;
            r && (n.moduleView("b_5u4ctkbr"), o({
                url: "/packages/notedetail/pages/index/index?noteId=" + r + "&bizType=" + i + (a ? "&comment=true" : "") + (this.data.isNearby ? "&isNearby=true" : "&cityId=" + this.data.cityId) + "&rMode=0&bType=" + i + "&fType=" + {
                    110: 29,
                    10: 1,
                    40: 3
                }[i + ""]
            }));
        },
        gotoUser: function() {
            var e = this.data.carditem.user, t = "/pages/mine-center/mine-center?userId=" + e.userId;
            if (4 !== this.data.pageType && e && e.userId) {
                if (5 === this.data.pageType) {
                    if (!this.data.config.gotoPersonal) return;
                    t = "/packages/user/pages/personal/personal?offuserId=" + e.userId;
                }
                o({
                    url: t
                });
            }
        }
    }
});