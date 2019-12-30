module.exports = {
    BOOKING: [ 10, 15, 30, 50, 60 ],
    DEFAULT_PIC: "data:image/png;base64,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",
    MODULES_MOCK: !1,
    SHOP_SLOTS: [ {
        name: "shop-follow",
        config: {
            margin: "0 0 20rpx 0"
        }
    }, {
        name: "shop-head",
        config: {}
    }, {
        name: "shop-oversea-businesshours",
        config: {}
    }, {
        name: "shop-map",
        config: {}
    }, {
        name: "shop-operate",
        config: {
            margin: "20rpx 0 0 0"
        }
    }, {
        name: "shop-tuan",
        config: {}
    }, {
        name: "shop-craftsman",
        config: {
            margin: "20rpx 0 0 0"
        }
    }, {
        name: "shop-review-tag",
        config: {
            margin: "30rpx 0 0 0"
        }
    }, {
        name: "shop-review",
        config: {
            showAllReviewTag: !0
        }
    }, {
        name: "shop-info",
        config: {
            showHead: !0
        }
    }, {
        name: "shop-branch",
        config: {}
    }, {
        name: "shop-mall",
        config: {
            margin: "30rpx 0 0 0"
        }
    }, {
        name: "shop-friendlike",
        config: {}
    }, {
        name: "shop-comment",
        config: {}
    }, {
        name: "shop-base-info",
        config: {}
    }, {
        name: "shop-brand-info",
        config: {}
    }, {
        name: "shop-new-retail",
        config: {}
    }, {
        name: "mall-poi-nav",
        config: {}
    } ]
};