import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    accounts: [{
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: false,
    }
    ],
    associated_homes: [{
        type: Schema.Types.ObjectId,
        ref: 'Home',
        required: false,
    }],
    password: {
        required: true,
        type: String,
    },
});

export default mongoose.model('user', userSchema);