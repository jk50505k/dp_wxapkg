Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./adapters/wx"));

exports.default = {
    config: {
        method: "GET"
    },
    adapter: e.default
};