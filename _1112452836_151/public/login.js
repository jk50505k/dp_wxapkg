var n = require("../npm/@dp/sparrow/index.js");

module.exports = {
    getUserInfo: n.login.getUserInfo.bind(n.login),
    niceToHave: n.login.niceToHave.bind(n.login),
    goToLoginPage: n.login.goToLoginPage.bind(n.login),
    must: n.login.must.bind(n.login),
    ensure: n.login.ensure.bind(n.login)
};