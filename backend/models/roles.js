//import mongoose
const mongoose = require('mongoose');

const rolesShema = new mongoose.Schema({
    role :{type: String, required: true},
    permissions: [{type: String, required: true}],

})


//export Schema
module.exports = mongoose.model('Role', rolesShema);
//controller