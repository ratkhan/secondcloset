const pricingRouter = require('express').Router();
const Pricing = require('../model/pricing');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
require('express-async-errors');


//get all the pricing types
pricingRouter.get('/', async (request, response) => {
    const prices = await Pricing
        .find({});
    response.json(prices.map(blogs => blogs.toJSON()));
});

//get pricing by id
pricingRouter.get('/:id', async(request, response, next) => {
    try{
        const price = await Pricing.findById(request.params.id);
        if (price) {
            response.json(price.toJSON());
        } else {
            response.status(404).end();
        }
    } catch (exception) {
        next(exception);
    }
});

//get pricing by name
pricingRouter.get('/name/:type', async(request, response, next) => {
    try{
        const pricing = await Pricing.findOne({name:(request.params.type).toUpperCase()});
        if (pricing) {
            response.json(pricing.toJSON());
        } else {
            response.status(404).end();
        }
    } catch (exception) {
        next(exception);
    }
});


//create a pricing of one of the types
pricingRouter.post('/',async (request, response, next) => {
    const body = request.body;
    let price;
    if (body.type === 'PLAIN'){
        price = new Pricing({
            type: 'PLAIN',
            name: body.name,
            flat_fee: body.flat_fee,
            discount: body.discount
        });
    }
    if (body.type === 'VOLUME'){
        price = new Pricing({
            type: 'VOLUME',
            name: body.name,
            flat_fee: body.flat_fee,
            price_per_volume: body.price_per_volume
        });
    }

    if (body.type === 'VALUE'){
        price = new Pricing({
            type: 'VALUE',
            name: body.name,
            flat_fee: body.flat_fee,
            price_per_value: body.price_per_value
        });
    }
    if (body.type === 'NUMBER_VOLUME'){
        price = new Pricing({
            type: 'NUMBER_VOLUME',
            name: body.name,
            flat_fee: body.flat_fee,
            price_per_volume: body.price_per_value,
            discount: body.discount,
            step_size: body.step_size,
            discount_step_per_step: body.discount_step_per_step,
            max_discount: body.max_discount
        });
    }
    try {
        if (price) {
            const savedPrice = await price.save();
            response.status(201).json(savedPrice.toJSON());
        } else {
            response.status(400).end();

        }
    } catch (exception) {
        next(exception);
    }
});

//change pricing by id
pricingRouter.put('/:id', async (request, response) => {
    const body = await request.body;
    const pricingTypeIdToUpdate = await request.params.id;

    const result = await Pricing.findByIdAndUpdate(pricingTypeIdToUpdate, body, {new:true});
    response.json(result);
});

//change pricing attribute for all pricings
pricingRouter.put('/', async (request, response) => {
    const body = await request.body;
    const allPricing = await Pricing
        .find({});
    const result = allPricing
        .map(async(pricing) => await Pricing.findByIdAndUpdate(pricing.id, body, {new:true}));


    response.json(result);
});

//delete pricing
pricingRouter.delete('/:id', async(request, response) => {
    const pricingIdToDelete = await request.params.id;

    const pricingToDelete = await Pricing.findById(pricingIdToDelete);
    logger.info(pricingToDelete);

    await Pricing.findByIdAndRemove(pricingToDelete);
    response.status(204).end();
});

module.exports = pricingRouter;
