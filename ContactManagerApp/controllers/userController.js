

const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

//@desc register a user
//@route POST /api/users/register
//@access public 
const registerUser = expressAsyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered!");
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log(`User created ${user}`);
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({ message: "Register the user" });
});

//@desc Login a user
//@route POST /api/users/login
//@access public 

// create a endpoint, whenever a user logins in we get an access token. we will use json web token to do this.
// it has 3 parts like the json web token. 1st is teh header algorithm, 2nd is pay load (user information we are going to add like user info)
// thired part is signature verification
// whenver we get the email address and the password, we match password and then provide user with a access token.
const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    // find if user is in database or not
    const user = await User.findOne({ email })

    // compare password from client to hashedpassword
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            // provide payload
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            },
        },
            process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" }
        ); // provide access token secret 
        res.status(200).json({ accessToken })
        // we can use this accesstoken we can access all the private routes

    } else {
        res.status(401); // password or email is not valid  
        throw new Error("Email or Password is not valid")

    }


});


//@desc current user info 
//@route POST /api/users/login
//@access private 

// clicent has to pass in access token so only auth users can look at it 
const currentUserInfo = expressAsyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUserInfo }