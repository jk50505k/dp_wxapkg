Component({
    properties: {
        card: {
            type: Object
        }
    },
    methods: {
        navPage: function(e) {
            console.log("trigger event navPage");
            var t = e.currentTarget.dataset.url;
            this.triggerEvent("navpage", {
                url: t
            });
        }
    }
});