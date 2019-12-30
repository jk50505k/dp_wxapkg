var t = require("./utils");

Component({
    properties: {
        star: {
            type: Number,
            value: 0
        },
        score: {
            type: Number,
            value: 0
        },
        classname: {
            type: String,
            value: ""
        },
        starStyle: {
            type: Object,
            value: {
                width: "24rpx",
                height: "24rpx",
                marginRight: "3rpx"
            }
        },
        textStyle: {
            type: Object,
            value: {
                fontSize: "26rpx",
                marginLeft: "6rpx"
            }
        },
        canClick: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    ready: function() {
        var e = this.data.star, a = (0, t.handleScore)(e) && (0, t.handleScore)(e).toString().replace(".", "_") || 0;
        this.setData({
            star: a
        });
    },
    methods: {
        onTapStar: function(t) {
            var e = this.data.canClick, a = t.currentTarget.dataset.index;
            e && (this.setData({
                star: a
            }), this.triggerEvent("tapStar", {
                star: a
            }));
        }
    }
});