var t = require("../../../../npm/@dp/owl-wxapp/es6/index.js"), o = require("../../../../npm/@dp/sparrow/index.js"), e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../npm/@dp/logan-wxapp/build/wxlogan.js")), a = require("../../../../config/index"), i = {
    ktvModuleViewBid: "b_zp1amt9q",
    ktvDateSelectBid: "b_gkkkle15",
    ktvRoomSelectBid: "b_7lzspxci",
    ktvBookingBntBid: "b_rn8i3a4u"
}, n = {
    KTV_BOOKING: "/mapi/fun/shopdetailktvbooktable2.json2"
};

Component({
    behaviors: [],
    properties: {
        bookData: {
            type: Object,
            observer: "_bookDataChange"
        },
        shopOptions: {
            type: Object,
            vaule: null,
            observer: "_shopOptionsChange"
        },
        moduleConfig: {
            type: Object
        },
        lxData: {
            type: Object
        }
    },
    data: {
        showModule: !1
    },
    ready: function() {},
    methods: {
        ktvBookBntTap: function(t) {
            var e = t.currentTarget.dataset.url;
            o.lxmina.moduleClick(i.ktvBookingBntBid, this.data.lxData), o.navigation.navigateTo({
                url: e,
                type: "h5"
            });
        },
        selectDate: function(t) {
            var e = this.data.bookData, a = t.currentTarget.dataset.index;
            e.bookTypeIndex = 0, e.dateIndex = a, this._parseBookData(e), o.lxmina.moduleClick(i.ktvRoomSelectBid, this.data.lxData);
        },
        selectRoomType: function(t) {
            var e = this.data.bookData;
            e.bookTypeIndex = t.currentTarget.dataset.index, this._parseBookData(e), o.lxmina.moduleClick(i.ktvRoomSelectBid, this.data.lxData);
        },
        showMoreRooms: function() {
            var t = this.data.bookData;
            t.showMoreRooms = !1, t.hideRoomsFlag = !1, this.setData({
                bookData: t
            });
        },
        _filterRoomsNums: function(t) {
            var o = t || {}, e = o.ktvBookDates[o.dateIndex].ktvRoomTypes[o.bookTypeIndex].ktvBookRooms;
            return e && e.length > 3 ? o.showMoreRooms = !0 : o.showMoreRooms = !1, o;
        },
        _bookDataChange: function(t, o) {
            var e = this.data.bookData;
            e && e.ktvBookDates ? this._parseBookData(t, {
                init: !0
            }) : t && t.ktvBookDates && this._parseBookData(t, {
                init: !0
            });
        },
        _shopOptionsChange: function(a, s) {
            var r = this, d = this.data.bookData;
            if ((!d || !d.ktvBookDates) && a) {
                var p = a.shopId, k = a.shopUuid, l = {
                    token: getApp().getToken(),
                    clienttype: "miniprogram"
                };
                k ? l.shopuuid = k : l.shopId = p, o.wxp.request({
                    url: this._getDomain() + n.KTV_BOOKING,
                    data: l
                }).then(function(e) {
                    e && e.data && 200 == e.data.code && e.data.data ? (r.setData({
                        bookData: e.data.data
                    }), o.lxmina.moduleView(i.ktvModuleViewBid, r.data.lxData)) : t.owl.error.addError("ktv预订接口reject:", JSON.stringify(e.statusCode));
                }).catch(function(t) {
                    e.default.log("ktv error: " + t);
                });
            }
        },
        _parseBookData: function(t, o) {
            var e = t || {};
            if (e.hideRoomsFlag = !0, o && o.init && (e.dateIndex = 0, e.bookTypeIndex = 0), 
            e.ktvBookDates && e.ktvBookDates.length > 0) {
                var a = e.ktvBookDates[e.dateIndex].ktvRoomTypes;
                if (a && a.length > 0) {
                    var i = this._filterRoomsNums(e), n = a[e.bookTypeIndex].ktvBookRooms, s = this._parseRichTextStyle(n);
                    e.showMoreRooms = i.showMoreRooms, e.richTextStyle = s, e.showTimePanel = !0;
                } else e.showTimePanel = !1;
                this.setData({
                    bookData: e,
                    showModule: !0
                });
            }
        },
        _parseRichTextStyle: function(t) {
            var o = [];
            return t.forEach(function(t) {
                var e = JSON.parse(t.richTextRoomComment), a = {};
                a.typeName = e[0].text, a.typeTextColor = e[0].textcolor, a.typeNameSize = 2 * e[0].textsize + "rpx", 
                a.typeTime = e[1].text, a.typeTimeColor = e[1].textcolor, a.typeTimeSize = 2 * e[1].textsize + "rpx", 
                o.push(a);
            }), o;
        },
        _getDomain: function() {
            return a.DOMAIN.indexOf("51ping") > 0 ? "https://mapi.51ping.com" : "https://mapi.dianping.com";
        }
    }
});