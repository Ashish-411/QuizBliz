const User = require("../database/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//function to create a user
const createUser = async(req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        return res.status(400).json({
            message: "All fields are required"
        })
    }
    // Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ 
            message: "Invalid email format" 
        });
    }
    try{
        const existingEmail = await User.findOne({email});
        const existingUsername = await User.findOne({username});
        if(existingEmail){
            return res.status(400).json({message : "Email already exists"});
        }
        if(existingUsername){
            return res.status(400).json({message : "Username already exists"});
        }
        const user = await User.create({username,email,password});
        res.status(201).json({
            message: "Sign Up Successful"
        });
    }catch(err){
        res.status(400).json({error: err.message});
    }
};

const getUsers = async(req,res) =>{
    try{
        const users = await User.find({}, "username email");
        res.json(users);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

//user login function
const loginUser = async(req,res) =>{
    const {email,password} = req.body;

    if(!email || ! password){
        return res.status(400).json({
            message:"Email and password are required"
        })
    }
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message:"Invalid email or password"
            })
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                message:"Invalid email or password"
            })
        }

        //jwt token sign
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                email: user.email
            },
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );
        res.status(200).json({
            message:"Login Successfull",
            accessToken: token,
            user: {id: user._id, username: user.username, email: user.email}
        });
    }catch(err){
        res.status(500).json({
            error: err.message
        });
    }


}

module.exports = {createUser,getUsers, loginUser};