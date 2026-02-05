import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

/**
 * Register a new user
 */
export async function registerUserService(userData) {
    console.log("Service: registerUserService, Data =", userData);
    const { email, password } = userData;

    // validate input
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }

    // hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create new user by saving to DB
    const newUser = await User.create({
        email,
        password: hashedPassword,
    });

    return {
        id: newUser._id,
        email: newUser.email,   
    createdAt: newUser.createdAt,
    }
}


/** Log In User */
export async function loginUserService(email, password){
    console.log("Service: loginUserService, Email =", email);

    // validate input
    if(!email || !password){
        throw new Error("Email and password are required");
    }

    //  1 Check user existence
    const user= await User.findOne({ email });
    if(!user){
        throw new Error("Invalid email or password");
    }

    // 2 Password verification
    const isMatch =await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error("Invalid email or password");
    }

    // 3 Generate JWT token
    const token =jwt.sign(
        {userId: user._id},
        process.env.JWT_SECRET,
        {expiresIn: "7d"}
        )
    
    // 4 Return only safe user data and token
    return {
        user:{
            id: user._id,
            email: user.email,
        },
        token: token,
    }
}