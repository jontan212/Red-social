const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;

const CommentSchema = new Schema({
    user_comment: {type: String, required: true},
    bulo_id: {type: ObjectId, required: true},
    comment: { type: String, required: true},
    timestamp: { type: Date, default: Date.now }
});

module.exports = model('Comment', CommentSchema);