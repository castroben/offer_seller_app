const router = require('express').Router();
let Offer = require('../models/offer.model');

router.route('/').get((req,res) => {
    Offer.find().catch(err => res.status(400).json(`Error: ${err}`)).then(offers => res.json(offers));
});

router.route('/add').post((req,res) => {
    const sellerUsername = req.body.sellerUsername;
    const description = req.body.description;
    const price = Number(req.body.price);
    const date = Date.parse(req.body.date);

    newOffer = new Offer({
        sellerUsername,
        description,
        price,
        date
    });
    newOffer.save().catch(err => res.status(400).json(`Error: ${err}`)).then(() => res.json('Offer added successfully'));
});

router.route('/:id').get((req,res) => {
   Offer.findById(req.params.id).catch(err => res.status(400).json(`Error: ${err}`)).then(offer => res.json(offer)) ;
});

router.route('/:id').delete((req,res) => {
   Offer.findByIdAndDelete(req.params.id).catch(err => res.status(400).json(`Error: ${err}`)).then(() => res.json('Offer deleted'));
});

router.route('/update/:id').post((req,res) => {
   Offer.findById(req.params.id)
       .then(offer => {
           offer.sellerUsername = req.body.sellerUsername;
           offer.description = req.body.description;
           offer.price = Number(req.body.price);
           offer.date = Date.parse(req.body.date);
           offer.save().then(res.send('Offer updated')).catch(err => res.status(400).json(`Error: ${err}`));
       })
       .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;