var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(t, r) {
    "object" === ("undefined" == typeof exports ? "undefined" : e(exports)) ? module.exports = exports = r(require("./core"), require("./evpkdf")) : "function" == typeof define && define.amd ? define([ "./core", "./evpkdf" ], r) : r(t.CryptoJS);
}(void 0, function(e) {
    e.lib.Cipher || function(t) {
        var r = e, i = r.lib, n = i.Base, c = i.WordArray, o = i.BufferedBlockAlgorithm, s = r.enc;
        s.Utf8;
        var a = s.Base64, f = r.algo.EvpKDF, p = i.Cipher = o.extend({
            cfg: n.extend(),
            createEncryptor: function(e, t) {
                return this.create(this._ENC_XFORM_MODE, e, t);
            },
            createDecryptor: function(e, t) {
                return this.create(this._DEC_XFORM_MODE, e, t);
            },
            init: function(e, t, r) {
                this.cfg = this.cfg.extend(r), this._xformMode = e, this._key = t, this.reset();
            },
            reset: function() {
                o.reset.call(this), this._doReset();
            },
            process: function(e) {
                return this._append(e), this._process();
            },
            finalize: function(e) {
                return e && this._append(e), this._doFinalize();
            },
            keySize: 4,
            ivSize: 4,
            _ENC_XFORM_MODE: 1,
            _DEC_XFORM_MODE: 2,
            _createHelper: function() {
                function e(e) {
                    return "string" == typeof e ? k : v;
                }
                return function(t) {
                    return {
                        encrypt: function(r, i, n) {
                            return e(i).encrypt(t, r, i, n);
                        },
                        decrypt: function(r, i, n) {
                            return e(i).decrypt(t, r, i, n);
                        }
                    };
                };
            }()
        });
        i.StreamCipher = p.extend({
            _doFinalize: function() {
                return this._process(!0);
            },
            blockSize: 1
        });
        var d = r.mode = {}, u = i.BlockCipherMode = n.extend({
            createEncryptor: function(e, t) {
                return this.Encryptor.create(e, t);
            },
            createDecryptor: function(e, t) {
                return this.Decryptor.create(e, t);
            },
            init: function(e, t) {
                this._cipher = e, this._iv = t;
            }
        }), h = d.CBC = function() {
            function e(e, r, i) {
                var n = this._iv;
                if (n) {
                    c = n;
                    this._iv = t;
                } else var c = this._prevBlock;
                for (var o = 0; o < i; o++) e[r + o] ^= c[o];
            }
            var r = u.extend();
            return r.Encryptor = r.extend({
                processBlock: function(t, r) {
                    var i = this._cipher, n = i.blockSize;
                    e.call(this, t, r, n), i.encryptBlock(t, r), this._prevBlock = t.slice(r, r + n);
                }
            }), r.Decryptor = r.extend({
                processBlock: function(t, r) {
                    var i = this._cipher, n = i.blockSize, c = t.slice(r, r + n);
                    i.decryptBlock(t, r), e.call(this, t, r, n), this._prevBlock = c;
                }
            }), r;
        }(), l = (r.pad = {}).Pkcs7 = {
            pad: function(e, t) {
                for (var r = 4 * t, i = r - e.sigBytes % r, n = [], o = 0; o < i; o += 4) n.push(i << 24 | i << 16 | i << 8 | i);
                var s = c.create(n, i);
                e.concat(s);
            },
            unpad: function(e) {
                var t = 255 & e.words[e.sigBytes - 1 >>> 2];
                e.sigBytes -= t;
            }
        };
        i.BlockCipher = p.extend({
            cfg: p.cfg.extend({
                mode: h,
                padding: l
            }),
            reset: function() {
                p.reset.call(this);
                var e = this.cfg, t = e.iv, r = e.mode;
                if (this._xformMode == this._ENC_XFORM_MODE) i = r.createEncryptor; else {
                    var i = r.createDecryptor;
                    this._minBufferSize = 1;
                }
                this._mode && this._mode.__creator == i ? this._mode.init(this, t && t.words) : (this._mode = i.call(r, this, t && t.words), 
                this._mode.__creator = i);
            },
            _doProcessBlock: function(e, t) {
                this._mode.processBlock(e, t);
            },
            _doFinalize: function() {
                var e = this.cfg.padding;
                if (this._xformMode == this._ENC_XFORM_MODE) {
                    e.pad(this._data, this.blockSize);
                    t = this._process(!0);
                } else {
                    var t = this._process(!0);
                    e.unpad(t);
                }
                return t;
            },
            blockSize: 4
        });
        var y = i.CipherParams = n.extend({
            init: function(e) {
                this.mixIn(e);
            },
            toString: function(e) {
                return (e || this.formatter).stringify(this);
            }
        }), _ = (r.format = {}).OpenSSL = {
            stringify: function(e) {
                var t = e.ciphertext, r = e.salt;
                if (r) i = c.create([ 1398893684, 1701076831 ]).concat(r).concat(t); else var i = t;
                return i.toString(a);
            },
            parse: function(e) {
                var t = a.parse(e), r = t.words;
                if (1398893684 == r[0] && 1701076831 == r[1]) {
                    var i = c.create(r.slice(2, 4));
                    r.splice(0, 4), t.sigBytes -= 16;
                }
                return y.create({
                    ciphertext: t,
                    salt: i
                });
            }
        }, v = i.SerializableCipher = n.extend({
            cfg: n.extend({
                format: _
            }),
            encrypt: function(e, t, r, i) {
                i = this.cfg.extend(i);
                var n = e.createEncryptor(r, i), c = n.finalize(t), o = n.cfg;
                return y.create({
                    ciphertext: c,
                    key: r,
                    iv: o.iv,
                    algorithm: e,
                    mode: o.mode,
                    padding: o.padding,
                    blockSize: e.blockSize,
                    formatter: i.format
                });
            },
            decrypt: function(e, t, r, i) {
                return i = this.cfg.extend(i), t = this._parse(t, i.format), e.createDecryptor(r, i).finalize(t.ciphertext);
            },
            _parse: function(e, t) {
                return "string" == typeof e ? t.parse(e, this) : e;
            }
        }), m = (r.kdf = {}).OpenSSL = {
            execute: function(e, t, r, i) {
                i || (i = c.random(8));
                var n = f.create({
                    keySize: t + r
                }).compute(e, i), o = c.create(n.words.slice(t), 4 * r);
                return n.sigBytes = 4 * t, y.create({
                    key: n,
                    iv: o,
                    salt: i
                });
            }
        }, k = i.PasswordBasedCipher = v.extend({
            cfg: v.cfg.extend({
                kdf: m
            }),
            encrypt: function(e, t, r, i) {
                var n = (i = this.cfg.extend(i)).kdf.execute(r, e.keySize, e.ivSize);
                i.iv = n.iv;
                var c = v.encrypt.call(this, e, t, n.key, i);
                return c.mixIn(n), c;
            },
            decrypt: function(e, t, r, i) {
                i = this.cfg.extend(i), t = this._parse(t, i.format);
                var n = i.kdf.execute(r, e.keySize, e.ivSize, t.salt);
                return i.iv = n.iv, v.decrypt.call(this, e, t, n.key, i);
            }
        });
    }();
});