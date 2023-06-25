const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OrderSchema = new Schema({
    products: [{
        name: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            min: 0,
            required: true,
        },
        quantity: {

            type: Number,
            min: 1,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "shipped", "rejected"],
            default: "pending",
            required: true,

        }
    }],
    created_by: {
        type: ObjectId,
        required: true,
    }
});

module.exports = mongoose.model("Order", OrderSchema)
