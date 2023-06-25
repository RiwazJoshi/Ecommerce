const express = require('express')
const router = express.Router()

const { body, validationResult } = require('express-validator');
const { login, signup } = require("../controller/auth")
router.post("/api/signup", body('name').exists().withMessage("required field"), (req, res, next) => {

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next()
},signup)


router.post('/api/login',login)
module.exports = router