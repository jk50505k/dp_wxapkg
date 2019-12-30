function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("./sliderSDK")), a = e(require("./sliderAPI")), i = require("./utils/config"), o = getApp();

Component({
    properties: {
        title: {
            type: String,
            value: "验证"
        },
        imgTitle: {
            type: String,
            value: "请输入图片中的内容"
        },
        imgButton: {
            type: String,
            value: "验证"
        }
    },
    data: {
        isShow: !1
    },
    attached: function() {
        console.log("attached");
    },
    moved: function() {
        console.log("moved");
    },
    detached: function() {
        console.log("detached");
    },
    ready: function() {
        console.log("ready");
    },
    methods: {
        showSlider: function(e) {
            var s = this, n = e.requestCode;
            i.rohr.i(i.rohrConfig.i), a.default.getPageData(n).then(function(e) {
                var a = new t.default({
                    requestCode: n,
                    pageData: e
                });
                o.$loginPage = s, s.setData({
                    sdk: a,
                    moveWidth: 0,
                    codeImage: "",
                    requestCode: n,
                    sliderCode: "",
                    isShow: !0,
                    validStep: "slider",
                    slideStatusClass: "",
                    animationData: {},
                    pageData: e
                });
            }).catch(function() {
                s.triggerEvent("sliderEvent", {
                    status: 0,
                    code: 99999
                }, {
                    bubbles: !0,
                    composed: !0
                });
            });
            var d = wx.createAnimation({
                transformOrigin: "50% 50%",
                duration: 500,
                timingFunction: "ease",
                delay: 0
            });
            this.animation = d;
        },
        sliderVerifySuccess: function(e) {
            var t = getApp().$loginPage, a = "";
            e && (a = e.response_code);
            var i = t.data.requestCode;
            wx.showToast({
                title: "验证成功",
                complete: function() {
                    t.setData({
                        isShow: !1
                    }), t.triggerEvent("sliderEvent", {
                        status: 1,
                        requestCode: i,
                        responseCode: a
                    }, {
                        bubbles: !0,
                        composed: !0
                    });
                }
            });
        },
        sliderTouchStart: function(e) {
            this.data.sdk.sliderTouchStart(e);
        },
        sliderTouchMove: function(e) {
            var t = this.data.sdk.sliderTouchMove(e), a = t.deltaX, i = "";
            t.isDone && (i = "slider-boxLoading"), this.setData({
                moveWidth: a,
                slideStatusClass: i
            });
        },
        sliderTouchEnd: function(e) {
            var t = this.data.sdk;
            t.isDone ? this.setData({
                slideStatusClass: "slider-boxLoading",
                isShow: !1
            }) : (t.sliderTouchEnd(e), this.setData({
                moveWidth: 0
            }));
        },
        sliderClose: function() {
            this.setData({
                isShow: !1
            }), this.triggerEvent("sliderEvent", {
                status: 0,
                code: 33333
            }, {
                bubbles: !0,
                composed: !0
            });
        },
        sliderValideCode: function(e) {
            var t = this, i = this, o = this.data, s = o.sliderCode, n = o.pageData, d = o.sdk.requestCode;
            a.default.verfiyCode({
                captchacode: s,
                action: n.action,
                id: 1,
                requestCode: d
            }).then(function(e) {
                var a = e.status, o = e.error, s = e.data;
                1 === a ? i.sliderVerifySuccess(s) : 0 === a && 121020 === o.code ? (wx.showToast({
                    title: o.message,
                    icon: "none"
                }), i.sliderUpdataCaptch()) : (wx.showToast({
                    title: o.message,
                    icon: "none",
                    duration: 2e3,
                    complete: function() {
                        i.triggerEvent("sliderEvent", {
                            status: 0,
                            code: o.code
                        }, {
                            bubbles: !0,
                            composed: !0
                        });
                    }
                }), t.setData({
                    sliderCode: "",
                    isShow: !1
                }));
            }, function() {
                i.triggerEvent("sliderEvent", {
                    status: 0,
                    code: 99999
                }, {
                    bubbles: !0,
                    composed: !0
                });
            });
        },
        sliderUpdataCaptch: function() {
            var e = this.data, t = e.pageData, a = e.sdk;
            this.setData({
                codeImage: i.YodaServer.getYodaServer().getServer() + "/v2/captcha?request_code=" + a.requestCode + "&action=" + t.action + "&captchaHash=" + Number(new Date()),
                sliderCode: "",
                isShow: !1
            });
        },
        sliderValideCodeInput: function(e) {
            var t = e.detail.value;
            this.setData({
                sliderCode: t
            });
        },
        bindSliderInputFocus: function(e) {
            var t = this.data.animationData;
            this.animation.top(200).step(), t = this.animation.export(), this.setData({
                animationData: t
            });
        },
        bingSliderInputBlur: function(e) {
            var t = this.data.animationData;
            this.animation.top(300).step(), t = this.animation.export(), this.setData({
                animationData: t
            });
        },
        onTapPage: function(e) {
            i.rohr.t(e);
        },
        onTouchMovePage: function(e) {
            i.rohr.m(e);
        }
    }
});