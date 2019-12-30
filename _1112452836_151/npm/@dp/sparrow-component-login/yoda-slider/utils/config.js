function e(e, _) {
    if (!(e instanceof _)) throw new TypeError("Cannot call a class as a function");
}

var _ = function() {
    function e(e, _) {
        for (var r = 0; r < _.length; r++) {
            var t = _[r];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(e, t.key, t);
        }
    }
    return function(_, r, t) {
        return r && e(_.prototype, r), t && e(_, t), _;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.YodaServer = exports.modulesInfo = exports.closeStatus = exports.rohr = exports.rohrConfig = exports.source = exports.embedModule = exports.modules = exports.feVersion = void 0;

var r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../@mtfe/wxapp-rohr/dist/rohr.js")), t = require("../../../sparrow/index.js"), I = {
    i: 100019
}, o = function() {
    function r() {
        e(this, r), this.yodaServer = null, this.env = "pro", this.domain = {
            dev: "https://verify.inf.dev.meituan.com",
            ppe: "https://verify.inf.ppe.meituan.com",
            test: "https://verify.inf.test.meituan.com",
            staging: "https://verify-test.meituan.com",
            pro: "https://verify.meituan.com"
        };
    }
    return _(r, [ {
        key: "setServer",
        value: function(e) {
            this.env = e;
        }
    }, {
        key: "getServer",
        value: function() {
            var e = t.env.get();
            return this.env = "test" == e ? "test" : "pro", this.domain[this.env];
        }
    } ], [ {
        key: "getYodaServer",
        value: function() {
            return this.yodaServer || (this.yodaServer = new r()), this.yodaServer;
        }
    } ]), r;
}(), R = {
    slider: "0.1.0",
    sms: "0.1.0",
    image: "0.1.0",
    voice: "0.1.0",
    lbs: "0.1.0",
    names: "0.1.0",
    birthday: "0.1.0",
    buying: "0.1.0"
}, n = {
    1: "图片",
    4: "短信",
    40: "语音",
    69: "历史购买",
    71: "滑块",
    79: "地址位置",
    89: "生日",
    100: "姓名"
}, E = {
    "-1": "groupInfo",
    1: "imageInfo",
    4: "smsInfo",
    40: "voiceInfo",
    69: "buyingInfo",
    71: "sliderInfo",
    79: "lbsInfo",
    89: "birthdayInfo",
    100: "namesInfo"
}, s = [ 1, 4, 12, 15, 40, 71 ], S = {
    RISK_DEFAULT_ERROR: "121000",
    RISK_NO_SUCH_ACTION: "121001",
    RISK_COMMON_PARAMS_LOST: "121002",
    RISK_NO_SUCH_SCENE: "121003",
    RISK_USER_NOT_LOAD: "121004",
    RISK_PARAMS_INVALID_FORMART: "121005",
    RISK_NO_SUCH_METHOD: "121006",
    RISK_NOT_VERIFY_BY_ORDER: "121007",
    RISK_GET_VERIFYINFO_LIMIT: "121009",
    RISK_VERIFY_ERROR_TIMES_LIMIT: "121010",
    RISK_USER_NOT_BINDED: "121011",
    RISK_PARAMS_LOST: "121018",
    RISK_USER_RESETPWD_CODE_EXPIRE: "121036",
    RISK_MOBILE_NOT_EXIST: "121040",
    RISK_GET_VERIFY_INFO_ERROR: "121042",
    RISK_AUTHORIZE_CODE_FAIL: "121043",
    RISK_AUTHORIZE_CODE_EXPIRE: "121044",
    RISK_RISK_LEVEL_NOT_VALID: "121045",
    RISK_GET_VERIFY_CODE_CNT_REACH_LIMIT: "121046",
    RISK_LEVEL_DENY: "121051",
    RISK_VERIFY_REQUEST_TIME_OUT: "121052",
    RISK_FAKE_REQUEST: "121053",
    RISK_VOICE_SEND_TIMES_LIMIT_ONE_DAY: "121055",
    RISK_BOOM_PROOF_DENY: "121056",
    RISK_VERIFY_INFO_LOSE_EFFICACY: "121057",
    RISK_SLIDER_VERIFY_FAILED: "121058",
    RISK_GET_VERIFYINFO_TIMES_LIMIT_ONE_DAY: "121061",
    RISK_VERIFY_PAYPWD_USE_PAY_ERROR_LIMIT: "121064",
    RISK_VERIFY_ERROR_TIMES_LIMIT_ONE_DAY: "121065",
    RISK_KLINGON_OUT_OF_SERVICE: "121066",
    RISK_GET_VERIFY_INFO_ERROR_RETRY: "121067",
    RISK_NO_AUTH: "121999"
};

exports.feVersion = R, exports.modules = n, exports.embedModule = s, exports.source = 13, 
exports.rohrConfig = I, exports.rohr = r.default, exports.closeStatus = S, exports.modulesInfo = E, 
exports.YodaServer = o;