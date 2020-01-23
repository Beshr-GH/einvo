var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    _id: Schema.Types.ObjectId,
    Name: {
        type: String
    },
    Phone: {
        type: String
    },
    Address: {
        type: String
    },
    Email: {
        type: String
    },
    QRCode: {
        type: String
    },
    Invoices : [{ type: Schema.Types.ObjectId }]

})

const Customer = mongoose.model('Customers', CustomerSchema);
module.exports = Customer; 