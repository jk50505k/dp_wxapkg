Component({
    properties: {
        products: {
            type: Array
        },
        channel: {
            type: String
        },
        productLineCount: {
            type: Number
        },
        picAspectRatio: {
            type: Number | String
        }
    },
    data: {},
    methods: {
        goToProductDetail: function(t) {
            var e = t.currentTarget.dataset.product;
            this.triggerEvent("goToProductDetail", e.redirectUrl);
        }
    },
    ready: function() {}
});