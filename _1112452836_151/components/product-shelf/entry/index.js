var t = require("../util/constant");

Component({
    properties: {
        poiid: {
            type: Number | String
        },
        shelfnavtagid: {
            type: Number | String
        },
        cityid: {
            type: Number | String
        },
        lng: {
            type: Number | String
        },
        lat: {
            type: Number | String
        },
        isListPage: {
            type: Boolean,
            default: !1
        },
        channel: {
            type: String,
            default: "dp"
        },
        env: {
            type: String,
            default: "prod"
        }
    },
    data: {
        clienttype: "",
        pageno: 1,
        pagesize: 20,
        totalPage: "",
        shelfNavTags: [],
        shelfNavLevel: "",
        currentProductList: [],
        navData: "",
        shelfcomponentid: "",
        currentCatalog: {},
        currentNavTagId: "",
        navBarFixed: !1,
        topNum: 0,
        picAspectRatio: "",
        navApi: "",
        productApi: "",
        lazyLoadDone: !0
    },
    methods: {
        fetchShelfNav: function() {
            var t = this;
            wx.request({
                url: t.data.navApi,
                data: {
                    poiid: this.data.poiid,
                    cityid: this.data.cityid,
                    lng: this.data.lng || "",
                    lat: this.data.lat || "",
                    h5clienttype: this.data.clienttype
                },
                success: function(a) {
                    var e = a.data.shelfNavComponents[0], n = e.shelfComponentId, i = e.shelfNavComponent.shelfNavTags, s = e.shelfNavComponent.shelfNavStyles.length;
                    1 === s ? t.triggerEvent("lxFirstNavMv") : (t.triggerEvent("lxFirstNavMv"), t.triggerEvent("lxSecondNavMv")), 
                    i[0].selected = !0, i[0].childNavTags && (i[0].childNavTags[0].selected = !0), t.setData({
                        navData: e,
                        shelfcomponentid: n,
                        shelfNavTags: i,
                        shelfNavLevel: s
                    }), t.initSetCurrentCatalog(), t.getProductByCurrentTag();
                }
            });
        },
        fetchShelfProduct: function(t) {
            var a = this;
            a.fetchShelfProductByParams(t, a.getProductRes.bind(this));
        },
        getProductRes: function(t) {
            var a = this;
            t.productComponents.map(function(t) {
                a.setData({
                    totalPage: t.totalPage,
                    picAspectRatio: t.picAspectRatio
                }), a.data.isListPage || (t.products = t.products && t.products.slice(0, t.displayThreshold)), 
                t.products.map(function(t) {
                    a.handleTag(t), t.titleDesc || a.showTagByLength(t);
                });
                var e = t.products.map(function(t) {
                    return t.productId;
                });
                a.triggerEvent("lXAnalytics", e), a.handleLineCount(t.products);
            }), a.setData({
                currentProductList: t && t.productComponents
            });
        },
        fetchShelfProductByParams: function(t, a) {
            wx.request({
                url: this.data.productApi,
                data: {
                    poiid: this.data.poiid,
                    cityid: this.data.cityid,
                    shelfcomponentid: this.data.shelfcomponentid,
                    lng: this.data.lng || "",
                    lat: this.data.lat || "",
                    pageno: this.data.pageno,
                    pagesize: this.data.isListPage ? this.data.pagesize : "",
                    h5clienttype: this.data.clienttype,
                    shelfnavtagid: t,
                    ispoiview: !this.data.isListPage
                },
                success: function(t) {
                    a(t.data);
                }
            });
        },
        getClientTypeByChannel: function() {
            "dp" === this.data.channel ? this.setData({
                clienttype: t.clientTypeMap[t.platformMap.DP_WX_MINI]
            }) : this.setData({
                clienttype: t.clientTypeMap[t.platformMap.MT_WX_MINI]
            });
        },
        getApiByChannelEnv: function() {
            var t = {
                dp: {
                    beta: "https://mapi.51ping.com",
                    prod: "https://mapi.dianping.com"
                },
                mt: {
                    beta: "https://test.i.meituan.com",
                    prod: "https://i.meituan.com"
                }
            }, a = "/general/platform/dztg/poipaginationshelfnav.json", e = "/general/platform/dztg/poipaginationshelfproduct.json";
            "dp" === this.data.channel && "beta" === this.data.env ? (a = t.dp.beta + a, e = t.dp.beta + e) : "dp" === this.data.channel && "prod" === this.data.env ? (a = t.dp.prod + a, 
            e = t.dp.prod + e) : "mt" === this.data.channel && "beta" === this.data.env ? (a = t.mt.beta + a, 
            e = t.mt.beta + e) : (a = t.mt.prod + a, e = t.mt.prod + e), this.setData({
                navApi: a,
                productApi: e
            });
        },
        initSetCurrentCatalog: function() {
            var t = this, a = t.data.shelfNavTags.findIndex(function(a) {
                return a.navTagId == t.data.shelfnavtagid;
            }), e = void 0;
            -1 === a && (a = t.data.shelfNavTags.findIndex(function(a) {
                return a.childNavTags && a.childNavTags.find(function(a) {
                    return a.navTagId == t.data.shelfnavtagid;
                });
            }), t.data.shelfNavTags.forEach(function(a) {
                var n = a.childNavTags && a.childNavTags.findIndex(function(a) {
                    return a.navTagId == t.data.shelfnavtagid;
                });
                -1 !== n && (e = n);
            })), -1 !== a && a || (a = 0), -1 !== e && e || (e = 0), t.setData({
                currentCatalog: {
                    navTagId: t.data.shelfNavTags[a] && t.data.shelfNavTags[a].navTagId,
                    childNavTags: t.data.shelfNavTags[a] && t.data.shelfNavTags[a].childNavTags
                }
            }), t.data.shelfNavTags[a] && (t.data.shelfNavTags[a].selected = !0), t.data.shelfNavTags[a].childNavTags && t.data.shelfNavTags[a].childNavTags[e] && (t.data.shelfNavTags[a].childNavTags[e].selected = !0);
        },
        getProductByCurrentTag: function() {
            this.setData({
                pageno: 1
            });
            var t = this.data.currentCatalog.childNavTags ? this.data.currentCatalog.childNavTags.find(function(t) {
                return !0 === t.selected;
            }).navTagId : this.data.currentCatalog.navTagId;
            this.setData({
                currentNavTagId: t
            }), this.fetchShelfProduct(t);
        },
        handleTag: function(t) {
            t.normalTags = t.productTags && t.productTags.filter(function(t) {
                return 1 === t.type;
            }), t.discountTags = t.productTags && t.productTags.find(function(t) {
                return 2 === t.type;
            }), t.TitleTags = t.productTags && t.productTags.find(function(t) {
                return 3 === t.type;
            }), t.subTitleTags = t.productTags && t.productTags.find(function(t) {
                return 4 === t.type;
            });
        },
        showTagByLength: function(t) {
            var a = [];
            t.normalTags && t.normalTags.forEach(function(e) {
                a.push(e.desc), a.join("").length > 11 && (t.normalTags = t.normalTags && t.normalTags.slice(0, a.length >= 3 ? 2 : a.length));
            });
        },
        handleLineCount: function(t) {
            for (var a = 0; a < t.length; a++) {
                if (!t[2 * a] || !t[2 * a + 1]) return;
                var e = t[2 * a].productLineCount > t[2 * a + 1].productLineCount ? t[2 * a].productLineCount : t[2 * a + 1].productLineCount;
                t[2 * a].productLineCount = t[2 * a + 1].productLineCount = e;
            }
        },
        lazyLoadProducts: function() {
            var t = this, a = t.data.pageno + 1;
            if (!(a > t.data.totalPage) && t.data.isListPage) {
                t.setData({
                    pageno: a,
                    lazyLoadDone: !1
                });
                var e = t.data.currentCatalog.childNavTags ? t.data.currentCatalog.childNavTags.find(function(t) {
                    return !0 === t.selected;
                }).navTagId : t.data.currentCatalog.navTagId;
                t.fetchShelfProductByParams(e, t.lazyLoadGetProducts.bind(this));
            }
        },
        lazyLoadGetProducts: function(t) {
            var a = this, e = t.productComponents;
            e.map(function(t) {
                t.products.map(function(t) {
                    a.handleTag(t), t.titleDesc || a.showTagByLength(t);
                }), a.handleLineCount(t.products);
            });
            var n = this.data.currentProductList;
            n.map(function(t, a) {
                t.products = t.products.concat(e[a].products);
            }), this.setData({
                currentProductList: n,
                lazyLoadDone: !0
            });
        },
        scrollShelf: function(t) {
            this.data.isListPage && (t.detail.scrollTop > 49 ? this.setData({
                navBarFixed: !0
            }) : this.setData({
                navBarFixed: !1
            }));
        },
        scrollToLower: function() {
            this.data.lazyLoadDone && this.lazyLoadProducts();
        },
        selectFirstCatalog: function(t) {
            this.goTop();
            var a = t.detail.navTagId;
            this.setCurrentCatalog(this.data.shelfNavTags, a), this.setSelectedStatus(this.data.shelfNavTags, a), 
            this.setCurrentCatalogSelectedStatus(), this.getProductByCurrentTag(), this.triggerEvent("lxFirstNav");
        },
        selectSecondCatalog: function(t) {
            this.goTop();
            var a = t.detail.navTagId;
            this.setCurrentCatalogSelectedStatus(a), this.getProductByCurrentTag(), this.triggerEvent("lxSecondNav");
        },
        setCurrentCatalog: function(t, a) {
            var e = {
                navTagId: a,
                childNavTags: this.getChildNavTagsById(t, a)
            };
            this.setData({
                currentCatalog: e
            });
        },
        getChildNavTagsById: function(t, a) {
            return t.find(function(t) {
                return t.navTagId === a;
            }).childNavTags;
        },
        setSelectedStatus: function(t, a) {
            if (t && t.length) {
                a || (a = t[0].navTagId);
                var e = this.findNavIndexById(t, a);
                this.emptySelectedStatus(t), t[e].selected = !0, this.setData({
                    shelfNavTags: t
                });
            }
        },
        setCurrentCatalogSelectedStatus: function(t) {
            var a = this.data.currentCatalog;
            if (a.childNavTags && a.childNavTags.length) {
                t || (t = a.childNavTags[0].navTagId);
                var e = this.findNavIndexById(a.childNavTags, t);
                this.emptySelectedStatus(a.childNavTags), a.childNavTags[e].selected = !0, this.setData({
                    currentCatalog: a
                });
            }
        },
        findNavIndexById: function(t, a) {
            return t.findIndex(function(t) {
                return t.navTagId === a;
            });
        },
        emptySelectedStatus: function(t) {
            t && t.map(function(t) {
                return t.selected = !1;
            });
        },
        goTop: function() {
            this.setData({
                topNum: 0
            });
        },
        goToProductDetail: function(t) {
            this.triggerEvent("goToProductDetail", t.detail);
        },
        goToMoreProducts: function(t) {
            this.triggerEvent("goToMoreProducts", t.detail);
        }
    },
    ready: function() {
        this.getClientTypeByChannel(), this.getApiByChannelEnv(), this.fetchShelfNav();
    }
});