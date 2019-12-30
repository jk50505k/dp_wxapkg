var t = require("../../../../npm/@dp/sparrow/index.js"), e = require("../../../../common/relation-behavior"), i = {
    mediumMCBid: "b_bppt1m00"
};

Component({
    relations: {
        "../shop-slot/shop-slot": {
            type: "ancestor"
        }
    },
    behaviors: [ e ],
    properties: {
        moduleConfig: {
            type: Object
        },
        lxData: {
            type: Object
        }
    },
    methods: {
        mediumTap: function() {
            var e = this.data.mediumData;
            e && e.h5Url && (t.navigation.navigateTo({
                url: e.h5Url
            }), t.lxmina.moduleClick(i.mediumMCBid, this.data.lxData));
        },
        forbidScroll: function() {
            this.triggerEvent("promptMask");
        },
        onPopupClose: function() {
            this.triggerEvent("hideMask");
        }
    }
});