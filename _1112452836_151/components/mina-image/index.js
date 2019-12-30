var a = require("../../npm/@dp/owl-wxapp/es6/index.js"), e = require("../../npm/@dp/logan-wxapp/build/wxlogan.js");

Component({
    properties: {
        src: {
            type: String,
            observer: "dataChange"
        },
        mode: {
            type: String,
            value: "scaleToFill"
        },
        lazyLoad: {
            type: Boolean,
            value: !1
        },
        componentName: {
            type: String
        }
    },
    methods: {
        dataChange: function() {
            var a = this.data.mode || "scaleToFill", e = !!this.data.lazyLoad;
            this.setData({
                mode: a,
                lazyLoad: e
            });
        },
        onError: function(t) {
            var o = this.data.componentName || "";
            a.owl.error.addError(o + "图片加载出错", t.detail), e.log(o + "图片加载出错，地址为：" + this.data.src + "，错误信息为：" + JSON.stringify(t.detail));
        }
    }
});