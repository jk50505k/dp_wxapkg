Component({
    properties: {
        moreRedirectText: {
            type: String
        },
        channel: {
            type: String
        },
        product: {
            type: Object
        },
        poiid: {
            type: String | Number
        },
        currentNavTagId: {
            type: String | Number
        }
    },
    data: {},
    methods: {
        goToMoreProducts: function() {
            var t = this.data.product.moreRedirectUrl + "?poiid=" + this.data.poiid + "&shelfnavtagid=" + this.data.currentNavTagId, e = {
                poiid: this.data.poiid,
                shelfnavtagid: this.data.currentNavTagId,
                url: t
            };
            this.triggerEvent("goToMoreProducts", e);
        }
    },
    ready: function() {}
});