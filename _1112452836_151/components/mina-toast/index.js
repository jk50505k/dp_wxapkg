Component({
    properties: {
        toastConfig: {
            type: Object,
            value: {},
            observer: "getConfig"
        }
    },
    methods: {
        getConfig: function(t) {
            if (t && t.showToast) {
                var o = t.toastConfig || {}, e = o.firstLine + "\n" + o.secLine;
                wx.showToast({
                    title: e,
                    icon: "none",
                    duration: o.duration || 1500
                });
            }
        }
    }
});