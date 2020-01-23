var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminSchema = new Schema({
    _id: Schema.Types.ObjectId,
    Name: {
        type: String
    },
    Email: {
        type: String
    },
    Password: {
        type: String
    }   

})

const Admin = mongoose.model('Admins', AdminSchema);
module.exports = Admin; 