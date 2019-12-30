var e = require("../npm/@dp/sparrow/index.js");

module.exports = function(r, s) {
    return s && s.isMapiRequest ? e.request.mapi(r, s) : e.request.custom(r, s);
};