var e = require("../../config/business").DEFAULT_PIC;

Component({
    properties: {
        card: {
            type: Object
        },
        active: {
            type: Boolean
        },
        needbottom: {
            type: Boolean,
            value: !0
        },
        needborderbottom: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        defaultPic: e
    },
    methods: {
        tapGroupCard: function(e) {
            console.log("trigger event tapGroupCard");
            var t = e.currentTarget.dataset.url, r = e.currentTarget.dataset.cardId, a = e.currentTarget.dataset.groupId;
            this.triggerEvent("mygrouptap", {
                url: t,
                cardId: r,
                groupId: a
            });
        },
        midasCB: function(e) {
            console.log("trigger midas callback function"), this.triggerEvent("midascb", {
                shopUuid: e.detail
            });
        }
    }
});