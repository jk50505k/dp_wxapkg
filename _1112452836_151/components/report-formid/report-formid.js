var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../common/owl")), e = require("../../public/logan"), o = require("../../common/request"), i = require("../../config/index"), r = {
    UPLOAD_FORMID: "/wxmapi/uploadformid"
};

Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        bizType: {
            type: String,
            observer: "_bizTypeChange"
        },
        zIndex: {
            type: Number
        },
        categoryId: {
            type: Number,
            value: null
        }
    },
    data: {},
    ready: function() {},
    methods: {
        formSubmit: function(i) {
            e.log("form表单提交数据==>" + JSON.stringify(i.detail));
            var a = i.detail.formId, d = this.data.bizType || "", n = null === this.data.categoryId ? "" : this.data.categoryId;
            e.log("formId:" + a), e.log("bizType:" + d), e.log("categoryId:" + n), o({
                url: this._getDomain() + r.UPLOAD_FORMID,
                data: {
                    formId: a,
                    bizType: d,
                    categoryId: n
                }
            }).then(function(o) {
                o && o.data && 200 == o.data.code ? e.log("formId上报成功") : (t.default.resource.addApi({
                    name: "formId上报失败",
                    statusCode: o.data.code
                }), e.log("formId上报失败==>" + JSON.stringify(o.data)));
            }).catch(function(t) {
                e.log("formId上报异常==>" + JSON.stringify(t));
            });
        },
        _getDomain: function() {
            return i.DOMAIN.indexOf("51ping") > 0 ? "https://m.51ping.com" : "https://m.dianping.com";
        }
    }
});