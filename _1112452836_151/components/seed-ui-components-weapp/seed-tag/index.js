var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./service-text-map.js"));

Component({
    properties: {
        type: {
            type: String
        },
        value: {
            type: String
        },
        size: {
            type: String
        }
    },
    data: {
        serviceTextMap: e.default
    },
    ready: function() {},
    methods: {}
});