import * as mongoose from 'mongoose';

const petSchema = new mongoose.Schema({

    name: { type: String, required: true },    
    gender: {
    	type: String,
    	enum: ['MALE', 'FEMALE'],
    },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: Date
});

petSchema.pre('save', function (next) {
    const pet = this;
    const now = new Date();
    pet.updated_at = now;
    next();
});

const Pet = mongoose.model('Pet', petSchema);

export default Pet;
