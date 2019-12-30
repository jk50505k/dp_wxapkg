var r = require("../npm/@dp/sparrow/index.js");

module.exports = function() {
    return r.login.ensure().apply(r.login, arguments);
};