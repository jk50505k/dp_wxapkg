var e = {
    AUTH: "/thirdlogin/ajax/auth",
    MOBILE_AUTH_LOGIN: "/thirdlogin/ajax/bindWxMobile",
    PHONE_CODE: "/account/ajax/mobileVerifySend",
    CHECK_IMAGE_CODE: "/account/ajax/checkRisk",
    SLIDER_CODE: "/ajax/json/account/slideBlockAuth",
    SLIDER_RESULT: "/ajax/json/account/slideBlockResult",
    BIND_PHONE: "/ajax/json/account/mobiledynamiclogin/98",
    MERGE_ACCOUNT: "/account/ajax/thirdAuthConfirmBindMobile",
    CODE_LOGIN: "/account/ajax/mfastlogin"
}, o = {
    NO_AUTH_LOGIN: 0,
    USRINFO_BIND_LOGIN: 1,
    WXIDINFO_LOGIN: 2,
    WX_ONECLICK_LOGIN: 3
};

Component({
    properties: {
        cx: {
            type: String
        },
        openid: {
            type: String
        },
        bgImage: {
            type: String,
            value: "http://www.dpfile.com/app/dianping-wxapp/static/images/mobile-bg.46712fdfd4f38c748e3d05aaf8624d96.png"
        },
        loginStep: {
            type: Number,
            value: 0
        },
        loginSourceType: {
            type: Number,
            value: 0
        },
        loginDomain: {
            type: String,
            value: "https://maccount.dianping.com"
        },
        needLogin: {
            type: Boolean,
            value: !1,
            observer: "onNeedLoginChange"
        },
        loginType: {
            type: Number,
            value: o.NO_AUTH_LOGIN
        },
        thirdUidInfo: {
            type: Object
        },
        needMerge: {
            type: Boolean,
            value: !1
        },
        mergeFailover: {
            type: Number,
            value: 1
        }
    },
    data: {
        timeRemain: 60,
        needMobileAuth: !0,
        showLoginModal: !1,
        loginState: "",
        thirdUidInfo: void 0,
        showAuthModal: !1,
        showAuthPhoneModal: !1,
        showSMSModal: !1,
        cx: void 0
    },
    methods: {
        _doLoginEnd: function(e) {
            200 === e.code && this.setData({
                showLoginModal: !1,
                showSMSModal: !1
            }), 300 === e.code && this.setData({
                showLoginModal: !0,
                showAuthModal: !0
            }), this.triggerEvent("loginend", e);
        },
        onNeedLoginChange: function(e) {
            void 0 === this.data.cx && console.error("缺少诚信值cx"), !0 === e && (0 === this.data.loginStep ? this._dothirdLogin() : 1 === this.data.loginStep || 2 === this.data.loginStep ? this.data.loginType === o.WX_ONECLICK_LOGIN ? this.doLoginWithPhoneAuth() : this.doLoginWithAuth() : 3 === this.data.loginStep && this.doLoginWithSMS());
        },
        doLoginWithAuth: function() {
            var e = this;
            this.triggerEvent("logining", {
                state: "getUserInfo"
            }), wx.login({
                success: function(o) {
                    var t = o.code;
                    e.setData({
                        code: t
                    }), wx.getSetting({
                        success: function(o) {
                            o.authSetting["scope.userInfo"] ? wx.getUserInfo({
                                success: function(o) {
                                    2 === e.data.loginStep ? e._doLoginEnd({
                                        code: 300,
                                        userInfo: o.userInfo,
                                        msg: "微信已授权,读取 userInfo 信息成功"
                                    }) : e._doLoginWithAuth(o, t, "getUserInfo");
                                },
                                fail: function() {
                                    e.setData({
                                        showLoginModal: !0,
                                        showAuthModal: !0
                                    });
                                }
                            }) : e.setData({
                                showLoginModal: !0,
                                showAuthModal: !0
                            });
                        },
                        fail: function(o) {
                            e._doLoginEnd({
                                code: 506,
                                isSuccess: !1,
                                msg: "获取用户的当前设置失败",
                                errinfo: "获取用户的当前设置失败:" + JSON.stringify(o || {})
                            });
                        }
                    });
                },
                fail: function(o) {
                    e._doLoginEnd({
                        code: 506,
                        isSuccess: !1,
                        msg: "微信登陆失败",
                        errinfo: "读取微信授权用户信息后微信wx.login失败:" + JSON.stringify(o || {})
                    });
                }
            });
        },
        doLoginWithPhoneAuth: function() {
            this.triggerEvent("logining", {
                state: "getPhoneNumber"
            }), this.setData({
                showAuthModal: !1,
                showLoginModal: !0,
                showAuthPhoneModal: !0
            });
        },
        doLoginWithSMS: function() {
            this.triggerEvent("logining", {
                state: "getSMS"
            }), this.setData({
                showLoginModal: !0,
                showSMSModal: !0
            });
        },
        onTapGetUserInfo: function(e) {
            e && e.detail && e.detail.iv ? (this.setData({
                userInfos: e.detail
            }), 2 === this.data.loginStep ? this._doLoginEnd({
                code: 300,
                userInfo: e.detail.userInfo,
                msg: "通过微信Button授权,读取 userInfo 信息成功"
            }) : this._doLoginWithAuth(e.detail, this.data.code, "openType")) : this._doLoginEnd({
                isSuccess: !1,
                code: 501,
                msg: "拒绝微信授权"
            });
        },
        onTapCancelUserInfo: function() {
            this._doLoginEnd({
                isSuccess: !1,
                code: 501,
                msg: "用户拒绝微信授权"
            });
        },
        cancelAuthPhone: function() {
            this.setData({
                showAuthPhoneModal: !1
            }), this.doLoginWithSMS();
        },
        _dothirdLogin: function() {
            var t = this, i = this.data.cx;
            wx.login({
                success: function(n) {
                    var d = n.code;
                    t.setData({
                        code: d
                    }), wx.request({
                        method: "POST",
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        url: t.data.loginDomain + e.AUTH,
                        data: {
                            code: d,
                            sourceType: t.data.loginSourceType,
                            directLogin: !0,
                            cx: i || ""
                        },
                        success: function(e) {
                            if (e && 200 == e.statusCode && e.data) {
                                var i = e.data.msg, n = e.data;
                                if (n.thirdUid && n.thirdUidAuth && t.setData({
                                    thirdUidInfo: {
                                        thirdUid: n.thirdUid,
                                        thirdUidAuth: n.thirdUidAuth
                                    }
                                }), 100 == n.resultCode) t.data.loginType === o.NO_AUTH_LOGIN ? t._doLoginEnd({
                                    code: 200,
                                    isSuccess: !0,
                                    openId: i && i.eod
                                }) : t.doLoginWithAuth(); else if (200 == n.resultCode) {
                                    var d = i && i.eod, s = i && i.eud;
                                    i && i.token ? t._doLoginEnd({
                                        code: 200,
                                        isSuccess: !0,
                                        unionId: s,
                                        openId: d,
                                        token: i && i.token
                                    }) : t.data.loginType === o.NO_AUTH_LOGIN ? t._doLoginEnd({
                                        code: 200,
                                        isSuccess: !0,
                                        openId: d
                                    }) : t.data.loginType === o.WXIDINFO_LOGIN ? t._doLoginEnd({
                                        code: 200,
                                        isSuccess: !0,
                                        openId: d,
                                        unionId: s
                                    }) : t.data.loginType === o.USRINFO_BIND_LOGIN && (t.setData({
                                        openId: d,
                                        unionId: s
                                    }), t.doLoginWithPhoneAuth());
                                } else t._doLoginEnd({
                                    code: 503,
                                    isSuccess: !1,
                                    msg: "服务出错了",
                                    errinfo: "静默登录服务出错了,错误码:" + n.resultCode + ",错误信息:" + i.err
                                });
                            } else t._doLoginEnd({
                                code: 503,
                                isSuccess: !1,
                                msg: "网络出错了",
                                errinfo: "静默登录网络出错了,响应状态码:" + e.statusCode
                            });
                        },
                        fail: function(e) {
                            t._doLoginEnd({
                                code: 503,
                                isSuccess: !1,
                                msg: "出错了",
                                errinfo: "静默登录微信wx.request异常:" + JSON.stringify(e || {})
                            });
                        }
                    });
                },
                fail: function(e) {
                    t._doLoginEnd({
                        code: 506,
                        isSuccess: !1,
                        msg: "微信登陆失败",
                        errinfo: "静默登录wx.login获取code失败:" + JSON.stringify(e || {})
                    });
                }
            });
        },
        _doLoginWithAuth: function(t, i, n) {
            var d = this;
            t || (t = this.data.userInfos), i || (i = this.data.code);
            var s = this.data.cx, a = function(t) {
                wx.request({
                    url: d.data.loginDomain + e.AUTH,
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        code: i,
                        rawData: t.rawData,
                        signature: t.signature,
                        encryptedData: t.encryptedData,
                        iv: t.iv,
                        sourceType: d.data.loginSourceType,
                        directLogin: !1,
                        cx: s || ""
                    },
                    success: function(e) {
                        var t = e && e.data && e.data.msg && e.data.msg.showMsg || "登录失败，请稍后再试";
                        if (e && 200 == e.statusCode && e.data) {
                            var i = e.data.msg, n = e.data;
                            n.thirdUid && n.thirdUidAuth && d.setData({
                                thirdUidInfo: {
                                    thirdUid: n.thirdUid,
                                    thirdUidAuth: n.thirdUidAuth
                                }
                            });
                            var s = void 0, a = void 0;
                            i && i.eod && (i.eod && (s = i.eod, d.setData({
                                openId: s
                            })), i.eud && (a = i.eud, d.setData({
                                unionId: a
                            }))), 200 == n.resultCode ? i && i.token ? d._doLoginEnd({
                                code: 200,
                                isSuccess: !0,
                                token: i.token,
                                openId: s,
                                unionId: a
                            }) : d.data.loginType === o.WXIDINFO_LOGIN ? d._doLoginEnd({
                                code: 200,
                                isSuccess: !0,
                                openId: s,
                                unionId: a
                            }) : d.doLoginWithPhoneAuth() : d._doLoginEnd({
                                code: 504,
                                isSuccess: !1,
                                msg: i,
                                errinfo: "非静默登录服务出错了,错误码:" + n.resultCode + ",错误信息:" + i.err
                            });
                        } else d._doLoginEnd({
                            code: 504,
                            isSuccess: !1,
                            msg: t,
                            errinfo: "非静默登录网络出错了,响应状态码:" + e.statusCode
                        });
                    },
                    fail: function(e) {
                        d._doLoginEnd({
                            code: 504,
                            isSuccess: !1,
                            msg: "登录出错了",
                            errinfo: "非静默登录微信wx.request异常:" + JSON.stringify(e || {})
                        });
                    }
                });
            };
            t && t.rawData && t.signature && t.encryptedData && t.iv ? a(t) : "openType" === n ? wx.getUserInfo({
                success: function(e) {
                    a(e);
                },
                fail: function() {
                    d._doLoginEnd({
                        isSuccess: !1,
                        code: 501,
                        msg: "微信授权失败",
                        errinfo: "非静默登录wx.getUserInfo失败"
                    });
                }
            }) : this._doLoginEnd({
                isSuccess: !1,
                code: 501,
                msg: "微信授权失败",
                errinfo: "非静默登录微信授权失败"
            });
        },
        onAuthPhoneNumber: function(e) {
            var o = this, t = e.detail;
            if (t.iv && t.encryptedData) {
                var i = this.data.thirdUidInfo;
                i && i.thirdUid && i.thirdUidAuth ? this._bindWxMobile(t, i) : wx.login({
                    success: function(e) {
                        var n = e.code;
                        n ? o._bindWxMobile(t, i, n) : o._doLoginEnd({
                            code: 508,
                            isSuccess: !1,
                            msg: "微信登陆失败",
                            errinfo: "手机绑定登录失败wx.login获取code失败:" + JSON.stringify(e || {})
                        });
                    },
                    fail: function(e) {
                        o._doLoginEnd({
                            code: 507,
                            isSuccess: !1,
                            msg: "微信登陆失败",
                            errinfo: "手机绑定登录失败wx.login获取code失败:" + JSON.stringify(e || {})
                        });
                    }
                });
            } else this.setData({
                showAuthPhoneModal: !1
            }), this.doLoginWithSMS();
        },
        _bindWxMobile: function(t, i, n) {
            var d = this, s = {
                needBind: !(this.data.loginType === o.WX_ONECLICK_LOGIN),
                encryptedData: t.encryptedData,
                iv: t.iv,
                thirdUid: i && i.thirdUid,
                thirdUidAuth: i && i.thirdUidAuth,
                sourceType: this.data.loginSourceType,
                needMerge: this.data.needMerge,
                cx: this.data.cx || ""
            };
            n && (s.code = n, delete s.thirdUid, delete s.thirdUidAuth), wx.request({
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                url: this.data.loginDomain + e.MOBILE_AUTH_LOGIN,
                data: s,
                success: function(e) {
                    if (e && 200 == e.statusCode) if (200 == e.data.resultCode) d._doLoginEnd({
                        code: 200,
                        isSuccess: !0,
                        token: e.data.msg.token,
                        openId: d.data.openId,
                        unionId: d.data.unionId
                    }); else if (201 == e.data.resultCode) {
                        var o = {
                            thirdKey: e.data.msg.thirdKey,
                            mobileKey: e.data.msg.mobileKey
                        };
                        wx.showModal({
                            title: "提示",
                            content: e.data.msg.info,
                            success: function(e) {
                                e.confirm ? d.doMergeAccount(o, !0) : d.doMergeAccount(o, !1);
                            },
                            fail: function() {
                                d.doMergeAccount(o, !1);
                            }
                        });
                    } else {
                        var t = e.data.msg && e.data.msg.showMsg || "一键登录服务出错";
                        d._doLoginEnd({
                            code: 505,
                            isSuccess: !1,
                            msg: t,
                            errinfo: "一键登录服务出错,错误码:" + e.data.resultCode + ",错误信息:" + e.data.msg.err
                        });
                    } else d._doLoginEnd({
                        code: 505,
                        isSuccess: !1,
                        msg: "一键登录失败",
                        errinfo: "一键登录失败,响应状态码:" + e.statusCode
                    });
                },
                fail: function(e) {
                    d._doLoginEnd({
                        code: 505,
                        isSuccess: !1,
                        msg: "网络出错了",
                        errinfo: "一键登录微信wx.request异常:" + JSON.stringify(e || {})
                    });
                }
            });
        },
        doMergeAccount: function(o, t) {
            var i = this;
            t ? wx.request({
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                url: this.data.loginDomain + e.MERGE_ACCOUNT,
                data: {
                    thirdKey: o.thirdKey,
                    mobileKey: o.mobileKey,
                    sourceType: this.data.loginSourceType,
                    fromSmallWX: !0,
                    cx: this.data.cx || ""
                },
                success: function(e) {
                    e && 200 == e.statusCode ? 200 === e.data.code ? i._doLoginEnd({
                        code: 200,
                        isSuccess: !0,
                        token: e.data.msg.info,
                        openId: i.data.openId,
                        unionId: i.data.unionId
                    }) : i._doLoginEnd({
                        code: 507,
                        isSuccess: !1,
                        msg: "服务失败-换绑",
                        errinfo: "服务失败-换绑,错误码:" + e.data.code + ",错误信息:" + e.data.msg.err
                    }) : i._doLoginEnd({
                        code: 507,
                        isSuccess: !1,
                        msg: "网络出错了-换绑",
                        errinfo: "网络出错了-换绑,响应状态码:" + e.statusCode
                    });
                },
                fail: function(e) {
                    i._doLoginEnd({
                        code: 507,
                        isSuccess: !1,
                        msg: "网络出错了",
                        errinfo: "换绑wx.request异常:" + JSON.stringify(e || {})
                    });
                }
            }) : 1 === this.data.mergeFailover && this._doLoginEnd({
                code: 507,
                isSuccess: !1,
                msg: "用户拒绝换绑"
            });
        },
        getInputCode: function(e) {
            var o = e.detail.value.trim();
            this.setData({
                vcode: o
            });
        },
        getInputMobile: function(e) {
            var o = e.detail.value.trim();
            this.setData({
                mobile: o
            });
        },
        checkImageCode: function(o) {
            var t = this.data.mobile, i = this.data.cx;
            return wx.request({
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                url: this.data.loginDomain + e.CHECK_IMAGE_CODE,
                data: {
                    riskChannel: 401,
                    user: t,
                    cx: i
                },
                success: o.success,
                fail: o.fail
            });
        },
        getSliderRequestCode: function(o) {
            var t = this.data.openid || this.data.openId;
            wx.request({
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                url: this.data.loginDomain + e.SLIDER_CODE,
                data: {
                    captchaSource: 8,
                    countryCode: 86,
                    mobile: this.data.mobile,
                    dpid: t
                },
                success: o.success,
                fail: o.fail
            });
        },
        getBindUUID: function() {
            var e = this, o = this.data.uuid;
            this.checkImageCode({
                success: function(t) {
                    200 == t.statusCode && (200 == t.data.code ? 0 == t.data.msg.riskLevel ? (o = t.data.msg.uuid || "", 
                    e.setData({
                        uuid: o
                    }), e.getCode(o)) : 6 == t.data.msg.riskLevel ? wx.showToast({
                        title: t.data.msg.riskMessage,
                        icon: "none"
                    }) : 1 == t.data.msg.riskLevel && e.getSliderRequestCode({
                        success: function(o) {
                            200 == o.statusCode && o.data && o.data.requestCode && (e.Slider = e.selectComponent("#slider"), 
                            e.Slider.showSlider({
                                requestCode: o.data.requestCode
                            }));
                        },
                        fail: function() {
                            wx.showToast({
                                title: "获取requestCode服务异常",
                                icon: "none"
                            });
                        }
                    }) : t.data.msg && t.data.msg.error && wx.showToast({
                        title: t.data.msg.error,
                        icon: "none"
                    }));
                },
                fail: function() {
                    wx.showToast({
                        title: "风险校验服务异常",
                        icon: "none"
                    });
                }
            });
        },
        sliderCallBack: function(e) {
            var o = e.detail;
            o.requestCode && o.responseCode ? this.sliderResult(o) : 33333 == o.code ? wx.showToast({
                title: "用户取消验证",
                icon: "none"
            }) : wx.showToast({
                title: "滑块验证失败",
                icon: "none"
            });
        },
        sliderResult: function(o) {
            var t = this;
            wx.request({
                url: this.data.loginDomain + e.SLIDER_RESULT,
                data: {
                    captchaSource: 3,
                    requestCode: o.requestCode,
                    responseCode: o.responseCode
                },
                success: function(e) {
                    if (e && 200 == e.statusCode) {
                        var o = e.data;
                        if (o.success) {
                            var i = o.uuid;
                            return t.setData({
                                uuid: o.uuid
                            }), t.getCode(i);
                        }
                    }
                },
                fail: function() {
                    wx.showToast({
                        title: "滑块验证服务异常",
                        icon: "none"
                    });
                }
            });
        },
        getCode: function(o) {
            var t = this;
            o = o || this.data.uuid, wx.request({
                url: this.data.loginDomain + e.PHONE_CODE,
                data: {
                    mobileNo: this.data.mobile,
                    mobile: this.data.mobile,
                    uuid: o,
                    type: 304
                },
                success: function() {
                    t.setData({
                        uuid: "",
                        codeSend: !0
                    });
                    var e = setInterval(function() {
                        var o = t.data.timeRemain;
                        o > 1 ? (o--, t.setData({
                            timeRemain: o
                        })) : (clearInterval(e), t.setData({
                            codeSend: !1,
                            timeRemain: 60
                        }));
                    }, 1e3);
                },
                fail: function() {
                    wx.showToast({
                        title: "发送短信验证码服务异常",
                        icon: "none"
                    });
                }
            });
        },
        bindPhone: function() {
            var e = this.data.thirdUidInfo, o = this.data, t = o.mobile, i = o.vcode;
            if (!t) return wx.showToast({
                title: "请输入手机号",
                icon: "none"
            });
            if (!i) return wx.showToast({
                title: "请输入验证码",
                icon: "none"
            });
            var n = this.data, d = n.cx, s = n.needMerge;
            3 === n.loginStep ? this.codeLogin(t, i, d) : this.codeBind(t, i, e, s, d);
        },
        codeBind: function(o, t, i, n, d) {
            var s = this;
            wx.request({
                url: this.data.loginDomain + e.BIND_PHONE,
                data: {
                    mobile: o,
                    vcode: t,
                    thirdUid: i.thirdUid,
                    thirdUidAuth: i.thirdUidAuth,
                    fromSmallWX: !0,
                    needMerge: n,
                    cx: d || ""
                },
                success: function(e) {
                    if (e && 200 == e.statusCode) {
                        var o = e.data;
                        if (200 == o.code && o.msg && o.msg.info) s._doLoginEnd({
                            code: 200,
                            isSuccess: !0,
                            token: o.msg.info,
                            openId: s.data.openId,
                            unionId: s.data.unionId
                        }); else if (101 == o.code) {
                            var t = {
                                thirdKey: o.msg.thirdKey,
                                mobileKey: o.msg.mobileKey
                            };
                            wx.showModal({
                                title: "提示",
                                content: o.msg.info,
                                success: function(e) {
                                    e.confirm ? s.doMergeAccount(t, !0) : s.doMergeAccount(t, !1);
                                },
                                fail: function() {
                                    s.doMergeAccount(t, !1);
                                }
                            });
                        } else s._doLoginEnd({
                            code: 502,
                            isSuccess: !1,
                            msg: o.msg.err,
                            errinfo: "手机验证码登陆失败,错误码:" + o.code + ",错误信息:" + o.msg.err
                        });
                    } else s._doLoginEnd({
                        code: 502,
                        isSuccess: !1,
                        msg: "服务异常",
                        errinfo: "手机验证码登陆网络出错了,响应状态码:" + e.statusCode
                    });
                },
                fail: function(e) {
                    s._doLoginEnd({
                        code: 502,
                        isSuccess: !1,
                        msg: "网络错误",
                        errinfo: "手机验证码登陆wx.request异常:" + JSON.stringify(e || {})
                    });
                }
            });
        },
        codeLogin: function(o, t, i) {
            var n = this;
            wx.request({
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                url: this.data.loginDomain + e.CODE_LOGIN,
                data: {
                    mobile: o,
                    vcode: t,
                    channel: 9,
                    type: 304,
                    cx: i || ""
                },
                success: function(e) {
                    if (e && 200 == e.statusCode) {
                        var o = e.data;
                        200 == o.code && o.msg && o.msg.token ? n._doLoginEnd({
                            code: 200,
                            isSuccess: !0,
                            token: o.msg.token,
                            tempLogin: !0
                        }) : n._doLoginEnd({
                            code: 502,
                            isSuccess: !1,
                            msg: o.msg.err,
                            errinfo: "手机验证码降级登录失败,错误码:" + o.code + ",错误信息:" + o.msg.err
                        });
                    } else n._doLoginEnd({
                        code: 502,
                        isSuccess: !1,
                        msg: "服务异常",
                        errinfo: "手机验证码降级登录网络出错了,响应状态码:" + e.statusCode
                    });
                },
                fail: function(e) {
                    n._doLoginEnd({
                        code: 502,
                        isSuccess: !1,
                        msg: "网络错误",
                        errinfo: "手机验证码降级登录wx.request异常:" + JSON.stringify(e || {})
                    });
                }
            });
        }
    }
});