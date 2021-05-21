const mongoose = require('mongoose');
const { Schema } = mongoose;
const path = require('path');

const BuloSchema = new Schema({
    user_bulo: {type: String, required: true},
    description: { type: String, required: true},
    filename: { type: String },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now }
});

BuloSchema.virtual('uniqueId')
    .get(function () {
        return this.filename.replace(path.extname(this.filename), '');
    });

module.exports = mongoose.model('Bulo', BuloSchema);