function t(t) {
    return "[object String]" === Object.prototype.toString.call(t);
}

module.exports = function(e, r) {
    if (!t(e) || !e) return e;
    var o = void 0, i = void 0, c = !1;
    r && (o = r.width || void 0, i = r.height || void 0, c = r.needProtocol || !1);
    var p = e;
    return p = p.replace(/\/w.h/, "").split("@")[0].split("%")[0], p = c ? "https:" + p.replace(/^https?:(\/\/)/, "$1") : p.replace(/^https?:(\/\/)/, "$1"), 
    o && i && (p += "@" + o + "w_" + i + "h_1e_1c"), p;
};