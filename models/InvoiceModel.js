var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InvoiceShcema = new Schema({
    _id: Schema.Types.ObjectId,
    Date: {
        type: Date
    },
    Products: [{ 
        Product : Schema.Types.ObjectId,
        // Category : Schema.Types.ObjectId,
        Quantity : Number ,
        Unit : String,
        Price : Number 

     }],
    Seller: {
        type: Schema.Types.ObjectId
    },
    Customer: {
        type: Schema.Types.ObjectId
    },
    QRCode: {
        type: String
    },
    Total_Sum : {
        type : Number
    }

})

const Invoice = mongoose.model('Invoices', InvoiceShcema);
module.exports = Invoice; 