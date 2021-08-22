const Joi = require('joi');

const router = require('express').Router();
let Seller = require('../models/seller.model');

router.route('/').get((req,res) => {
    Seller.find().catch(err => res.status(400).json(`Error: ${err}`)).then(sellers => res.json(sellers));
});

router.route('/add').post((req,res) => {
   const username = req.body.username;
   const newSeller = new Seller({username});
   newSeller.save().catch(err => res.status(400).json(`Error: ${err}`)).then(() => res.json('Seller added successfully'));
});

router.route('/:id').delete((req,res) => {
    Seller.findByIdAndDelete(req.params.id).catch(err => res.status(400).json(`Error: ${err}`)).then(() => res.json('Seller deleted'));
});

/*function validateUsername(username){
    const schema = Joi.object({
        username: Joi.string().min(3).required()
    });
    const validation = schema.validate(username);
    return validation;
}*/

module.exports = router;