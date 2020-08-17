const User = require('../models/user');
const mongoose = require("mongoose");

const Manager = {
    getById: async id => {
        const t = await User.findById(id);
        if (t === null)
            return false;

        return t;
    },
    getByEmail: async email => {
        const t = await User.findOne({ email: email });
        if (t === null)
            return false;

        return t;
    },
    create: async t => {
        let user = new User({ ...t });
        const r = await user.save();
        if (r === null)
            return false;

        return r;
    },
    list: async keyword => {
        return await User.final({});
    }
};

module.exports = Manager;