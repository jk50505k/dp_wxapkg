function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var l = t[n];
            l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), 
            Object.defineProperty(e, l.key, l);
        }
    }
    return function(t, n, l) {
        return n && e(t.prototype, n), l && e(t, l), t;
    };
}(), n = exports.Polling = function() {
    function n(t) {
        e(this, n), this.callbacks = [], this.interval = t || 3e4;
    }
    return t(n, [ {
        key: "launch",
        value: function() {
            var e = this;
            this.pollId || setInterval(function() {
                e.callbacks.forEach(function(e) {
                    return e();
                });
            }, this.interval);
        }
    }, {
        key: "stop",
        value: function() {
            this.pollId && clearInterval(this.pollId);
        }
    }, {
        key: "register",
        value: function(e) {
            -1 === this.callbacks.indexOf(e) && this.callbacks.push(e), this.launch();
        }
    }, {
        key: "unregister",
        value: function(e) {
            var t = this.callbacks.indexOf(e);
            this.callbacks.splice(t, 1);
        }
    } ]), n;
}();

exports.default = new n();