const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const offerSchema = new Schema(
    {
        sellerUsername: {type:String, required:true},
        description: {type:String, required:true},
        price: {type:Number, required:true},
        date: {type:Date, required:true}
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model('Offer', offerSchema);