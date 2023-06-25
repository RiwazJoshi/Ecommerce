const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../model/User")


const login = async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.body.email });


        if (user) {
            // console.log(req.body.password);
            // console.log(user.password);
            let status = await bcrypt.compare(req.body.password, user.password)
            if (status) {
                let obj = user.toObject()
                delete obj.password
                let token = jwt.sign(obj, process.env.JWT_SECRET);
                return res.send({
                    token: token
                })
            }
        }

        return res.status(401).send({
            msg: "Invalid Credential"
        })
    }
    catch (err) {
        console.log(err);
        // next(err)
    }
}
const signup = async (req, res, next) => {
    try {
        let existing_user = await User.find({ email: req.body.email }).countDocuments();
        if (existing_user) {
            return res.status(400).send({
                "errors": [
                    {
                        "msg": "email already exists",
                        "param": "email"
                    }
                ]
            })
        }
        let hashed = await bcrypt.hash(req.body.password, 10)
        console.log(hashed)

        let user = await User.create({ ...req.body })
        res.send(user)
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    login,
    signup
}