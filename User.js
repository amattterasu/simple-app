const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: Number,
    email: String,
    password: String,

});

module.exports = mongoose.model('token', TokenSchema);;