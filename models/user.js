const mongoose = require("mongoose");

const options = {
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
};

const schema = new mongoose.Schema(
    {
        fullname: { type: String, require: true },
        email: { type: String, require: true },
        password: { type: String, require: true }
    },
    options
);

const User = mongoose.model("User", schema);

module.exports = User;
