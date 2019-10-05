const express = require('express');
const app = express();

// Express route
const loginExpressRoute  = express.Router();

// Contractor SChema
let UserSchema = require('../model/user.model');

// saves the user if the registered email address does not exist
loginExpressRoute.route('/account/signup').post((request, response, next) =>{
    const { body } = request;
    const{
        firstName,
        lastName,
        email,
        password
    } = body;

    email = email.toLowerCase();

    // verify email doesnt exist
    // FIXME validate email
    UserSchema.find({
        email: email
    }, (error, previousUsers) => {
        if (error) {
            return response.send({
                success: false,
                message:'Error: Server error'
            });
        } else if (previousUsers.length > 0)  {
            return response.send({
                success: false,
                message:'Error: Account already exists'
            });
        }

    // save new user
    const newUser = new UserSchema();
    newUser.email = email;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.password = newUser.generateHash(password);

    newUser.save(function(error, user){
        if (error) {
            return response.send({
                success: false,
                msg: "Error: account not created"
            });
        } else {
            response.status(200).json({
                AddedUser: user
            })
        }    
    })
 });
});

// Delete user
loginExpressRoute.route('/account/delete-user/:id').delete((request , response, next) => {    
    UserSchema.findByIdAndRemove(request.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            // In the event of an ok response output the message
            response.status(200).json({
                deletedUser: data
            })
        }
    })
})

// Return all users
//FIXME to not return password
loginExpressRoute.route('/account/users').get((request, response) =>{
    UserSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            response.json(data)
        }
    })
})
 
// login
loginExpressRoute.route('/login/').get((request, response) =>{
    UserSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            response.json(data)
        }
    })
})

module.exports = loginExpressRoute;