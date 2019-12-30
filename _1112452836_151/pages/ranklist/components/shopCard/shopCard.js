var e = require("../../../../components/mina_lazyload_img/index.js").initInComponent;

Component({
    properties: {
        item: {
            type: Object,
            value: {}
        },
        categoryId: {
            type: Number,
            value: 10
        }
    },
    data: {
        hideSpread: !0
    },
    methods: {
        changeSpread: function() {
            var t = this;
            this.setData({
                hideSpread: !this.data.hideSpread
            }, function() {
                e(t);
            });
        }
    }
});