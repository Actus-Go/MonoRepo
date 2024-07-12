const mongoose = require('mongoose');
const { Schema } = mongoose;

const sectorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Sector = mongoose.model('Sector', sectorSchema)

module.exports = Sector;