module.exports = Behavior({
    methods: {
        getParentNode: function(e) {
            var t = this.getRelationNodes(e);
            return t && 0 !== t.length ? t[0] : this;
        },
        getSiblingNode: function(e, t) {
            var n = this.getParentNode(e).getRelationNodes(t);
            if (n && n.length > 0) return n[0];
        }
    }
});