const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    role: {
        type: String,
        required: true,
        enum: ['buyer', 'seller'],
        set: function(value){
            return value.toLowerCase();
        }
    }
});

UserSchema.pre('save', async function (next) {
    console.log(this.password);
    let hashed = await bcrypt.hash(this.password, 10)
    this.password = hashed
})
module.exports = mongoose.model("User", UserSchema)
