var e = require("../npm/@dp/sparrow/index.js");

module.exports = {
    getLocation: e.geo.getLocation.bind(e.geo),
    getLocationNoReject: e.geo.getLocationNoReject.bind(e.geo),
    getLocCity: e.geo.getLocCity.bind(e.geo),
    getCity: e.geo.getCity.bind(e.geo)
};