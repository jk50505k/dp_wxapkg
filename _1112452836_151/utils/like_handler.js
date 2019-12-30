function r(r, t) {
    var e = !1, n = !0, i = !1, o = void 0;
    try {
        for (var u, a = r[Symbol.iterator](); !(n = (u = a.next()).done); n = !0) if (u.value.userId === t) {
            e = !0;
            break;
        }
    } catch (r) {
        i = !0, o = r;
    } finally {
        try {
            !n && a.return && a.return();
        } finally {
            if (i) throw o;
        }
    }
    return e;
}

function t(r, t, e) {
    return r.unshift({
        userId: t,
        userFace: e
    }), r;
}

function e(r, t) {
    var e = r.findIndex(function(r) {
        return r.userId === t;
    });
    return e > -1 && r.splice(e, 1), r;
}

function n(r, t) {
    return r && Array.isArray(t) ? 0 === t.length ? null : 1 === t.length ? r[t] : n(r[t[0]], t.slice(1)) : null;
}

var i = function() {
    function r(r, t) {
        var e = [], n = !0, i = !1, o = void 0;
        try {
            for (var u, a = r[Symbol.iterator](); !(n = (u = a.next()).done) && (e.push(u.value), 
            !t || e.length !== t); n = !0) ;
        } catch (r) {
            i = !0, o = r;
        } finally {
            try {
                !n && a.return && a.return();
            } finally {
                if (i) throw o;
            }
        }
        return e;
    }
    return function(t, e) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return r(t, e);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}();

module.exports = function(o, u) {
    var a = o.noteId, l = o.userId, f = o.userFace, s = o.isLike, c = n(this.data, u.split(".")), y = !0, d = !1, v = void 0;
    try {
        for (var h, w = c.entries()[Symbol.iterator](); !(y = (h = w.next()).done); y = !0) {
            var b = i(h.value, 2), I = b[0], m = b[1];
            if (m.noteId === a) {
                var p = u + "[" + I + "]", x = {}, S = r(m.flowerUsers, l);
                x[p] = S != s ? Object.assign(m, {
                    isSendFlower: s,
                    flowerCount: s ? m.flowerCount + 1 : m.flowerCount - 1,
                    flowerUsers: s ? t(m.flowerUsers, l, f) : e(m.flowerUsers, l)
                }) : m, this.setData(x);
                break;
            }
        }
    } catch (r) {
        d = !0, v = r;
    } finally {
        try {
            !y && w.return && w.return();
        } finally {
            if (d) throw v;
        }
    }
};