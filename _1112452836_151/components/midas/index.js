var t = require("./event.js"), a = require("./emitter.js"), e = require("./enum.js");

Component({
    externalClasses: [ "midas" ],
    properties: {
        env: {
            type: String,
            value: e.ENV.PRODUCT
        },
        serverType: {
            type: String,
            value: e.SERVER_TYPE.DIANPING
        },
        ishttps: {
            type: Boolean,
            value: !0
        },
        sendLoadPoint: {
            type: Boolean,
            value: !1
        },
        sendReachPoint: {
            type: Boolean,
            value: !1
        },
        adidx: {
            type: String,
            value: ""
        },
        feedback: {
            type: String,
            value: ""
        },
        extra: {
            type: String,
            value: ""
        },
        callbackParams: {
            type: String,
            value: ""
        },
        jumpLink: {
            type: String,
            value: ""
        },
        paddingTop: {
            type: String,
            value: ""
        },
        paddingRight: {
            type: String,
            value: ""
        },
        paddingBottom: {
            type: String,
            value: ""
        },
        paddingLeft: {
            type: String,
            value: ""
        }
    },
    data: {},
    methods: {
        onClick: function() {
            var t = this, e = function() {
                t.triggerEvent("clickend", t.data.callbackParams), t.data.jumpLink && wx.navigateTo({
                    url: t.data.jumpLink,
                    success: function() {
                        t.data.sendReachPoint && a.sendReachPoint(t.data.feedback, t.data.adidx, t.data.extra, t.data);
                    },
                    fail: function(e) {
                        e && e.errMsg && (e.errMsg.indexOf("webview count limit exceed") > -1 || e.errMsg.indexOf("page limit") > -1) && wx.redirectTo({
                            url: t.data.jumpLink,
                            success: function() {
                                t.data.sendReachPoint && a.sendReachPoint(t.data.feedback, t.data.adidx, t.data.extra, t.data);
                            }
                        });
                    }
                });
            };
            a.sendClickPoint(this.data.feedback, this.data.adidx, this.data.extra, t.data).then(e).catch(e);
        }
    },
    created: function() {
        this.isSendImpression = !1;
    },
    attached: function() {},
    ready: function() {
        var e = this;
        this.data.sendLoadPoint && a.sendLoadPoint(this.data.feedback, this.data.adidx, this.data.extra, e.data);
        var i = e.createSelectorQuery();
        i.selectViewport().fields({
            size: !0
        });
        var d = i.select(".midas-wraper").boundingClientRect(), n = this.data.paddingTop ? parseFloat(this.data.paddingTop) || 0 : 0, s = this.data.paddingRight ? parseFloat(this.data.paddingRight) || 0 : 0, r = this.data.paddingBottom ? parseFloat(this.data.paddingBottom) || 0 : 0, o = this.data.paddingLeft ? parseFloat(this.data.paddingLeft) || 0 : 0;
        this.__scroll = function() {
            e.isSendImpression || d.exec(function(t) {
                if (!e.isSendImpression) {
                    var i = t[0], d = t[1];
                    if (d && i) {
                        var c = d.top < i.height - r && d.bottom > 0 + n, l = d.left < i.width - o && d.right > 0 + s;
                        c && l && (e.isSendImpression = !0, a.sendImpressionPoint(e.data.feedback, e.data.adidx, e.data.extra, e.data));
                    }
                }
            });
        }, t.onScroll(this.__scroll), setTimeout(function() {
            e.__scroll();
        }, 10);
    },
    moved: function() {},
    detached: function() {
        t.offScroll(this.__scroll);
    }
});