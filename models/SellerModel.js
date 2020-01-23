var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SellerSchema = new Schema({
    _id: Schema.Types.ObjectId,
    Name: {
        type: String
    },
    Email: {
        type: String
    },
    Password: {
        type: String
    },
    Country: {
        type: String
    },
    City: {
        type: String
    },
    Address: {
        type: String
    },
    Phone: {
        type: String
    },
    QRCode:{
        type: String
    }
})

const Seller = mongoose.model('Sellers', SellerSchema);
module.exports = Seller; 