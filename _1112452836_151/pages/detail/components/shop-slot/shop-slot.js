Component({
    options: {
        multipleSlots: !0
    },
    relations: {
        "../shop-operate/index": {
            type: "descendant"
        },
        "../shop-tuan/shop-tuan": {
            type: "descendant"
        },
        "../shop-map/shop-map": {
            type: "descendant"
        },
        "../shop-service/shop-service": {
            type: "descendant"
        }
    },
    behaviors: [],
    properties: {
        slotItems: {
            type: Array,
            observer: "_slotItemsrChange"
        }
    },
    data: {},
    ready: function() {},
    methods: {
        _slotItemsrChange: function(e, t) {
            this.setData({
                slotItems: e
            });
        }
    }
});