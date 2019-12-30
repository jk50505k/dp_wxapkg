var r = require("../npm/@dp/sparrow/index.js");

module.exports = {
    parse: r.url.parse,
    stringify: r.url.stringify,
    rewrite: r.url.rewriteURL
};