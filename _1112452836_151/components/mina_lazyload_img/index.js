module.exports = {
    initInComponent: function(o) {
        var n = getCurrentPages(), a = n[n.length - 1];
        if (!a._hasRewritePageScroll) {
            var e = function(o) {
                o.lazyLoadImage && o.lazyLoadImage.forEach(function(o) {
                    return o.judge();
                });
            }, t = a.onPageScroll || function() {};
            a.onPageScroll = function(o) {
                e(a), t.call(a, o);
            }, a.findLazyLoadComponents = function() {
                a.lazyLoadImage = a.selectAllComponents("#topParent >>> ._lazyLoadImage"), e(a);
            }, a.onHorizontalScroll = function() {
                return e(a);
            }, a._hasRewritePageScroll = !0;
        }
        o.onHorizontalScroll = function() {
            return a.onHorizontalScroll();
        }, a.findLazyLoadComponents();
    }
};