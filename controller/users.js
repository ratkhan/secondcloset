const usersRouter = require('express').Router();
const User = require('../model/user');

//create user
usersRouter.post('/', async(request, response) => {
    const body = request.body;

    const user = new User({
        username: body.username,
        name: body.name,
        pricing: body.pricing || []
    });

    const savedUser = await user.save();

    response.json(savedUser);
});

//get all users
usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('pricing', {name: 1, id: 1});
    response.json(users.map(user => user.toJSON()));
});

//get user by id
usersRouter.get('/:id', async (request, response) => {
    const userId = await request.params.id;
    const user = await User
        .findById(userId)
        .populate('pricing', {name: 1, id: 1});
    response.json(user);
});


//change user by id, used to change pricing applied to users
usersRouter.put('/:id', async (request, response) => {
    const body = await request.body;
    const userIdToUpdate  = await request.params.id;

    const result = await User.findByIdAndUpdate(userIdToUpdate, body, {new:true});
    response.json(result);
});

//delete pricing
usersRouter.delete('/:id', async(request, response) => {
    const userIdToDelete = await request.params.id;

    const userToDelete = await User.findById(userIdToDelete);

    await User.findByIdAndRemove(userToDelete);
    response.status(204).end();
});

module.exports = usersRouter;