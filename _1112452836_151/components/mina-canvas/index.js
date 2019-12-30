var a = Object.assign || function(a) {
    for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (a[r] = t[r]);
    }
    return a;
}, e = require("../../public/logan"), t = require("../../common/pinkie"), r = [];

Component({
    properties: {
        canvasConfig: {
            type: Object,
            observer: "observerCanvas"
        },
        savetoalbum: {
            type: Boolean,
            value: !1,
            observer: function(a) {
                a && this.saveToAlbum();
            }
        }
    },
    data: {
        imagePath: "",
        picPath: ""
    },
    methods: {
        observerCanvas: function(a) {
            var e = this;
            a && a.configs && a.configs.length && this.draw().then(function() {
                a.needSave ? e.save() : e.saveToLocal();
            }).catch(function(a) {
                console.log("oberver canvas error: ", a);
            });
        },
        init: function(a) {
            var t = this;
            r = [];
            try {
                a.forEach(function(a) {
                    if ("image" === a.drawType) {
                        var e = a.url;
                        e && (0 === e.indexOf("https://") ? r.push(t._downLoadFile(e)) : r.push(e), a.hasUrl = !0);
                    }
                });
            } catch (a) {
                e.log("mina-canvas init error: " + JSON.stringify(a));
            }
        },
        draw: function() {
            var i = this, n = this, o = this.data.canvasConfig && this.data.canvasConfig.configs, s = n.data.canvasConfig.canvasId || "myCanvas", d = wx.createCanvasContext(s, n);
            return n.init(o), t.all(r).then(function(e) {
                var r = 0;
                return d.clearRect(0, 0, i.data.canvasConfig.width, i.data.canvasConfig.height), 
                o.forEach(function(t) {
                    "image" === t.drawType ? t.hasUrl ? (n._drawImage(d, a({}, t, {
                        url: e[r]
                    })), r++) : n._drawImage(d, t) : "text" === t.drawType && n._drawText(d, t);
                }), new t(function(a) {
                    d.draw(!0, function() {
                        a();
                    });
                });
            }).catch(function(a) {
                e.log("mina-canvas draw error: " + JSON.stringify(a));
            });
        },
        save: function() {
            var a = this, t = this.data.canvasConfig.canvasId || "myCanvas";
            wx.canvasToTempFilePath({
                canvasId: t,
                success: function(e) {
                    a.triggerEvent("savecanvas", {
                        url: e.tempFilePath
                    }, {
                        bubbles: !0
                    }), a.setData({
                        imagePath: e.tempFilePath
                    });
                },
                fail: function(t) {
                    a.setData({
                        imagePath: ""
                    }), e.log("mina-canvas save error: " + JSON.stringify(t));
                }
            }, this);
        },
        saveToLocal: function() {
            var a = this, t = this.data.canvasConfig.canvasId || "myCanvas";
            wx.canvasToTempFilePath({
                canvasId: t,
                success: function(e) {
                    a.setData({
                        picPath: e.tempFilePath
                    });
                },
                fail: function(t) {
                    a.setData({
                        picPath: ""
                    }), e.log("mina-canvas save error: " + JSON.stringify(t));
                }
            }, this);
        },
        saveToAlbum: function() {
            var a = this;
            this.data.picPath ? wx.saveImageToPhotosAlbum({
                filePath: this.data.picPath,
                success: function() {
                    a.triggerEvent("savesuccess"), a.setData({
                        savetoalbum: !1
                    });
                },
                fail: function(t) {
                    e.log("mina-canvas save album error: " + JSON.stringify(t)), wx.showToast({
                        title: "保存失败",
                        icon: "none"
                    }), a.setData({
                        savetoalbum: !1
                    });
                }
            }) : wx.showToast({
                title: "保存失败, 请返回刷新再试",
                icon: "none"
            });
        },
        _drawText: function(a, e) {
            a.save();
            var t = e.color, r = e.size, i = e.align, n = e.bold, o = e.text, s = e.x, d = e.y;
            t && a.setFillStyle(t), r && a.setFontSize(r), i && a.setTextAlign(i);
            var c = wx.canIUse("canvasContext.font");
            if (n && r && c) {
                var l = r + "px", h = "normal bold " + l + " PingFangSC";
                try {
                    a.font = h;
                } catch (e) {
                    h = "normal bold " + l + " sans-serif", a.font = h;
                }
            }
            a.fillText(o, s, d), a.restore();
        },
        _drawImage: function(a, e) {
            var t = e.type;
            if (t) switch (t) {
              case "mask":
                this._drawMaskImage(a, e);
                break;

              case "circle":
                this._drawCircleImage(a, e);
                break;

              case "loop":
                this._drawLoopImage(a, e);
                break;

              case "bkgcolor":
                this._drawBkgColorImage(a, e);
                break;

              case "radiusrect":
                this._drawRadiusRect(a, e);
                break;

              case "radiusimage":
                this._drawRadiusImage(a, e);
                break;

              case "shadow":
                this._drawShadow(a, e);
                break;

              case "line":
                this._drawLine(a, e);
                break;

              case "vline":
                this._drawVLine(a, e);
                break;

              case "rect":
                this._drawRect(a, e);
                break;

              case "linear":
                this._drawLinear(a, e);
                break;

              case "linearradiusrect":
                this._drawLinearRadiusRect(a, e);
                break;

              default:
                this._drawCommonImage(a, e);
            } else this._drawCommonImage(a, e);
        },
        _drawCommonImage: function(a, e) {
            a.save();
            var t = e.url, r = e.dx, i = e.dy, n = e.dWidth, o = e.dHeight;
            a.drawImage(t, r, i, n, o), a.restore();
        },
        _drawMaskImage: function(a, e) {
            a.save();
            var t = e.dx, r = e.dy, i = e.dWidth, n = e.dHeight, o = a.createLinearGradient(t, r, t, r + n);
            o.addColorStop(0, "rgba(32, 32, 32, 0)"), o.addColorStop(.5, "rgba(50, 50, 50, 0.5)"), 
            o.addColorStop(1, "rgba(0, 0, 0, 1)"), a.setFillStyle(o), a.fillRect(t, r, i, n), 
            a.restore();
        },
        _drawLoopImage: function(a, e) {
            var t = e.dx, r = e.dy, i = e.radius, n = e.startAngle, o = e.endAngle, s = e.color, d = e.lineWidth;
            a.beginPath(), a.arc(t, r, i, n, o, !1), a.lineWidth = d, a.strokeStyle = s, a.lineCap = "round", 
            a.stroke(), a.closePath();
        },
        _drawCircleImage: function(a, e) {
            var t = e.url, r = e.dx, i = e.dy, n = e.r;
            a.save();
            var o = 2 * n;
            a.beginPath(), a.arc(r + n, i + n, n, 0, 2 * Math.PI), a.clip(), a.drawImage(t, r, i, o, o), 
            a.restore();
        },
        _drawBkgColorImage: function(a, e) {
            a.save();
            var t = e.color, r = e.dx, i = e.dy, n = e.dWidth, o = e.dHeight;
            a.setFillStyle(t), a.fillRect(r, i, n, o), a.restore();
        },
        _drawRadiusRect: function(a, e) {
            var t = e.dx, r = e.dy, i = e.dWidth, n = e.dHeight, o = e.radius, s = e.color;
            if (2 * o > i || 2 * o > n) return !1;
            a.save(), a.translate(t, r), this.__drawRoundRectPath(a, {
                dWidth: i,
                dHeight: n,
                radius: o
            }), a.setFillStyle(s), a.fill(), a.restore();
        },
        _drawRadiusImage: function(a, e) {
            var t = e.dx, r = e.dy, i = e.dWidth, n = e.dHeight, o = e.radius, s = e.url;
            a.save(), a.translate(t, r), this.__drawRoundRectPath(a, {
                dWidth: i,
                dHeight: n,
                radius: o
            }), a.clip(), a.drawImage(s, 0, 0, i, n), a.restore();
        },
        _drawRect: function(a, e) {
            var t = e.shadow, r = e.shadowColor, i = e.ox, n = e.oy, o = e.blur, s = e.dx, d = e.dy, c = e.dWidth, l = e.dHeight, h = e.recColor;
            a.save(), a.setFillStyle(h), t && a.setShadow(i, n, o, r), a.fillRect(s, d, c, l), 
            a.restore();
        },
        _drawLinear: function(a, e) {
            var t = e.sx, r = e.sy, i = e.lx, n = e.ly, o = e.dWidth, s = e.dHeight, d = e.sColor, c = e.eColor;
            a.save();
            var l = a.createLinearGradient(0, 0, i, n);
            l.addColorStop(0, d), l.addColorStop(1, c), a.setFillStyle(l), a.fillRect(t, r, o, s), 
            a.restore();
        },
        _drawLinearRadiusRect: function(a, e) {
            var t = e.dx, r = e.dy, i = e.lx, n = e.ly, o = e.dWidth, s = e.dHeight, d = e.sColor, c = e.eColor, l = e.radius;
            a.save();
            var h = a.createLinearGradient(0, 0, i, n);
            h.addColorStop(0, d), h.addColorStop(1, c), this._drawRadiusRect(a, {
                dx: t,
                dy: r,
                dWidth: o,
                dHeight: s,
                radius: l,
                color: h
            }), a.restore();
        },
        __drawRoundRectPath: function(a, e) {
            var t = e.dWidth, r = e.dHeight, i = e.radius;
            a.beginPath(0), a.arc(t - i, r - i, i, 0, Math.PI / 2), a.lineTo(i, r), a.arc(i, r - i, i, Math.PI / 2, Math.PI), 
            a.lineTo(0, i), a.arc(i, i, i, Math.PI, 3 * Math.PI / 2), a.lineTo(t - i, 0), a.arc(t - i, i, i, 3 * Math.PI / 2, 2 * Math.PI), 
            a.lineTo(t, r - i), a.closePath();
        },
        _drawLine: function(a, e) {
            var t = e.dx, r = e.dy, i = e.width, n = e.color, o = e.lineWidth;
            a.save(), a.rect(t, r, i, o), a.setFillStyle(n), a.restore();
        },
        _drawVLine: function(a, e) {
            var t = e.dx, r = e.dy, i = e.height, n = e.color, o = e.lineWidth;
            a.save(), a.rect(t, r, o, i), a.setFillStyle(n), a.restore();
        },
        _downLoadFile: function(a) {
            return new t(function(e, t) {
                wx.downloadFile({
                    url: a,
                    success: function(a) {
                        e(a.tempFilePath);
                    },
                    fail: function(a) {
                        t(a);
                    }
                });
            });
        }
    }
});