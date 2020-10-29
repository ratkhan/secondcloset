const priceRouter = require('express').Router();
const priceService = require('../service/priceCalculation');
const User = require('../model/user');
const Pricing = require('../model/pricing');

//pass items and get price calculated for specific user
priceRouter.get('/:id', async (request, response) => {
    const body = request.body;

    const userId = await request.params.id;
    const user = await User
        .findById(userId)
        .populate('pricing', {name: 1, id: 1});
    const pricing = await Pricing.findById(user.pricing.id);
    const price = priceService.calculatePrice(body.items, pricing);


    response
        .status(200)
        .send({price:price});
});

module.exports = priceRouter;