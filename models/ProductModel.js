var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    _id: Schema.Types.ObjectId,
    Name: {
        type: String
    },
    Category : {
        type: Schema.Types.ObjectId
    },
    Info: {
        type: String
    },
    QRCode: {
        type: String
    }

})

const Product = mongoose.model('Products', ProductSchema);
module.exports = Product; 