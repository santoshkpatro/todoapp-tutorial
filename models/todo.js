const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
    task: String,
    isCompleted: Boolean,
}, { timestamps: true })

module.exports = mongoose.model('Todo', todoSchema)
