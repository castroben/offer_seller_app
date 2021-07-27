const Joi = require('joi');

const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req,res) => {
    User.find().catch(err => res.status(400).json(`Error: ${err}`)).then(users => res.json(users));
});

router.route('/add').post((req,res) => {
   const username = req.body.username;
   const newUser = new User({username});
   newUser.save().catch(err => res.status(400).json(`Error: ${err}`)).then(() => res.json('User added successfully'));
});

router.route('/:id').delete((req,res) => {
    Exercise.findByIdAndDelete(req.params.id).catch(err => res.status(400).json(`Error: ${err}`)).then(() => res.json('User deleted'));
});

function validateUsername(username){
    const schema = Joi.object({
        username: Joi.string().min(3).required()
    });
    const validation = schema.validate(username);
    return validation;
}

module.exports = router;