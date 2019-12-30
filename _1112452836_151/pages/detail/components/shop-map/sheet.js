var e = require("../../../../npm/@dp/sparrow/index.js"), n = {
    reserveMVBid: "b_dianping_nova_9j3lwwbv_mv",
    reserveMCBid: "b_dianping_nova_9j3lwwbv_mc"
};

module.exports = function(a) {
    var i = void 0;
    if (1 === a.length && "phone" === a[0].type) wx.makePhoneCall({
        phoneNumber: a[0].data
    }); else {
        var r = [];
        a.forEach(function(a) {
            "reserve" == a.name && e.lxmina.moduleView(n.reserveMVBid), r.push(a.showText);
        }), wx.showActionSheet({
            itemList: r,
            success: function(r) {
                r.cancel || ((i = a[r.tapIndex]) && "phone" === i.type ? wx.makePhoneCall({
                    phoneNumber: i.data
                }) : ("reserve" == i.name && e.lxmina.moduleClick(n.reserveMCBid), e.navigation.navigateTo({
                    url: i.data
                })));
            }
        });
    }
};