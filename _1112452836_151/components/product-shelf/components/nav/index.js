Component({
    properties: {
        shelfNavTags: {
            type: Array
        },
        level: {
            type: Number
        },
        channel: {
            type: String
        },
        isListPage: {
            type: Boolean
        }
    },
    data: {},
    methods: {
        selectCatalog: function(e) {
            var t = e.currentTarget.dataset.nav;
            this.triggerEvent("selectCatalog", t);
        }
    },
    ready: function() {}
});