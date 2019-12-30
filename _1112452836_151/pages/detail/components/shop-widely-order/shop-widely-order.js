function t(t) {
    if (Array.isArray(t)) {
        for (var a = 0, e = Array(t.length); a < t.length; a++) e[a] = t[a];
        return e;
    }
    return Array.from(t);
}

var a = require("../../../../npm/@dp/sparrow/index.js"), e = require("../../../../config/index"), o = {
    BOOK_TABLE: "/fun/getdzbooktable.json2",
    BOOK_PACKAGES: "/fun/getbarbookpackages.json2",
    CALENDAR_INVENTORY: "/dzbook/getcalendarinventory.json2"
};

Component({
    properties: {
        shopOptions: {
            type: Object,
            observer: "_shopOptionsChange"
        },
        moduleConfig: {
            type: Object
        }
    },
    data: {
        showModule: !1,
        isFetching: !1,
        bookData: null,
        bookDate: null,
        bookPackageData: null,
        barDialogVisible: !1,
        inventoryData: [],
        inventoryTimeRange: [],
        currentInventoryTimeIndex: 0,
        inventoryDialogVisible: !1,
        currentItemId: "",
        currentdate: {},
        periodId: "",
        periodIndex: "",
        preFlag: null,
        packageUrl: "",
        urlPrefix: "",
        urlSuffix: ""
    },
    methods: {
        requestData: function(t, i) {
            return a.wxp.request({
                url: e.MAPI_DOMAIN + o[i],
                data: t
            });
        },
        requestBookDate: function(t, a) {
            var e = this, o = {
                shopid: this.data.shopOptions.shopId || "",
                shopuuid: this.data.shopOptions.shopUuid || "",
                startdateindex: t.bookDates[a].dateIndex,
                clienttype: "miniprogram",
                channel: "dp"
            };
            this.setData({
                isFetching: !0
            }), this.requestData(o, "BOOK_TABLE").then(function(t) {
                if (!(t && t.data && 200 === t.data.code && t.data.data)) throw new Error("数据出错");
                console.log("getdzbooktable:", t.data.data);
                var o = t.data.data;
                e._parseBookData(o), e.spliceBookData(o, a);
            }).catch(function() {
                wx.showToast({
                    title: "数据出错",
                    icon: "none"
                }), e.setData({
                    bookDate: null
                });
            }).then(function() {
                e.setData({
                    isFetching: !1
                });
            });
        },
        requestBookPackages: function(t) {
            var a = this, e = {
                shopid: this.data.shopOptions.shopId || this.data.shopOptions.shopUuid || "",
                productid: t,
                bookdate: this.data.bookData.dateIndex,
                selectid: "",
                clienttype: "miniprogram",
                channel: "dp"
            };
            this.requestData(e, "BOOK_PACKAGES").then(function(t) {
                if (!(t && t.data && 200 === t.data.code && t.data.data)) throw new Error("数据出错");
                a.setData({
                    bookPackageData: t.data.data,
                    barDialogVisible: !0
                });
            }).catch(function() {
                wx.showToast({
                    title: "套餐数据出错",
                    icon: "none"
                }), a.setData({
                    bookPackageData: null
                });
            });
        },
        requestInventory: function(t) {
            var a = this, e = {
                shopid: this.data.shopOptions.shopId || this.data.shopOptions.shopUuid || "",
                itemid: this.data.currentItemId,
                begindate: this.data.currentdate.purchaseDate,
                enddate: this.data.currentdate.purchaseDate
            };
            this.requestData(e, "CALENDAR_INVENTORY").then(function(e) {
                if (!(e && e.data && 200 === e.data.code && e.data.data)) throw new Error("数据出错");
                var o = e.data.data.periodInventories;
                if (o && o.length) {
                    var i = [ {
                        name: "上午",
                        list: []
                    }, {
                        name: "下午",
                        list: []
                    }, {
                        name: "晚上",
                        list: []
                    } ];
                    o[0].periods.forEach(function(t) {
                        var a = t.periodName, e = parseInt(t.periodName.substring(0, 2));
                        e < 12 || "12:00" == a ? i[0].list.push(t) : e > 12 && e < 18 || "12:30" == a || "18:00" == a ? i[1].list.push(t) : (e > 18 || "18:30" == a) && i[2].list.push(t);
                    }), a.setData({
                        preFlag: t,
                        inventoryTimeRange: i.filter(function(t) {
                            return t.list.length;
                        }),
                        barDialogVisible: !1,
                        inventoryDialogVisible: !0
                    });
                } else wx.showToast({
                    title: "对不起，当前时间不可预订",
                    icon: "none"
                });
            }).catch(function() {
                wx.showToast({
                    title: "库存数据出错",
                    icon: "none"
                }), a.setData({
                    timeRange: []
                });
            });
        },
        inventorySelect: function(t) {
            if (t.currentTarget.dataset.usable) {
                var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.index;
                this.data.periodId == a && (e = ""), this.setData({
                    periodId: a,
                    periodIndex: e
                });
            }
        },
        inventoryTimeRangeSelect: function(t) {
            var a = t.currentTarget.dataset.index;
            this.setData({
                currentInventoryTimeIndex: a
            });
        },
        inventoryReturn: function() {
            "product" == this.data.preFlag ? this.setData({
                inventoryDialogVisible: !1
            }) : this.setData({
                inventoryDialogVisible: !1,
                barDialogVisible: !0
            });
        },
        inventoryConfirm: function() {
            var t = "";
            t = "product" == this.data.preFlag ? "" + this.data.urlPrefix + this.data.urlSuffix : "" + this.data.packageUrl;
            var e = this.data.inventoryTimeRange[this.data.currentInventoryTimeIndex].list[this.data.periodIndex];
            a.navigation.navigateTo({
                url: "" + t + encodeURIComponent("&timeslot=" + encodeURIComponent(this.data.currentdate.purchaseDate + " " + e.periodName) + "&arriveTime=" + e.periodBeginTime + "&leaveTime=" + e.periodEndTime + "&appperiodid=" + e.appPeriodId + "&crossday=" + e.isNextDay)
            });
        },
        spliceBookData: function(a, e) {
            var o, i = this.data.bookData && this.data.bookData.bookDates && this.data.bookData.bookDates.length || 0, n = this.data.bookData;
            (o = n.bookDates).splice.apply(o, [ e, a.bookDates.length ].concat(t(a.bookDates))), 
            n.bookDates = n.bookDates.splice(0, i), this.setBookData(n, e);
        },
        setBookDate: function(t, a) {
            if (t && t.bookTableItems) {
                t.bookTableItemIndex = a, t.displayUnitGroup = t.bookTableItems.reduce(function(t, a) {
                    return a.bookUnitGroup && t.push(a.bookUnitGroup.displayName), t;
                }, []), t.displayTableUnits = t.bookTableItems[a].bookTableUnits.concat([]), t.displayTableUnits.forEach(function(t) {
                    t.description = t.descItems && t.descItems.length ? t.descItems.join(" | ") : "";
                });
                var e = this.data.bookData.defaultShowUnitNum;
                t.displayTableUnits.length > e ? (t.needViewMore = !0, t.isFolded = !0, t.displayTableUnits = t.displayTableUnits.splice(0, e)) : t.needViewMore = !1, 
                this.setData({
                    bookDate: t
                });
            } else this.setData({
                bookDate: null
            });
        },
        setBookData: function(t, a) {
            t.showable ? (t.dateIndex = t.bookDates[a].dateIndex, this.setData({
                currentdate: t.bookDates[a],
                bookData: t,
                showModule: t.showable
            }), t.bookDates[a].needRequestData ? this.requestBookDate(t, a) : this.setBookDate(t.bookDates[a], 0)) : this.setData({
                bookData: null,
                showModule: !1
            });
        },
        showMore: function() {
            var t = this.data.bookDate;
            t.displayTableUnits = this.data.bookDate.bookTableItems[this.data.bookDate.bookTableItemIndex].bookTableUnits.concat([]), 
            t.isFolded = !1, this.setData({
                bookDate: t
            });
        },
        hideMore: function() {
            var t = this.data.bookData.defaultShowUnitNum, a = this.data.bookDate;
            a.isFolded = !0, a.displayTableUnits = a.displayTableUnits.splice(0, t), this.setData({
                bookDate: a
            });
        },
        groupSelect: function(t) {
            var a = t.currentTarget.dataset.index;
            a !== this.data.bookDate.bookTableItemIndex && this.setBookDate(this.data.bookDate, a);
        },
        dateSelect: function(t) {
            var a = t.currentTarget.dataset.index;
            t.currentTarget.dataset.dateindex !== this.data.bookData.dateIndex && this.setBookData(this.data.bookData, a);
        },
        bookBtnClick: function(t) {
            var e = this.data.bookData.bookUrlStyle || "", o = this.data.bookData.bookUrlPrefix || "", i = t.currentTarget.dataset.urlsuffix || "";
            if (t.currentTarget.dataset.clickable) {
                var n = t.currentTarget.dataset.clicktype, s = t.currentTarget.dataset.productid, r = t.currentTarget.dataset.itemid;
                this.setData({
                    currentItemId: r,
                    urlPrefix: o,
                    urlSuffix: i
                }), 1 != n ? "unify" == e ? this.requestInventory("product") : o && a.navigation.navigateTo({
                    url: "" + o + i
                }) : this.requestBookPackages(s);
            }
        },
        dialogBookBtnClick: function(t) {
            var e = this.data.bookData.bookUrlStyle || "", o = t.currentTarget.dataset.url || "";
            "unify" == e ? (this.setData({
                packageUrl: o
            }), this.requestInventory("package")) : o && a.navigation.navigateTo({
                url: o
            });
        },
        goBook: function(t) {
            t && a.navigation.navigateTo({
                url: t
            });
        },
        closeDialog: function(t) {
            "package" != t.currentTarget.dataset.flag ? this.setData({
                inventoryDialogVisible: !1
            }) : this.setData({
                barDialogVisible: !1
            });
        },
        _parseBookData: function(t) {
            t && t.bookDates && t.bookDates.length && t.bookDates.forEach(function(t) {
                t.week = t.displayName.split("\n")[0], t.date = t.displayName.split("\n")[1];
            });
        },
        _shopOptionsChange: function(t) {
            var a = this;
            if (t) {
                var e = {
                    shopid: t.shopId || "",
                    shopuuid: t.shopUuid || "",
                    isinitreq: !0,
                    clienttype: "miniprogram",
                    channel: "dp"
                };
                this.requestData(e, "BOOK_TABLE").then(function(t) {
                    if (!(t && t.data && 200 === t.data.code && t.data.data)) throw new Error("数据出错");
                    console.log("getdzbooktable:", t.data.data);
                    var e = t.data.data;
                    a._parseBookData(e), a.setBookData(e, 0);
                }).catch(function() {
                    wx.showToast({
                        title: "数据出错",
                        icon: "none"
                    }), a.setData({
                        showModule: !1
                    });
                });
            }
        },
        doNothing: function() {}
    }
});