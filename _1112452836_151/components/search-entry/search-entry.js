Component({
    properties: {
        keyword: {
            type: String,
            value: ""
        }
    },
    methods: {
        onSearchShow: function(e) {
            var r = e.currentTarget.dataset.keyword;
            console.log("search-entry keyword: ", r), this.triggerEvent("searchshow", {
                keyword: r
            });
        }
    }
});