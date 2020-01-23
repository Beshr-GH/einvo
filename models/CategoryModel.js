var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    _id: Schema.Types.ObjectId,
    Name: {
        type: String
    },
    Info: {
        type: String
    }

})

const Category = mongoose.model('Categories', CategorySchema);
module.exports = Category; 