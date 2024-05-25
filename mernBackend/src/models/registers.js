const mongoose = require('mongoose');

// defining the Schema for the mongoDB collection named Register
const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// now we create a collection

const Register = new mongoose.model("Register", employeeSchema);
module.exports = Register;