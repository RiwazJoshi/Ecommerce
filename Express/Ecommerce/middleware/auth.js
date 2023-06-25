const jwt = require("jsonwebtoken")

let authenticate = (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1]
    let user = null;
    if (token) {
        try {

            user = jwt.verify(token, process.env.JWT_SECRET)
            req.user = user;
        }
        catch (err) {
            return res.status(401).send({
                msg: "Invalid ",
                error: err.message
            })

        }
    }
    if (user) {
        next()
    }
    else {
        res.status(401).send({
            msg: "Invalid Token"
        })
    }
}


let checkRole = (req, res, next) => {
    if (req.user.role === "seller") {
        next();
    }
    else {
        res.status(403).send({
            msg: "Access denaided"
        })

    }
}

let isBuyer = (req, res, next) => {
    if (req.user.role === "buyer") {
        next();
    }
    else {
        res.status(403).send({
            msg: "Access denaided"
        })

    }

}
module.exports = {
    authenticate,
    checkRole,
    isBuyer

}