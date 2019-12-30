function e(e, i) {
    if (!(e instanceof i)) throw new TypeError("Cannot call a class as a function");
}

var i = function() {
    function e(e, i) {
        for (var n = 0; n < i.length; n++) {
            var u = i[n];
            u.enumerable = u.enumerable || !1, u.configurable = !0, "value" in u && (u.writable = !0), 
            Object.defineProperty(e, u.key, u);
        }
    }
    return function(i, n, u) {
        return n && e(i.prototype, n), u && e(i, u), i;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = require("../lib/checkprefix.js"), u = [ {
    unique: "onLoad",
    description: "监听页面加载事件"
}, {
    unique: "onShow",
    description: "监听页面显示事件"
}, {
    unique: "onHide",
    description: "监听页面隐藏事件"
} ], t = [ {
    unique: "ON_APP_SHOW",
    description: "小程序显示事件"
}, {
    unique: "ON_APP_LAUNCH",
    description: "小程序初始化事件"
}, {
    unique: "ON_APP_ERROR",
    description: "小程序错误监听函数事件"
}, {
    unique: "ON_APP_HIDE",
    description: "小程序隐藏事件"
}, {
    unique: "ON_APP_PAGENOTFOUNd",
    description: "页面不存在监听函数通知事件"
} ], o = [ {
    unique: "envChanged",
    description: "环境切换事件"
}, {
    unique: "login",
    description: "用户登录事件"
}, {
    unique: "logout",
    description: "用户退出登录事件"
}, {
    unique: "loginEnd",
    description: "用户登录完成"
}, {
    unique: "getWxAuthEnd",
    description: "读取用户微信信息结束"
}, {
    unique: "_openId_",
    description: "openid变更事件"
}, {
    unique: "_token_",
    description: "token变更事件"
}, {
    unique: "_userId_",
    description: "userId变更事件"
}, {
    unique: "_unionId_",
    description: "unionId变更时间"
}, {
    unique: "cityChange",
    description: "用户切换城市"
}, {
    unique: "debugChange",
    description: "用户开启debug模式通知事件"
} ].concat(u).concat(t).concat(n.prefList), r = function() {
    function u(i) {
        e(this, u), this.prfx = i || "", this.queue = {};
    }
    return i(u, [ {
        key: "on",
        value: function(e, i) {
            var u = this.prfx + e;
            "function" == typeof i && (this.queue[u] || (this.queue[u] = []), this.queue[u].push(i), 
            (0, n.prefixVerify)(o, u));
        }
    }, {
        key: "trigger",
        value: function(e) {
            var i = this.prfx + e, n = void 0, u = [];
            for (n = 1; n < arguments.length; n++) u.push(arguments[n]);
            if (this.queue[i]) for (n = 0; n < this.queue[i].length; n++) this.queue[i][n].apply(this, u);
        }
    }, {
        key: "off",
        value: function(e, i) {
            var n = this.prfx + e, u = this.queue[n];
            if (u && u.length) {
                var t = u.indexOf(i);
                -1 !== t && u.splice(t, 1);
            }
        }
    } ]), u;
}(), s = new r();

s.Event = r, exports.default = s;