const { dblClick } = require("@testing-library/user-event/dist/click");
const express = require("express") //Common Js Module System


const app = express()
app.use(express.json())
let login = true;
const checkAuthentication = (req, res, next) => {
    console.log("inside check");
    if (login) {
        next()
    }
    else {
        return res.status(401).send({
            msg: "Unauthenticated"
        })
    }
}

// app.use((req, res, next) => {
//     console.log("inside app.use");
//     //  res.send("middleware data")
//     console.log("middlewear 1");
//     next()

// })
/*middleware
1.global middleware
2.local middleware
3.external middleware

middleware- a function which has access to respance and request and also next 
*/

app.get("/products", (req, res, next) => {
    try {
        database.find({})
        res.send(["data inserted"])
        res.send([{ id: 1, name: "Hello" }])
    }
    catch (err) {
        return next(err)
        console.log("err")
        return res.status(500).send({
            msg: "Server Error"
        })
    }
})
app.post("/products", (req, res) => {
    console.log("req.body-", req.body);
    try {
        database.insertOne({})
        res.send(["data inserted"])
    }
    catch (err) {
        return next(err)
        //     console.log("err")
        //     return res.status(500).send({
        //         msg: "Server Error"
        //     })
    }
})

app.get("/get-user", checkAuthentication, (req, res) => {
    res.send([{ id: 1, name: "User" }])
})
app.use((req, res) => {
    res.status(404).send("Resource Not Found")
})
app.use((err, req, res) => {
    res.status(500).send("Server Error")
})

app.listen(8000)






/*
db.users.insertOne({
    name:"ram",
    email:"ram@ram.com",
    role:"buyer"
});
db.users.updateOne({_id: ObjectId("63bbb65563752ab0f301a98d")},{$set:{role:"seller"}})


db.users.updateMany({role:"buyer"},{$set:{balance:200}})
db.users.insertMany([{
    name: "Hari",
    email: "hari@hari.com",
    role: "buyer",
    balance: 0
},
{
    
    name: "John",
    email: "John@john.com",
    role: "buyer",
    balance: 100
}
])
*/