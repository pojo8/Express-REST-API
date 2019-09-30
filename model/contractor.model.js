const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let contractorSchema = new Schema({
    name:{
        type: String
    },
    codeName:{
        type: String
    } ,
    dob:{
        type: Date
    },
    city:{
        type: String
    },
    travelDistance:{
        type: Number
    },
    fields:{
        type: Array
    }
}, {
        collection: 'contractors'
    })

module.exports = mongoose.model('ContractorSchema', contractorSchema)