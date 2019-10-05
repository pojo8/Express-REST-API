const express = require('express');
const app = express();

// Express route
const loginExpressRoute  = express.Router();

// imported Schemas
let UserSchema = require('../model/user.model');
let UserSessionSchema = require('../model/userSession.model');

// saves the user if the registered email address does not exist
loginExpressRoute.route('/account/signup').post((request, response, next) =>{
    const { body } = request;
    let {
        firstName,
        lastName,
        email,
        password
    } = body;

    if(!firstName || !lastName || !email || !password) {
        response.send({
            success: false,
            message: 'Error: Fill in all the sign up fields'
        })
    }

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

//Sign in
loginExpressRoute.route('/account/login').post((request, response, next) =>{
    console.log("In the request")
    const { body } = request;
    const{
        password
    } = body;

    let {email} = body;

    if(!email || !password) {
        response.send({
            success: false,
            message: 'Error: Fill in all the login fields'
        });
        }

    email = email.toLowerCase();
    console.log(body)
    // verify email doesnt exist
    // FIXME validate email
    UserSchema.find({
        email: email
    }, (error, userList) => {
        if (error) {
            console.log("err1"+error)
            return response.send({
                success: false,
                message:'Error: Server error'
            });
        } else if (userList.length < 0 || userList.length >1)  {
            console.log(users)
            console.log("err2"+error)
            return response.send({
                success: false,
                message:'Error: Invalid'
            });
        }

    const user = userList[0];
    if (!user.validPassword(password)) {
        console.log("err3"+error)

        return response.send({
            success: false,
            message:'Error: Invalid'
        });
    }
        // correct USer
        const userSession = new UserSessionSchema();
        userSession.userId = user._id;
        userSession.save((error, session) => {
            if (error) {
                console.log("err4"+error)

                return response.send({
                    success: false,
                    messge: 'Error: server error'
                });
            }

            return response.send({
                success: true,
                message: 'Valid sign in',
                // token is linked to the user id
                token: session._id
            });
        })
    })
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