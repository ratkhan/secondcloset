const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const User = require('../model/user');
const Pricing = require('../model/pricing');

beforeAll( async () => {
    await Pricing.deleteMany({});
    await User.deleteMany({});


    let pricingObject = new Pricing(helper.initialPricing[0]);
    await pricingObject.save();

    pricingObject = new Pricing(helper.initialPricing[1]);
    await pricingObject.save();

    pricingObject = new Pricing(helper.initialPricing[2]);
    await pricingObject.save();

    pricingObject = new Pricing(helper.initialPricing[3]);
    await pricingObject.save();

});

test('pricings are returned as json', async() => {
    await api
        .get('/api/pricing')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('all pricing objects are returned', async () => {
    const response = await api.get('/api/pricing');

    expect(response.body).toHaveLength(helper.initialPricing.length);
});

test('the first pricing should be VOLUME1', async () => {
    const response = await api.get('/api/pricing');
    expect(response.body[0].name).toBe(helper.initialPricing[0].name);
});

describe('Pricing test', () => {

    let items = helper.items;
    let currentPricing = helper.initialPricing[0];
    let currentUser = helper.initialUsers[0];
    describe('Calculating the right price for pricing ' + currentPricing.name, () => {
        let user;
        test('setting pricing ' + currentPricing.name + ' to a user' , async () => {

            //get the pricing by name
            const pricing = await api.get('/api/pricing/name/' + currentPricing.name);
            expect(pricing.body).toMatchObject({name: currentPricing.name});

            //create a user with the pricing
            const userToSave = {...currentUser,...{pricing:pricing.body.id}};
            await api.post('/api/users/').send(userToSave);
            user = await helper.usersInDbByUsername(userToSave.username);
            expect(user.pricing.toJSON()).toEqual(pricing.body.id);
        }
        );

        test('calculating right price for  ' + currentPricing.name, async () => {
            const expectedPrice = helper.expectedPrices.filter(price => price.name === currentPricing.name);
            //get the price for items
            const price = await api.get('/api/price/' + user.id).send(items);
            expect(price.body.price).toEqual(expectedPrice[0].price);
        }
        );
    });

    currentPricing = helper.initialPricing[1];
    currentUser = helper.initialUsers[1];
    describe('Calculating the right price for pricing ' + currentPricing.name, () => {
        let user;
        test('setting pricing ' + currentPricing.name + ' to a user' , async () => {

            //get the pricing by name
            const pricing = await api.get('/api/pricing/name/' + currentPricing.name);
            expect(pricing.body).toMatchObject({name: currentPricing.name});

            //create a user with the pricing
            const userToSave = {...currentUser,...{pricing:pricing.body.id}};
            await api.post('/api/users/').send(userToSave);
            user = await helper.usersInDbByUsername(userToSave.username);
            expect(user.pricing.toJSON()).toEqual(pricing.body.id);
        }
        );

        test('calculating right price for  ' + currentPricing.name, async () => {
            const expectedPrice = helper.expectedPrices.filter(price => price.name === currentPricing.name);
            //get the price for items
            const price = await api.get('/api/price/' + user.id).send(items);
            expect(price.body.price).toEqual(expectedPrice[0].price);
        }
        );
    });

    currentPricing = helper.initialPricing[2];
    currentUser = helper.initialUsers[2];
    describe('Calculating the right price for pricing ' + currentPricing.name, () => {
        let user;
        test('setting pricing ' + currentPricing.name + ' to a user' , async () => {

            //get the pricing by name
            const pricing = await api.get('/api/pricing/name/' + currentPricing.name);
            expect(pricing.body).toMatchObject({name: currentPricing.name});

            //create a user with the pricing
            const userToSave = {...currentUser,...{pricing:pricing.body.id}};
            await api.post('/api/users/').send(userToSave);
            user = await helper.usersInDbByUsername(userToSave.username);
            expect(user.pricing.toJSON()).toEqual(pricing.body.id);
        }
        );

        test('calculating right price for  ' + currentPricing.name, async () => {
            const expectedPrice = helper.expectedPrices.filter(price => price.name === currentPricing.name);
            //get the price for items
            const price = await api.get('/api/price/' + user.id).send(items);
            expect(price.body.price).toEqual(expectedPrice[0].price);
        }
        );
    });

    currentPricing = helper.initialPricing[3];
    currentUser = helper.initialUsers[3];
    describe('Calculating the right price for pricing ' + currentPricing.name, () => {
        let user;
        test('setting pricing ' + currentPricing.name + ' to a user' , async () => {

            //get the pricing by name
            const pricing = await api.get('/api/pricing/name/' + currentPricing.name);
            expect(pricing.body).toMatchObject({name: currentPricing.name});

            //create a user with the pricing
            const userToSave = {...currentUser,...{pricing:pricing.body.id}};
            await api.post('/api/users/').send(userToSave);
            user = await helper.usersInDbByUsername(userToSave.username);
            expect(user.pricing.toJSON()).toEqual(pricing.body.id);
        }
        );

        test('calculating right price for  ' + currentPricing.name, async () => {
            const expectedPrice = helper.expectedPrices.filter(price => price.name === currentPricing.name);
            //get the price for items
            const price = await api.get('/api/price/' + user.id).send(items);
            expect(price.body.price).toEqual(expectedPrice[0].price);
        }
        );
    });
    
    
});

afterAll(() => {
    mongoose.connection.close();
});