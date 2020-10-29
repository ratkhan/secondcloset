const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        minlength: 3,
        required: true
    },
    name: {
        type:String,
        minlength: 3,
        required: true
    },
    pricing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pricing',
        required: false
    }
    
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

userSchema.plugin(uniqueValidator);


const User = mongoose.model('User', userSchema);

module.exports = User;