Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./interceptor"));

exports.default = new e.default({
    type: "response",
    resolve: function(e) {
        var r = e.request, o = e.response;
        return console.log("请求URL: " + r.url), console.log("响应: " + JSON.stringify(o)), 
        Promise.resolve(e), e;
    },
    reject: function(e) {
        console.log("请求错误: " + JSON.stringify(e)), Promise.reject(e);
    }
});