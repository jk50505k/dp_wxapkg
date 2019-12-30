function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var n = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var a = n[t];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(n, t, a) {
        return t && e(n.prototype, t), a && e(n, a), n;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function t() {
        e(this, t);
    }
    return n(t, [ {
        key: "init",
        value: function(e) {
            try {
                return wx.createCanvasContext(e || "myCanvas");
            } catch (e) {
                console.log("init error: " + e);
            }
        }
    }, {
        key: "_downLoadImage",
        value: function(e) {
            return new Promise(function(n, t) {
                -1 != e.url.search("http://") || -1 != e.url.search("https://") ? wx.downloadFile({
                    url: e.url,
                    success: function(e) {
                        console.log("download done: " + e.tempFilePath), n(e.tempFilePath);
                    },
                    fail: function(e) {
                        console.log("download file error: " + e), t(e);
                    }
                }) : n(e.url);
            });
        }
    }, {
        key: "_drawImage",
        value: function(e, n) {
            return new Promise(function(t, a) {
                n.dWidth && n.dHeight ? canvas._downLoadImage(n).then(function(a) {
                    e.drawImage(a, n.dx, n.dy, n.dWidth, n.dHeight), e.draw(!0, function() {
                        t();
                    });
                }).catch(function(e) {
                    a(e);
                }) : canvas._downLoadImage(n).then(function(a) {
                    e.drawImage(a, n.dx, n.dy), e.draw(!0, function() {
                        t();
                    });
                }).catch(function(e) {
                    a(e);
                });
            });
        }
    }, {
        key: "drawImage",
        value: function(e, n, t) {
            var a = n.map(function(n) {
                return canvas._drawImage(e, n);
            });
            return Promise.all(a).then(function(e) {
                return t && t(e);
            });
        }
    }, {
        key: "_drawText",
        value: function(e, n) {
            return new Promise(function(t) {
                e.setFillStyle(n.color || "#F5F5F5"), e.setFontSize(n.size), e.fillText(n.text, n.x, n.y), 
                e.draw(!0, function() {
                    t();
                });
            });
        }
    }, {
        key: "drawText",
        value: function(e, n, t) {
            var a = n.map(function(n) {
                return canvas._drawText(e, n);
            });
            return Promise.all(a).then(function(e) {
                return t && t(e);
            });
        }
    }, {
        key: "saveImage",
        value: function(e) {
            var n = e.x, t = e.y, a = e.width, o = e.height, r = e.canvasId;
            return new Promise(function(e, i) {
                wx.canvasToTempFilePath({
                    x: n || 0,
                    y: t || 0,
                    width: a,
                    height: o,
                    canvasId: r,
                    success: function(n) {
                        console.log("save file is: " + n.tempFilePath), e(n.tempFilePath);
                    },
                    fail: function(e) {
                        console.log("save canvas image failed: " + e), i(e);
                    }
                });
            });
        }
    }, {
        key: "saveImageToAlbum",
        value: function(e) {
            wx.saveImageToPhotosAlbum({
                filePath: e,
                success: function(e) {
                    console.log("save to album done: " + e.errMsg);
                },
                fail: function(e) {
                    console.log("save to album error: " + e);
                }
            });
        }
    } ]), t;
}();

exports.default = new t();