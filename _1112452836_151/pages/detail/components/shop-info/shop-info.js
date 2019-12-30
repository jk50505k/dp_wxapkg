var o = require("../../../../npm/@dp/sparrow/index.js"), t = {
    shopInfoMCBid: "b_7pipq1og"
};

Component({
    behaviors: [],
    properties: {
        shopInfoData: {
            type: Object,
            observer: "_shopInfoDataChange"
        },
        shopOptions: {
            type: Object
        },
        moduleConfig: {
            type: Object
        },
        lxData: {
            type: Object
        }
    },
    data: {
        showModule: 1
    },
    ready: function() {},
    moved: function() {},
    detached: function() {},
    methods: {
        shopInfoTap: function(a) {
            var e = this.data.shopInfoData.shopServeInfoUrl;
            o.lxmina.moduleClick(t.shopInfoMCBid, this.data.lxData), e && o.navigation.navigateTo({
                url: e,
                type: "h5"
            });
        },
        _shopInfoDataChange: function(o, t) {
            o && o.hasKeyService ? this.setData({
                showModule: 2,
                shopInfoData: o
            }) : o && !o.fromListCache && this.setData({
                showModule: 0
            });
        }
    }
});