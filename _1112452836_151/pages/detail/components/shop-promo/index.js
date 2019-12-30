var a = require("../../../../npm/@dp/sparrow/index.js"), o = {
    promoMVBid: "b_j4lgtq45",
    promoMCBid: "b_o1zr9s12"
};

Component({
    behaviors: [],
    properties: {
        promoData: {
            type: Object,
            observer: "_promoDataChange"
        },
        moduleConfig: {
            type: Object
        }
    },
    data: {},
    ready: function() {},
    methods: {
        promoTap: function() {
            var t = this.data.promoData.listUrl, e = a.lxmina.getLxData();
            a.lxmina.moduleClick(o.promoMCBid, Object.assign({}, e, {
                category_id: this.data.promoDat && this.data.promoData.categotyId,
                shopType: this.data.promoDat && this.data.promoData.shopType
            })), t && a.navigation.navigateTo({
                url: t
            });
        },
        _promoDataChange: function(t) {
            if (t && t.showModule) {
                this.setData({
                    promoData: t
                });
                var e = a.lxmina.getLxData();
                a.lxmina.moduleView(o.promoMVBid, Object.assign({}, e, {
                    category_id: t.categotyId,
                    shopType: t.shopType
                }));
            }
        }
    }
});