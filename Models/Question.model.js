const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    offer: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer', required: true },
    reponses: [
        {
            reponseText: { type: String, required: true }, // Text of the response
            isCorrect: { type: Boolean, required: true }   // Indicates if this response is correct
        }
    ]
});

module.exports = mongoose.model('Question', QuestionSchema);