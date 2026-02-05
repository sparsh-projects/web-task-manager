import asyncHandler from "../utils/asyncHandler.js";
import { registerUserService, loginUserService } from "../services/authService.js";

// Register new user
export const registerUserController= asyncHandler(async (req, res)=>{
    console.log("Controller: registerUserController, Body =", req.body);
    const userData= req.body;
    const newUser= await registerUserService(userData);
    res.status(201).json(newUser);
})

// Login user
export const loginUserController = asyncHandler(async (req, res) => {
    console.log("Controller: loginUserController, Body =", req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Email and password are required");
    }
    const data = await loginUserService(email, password);
    res.status(200).json(data);
});