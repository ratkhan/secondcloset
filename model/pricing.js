const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const pricingSchema = new mongoose.Schema({
    type: {
        type: String,
        unique: true,
        minLength: 3,
        required: true
    },
    name: {
        type: String,
        unique: true,
        minlength: 3,
        required: true
    },
    flat_fee: {
        type:Number
    },
    discount: {
        type:Number
    },
    price_per_volume: {
        type:Number
    },
    price_per_value: {
        type:Number
    },
    step_size: {
        type:Number
    },
    discount_step_per_step: {
        type:Number
    },
    max_discount: {
        type:Number
    }
});

pricingSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

pricingSchema.plugin(uniqueValidator);


const Pricing = mongoose.model('Pricing', pricingSchema);

module.exports = Pricing;