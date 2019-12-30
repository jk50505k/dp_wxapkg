Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.encrypt = function(A) {
    var n = A ? A.toString() : "";
    return e.default.AES.encrypt(n, t, {
        iv: r
    }).toString();
}, exports.decrypt = function(A) {
    var n = A ? A.toString() : "", u = e.default.AES.decrypt(n, t, {
        iv: r
    });
    return e.default.enc.Utf8.stringify(u);
};

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../npm/crypto-js/index.js")), t = e.default.enc.Utf8.parse("AAAAAAAAAAAAAAAAAAAAAAAA12345678"), r = e.default.enc.Utf8.parse("1234567812345678");