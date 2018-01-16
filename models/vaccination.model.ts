import * as mongoose from 'mongoose';

const vaccinationSchema = new mongoose.Schema({

    pet: { type: String, required: true },    
    drug: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Drug' }],
    
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: Date
});

vaccinationSchema.pre('save', function (next) {
    const vaccination = this;
    const now = new Date();
    vaccination.updated_at = now;
    next();
});

const Vaccination = mongoose.model('Pet', vaccinationSchema);

export default Vaccination;
