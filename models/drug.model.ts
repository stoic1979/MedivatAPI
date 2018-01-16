import * as mongoose from 'mongoose';

const drugSchema = new mongoose.Schema({

    name: { type: String, required: true },    
    
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: Date
});

drugSchema.pre('save', function (next) {
    const drug = this;
    const now = new Date();
    drug.updated_at = now;
    next();
});

const Drug = mongoose.model('Drug', drugSchema);

export default Drug;
