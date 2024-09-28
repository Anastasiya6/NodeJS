const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const participantSchema = new Schema({
    fullName: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required:true,
    },
    dateOfBirth: {
        type: Date,
        required:true,
    },
    eventId: {
        type: Schema.Types.ObjectId,
        required:true,
        ref: 'Event', // Зв'язок з моделлю подій
    },
    source: {
        type: String,
        required:true,
    },
 }, { timestamps: true});

 const Participant = mongoose.model('Participant',participantSchema);

 module.exports = Participant;