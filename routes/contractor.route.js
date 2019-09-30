const express = require('express');
const app = express();

// Express route
const contractorExpressRoute  = express.Router();

// Contractor SChema
let ContractorSchema = require('../model/contractor.model');

// Get Contractors
contractorExpressRoute.route('/').get((request, response) =>{
    ContractorSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            response.json(data)
        }
    })
})

// Create a contractor
contractorExpressRoute.route('/create-contractor').post((request, response, next) => {
    ContractorSchema.create(request.body, (error, data) =>{
        if (error) {
            return next(error)
        } else {
            response.json(data)
        }
    })
});

// Get a single contractor by _id
contractorExpressRoute.route('/get-contractor/:id').get((request, response) => {
    ContractorSchema.findById(request.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            response.json(data)
        }
    })
})


// Get a single contractor by city Using this approach of the query as mongoose doesnt really work well with req.query
contractorExpressRoute.route('/find-contractor-in/:city').get((request, response) => {
    ContractorSchema.find( {city: request.params.city }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            response.json(data)
        }
    })
})

// returns users with travel; distance less than suppied value or equal
contractorExpressRoute.route('/contractor-travels-within/:travelDistance').get((request, response) => {
    ContractorSchema.find({travelDistance: {$lte: request.params.travelDistance} }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            response.json(data)
        }
    })
})

// returns users with travel; distance greater than suppied value
contractorExpressRoute.route('/contractor-travels-over/:travelDistance').get((request, response) => {
    ContractorSchema.find( {travelDistance: {$gt: request.params.travelDistance} }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            response.json(data)
        }
    })
})


// update contractor
contractorExpressRoute.route('/update-contractor/:id').put((request, response, next) => {
    ContractorSchema.findByIdAndUpdate(request.params.id, {
        $set: request.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            response.json(data);
            console.log('Contractor successfully updated with the _id'+request.params.id)
        }
    })
})

// delete contractor 
contractorExpressRoute.route('remove-contractor/:id').delete((request , response, next) => {
    ContractorSchema.findByIdAndRemove(request.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            // In the event of an ok response output the message
            response.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = contractorExpressRoute;