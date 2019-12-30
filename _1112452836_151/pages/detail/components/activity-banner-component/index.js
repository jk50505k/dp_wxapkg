var t = require("../../../../npm/@dp/sparrow/index.js");

Component({
    properties: {
        shopOptions: {
            type: Object
        }
    },
    data: {
        config: {},
        cityId: 1,
        show: !1,
        jumperLink: "",
        img: ""
    },
    ready: function() {
        this.initEnv(), this.getBannerData();
    },
    methods: {
        getBannerData: function() {
            var i = this;
            wx.request({
                url: this.data.config.MAPI_DOMAIN + this.data.config.API_BANNER,
                data: {
                    cityid: t.geo.getCitySync() && t.geo.getCitySync().cityId || 1,
                    shopid: this.data.shopOptions && this.data.shopOptions.shopId || "",
                    shopuuid: this.data.shopOptions && this.data.shopOptions.shopuuid || "",
                    clienttype: 100400
                },
                success: function(t) {
                    var n = t && t.data;
                    i.setData({
                        show: n && n.show || !1,
                        jumperLink: n && n.jumperLink || "",
                        img: n && n.img || ""
                    });
                }
            });
        },
        initEnv: function() {
            var i = {
                MAPI_DOMAIN_PRODUCT: "https://mapi.dianping.com",
                MAPI_DOMAIN_BETA: "https://mapi.51ping.com",
                API_BANNER: "/general/platform/dztg/unifiedpromoactivity.json"
            };
            i.MAPI_DOMAIN = "test" === t.env.env ? i.MAPI_DOMAIN_BETA : i.MAPI_DOMAIN_PRODUCT, 
            this.setData({
                config: i
            });
        },
        jumpAdvertise: function() {
            t.navigation.navigateTo({
                url: this.data.jumperLink,
                type: "h5"
            });
        }
    }
});