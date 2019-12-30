Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../config/index")), n = require("./constants/index"), t = wx, i = n.CHANNEL.WEIXIN, o = void 0, u = void 0;

void 0 != o && (o = o || null), void 0 != u && (u = u || null), o ? (t = o, i = n.CHANNEL.BAIDU) : u && (t = u, 
i = n.CHANNEL.TOUTIAO), e.default.setConfig({
    channel: i
}), exports.default = t;