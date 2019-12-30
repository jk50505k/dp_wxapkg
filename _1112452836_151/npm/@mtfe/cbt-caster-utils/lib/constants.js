Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.TPL = "$$tpl", exports.SCOPE = "$$context", exports.VIEW_SCOPE = "$$viewscope", 
exports.V_DOM = "$$vdom", exports.STORE = "$store", exports.PAGE = "$page", exports.WXSS = "$$style", 
exports.CHILD_CONTEXT = "$$comp_ctx", exports.COMP_INDEX = "$$comp_idx";

var e = exports.CACHE_OPTION = void 0;

!function(e) {
    e.NEVER = "never";
}(e || (exports.CACHE_OPTION = e = {}));

var o = exports.ErrorTypes = void 0;

!function(e) {
    e.request = "request", e.context = "context", e.jsvm = "jsvm", e.callback = "callback", 
    e.unknow = "unknow";
}(o || (exports.ErrorTypes = o = {}));