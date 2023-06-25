const express = require("express");
const product_route = require('./routes/product')
require('dotenv').config()
require('./config/database')
const app = express()
app.use(express.json())
app.use(express.static('uploads'))
app.use("/api/products", product_route)

app.use(require('./routes/auth'))
app.use((err, req, res, next,) => {
    let status = 500;
    let msg = 'Server Error'
    let errors = []


    if (err.name == "ValidationError") {
        status = 400
        msg = "Bad Request"
        Object.entries(err.errors).forEach((err) => {
            errors.push({
                msg: err[1].message,
                param: err[0]
            })
        })
    }


    res.status(status).send({
        msg,
        error: err.message,
        errors
    })
})


app.listen(8000, () => {
    console.log("server started");
})