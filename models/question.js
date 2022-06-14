const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
    que: {
        type: String,
        required: true,
        unique: true
    },
    option1: {
        type: String,
        required: true
    },
    option2: {
        type: String,
        required: true
    },
    option3: {
        type: String,
        required: true
    },
    option4: {
        type: String,
        required: true
    },
    ans: {
        type: Number,
        required: true,
    },
    level: {
        type: Number,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Question',questionSchema)