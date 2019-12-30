Component({
    properties: {
        dishlist: {
            type: Array
        },
        shopuuid: {
            type: String
        }
    },
    data: {
        morehidden: !0
    },
    methods: {
        viewMore: function() {
            this.setData({
                morehidden: !1
            }), this.triggerEvent("moreclick");
        },
        openDish: function(e) {
            console.log("trigger event openDish");
            var t = e.currentTarget.dataset.dishid, i = e.currentTarget.dataset.shopuuid;
            this.triggerEvent("opendish", {
                dishId: t,
                shopUuid: i
            }, {
                bubbles: !0,
                composed: !0
            });
        }
    }
});