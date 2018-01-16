import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    name: String,
    
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: Date
});

userSchema.pre('save', function (next) {
    const user = this;
    const now = new Date();
    user.updated_at = now;

    if (!user.password) { return next(); }

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) { return next(err); }

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, (err1, hash) => {
            if (err1) { return next(err1); }

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) { return cb(err); }
        cb(null, isMatch);
    });
};

const User = mongoose.model('User', userSchema);

export default User;
