const mongoose = require("mongoose");

const TimeTableSchema = new mongoose.Schema({

time:{
    type: String,
    required: true
},
nPeople:{
    type: Number,
    required: true
},
date:{
    type: mongoose.Types.ObjectId,
    ref: "Classes"
}, 
user:{
    type: mongoose.Types.ObjectId,
    ref: "Users"
}

})

module.exports = mongoose.model("TimeTable", TimeTableSchema)