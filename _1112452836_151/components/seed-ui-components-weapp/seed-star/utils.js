Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.handleScore = function(e) {
    return e >= 0 && e < 5 ? 0 : e >= 5 && e < 10 ? 5 : e >= 10 && e < 15 ? 10 : e >= 15 && e < 20 ? 15 : e >= 20 && e < 25 ? 20 : e >= 25 && e < 30 ? 25 : e >= 30 && e < 35 ? 30 : e >= 35 && e < 40 ? 35 : e >= 40 && e < 45 ? 40 : e >= 45 && e < 48 ? 45 : e >= 48 ? 50 : 0;
};