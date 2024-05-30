const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
    },
    priority:{
        type:String,
        enum:['High','Medium','Low'],
        default:'Medium',
    },
    dueDate:{
        type:Date,
        required:true
    }
})
const Task = mongoose.model('Task',TaskSchema);
module.exports = Task;