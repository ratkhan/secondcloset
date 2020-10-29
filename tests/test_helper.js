const Pricing = require('../model/pricing');
const User = require('../model/user');

const initialPricing = [
    {
        type: 'PLAIN',
        name: 'PLAIN5',
        flat_fee: 20,
        discount: 0.05,
    },
    {
        type: 'VOLUME',
        name: 'VOLUME1',
        flat_fee: 20,
        price_per_volume: 1,
    },
    {
        type: 'VALUE',
        name: 'VALUE5',
        flat_fee: 20,
        price_per_value: 0.05,
    },
    {
        type: 'NUMBER_VOLUME',
        name: 'NUMBER100_VOLUME2',
        flat_fee: 20,
        discount: 0.05,
        step_size: 100,
        discount_step_per_step: 0.05,
        max_discount: 0.15,
        price_per_volume: 2,
    }];

const initialUsers = [
    {
        username: 'PersonOne',
        name: 'PersonWithPlainPricing',
        pricing: {}
    },
    {
        username: 'PersonTwo',
        name: 'PersonWithVolumePricing',
        pricing: {}

    },
    {
        username: 'PersonThree',
        name: 'PersonWithValuePricing',
        pricing: {}

    },
    {
        username: 'PersonFour',
        name: 'PersonWithNumberPricing',
        pricing: {}

    }];

const items =
    {
        items: [


            {
                name: 'Fridge',
                length: 3,
                height: 6,
                width: 4,
                weight: 300,
                value: 1000
            },
            {
                name: 'Sofa',
                length: 5,
                height: 4,
                width: 3,
                weight: 100,
                value: 500
            }
        ]
    };

const expectedPrices = [
    {
        name: 'PLAIN5',
        price: 38
    },
    {
        name: 'VOLUME1',
        price: 172
    },
    {
        name: 'VALUE5',
        price: 115
    },
    {
        name: 'NUMBER100_VOLUME2',
        price: 304
    }
];


const notExistingId = async () => {
    const blog = new Blog({title: 'EmptyBlog'});
    await blog.save();
    await blog.remove();

    return blog._id.toString();
};

const pricingInDb = async () => {
    const pricings = await Pricing.find({});
    return pricings.map(pricing => pricing.toJSON());
};

const usersInDbByUsername = async (username) => {
    const users = await User.findOne({username:username});
    return users;
};

module.exports = {
    initialUsers,
    initialPricing,
    items,
    expectedPrices,
    notExistingId,
    pricingInDb,
    usersInDbByUsername
};