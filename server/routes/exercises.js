const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req,res) => {
    Exercise.find().catch(err => res.status(400).json(`Error: ${err}`)).then(users => res.json(users));
});

router.route('/add').post((req,res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });
    newExercise.save().catch(err => res.status(400).json(`Error: ${err}`)).then(() => res.json('Exercise added successfully'));
});

router.route('/:id').get((req,res) => {
   Exercise.findById(req.params.id).catch(err => res.status(400).json(`Error: ${err}`)).then(exercise => res.json(exercise)) ;
});

router.route('/:id').delete((req,res) => {
   Exercise.findByIdAndDelete(req.params.id).catch(err => res.status(400).json(`Error: ${err}`)).then(() => res.json('Exercise deleted'));
});

router.route('/update/:id').post((req,res) => {
   Exercise.findById(req.params.id)
       .then(exercise => {
           console.log(exercise);
           exercise.username = req.body.username;
           exercise.description = req.body.description;
           exercise.duration = Number(req.body.duration);
           exercise.date = Date.parse(req.body.date);
           console.log(exercise);
           exercise.save().then(res.send('Exercise updated')).catch(err => res.status(400).json(`Error: ${err}`));
       })
       .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;