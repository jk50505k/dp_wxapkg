Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = arguments, o = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../context/index")), t = {}, n = [ "stopRecord", "pauseVoice", "stopVoice", "pauseBackgroundAudio", "stopBackgroundAudio", "showNavigationBarLoading", "hideNavigationBarLoading", "createAnimation", "createContext", "hideKeyboard", "stopPullDownRefresh" ];

for (var a in o.default) !function(a) {
    var u = -1 !== a.indexOf(n) || "on" === a.substr(0, 2) || /\w+Sync$/.test(a);
    "function" != typeof o.default[a] ? t[a] = o.default[a] : t[a] = u ? function() {
        return console.warn(a + "is not a async function, no promise provided!"), o.default[a].apply(o.default, e);
    } : function(e) {
        return e = e || {}, new Promise(function(t, n) {
            e.success = t, e.fail = n, o.default[a](e);
        });
    };
}(a);

exports.default = t;