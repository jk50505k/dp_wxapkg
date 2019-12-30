var e = [ {
    id: "0",
    name: "全部地区",
    parentId: "0"
}, {
    id: "0",
    name: "全部分类",
    parentId: "0"
}, {
    id: "0",
    name: "按时间"
}, {
    id: "0",
    name: "筛选"
} ];

Component({
    properties: {
        selector: {
            type: Array,
            value: [],
            observer: function(e) {
                this.data && e.length && (this.data.showmetro && 0 === this.data.firstId ? this.computeMetroSelector(!0) : this.data.activeMetro ? this.computeMetroSelector(!0) : this.computeSelector(this.data.firstId));
            }
        },
        trigger: {
            type: Array,
            value: []
        },
        hasmetro: {
            type: Boolean,
            value: !1
        },
        showmetro: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        firstTap: !0,
        activeIndex: -1,
        isSearching: !1,
        trigger: e,
        mainSelector: [],
        subSelector: [],
        choiceSelectors: [],
        activeSubSelector: {},
        activeMainSelectorId: 0,
        INDEX_REGION: 0,
        INDEX_CATEGORY: 1,
        INDEX_SORT: 2,
        INDEX_CHOICE: 3,
        INDEX_METRO: 4,
        customeChoice: [],
        mainToView: 0,
        subToView: 0,
        activeMetro: !1
    },
    methods: {
        parseSelector: function(e, t, i) {
            if (e && e.length) {
                for (var a = {
                    mainSelector: [],
                    subSelector: []
                }, r = 0; r < e.length; r++) {
                    var o = e[r];
                    if (t == this.data.INDEX_SORT) return {
                        subSelector: e
                    };
                    0 === o.parentId || void 0 == o.parentId ? a.mainSelector.push(o) : o.parentId == i && 0 != o.categoryId && a.subSelector.push(o);
                }
                return a;
            }
        },
        parseChoice: function(e) {
            var t = [];
            return e && e.length && e.map(function(e) {
                var i = e.filters;
                i && i.length && i.map(function(e) {
                    !0 === e.selected && e.id && t.push(e.id);
                });
            }), t;
        },
        findSelectorById: function(e) {
            var t = this.data.selector[this.data.activeIndex];
            return (t = t.filter(function(t) {
                return t.id == e;
            }))[0];
        },
        handleTrigger: function(e) {
            var t = this;
            this.setData({
                firstId: e.currentTarget.dataset.index,
                activeMetro: !1
            }, function() {
                t.triggerEvent("handletrigger", {
                    setSelector: !0
                });
            });
        },
        computeSelector: function(e) {
            var t = this, i = parseInt(e), a = void 0, r = void 0, o = {}, c = [], s = void 0, n = this.data.trigger, d = [];
            if (i === this.data.activeIndex) a = -1; else {
                a = i;
                var h = "" + ((r = n[i]) && r.id) || r && r.type;
                r && void 0 !== h && (s = a === this.data.INDEX_CATEGORY && 0 == r.parentId ? h : r.parentId || 0, 
                a !== this.data.INDEX_CHOICE ? o = this.parseSelector(this.data.selector[i], a, s) : (c = this.data.selector[i], 
                d = this.parseChoice(c)));
            }
            this.setData({
                activeIndex: a,
                activeSubSelector: r || {},
                activeMainSelectorId: s || this.data.activeMainSelectorId || 0,
                mainSelector: o && o.mainSelector || [],
                subSelector: o && o.subSelector || [],
                choiceSelectors: c || [],
                customeChoice: d || [],
                mainToView: s ? "main-" + s : "main-0",
                subToView: r && r.id ? "sub-" + r.id : "sub-0"
            }, function() {
                t.triggerEvent("handletrigger", {
                    activeIndex: a
                });
            });
        },
        handleMainSelector: function(e) {
            var t = parseInt(e.currentTarget.dataset.itemid), i = [];
            try {
                i = (i = this.data.selector[this.data.activeIndex]) && i.filter(function(e) {
                    return e.parentId == t;
                });
            } catch (e) {
                console.log("list page => handle main selector error: ", e);
            }
            if (0 === i.length) {
                var a = this.findSelectorById(t);
                this.updateSelector(a, 0);
            }
            this.setData({
                activeMainSelectorId: t,
                subSelector: i
            });
        },
        handleSubSelector: function(e) {
            try {
                var t = e.currentTarget.dataset.itemid, i = e.currentTarget.dataset.parentid || 0, a = this.data.selector[this.data.activeIndex], r = a && a.filter(function(e) {
                    return e.id == t;
                });
                this.updateSelector(r[0], i);
            } catch (e) {
                console.log("handle sub selector error: ", e);
            }
        },
        updateSelector: function(e, t) {
            var i = this.data.trigger, a = this.data.activeIndex;
            this.data.showmetro ? i[0] = e : i[a] = e, this.setData({
                activeSubSelector: e,
                trigger: i
            }), this.triggerEvent("filterlist", {
                activeIndex: a,
                selectorId: e.id,
                parentId: t
            }), this.hideTrigger();
        },
        hideTrigger: function() {
            this.triggerEvent("handletrigger", {
                activeIndex: -1
            }), this.setData({
                activeIndex: -1
            });
        },
        tapChoice: function(e) {
            var t = e.currentTarget.dataset, i = t.name, a = t.choiceid, r = t.ismulti;
            if (i && a) {
                var o = e.currentTarget.dataset.parent, c = this.dealChoice(this.data.choiceSelectors, o, a, r), s = this.parseChoice(c);
                this.setData({
                    customeChoice: s,
                    choiceSelectors: c
                });
            }
        },
        resetChoice: function() {
            var e = this.data.choiceSelectors;
            e && e.length && e.map(function(e) {
                var t = e.filters;
                t && t.length && t.map(function(e) {
                    e.selected = !1;
                });
            }), this.setData({
                customeChoice: [],
                choiceSelectors: e
            });
        },
        dealChoice: function(e, t, i, a) {
            return e && e.length && e.map(function(e) {
                if (e.name === t) {
                    var r = e.filters;
                    r && r.length && r.map(function(e) {
                        a || e.id !== i && (e.selected = !1), e.id === i && (e.selected = !e.selected);
                    });
                }
            }), e;
        },
        sureChoice: function() {
            var e = this.data.customeChoice;
            console.log("trigger custome choice event", e), this.triggerEvent("surechoice", {
                customeChoice: e
            }), this.hideTrigger();
        },
        preventScroll: function() {},
        openMetro: function() {
            this.data.activeMetro || this.computeMetroSelector(!0);
        },
        closeMetro: function() {
            this.data.activeMetro && this.computeMetroSelector(!1);
        },
        computeMetroSelector: function(e) {
            var t = void 0;
            t = e ? 4 : 0;
            var i = this.data.trigger, a = this.data.selector[t], r = [], o = [], c = i[0], s = this.data.showmetro ? c.parentId : a[0].id;
            t !== this.data.INDEX_CHOICE ? a = this.parseSelector(a, t, s) : (r = this.data.selector[3], 
            o = this.parseChoice(r)), this.data.showmetro || (c = a && a.subSelector[0]), this.setData({
                activeSubSelector: c || {},
                activeMainSelectorId: s || this.data.activeMainSelectorId || 0,
                mainSelector: a && a.mainSelector || [],
                subSelector: a && a.subSelector || [],
                activeMetro: e,
                activeIndex: t,
                showmetro: !0,
                mainToView: s ? "main-" + s : "main-0",
                subToView: c && c.id ? "sub-" + c.id : "sub-0",
                choiceSelectors: r || [],
                customeChoice: o || []
            });
        }
    }
});