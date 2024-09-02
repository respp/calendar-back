const { Schema, model } = require("mongoose");

const EventScehema = Schema({
    title : {
        type: String,
        required: true
    },
    notes : {
        type: String,
    },
    start : {
        type: Date,
        required: true
    },
    end : {
        type: Date,
        required: true
    },
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required : true
    },
    
})

EventScehema.method('toJSON', function(){ //limpio info innecesaria
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = model('Event', EventScehema)