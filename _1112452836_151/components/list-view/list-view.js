var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var i = arguments[e];
        for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r]);
    }
    return t;
}, e = require("../../npm/@dp/sparrow/index.js"), i = {
    noResultView: "b_e90ycm2k",
    noResultClick: "b_813e1h6k"
};

Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        listview: {
            type: Object,
            observer: function(r) {
                var n = this, o = r.list, s = r.supplyList, l = r.noResultGuidewords, a = r.firstLoading, u = r.listError, g = r.needBottom, p = r.tryAgain;
                p ? this.setData({
                    tryAgain: p
                }) : (this.setData({
                    list: o || [],
                    supplyList: s || [],
                    noResultGuidewords: l || [],
                    firstLoading: a || !1,
                    listError: u || {},
                    needBottom: g || 0,
                    tryAgain: p || !1
                }), l && l.length && setTimeout(function() {
                    var r = e.lxmina.getLxData();
                    e.lxmina.moduleClick(i.noResultView, t({}, r, {
                        queryId: n.data.queryid,
                        time: new Date().getTime(),
                        elementid: "no_result"
                    }));
                }, 50));
            }
        },
        pulldown: {
            type: Boolean,
            observer: function(t) {
                !0 !== t && "true" !== t || this.triggerEvent("pulldown");
            }
        },
        reachbottom: {
            type: Boolean,
            observer: function(t) {
                !0 !== t && "true" !== t || this.triggerEvent("reachbottom");
            }
        },
        queryid: {
            type: String,
            value: ""
        }
    },
    data: {
        list: [],
        supplyList: [],
        noResultGuidewords: [],
        firstLoading: !1,
        listError: {},
        needBottom: 0,
        tryAgain: !1
    },
    methods: {
        onExceptionEvent: function() {
            console.log("trigger exception event"), this.triggerEvent("exception");
        },
        tryAgain: function() {
            this.triggerEvent("tryagain");
        }
    }
});