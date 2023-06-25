const express = require("express");
const app = express()
app.get("/products", products_acion_middle_ware)
const checkAuthentication = (req, res, next) => {
    app.use(checkAuthentication)
}
const products_acion_middle_ware = (req, res, next) => {
    res.send([{} , {}])
}
app.listen(8000, () => {
    console.log("server started");
})