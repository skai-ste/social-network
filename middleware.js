exports.hasUserId = function(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.redirect("/");
    }
};

exports.hasNoUserId = function(req, res, next) {
    if (req.session.userId) {
        return res.redirect("/welcome");
    } else {
        next();
    }
};
