import asyncHandler from "../utils/asyncHandler.js";
import { parseTaskWithAI } from "../services/aiService.js";

export const parseTaskController = asyncHandler(async(req, res)=>{
    const {input} =req.body;
    if(!input){
        res.status(400);
        throw new Error("Input text is required");
    }

    const parseData= await parseTaskWithAI(input);
    res.status(200).json(parseData);
})