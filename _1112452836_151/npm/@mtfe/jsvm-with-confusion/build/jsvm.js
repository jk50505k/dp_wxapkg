function e(e) {
    if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
        return n;
    }
    return Array.from(e);
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function n(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function r(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

var i = function() {
    function e(e, t) {
        var n = [], r = !0, i = !1, a = void 0;
        try {
            for (var o, u = e[Symbol.iterator](); !(r = (o = u.next()).done) && (n.push(o.value), 
            !t || n.length !== t); r = !0) ;
        } catch (e) {
            i = !0, a = e;
        } finally {
            try {
                !r && u.return && u.return();
            } finally {
                if (i) throw a;
            }
        }
        return n;
    }
    return function(t, n) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), a = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(e, t) {
    "object" === ("undefined" == typeof exports ? "undefined" : o(exports)) && "object" === ("undefined" == typeof module ? "undefined" : o(module)) ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" === ("undefined" == typeof exports ? "undefined" : o(exports)) ? exports.jsvm = t() : e.jsvm = t();
}(global, function() {
    return function(e) {
        function t(r) {
            if (n[r]) return n[r].exports;
            var i = n[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return e[r].call(i.exports, i, i.exports, t), i.l = !0, i.exports;
        }
        var n = {};
        return t.m = e, t.c = n, t.d = function(e, n, r) {
            t.o(e, n) || Object.defineProperty(e, n, {
                enumerable: !0,
                get: r
            });
        }, t.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            });
        }, t.t = function(e, n) {
            if (1 & n && (e = t(e)), 8 & n) return e;
            if (4 & n && "object" === (void 0 === e ? "undefined" : o(e)) && e && e.__esModule) return e;
            var r = Object.create(null);
            if (t.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & n && "string" != typeof e) for (var i in e) t.d(r, i, function(t) {
                return e[t];
            }.bind(null, i));
            return r;
        }, t.n = function(e) {
            var n = e && e.__esModule ? function() {
                return e.default;
            } : function() {
                return e;
            };
            return t.d(n, "a", n), n;
        }, t.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }, t.p = "", t(t.s = "./src/jsvm.ts");
    }({
        "./src/ast_map.ts": function(i, u, s) {
            Object.defineProperty(u, "__esModule", {
                value: !0
            });
            var l = s("./src/constant_table.ts"), c = s("./src/scope.ts"), _ = s("./src/break_signal.ts"), f = s("./src/stack.ts"), y = function(i) {
                function u(e, r, i) {
                    t(this, u);
                    var a = n(this, (u.__proto__ || Object.getPrototypeOf(u)).call(this));
                    return a.WalkCount = 0, a.ast = e, a.scope = r, a.stack = new f.CallStack(e, r, i && i.onError ? i.onError : void 0), 
                    a;
                }
                return r(u, _.default), a(u, [ {
                    key: "run",
                    value: function() {
                        return this.stack.intercept(this.walk.bind(this));
                    }
                }, {
                    key: "walk",
                    value: function(e, t) {
                        this.WalkCount++;
                        try {
                            for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++) r[i - 2] = arguments[i];
                            return this["" + e[0]].apply(this, [ e, t ].concat(r));
                        } catch (n) {
                            throw this.stack.pushStack({
                                node: e,
                                scope: t
                            }), n;
                        }
                    }
                }, {
                    key: 1,
                    value: function(e, t) {
                        var n = !0, r = !1, i = void 0;
                        try {
                            for (var a, o = e[2][Symbol.iterator](); !(n = (a = o.next()).done); n = !0) {
                                var u = a.value;
                                this.walk(u, t);
                            }
                        } catch (e) {
                            r = !0, i = e;
                        } finally {
                            try {
                                !n && o.return && o.return();
                            } finally {
                                if (r) throw i;
                            }
                        }
                    }
                }, {
                    key: 2,
                    value: function(e, t) {
                        return t.__get__(e[1]);
                    }
                }, {
                    key: 3,
                    value: function(e, t) {
                        return e[3] && -1 !== e[3] ? new RegExp(e[3].pattern, e[3].flags) : e[1];
                    }
                }, {
                    key: 5,
                    value: function(e, t) {
                        var n = new c.default("block", t), r = !0, i = !1, a = void 0;
                        try {
                            for (var o, u = e[1][Symbol.iterator](); !(r = (o = u.next()).done); r = !0) {
                                var s = o.value, l = this.walk(s, n);
                                if (this.isBreakSignal(l) || this.isContinueSignal(l) || this.isReturnSignal(l)) return l;
                            }
                        } catch (e) {
                            i = !0, a = e;
                        } finally {
                            try {
                                !r && u.return && u.return();
                            } finally {
                                if (i) throw a;
                            }
                        }
                    }
                }, {
                    key: 6,
                    value: function(e, t) {}
                }, {
                    key: 7,
                    value: function(e, t) {}
                }, {
                    key: 4,
                    value: function(e, t) {
                        this.walk(e[1], t);
                    }
                }, {
                    key: 9,
                    value: function(e, t) {
                        return this.createReturnSignal(e[1] ? this.walk(e[1], t) : void 0);
                    }
                }, {
                    key: 10,
                    value: function(e, t) {
                        throw e[0] + " 未实现";
                    }
                }, {
                    key: 11,
                    value: function(e, t) {
                        return this.createBreakSignal();
                    }
                }, {
                    key: 12,
                    value: function(e, t) {
                        return this.createContinueSignal();
                    }
                }, {
                    key: 13,
                    value: function(e, t) {
                        return this.walk(e[1], t) ? this.walk(e[2], t) : e[3] ? this.walk(e[3], t) : void 0;
                    }
                }, {
                    key: 14,
                    value: function(e, t) {
                        var n = this.walk(e[1], t), r = new c.default("switch", t), i = !1, a = !0, o = !1, u = void 0;
                        try {
                            for (var s, l = e[2][Symbol.iterator](); !(a = (s = l.next()).done); a = !0) {
                                var _ = s.value;
                                if (i || _[1] && n !== this.walk(_[1], r) || (i = !0), i) {
                                    var f = this.walk(_, r);
                                    if (this.isBreakSignal(f)) break;
                                    if (this.isContinueSignal(f) || this.isReturnSignal(f)) return f;
                                }
                            }
                        } catch (e) {
                            o = !0, u = e;
                        } finally {
                            try {
                                !a && l.return && l.return();
                            } finally {
                                if (o) throw u;
                            }
                        }
                    }
                }, {
                    key: 15,
                    value: function(e, t) {
                        var n = !0, r = !1, i = void 0;
                        try {
                            for (var a, o = e[2][Symbol.iterator](); !(n = (a = o.next()).done); n = !0) {
                                var u = a.value, s = this.walk(u, t);
                                if (this.isBreakSignal(s) || this.isContinueSignal(s) || this.isReturnSignal(s)) return s;
                            }
                        } catch (e) {
                            r = !0, i = e;
                        } finally {
                            try {
                                !n && o.return && o.return();
                            } finally {
                                if (r) throw i;
                            }
                        }
                    }
                }, {
                    key: 8,
                    value: function(e, t) {
                        throw SyntaxError("Strict mode code may not include a with statement");
                    }
                }, {
                    key: 16,
                    value: function(e, t) {
                        throw this.walk(e[1], t);
                    }
                }, {
                    key: 17,
                    value: function(e, t) {
                        try {
                            return this.walk(e[1], new c.default("try", t));
                        } catch (i) {
                            if (e[2] && -1 !== e[2]) {
                                var n = e[2][1], r = new c.default("catch", t);
                                return r.const(n[1], i), this.walk(e[2], r);
                            }
                            throw i;
                        } finally {
                            if (e[3] && -1 !== e[3]) {
                                var i = this.walk(e[3], new c.default("finally", t));
                                if (this.isReturnSignal(i)) return i;
                            }
                        }
                    }
                }, {
                    key: 18,
                    value: function(e, t) {
                        return this.walk(e[2], t);
                    }
                }, {
                    key: 19,
                    value: function(e, t) {
                        for (;this.walk(e[1], t); ) {
                            var n = new c.default("while", t), r = this.walk(e[2], n);
                            if (this.isBreakSignal(r)) break;
                            if (!this.isContinueSignal(r) && this.isReturnSignal(r)) return r;
                        }
                    }
                }, {
                    key: 20,
                    value: function(e, t) {
                        do {
                            var n = new c.default("dowhile", t), r = this.walk(e[1], n);
                            if (this.isBreakSignal(r)) break;
                            if (!this.isContinueSignal(r) && this.isReturnSignal(r)) return r;
                        } while (this.walk(e[2], t));
                    }
                }, {
                    key: 21,
                    value: function(e, t) {
                        var n = this, r = [];
                        e[1] && -1 !== e[1] && e[1][0] && 25 === e[1][0] && "let" === e[1][2] && e[1][1].forEach(function(e) {
                            e[1][1] && r.push(e[1][1]);
                        });
                        var i = new c.default("for", t);
                        e: for (e[1] && -1 !== e[1] && this.walk(e[1], i); !e[2] || -1 === e[2] || this.walk(e[2], i); e[3] && -1 !== e[3] ? this.walk(e[3], i) : void 0) {
                            var a = function(t, i) {
                                var a = new c.default("for_body", t), o = n.walk(e[4], a);
                                return r.forEach(function(e) {
                                    return a.let(e, t.__get__(e));
                                }), n.isBreakSignal(o) ? "break" : n.isContinueSignal(o) ? "continue" : n.isReturnSignal(o) ? {
                                    v: o
                                } : void 0;
                            }(i);
                            switch (a) {
                              case "break":
                                break e;

                              case "continue":
                                continue;

                              default:
                                if ("object" === (void 0 === a ? "undefined" : o(a))) return a.v;
                            }
                        }
                    }
                }, {
                    key: 22,
                    value: function(e, t) {
                        var n = "var", r = void 0;
                        2 === e[1][0] ? r = e[1][1] : (r = e[1][1][0][1][1], n = e[1][2]);
                        for (var i in this.walk(e[2], t)) {
                            var a = new c.default("forin", t);
                            a[n](r, i);
                            var o = this.walk(e[3], a);
                            if (this.isBreakSignal(o)) break;
                            if (!this.isContinueSignal(o) && this.isReturnSignal(o)) return o;
                        }
                    }
                }, {
                    key: 24,
                    value: function(e, t) {
                        var n = this[32](e, t), r = "";
                        if (!(e && e[1] && e[1][1])) throw new SyntaxError("Function must have a name as its identifier");
                        r = e[1][1], t.function(r, n);
                    }
                }, {
                    key: 32,
                    value: function(e, t) {
                        var n = this, r = function r() {
                            for (var i = arguments.length, a = Array(i), o = 0; o < i; o++) a[o] = arguments[o];
                            try {
                                var u = new c.default("function", t), s = "";
                                e && e[1] && -1 !== e[1] && e[1][1] && (s = e[1][1], u.function(s, r));
                                for (var l = 0; l < e[3].length; l++) {
                                    var _ = e[3][l][1];
                                    u.var(_, a[l]);
                                }
                                u.const("this", this), u.const("arguments", arguments);
                                var f = n.walk(e[2], u);
                                if (n.isReturnSignal(f)) return f.data;
                                r.VM_CALL_TYPE = void 0;
                            } catch (i) {
                                if (r.VM_CALL_TYPE) throw i;
                                n.stack.pushStack({
                                    node: e,
                                    scope: t
                                }), n.stack.handleAsyncError(i, t);
                            }
                        };
                        return r.VM_CODE_DEFINITION = !0, r;
                    }
                }, {
                    key: 25,
                    value: function(e, t) {
                        var n = e[2], r = !0, i = !1, a = void 0;
                        try {
                            for (var o, u = e[1][Symbol.iterator](); !(r = (o = u.next()).done); r = !0) {
                                var s = o.value;
                                if ("const" === n && (!s[2] || -1 === s[2])) throw new SyntaxError("Missing initializer in const declaration");
                                var c = s[1][1], _ = void 0 === s[2] || null === s[2] || -1 === s[2] ? l.default.NON_EXISTENT_INIT : this.walk(s[2], t);
                                t[n](c, _);
                            }
                        } catch (e) {
                            i = !0, a = e;
                        } finally {
                            try {
                                !r && u.return && u.return();
                            } finally {
                                if (i) throw a;
                            }
                        }
                    }
                }, {
                    key: 26,
                    value: function(e, t) {}
                }, {
                    key: 27,
                    value: function(e, t) {
                        return t.__has_variable_in_chain__("this") ? t.__get__("this") : null;
                    }
                }, {
                    key: 28,
                    value: function(e, t) {
                        var n = this, r = [];
                        return e[1].forEach(function(e) {
                            r.push(n.walk(e, t, r));
                        }), r;
                    }
                }, {
                    key: 29,
                    value: function(t, n) {
                        var r = this, i = {}, a = {}, o = {};
                        t[1].forEach(function(e) {
                            return r.walk(e, n, i, a, o);
                        });
                        var u = Object.keys(a), s = Object.keys(o);
                        if (0 !== u.length || 0 !== s.length) for (var l = [].concat(e(new Set(u.concat.apply(u, e(s))))), c = 0; c < l.length; c++) Object.defineProperty(i, l[c], {
                            set: o[l[c]],
                            get: a[l[c]]
                        });
                        return i;
                    }
                }, {
                    key: 31,
                    value: function(e, t, n, r, i) {
                        var a = e[3], o = void 0;
                        if (3 === e[1][0]) o = e[1][1]; else {
                            if (2 !== e[1][0]) throw new Error("Key of object must be Literal or Identifier, please check your code of ObjectExpression");
                            o = e[1][1];
                        }
                        var u = this.walk(e[2], t);
                        if ("init" === a) n[o] = u; else if ("set" === a) i[o] = u; else {
                            if ("get" !== a) throw new Error("声明对象的属性必须为初始化，getter或者setter，请检查你对象声明的表达式");
                            r[o] = u;
                        }
                    }
                }, {
                    key: 44,
                    value: function(e, t, n) {
                        var r = this.walk(e[1], t);
                        if (Array.isArray(n)) {
                            if (!r[Symbol.iterator] || "function" != typeof r[Symbol.iterator]) throw TypeError(r + " is not iterable");
                            for (var i = r[Symbol.iterator](), a = void 0; !(a = i.next()).done; ) n.push(a.value);
                        } else "object" === (void 0 === n ? "undefined" : o(n)) && Object.assign(n, r);
                    }
                }, {
                    key: 33,
                    value: function(e, t) {
                        var n = this, r = this, i = function(e) {
                            return void 0 === e ? "undefined" : o(e);
                        };
                        return {
                            "-": function() {
                                return -n.walk(e[3], t);
                            },
                            "+": function() {
                                return +n.walk(e[3], t);
                            },
                            "!": function() {
                                return !n.walk(e[3], t);
                            },
                            "~": function() {
                                return ~n.walk(e[3], t);
                            },
                            void: function() {
                                return void n.walk(e[3], t);
                            },
                            typeof: function() {
                                if (2 === e[3][0]) return t.__has_variable_in_chain__(e[3][1]) ? i(r.walk(e[3], t)) : "undefined";
                                if (38 === e[3][0]) {
                                    var n = e[3][1], a = e[3][2], o = e[3][3];
                                    return i(o ? r.walk(n, t)[r.walk(a, t)] : r.walk(n, t)[a[1]]);
                                }
                                return i(r.walk(e[3], t));
                            },
                            delete: function() {
                                if (38 === e[3][0]) {
                                    var r = e[3][1], i = e[3][2];
                                    return e[3][3] ? delete n.walk(r, t)[n.walk(i, t)] : delete n.walk(r, t)[i[1]];
                                }
                                if (2 === e[3][0]) throw new SyntaxError("Uncaught SyntaxError: Delete of an unqualified identifier in strict mode.");
                                return !0;
                            }
                        }[e[1]]();
                    }
                }, {
                    key: 34,
                    value: function(e, t) {
                        var n = e[3], r = e[1];
                        if (2 === e[2][0]) {
                            var i = e[2][1], a = t.__get__(i);
                            return "++" === r ? (t.__set__(i, a + 1), n ? ++a : a++) : (t.__set__(i, a - 1), 
                            n ? --a : a--);
                        }
                        if (38 === e[2][0]) {
                            var o = e[2], u = this.walk(o[1], t), s = o[3] ? this.walk(o[2], t) : o[2][1];
                            return "++" === r ? n ? ++u[s] : u[s]++ : n ? --u[s] : u[s]--;
                        }
                        var l = this.walk(e[2], t);
                        return "++" === r ? n ? ++l : l++ : n ? --l : l--;
                    }
                }, {
                    key: 35,
                    value: function(e, t) {
                        return {
                            "==": function(e, t) {
                                return e == t;
                            },
                            "!=": function(e, t) {
                                return e != t;
                            },
                            "===": function(e, t) {
                                return e === t;
                            },
                            "!==": function(e, t) {
                                return e !== t;
                            },
                            "<": function(e, t) {
                                return e < t;
                            },
                            "<=": function(e, t) {
                                return e <= t;
                            },
                            ">": function(e, t) {
                                return e > t;
                            },
                            ">=": function(e, t) {
                                return e >= t;
                            },
                            "<<": function(e, t) {
                                return e << t;
                            },
                            ">>": function(e, t) {
                                return e >> t;
                            },
                            ">>>": function(e, t) {
                                return e >>> t;
                            },
                            "+": function(e, t) {
                                return e + t;
                            },
                            "-": function(e, t) {
                                return e - t;
                            },
                            "*": function(e, t) {
                                return e * t;
                            },
                            "/": function(e, t) {
                                return e / t;
                            },
                            "%": function(e, t) {
                                return e % t;
                            },
                            "|": function(e, t) {
                                return e | t;
                            },
                            "^": function(e, t) {
                                return e ^ t;
                            },
                            "&": function(e, t) {
                                return e & t;
                            },
                            in: function(e, t) {
                                return e in t;
                            },
                            instanceof: function(e, t) {
                                return e instanceof t;
                            }
                        }[e[1]](this.walk(e[2], t), this.walk(e[3], t));
                    }
                }, {
                    key: 36,
                    value: function(e, t) {
                        var n = void 0;
                        if (2 === e[2][0]) {
                            var r = e[2][1];
                            n = {
                                $set: function(e) {
                                    t.__set__(r, e);
                                },
                                $get: function() {
                                    return t.__get__(r);
                                }
                            };
                        } else {
                            if (38 !== e[2][0]) throw "赋值表达式的左边的类型只能是Identifier或者MemberExpression，此处显然不正确";
                            var i = e[2], a = this.walk(i[1], t), o = i[3] ? this.walk(i[2], t) : i[2][1];
                            n = {
                                $set: function(e) {
                                    a[o] = e;
                                },
                                $get: function() {
                                    return a[o];
                                }
                            };
                        }
                        return {
                            "=": function(e) {
                                return n.$set(e), e;
                            },
                            "+=": function(e) {
                                return n.$set(n.$get() + e), n.$get();
                            },
                            "-=": function(e) {
                                return n.$set(n.$get() - e), n.$get();
                            },
                            "*=": function(e) {
                                return n.$set(n.$get() * e), n.$get();
                            },
                            "/=": function(e) {
                                return n.$set(n.$get() / e), n.$get();
                            },
                            "%=": function(e) {
                                return n.$set(n.$get() % e), n.$get();
                            },
                            "<<=": function(e) {
                                return n.$set(n.$get() << e), n.$get();
                            },
                            ">>=": function(e) {
                                return n.$set(n.$get() >> e), n.$get();
                            },
                            ">>>=": function(e) {
                                return n.$set(n.$get() >>> e), n.$get();
                            },
                            "|=": function(e) {
                                return n.$set(n.$get() | e), n.$get();
                            },
                            "^=": function(e) {
                                return n.$set(n.$get() ^ e), n.$get();
                            },
                            "&=": function(e) {
                                return n.$set(n.$get() & e), n.$get();
                            }
                        }[e[1]](this.walk(e[3], t));
                    }
                }, {
                    key: 37,
                    value: function(e, t) {
                        var n = this;
                        return {
                            "||": function() {
                                return n.walk(e[2], t) || n.walk(e[3], t);
                            },
                            "&&": function() {
                                return n.walk(e[2], t) && n.walk(e[3], t);
                            }
                        }[e[1]]();
                    }
                }, {
                    key: 38,
                    value: function(e, t) {
                        var n = e[1], r = e[2];
                        return e[3] ? this.walk(n, t)[this.walk(r, t)] : this.walk(n, t)[r[1]];
                    }
                }, {
                    key: 39,
                    value: function(e, t) {
                        return this.walk(e[1], t) ? this.walk(e[3], t) : this.walk(e[2], t);
                    }
                }, {
                    key: 40,
                    value: function(t, n) {
                        var r = this;
                        if (38 === t[1][0]) {
                            var i = this.walk(t[1][1], n), a = i[t[1][3] ? this.walk(t[1][2], n) : t[1][2][1]], o = t[2].map(function(e) {
                                return r.walk(e, n);
                            }), u = void 0, s = Function.prototype, l = s.call, c = s.apply;
                            return u = a === l ? "F.CALL" : a === c ? "F.APPLY" : "METHOD", a && a.VM_CODE_DEFINITION && (a.VM_CALL_TYPE = u), 
                            a.apply(i, o);
                        }
                        var _ = this.walk(t[1], n), f = t[2].map(function(e) {
                            return r.walk(e, n);
                        }), y = void 0, p = Function.prototype, h = p.call, v = p.apply;
                        return y = _ === h ? "F.CALL" : _ === v ? "F.APPLY" : "FUNCTION", _ && _.VM_CODE_DEFINITION && (_.VM_CALL_TYPE = y), 
                        _.apply(void 0, e(f));
                    }
                }, {
                    key: 41,
                    value: function(e, t) {
                        var n = this, r = this.walk(e[1], t), i = e[2].map(function(e) {
                            return n.walk(e, t);
                        });
                        return new (r.bind.apply(r, [ null ].concat(i)))();
                    }
                }, {
                    key: 42,
                    value: function(e, t) {
                        var n = void 0, r = !0, i = !1, a = void 0;
                        try {
                            for (var o, u = e[1][Symbol.iterator](); !(r = (o = u.next()).done); r = !0) {
                                var s = o.value;
                                n = this.walk(s, t);
                            }
                        } catch (e) {
                            i = !0, a = e;
                        } finally {
                            try {
                                !r && u.return && u.return();
                            } finally {
                                if (i) throw a;
                            }
                        }
                        return n;
                    }
                }, {
                    key: 55,
                    value: function(e, t) {
                        throw e[0] + " 未实现";
                    }
                }, {
                    key: 56,
                    value: function(e, t) {
                        throw e[0] + " 未实现";
                    }
                }, {
                    key: 53,
                    value: function(e, t) {
                        throw e[0] + " 未实现";
                    }
                }, {
                    key: 43,
                    value: function(e, t) {
                        throw e[0] + " 未实现";
                    }
                }, {
                    key: 54,
                    value: function(e, t) {
                        throw e[0] + " 未实现";
                    }
                }, {
                    key: 47,
                    value: function(e, t) {
                        throw e[0] + " 未实现";
                    }
                }, {
                    key: 49,
                    value: function(e, t) {
                        throw e[0] + " 未实现";
                    }
                }, {
                    key: 48,
                    value: function(e, t) {
                        throw e[0] + " 未实现";
                    }
                }, {
                    key: 30,
                    value: function(e, t) {
                        throw e[0] + " 未实现";
                    }
                }, {
                    key: 52,
                    value: function(e, t) {
                        throw e[0] + " 未实现";
                    }
                }, {
                    key: 50,
                    value: function(e, t) {
                        throw e[0] + " 未实现";
                    }
                }, {
                    key: 51,
                    value: function(e, t) {
                        throw e[0] + " 未实现";
                    }
                }, {
                    key: 57,
                    value: function(e, t) {
                        throw e[0] + " 未实现";
                    }
                }, {
                    key: 66,
                    value: function(e, t) {
                        throw e[0] + " 未实现";
                    }
                }, {
                    key: 23,
                    value: function(e, t) {
                        throw e[0] + " 未实现";
                    }
                }, {
                    key: 46,
                    value: function(e, t) {
                        throw e[0] + " 未实现";
                    }
                }, {
                    key: 45,
                    value: function(e, t) {
                        throw e[0] + " 未实现";
                    }
                }, {
                    key: 67,
                    value: function(e, t) {
                        throw e[0] + " 未实现";
                    }
                }, {
                    key: 58,
                    value: function(e, t) {
                        throw e[0] + " 未实现";
                    }
                }, {
                    key: 59,
                    value: function(e, t) {
                        throw e[0] + " 未实现";
                    }
                }, {
                    key: 60,
                    value: function(e, t) {
                        throw e[0] + " 未实现";
                    }
                }, {
                    key: 61,
                    value: function(e, t) {
                        throw e[0] + " 未实现";
                    }
                }, {
                    key: 63,
                    value: function(e, t) {
                        throw e[0] + " 未实现";
                    }
                }, {
                    key: 62,
                    value: function(e, t) {
                        throw e[0] + " 未实现";
                    }
                }, {
                    key: 64,
                    value: function(e, t) {
                        throw e[0] + " 未实现";
                    }
                }, {
                    key: 65,
                    value: function(e, t) {
                        throw e[0] + " 未实现";
                    }
                } ]), u;
            }();
            u.default = y;
        },
        "./src/break_signal.ts": function(e, n) {
            Object.defineProperty(n, "__esModule", {
                value: !0
            }), n.default = function() {
                function e() {
                    t(this, e), this.BREAK_SIGNAL = {}, this.CONTINUE_SIGNAL = {}, this.RETURN_SIGNAL = {};
                }
                return a(e, [ {
                    key: "createBreakSignal",
                    value: function() {
                        return this.BREAK_SIGNAL;
                    }
                }, {
                    key: "createContinueSignal",
                    value: function() {
                        return this.CONTINUE_SIGNAL;
                    }
                }, {
                    key: "createReturnSignal",
                    value: function(e) {
                        return {
                            signal: this.RETURN_SIGNAL,
                            data: e
                        };
                    }
                }, {
                    key: "isBreakSignal",
                    value: function(e) {
                        return e === this.BREAK_SIGNAL;
                    }
                }, {
                    key: "isContinueSignal",
                    value: function(e) {
                        return e === this.CONTINUE_SIGNAL;
                    }
                }, {
                    key: "isReturnSignal",
                    value: function(e) {
                        return !!e && e.signal === this.RETURN_SIGNAL;
                    }
                } ]), e;
            }();
        },
        "./src/constant_table.ts": function(e, t) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = {
                NON_EXISTENT_INIT: {}
            };
        },
        "./src/jsvm.ts": function(e, n, r) {
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var i = r("./src/scope.ts");
            n.Scope = i.default;
            var o = r("./src/ast_map.ts"), u = r("./src/lib.ts");
            n.default = function() {
                function e(n, r, a) {
                    if (t(this, e), this.__throw_variable_not_defined_exception__ = !0, this.__on_error__ = function() {}, 
                    this.__context__ = new i.default("root", null), this.__callstack__ = [], this.__context__.const("this", n), 
                    this.__inject_vars__ = r, r && this.inject(r), this.___inject_global_variable__(), 
                    a) {
                        var o = a.ThrowVariableNotDefinedException, s = void 0 === o || o, l = a.onError;
                        l && (this.__on_error__ = l, this.__context__.__set_error_handler__(l)), !1 === s && (this.__throw_variable_not_defined_exception__ = s, 
                        i.default.prototype.__get__ = u.scope_get_dont_throw_error);
                    }
                }
                return a(e, [ {
                    key: "init",
                    value: function(e, t) {
                        var n = this;
                        this.__context__ = new i.default("root", null), this.__callstack__ = [], this.__context__.const("this", e), 
                        t && Object.keys(t).forEach(function(e) {
                            return n.__context__.var(e, t[e]);
                        }), this.___inject_global_variable__();
                    }
                }, {
                    key: "___inject_global_variable__",
                    value: function() {
                        var e = this, t = {
                            console: console,
                            setTimeout: setTimeout,
                            setInterval: setInterval,
                            clearTimeout: clearTimeout,
                            clearInterval: clearInterval,
                            encodeURI: encodeURI,
                            encodeURIComponent: encodeURIComponent,
                            decodeURI: decodeURI,
                            decodeURIComponent: decodeURIComponent,
                            escape: escape,
                            unescape: unescape,
                            Infinity: 1 / 0,
                            NaN: NaN,
                            isFinite: isFinite,
                            isNaN: isNaN,
                            parseFloat: parseFloat,
                            parseInt: parseInt,
                            Object: Object,
                            Function: Function,
                            Boolean: Boolean,
                            Error: Error,
                            EvalError: EvalError,
                            RangeError: RangeError,
                            ReferenceError: ReferenceError,
                            SyntaxError: SyntaxError,
                            TypeError: TypeError,
                            URIError: URIError,
                            Number: Number,
                            Math: Math,
                            undefined: void 0,
                            Date: Date,
                            String: String,
                            RegExp: RegExp,
                            Array: Array,
                            JSON: JSON,
                            Promise: Promise,
                            Symbol: Symbol,
                            Set: Set,
                            Map: Map
                        };
                        Object.keys(t).forEach(function(n) {
                            return e.__context__.const(n, t[n]);
                        });
                    }
                }, {
                    key: "execute",
                    value: function(e) {
                        return "string" == typeof e && (e = JSON.parse(e)), new o.default(e, this.__context__).run();
                    }
                }, {
                    key: "inject",
                    value: function(e) {
                        var t = this;
                        e && Object.keys(e).forEach(function(n) {
                            return t.__context__.var(n, e[n]);
                        });
                    }
                }, {
                    key: "getRootScope",
                    value: function() {
                        return this.__context__;
                    }
                }, {
                    key: "runInScope",
                    value: function(e, t, n) {
                        if (n) {
                            var r = n.ThrowVariableNotDefinedException, a = n.onError;
                            a && e.__set_error_handler__(a), r !== this.__throw_variable_not_defined_exception__ && (this.__throw_variable_not_defined_exception__ = r, 
                            i.default.prototype.__get__ = r ? u.scope_get_throw_error : u.scope_get_dont_throw_error);
                        }
                        if (e instanceof i.default) return "string" == typeof t && (t = JSON.parse(t)), 
                        new o.default(t, e, n).run();
                        throw new Error("scope must be instance of Scope");
                    }
                }, {
                    key: "getVariable",
                    value: function(e) {
                        return this.__context__.__get__(e);
                    }
                }, {
                    key: "reset",
                    value: function() {
                        var e = this, t = this.__context__.__get__("this");
                        this.__context__ = new i.default("root", null), this.__callstack__ = [], this.__context__.const("this", t), 
                        this.__inject_vars__ && Object.keys(this.__inject_vars__).forEach(function(t) {
                            return e.__context__.var(t, e.__inject_vars__ && e.__inject_vars__[t]);
                        }), this.___inject_global_variable__();
                    }
                } ]), e;
            }();
        },
        "./src/lib.ts": function(e, t) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.scope_get_throw_error = function(e) {
                var t = this[e];
                if (t) return t.value;
                throw new ReferenceError(e + " is not defined");
            }, t.scope_get_dont_throw_error = function(e) {
                var t = this[e];
                return t ? t.value : void 0;
            };
        },
        "./src/scope.ts": function(n, r, o) {
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var u = o("./src/constant_table.ts");
            r.default = function() {
                function n(e, r, i, a) {
                    return t(this, n), this.__id__ = "UN-IDENTIFIED", this.__type__ = "block", this.__variables__ = new Map(), 
                    this.__parent__ = null, this.__function_parent__ = null, this.__children__ = [], 
                    this.__on_error__ = function(e) {
                        return console.log(e);
                    }, "root" === e ? (this.__type__ = e, this.__variables__ = new Map(), this.__parent__ = r, 
                    i && (this.__id__ = i), this) : this.__create_child_scope__(e, r, a);
                }
                return a(n, [ {
                    key: "__create_child_scope__",
                    value: function(e, t, n) {
                        var r = Object.create(t || null);
                        return r.__type__ = e, r.__variables__ = new Map(), r.__parent__ = t, r.__function_parent__ = null, 
                        r.__children__ = n || [], r;
                    }
                }, {
                    key: "__add_children__",
                    value: function(t) {
                        if (t) {
                            var n;
                            Array.isArray(t) ? (n = this.__children__).push.apply(n, e(t)) : this.__children__.push(t);
                        }
                    }
                }, {
                    key: "__has_variable_in_chain__",
                    value: function(e) {
                        return void 0 !== this[e];
                    }
                }, {
                    key: "__has_variable__",
                    value: function(e) {
                        return this.__variables__.has(e);
                    }
                }, {
                    key: "__get_dec_type__",
                    value: function(e) {
                        return this[e].decType;
                    }
                }, {
                    key: "__get__",
                    value: function(e) {
                        var t = this[e];
                        if (t) return t.value;
                        throw new ReferenceError(e + " is not defined");
                    }
                }, {
                    key: "__set__",
                    value: function(e, t) {
                        var n = this[e];
                        if (n) {
                            if ("const" === n.decType) throw new TypeError("Assignment to constant variable.");
                            return n.value = t, n.value;
                        }
                        throw new ReferenceError(e + " is not defined");
                    }
                }, {
                    key: "__remove__",
                    value: function(e) {
                        return !!this[e] && (delete this[e] && this.__variables__.delete(e));
                    }
                }, {
                    key: "var",
                    value: function(e, t, n, r) {
                        this.__function_declaration__("var", e, t, n, r);
                    }
                }, {
                    key: "function",
                    value: function(e, t, n, r) {
                        this.__function_declaration__("function", e, t, n, r);
                    }
                }, {
                    key: "let",
                    value: function(e, t, n, r) {
                        this.__block_declaration__("let", e, t, n, r);
                    }
                }, {
                    key: "const",
                    value: function(e, t, n) {
                        this.__block_declaration__("const", e, t, n);
                    }
                }, {
                    key: "__serialize__",
                    value: function() {
                        var e = {}, t = !0, n = !1, r = void 0;
                        try {
                            for (var a, o = this.__variables__[Symbol.iterator](); !(t = (a = o.next()).done); t = !0) {
                                var u = i(a.value, 2), s = u[0], l = u[1];
                                e[s] = l;
                            }
                        } catch (e) {
                            n = !0, r = e;
                        } finally {
                            try {
                                !t && o.return && o.return();
                            } finally {
                                if (n) throw r;
                            }
                        }
                        return {
                            id: this.__id__,
                            type: this.__type__,
                            parentId: this.__parent__ ? this.__parent__.__id__ : null,
                            functionParentId: this.__function_parent__ ? this.__function_parent__.__id__ : null,
                            variables: e
                        };
                    }
                }, {
                    key: "__set_error_handler__",
                    value: function(e) {
                        this.__on_error__ = e;
                    }
                }, {
                    key: "__handle_error__",
                    value: function(e) {
                        this.__on_error__(e);
                    }
                }, {
                    key: "__find_parent_function_scope__",
                    value: function(e) {
                        if (e) {
                            var t = e.__parent__ ? e.__parent__.__type__ : null;
                            return "function" === t || "root" === t ? e.__parent__ || null : e.__find_parent_function_scope__(e.__parent__);
                        }
                        return null;
                    }
                }, {
                    key: "__block_declaration__",
                    value: function(e, t, n, r, i) {
                        if (this.__variables__.has(t)) throw new SyntaxError("Uncaught SyntaxError: Identifier '" + t + "' has already been declared");
                        var a = {
                            decType: e,
                            value: n === u.default.NON_EXISTENT_INIT ? void 0 : n
                        };
                        this.__variables__.set(t, a);
                        var o = this, s = function(e) {
                            var n = o[t];
                            return n.value = e, o.__variables__.set(t, n), i && "function" == typeof i && i(), 
                            n;
                        };
                        return "const" === e && (s = function() {
                            throw new TypeError("Assignment to constant variable");
                        }), Object.defineProperty(this, t, {
                            configurable: !0,
                            enumerable: !0,
                            get: function() {
                                return r && "function" == typeof r && r(), o.__variables__.get(t);
                            },
                            set: s
                        }), a;
                    }
                }, {
                    key: "__function_declaration__",
                    value: function(e, t, n, r, i) {
                        var a = this.__variables__.get(t);
                        if (a) {
                            var o = a.decType;
                            if ("let" === o || "const" === o) throw SyntaxError("Uncaught SyntaxError: Identifier '" + t + "' has already been declared");
                            return n !== u.default.NON_EXISTENT_INIT && (a.decType = e, a.value = n), a;
                        }
                        if ("function" === this.__type__ || "root" === this.__type__) {
                            var s = {
                                decType: e,
                                value: n === u.default.NON_EXISTENT_INIT ? void 0 : n
                            };
                            this.__variables__.set(t, s);
                            var l = this;
                            return Object.defineProperty(this, t, {
                                configurable: !0,
                                enumerable: !0,
                                get: function() {
                                    return r && "function" == typeof r && r(), l.__variables__.get(t);
                                },
                                set: function(e) {
                                    var n = l[t];
                                    return n.value = e, l.__variables__.set(t, n), i && "function" == typeof i && i(), 
                                    n;
                                }
                            }), s;
                        }
                        if (this.__function_parent__ || (this.__function_parent__ = this.__find_parent_function_scope__(this)), 
                        this.__function_parent__) {
                            var c = this.__function_parent__.__function_declaration__(e, t, n, r, i);
                            if (c) return this.__variables__.set(t, c), c;
                            throw new Error("执行器内部错误，上层function作用域返回一个空的变量");
                        }
                        throw new Error("执行器内部错误，无法找到一个合适的作用域声明" + e + "类型的变量");
                    }
                } ]), n;
            }();
        },
        "./src/stack.ts": function(e, n) {
            function r(e) {
                return Array.isArray(e) && Number.isInteger(e[0]) && e[0] >= 0 && e[0] < Object.keys(s).length && u[s[e[0]]].length >= e.length;
            }
            function i(e, t) {
                r(e) && t(e), Object.keys(e).forEach(function(n) {
                    var r = e[n];
                    Array.isArray(r) && i(e[n], t);
                });
            }
            function o(e, t) {
                var n = 0, r = Array.from(t, function() {
                    return {
                        id: -1,
                        scope: ""
                    };
                });
                return i(e, function(e) {
                    var i = t.findIndex(function(t) {
                        return t.node === e;
                    });
                    -1 !== i && r.splice(i, 1, {
                        id: n,
                        scope: t[i].scope.__serialize__()
                    }), n++;
                }), r;
            }
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var u = {
                Comment: [ "type", "value" ],
                Program: [ "type", "sourceType", "body", "comments" ],
                EmptyStatement: [ "type" ],
                BlockStatement: [ "type", "body", "innerComments" ],
                ExpressionStatement: [ "type", "expression" ],
                IfStatement: [ "type", "test", "consequent", "alternate" ],
                LabeledStatement: [ "type", "label", "body" ],
                BreakStatement: [ "type", "label" ],
                ContinueStatement: [ "type", "label" ],
                WithStatement: [ "type", "object", "body" ],
                SwitchStatement: [ "type", "discriminant", "cases" ],
                ReturnStatement: [ "type", "argument" ],
                ThrowStatement: [ "type", "argument" ],
                TryStatement: [ "type", "block", "handler", "finalizer" ],
                WhileStatement: [ "type", "test", "body" ],
                DoWhileStatement: [ "type", "body", "test" ],
                ForStatement: [ "type", "init", "test", "update", "body" ],
                ForInStatement: [ "type", "left", "right", "body" ],
                DebuggerStatement: [ "type" ],
                FunctionDeclaration: [ "type", "id", "body", "params", "generator", "async" ],
                VariableDeclaration: [ "type", "declarations", "kind" ],
                VariableDeclarator: [ "type", "id", "init" ],
                ThisExpression: [ "type" ],
                ArrayExpression: [ "type", "elements" ],
                ObjectExpression: [ "type", "properties" ],
                Property: [ "type", "key", "value", "kind", "method", "shorthand", "computed" ],
                FunctionExpression: [ "type", "id", "body", "params", "generator", "async" ],
                SequenceExpression: [ "type", "expressions" ],
                UnaryExpression: [ "type", "operator", "prefix", "argument" ],
                BinaryExpression: [ "type", "operator", "left", "right" ],
                AssignmentExpression: [ "type", "operator", "left", "right" ],
                UpdateExpression: [ "type", "operator", "argument", "prefix" ],
                LogicalExpression: [ "type", "operator", "left", "right" ],
                ConditionalExpression: [ "type", "test", "alternate", "consequent" ],
                CallExpression: [ "type", "callee", "arguments" ],
                NewExpression: [ "type", "callee", "arguments" ],
                MemberExpression: [ "type", "object", "property", "computed" ],
                SwitchCase: [ "type", "test", "consequent" ],
                CatchClause: [ "type", "param", "body" ],
                Identifier: [ "type", "name" ],
                Literal: [ "type", "value", "raw", "regex" ],
                ForOfStatement: [ "type", "left", "right", "body" ],
                Super: [ "type" ],
                SpreadElement: [ "type", "argument" ],
                ArrowFunctionExpression: [ "type", "expression", "body", "params", "generator", "async" ],
                YieldExpression: [ "type", "argument", "delegate" ],
                TemplateLiteral: [ "type", "quasis", "expressions" ],
                TaggedTemplateExpression: [ "type", "tag", "quasi" ],
                TemplateElement: [ "type", "tail", "value" ],
                AssignmentProperty: [ "type", "key", "value", "kind", "method", "shorthand", "computed" ],
                ObjectPattern: [ "type", "properties" ],
                ArrayPattern: [ "type", "elements" ],
                RestElement: [ "type", "argument" ],
                AssignmentPattern: [ "type", "left", "right" ],
                ClassBody: [ "type", "body" ],
                MethodDefinition: [ "type", "key", "value", "kind", "computed", "static" ],
                ClassDeclaration: [ "type", "id", "superClass", "body" ],
                ClassExpression: [ "type", "id", "superClass", "body" ],
                MetaProperty: [ "type", "meta", "property" ],
                ImportDeclaration: [ "type", "specifiers", "source" ],
                ImportSpecifier: [ "type", "imported", "local" ],
                ImportDefaultSpecifier: [ "type", "local" ],
                ImportNamespaceSpecifier: [ "type", "local" ],
                ExportNamedDeclaration: [ "type", "declaration", "specifiers", "source", "" ],
                ExportSpecifier: [ "type", "exported", "local" ],
                ExportDefaultDeclaration: [ "type", "declaration" ],
                ExportAllDeclaration: [ "type", "source" ],
                AwaitExpression: [ "type", "argument" ]
            }, s = {
                0: "Comment",
                1: "Program",
                2: "Identifier",
                3: "Literal",
                4: "ExpressionStatement",
                5: "BlockStatement",
                6: "EmptyStatement",
                7: "DebuggerStatement",
                8: "WithStatement",
                9: "ReturnStatement",
                10: "LabeledStatement",
                11: "BreakStatement",
                12: "ContinueStatement",
                13: "IfStatement",
                14: "SwitchStatement",
                15: "SwitchCase",
                16: "ThrowStatement",
                17: "TryStatement",
                18: "CatchClause",
                19: "WhileStatement",
                20: "DoWhileStatement",
                21: "ForStatement",
                22: "ForInStatement",
                23: "ForOfStatement",
                24: "FunctionDeclaration",
                25: "VariableDeclaration",
                26: "VariableDeclarator",
                27: "ThisExpression",
                28: "ArrayExpression",
                29: "ObjectExpression",
                30: "ObjectPattern",
                31: "Property",
                32: "FunctionExpression",
                33: "UnaryExpression",
                34: "UpdateExpression",
                35: "BinaryExpression",
                36: "AssignmentExpression",
                37: "LogicalExpression",
                38: "MemberExpression",
                39: "ConditionalExpression",
                40: "CallExpression",
                41: "NewExpression",
                42: "SequenceExpression",
                43: "Super",
                44: "SpreadElement",
                45: "ArrowFunctionExpression",
                46: "YieldExpression",
                47: "TemplateLiteral",
                48: "TaggedTemplateExpression",
                49: "TemplateElement",
                50: "ArrayPattern",
                51: "RestElement",
                52: "AssignmentPattern",
                53: "ClassBody",
                54: "MethodDefinition",
                55: "ClassDeclaration",
                56: "ClassExpression",
                57: "MetaProperty",
                58: "ImportDeclaration",
                59: "ImportSpecifier",
                60: "ImportDefaultSpecifier",
                61: "ImportNamespaceSpecifier",
                62: "ExportNamedDeclaration",
                63: "ExportSpecifier",
                64: "ExportDefaultDeclaration",
                65: "ExportAllDeclaration",
                66: "AwaitExpression",
                67: "AssignmentProperty"
            };
            n.getNodeID = o, n.CallStack = function() {
                function e(n, r, i) {
                    t(this, e), this.stack = [], this.errorHandler = function() {
                        var e;
                        return (e = console).log.apply(e, arguments);
                    }, this.ast = n, i && (this.errorHandler = i), this.scope = r;
                }
                return a(e, [ {
                    key: "pushStack",
                    value: function(e) {
                        this.stack.push(e);
                    }
                }, {
                    key: "intercept",
                    value: function(e) {
                        try {
                            return e(this.ast, this.scope);
                        } catch (e) {
                            var t = e.message, n = void 0 === t ? e.toString() : t, r = {
                                stack: o(this.ast, this.stack),
                                message: n,
                                originalStack: e.stack
                            };
                            this.stack = [], this.errorHandler(r);
                        }
                    }
                }, {
                    key: "handleAsyncError",
                    value: function(e, t) {
                        var n = e.message, r = void 0 === n ? e.toString() : n, i = {
                            stack: o(this.ast, this.stack),
                            message: r,
                            originalStack: e.stack
                        };
                        this.stack = [], this.errorHandler(i);
                    }
                } ]), e;
            }();
        }
    });
});