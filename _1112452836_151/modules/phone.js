module.exports = function(e) {
    var n = void 0;
    1 === e.length ? wx.makePhoneCall({
        phoneNumber: e[0]
    }) : wx.showActionSheet({
        itemList: e,
        success: function(o) {
            o.cancel || (n = e[o.tapIndex], wx.makePhoneCall({
                phoneNumber: n
            }));
        }
    });
};