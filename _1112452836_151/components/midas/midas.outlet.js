var i = require("./config.js"), t = require("./event.js");

exports.triggerScroll = t.triggerScroll, exports.config = function(t) {
    i.config = Object.assign(i.config, t);
};

var n = function() {
    this[o] && this[o].apply(this, arguments), exports.triggerScroll();
}, o = "__$$curOnPageScroll$$__", e = "__$$curOnHide$$__", r = function i() {
    this[o] && (this.onPageScroll = this[o], this[o] = null), this.onPageScroll === n && (this.onPageScroll = null), 
    this[e] && (this[e].apply(this, arguments), this.onHide = this[e], this[e] = null), 
    this.onHide === i && (this.onHide = null);
};

exports.init = function() {
    var i = getCurrentPages(), t = i[i.length - 1];
    t.onPageScroll != n && (t[o] = t.onPageScroll, t.onPageScroll = n), t.onHide != r && (t[e] = t.onHide, 
    t.onHide = r);
};