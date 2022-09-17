const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    content: {
        minlength: 5,
        required: true,
        type: String
    },
    date: {
        required: true,
        type: Date
    },
    important: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

noteSchema.set('toJSON', {
    transform: (document, reqObj) => {
        reqObj.id = reqObj._id.toString()
        delete reqObj._id
        delete reqObj.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)