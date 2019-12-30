var e = require("../../npm/@dp/sparrow/index.js"), t = require("../../npm/@mtfe/dynamic/config");

Component({
    properties: {
        item: {
            type: Object,
            value: null,
            observer: "itemChange"
        },
        index: {
            type: Number
        }
    },
    methods: {
        itemChange: function(t) {
            t && Object.keys(t).length && (this.data.dynamicComponentError && this.reload(), 
            this.setData({
                info: JSON.stringify({
                    item: t,
                    index: this.data.index
                })
            }, function() {
                e.event.trigger("dp_group_data_change");
            }));
        },
        reload: function() {
            console.log("reload component!"), this.selectComponent("#group-waterfall-card").$reload(), 
            this.setData({
                dynamicComponentError: !1
            });
        },
        dynamicComponentError: function(e) {
            var r = e.detail, n = function(e, t) {
                return console.log(e, t);
            };
            switch (r.type) {
              case t.ErrorTypes.callback:
                return n("事件回调错误", r);

              case t.ErrorTypes.context:
                return n("context传递错误", r);

              case t.ErrorTypes.evaldata:
                return n("执行初始 js 错误", r);

              case t.ErrorTypes.request:
                return this.setData({
                    dynamicComponentError: !0
                }), n("配置拉取错误", r);
            }
        }
    }
});