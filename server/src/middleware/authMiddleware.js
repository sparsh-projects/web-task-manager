import jwt from 'jsonwebtoken';

// Protected using JWT authentication middleware
export default function authMiddleware(req, res, next){
    try{
        const authHeader= req.headers.authorization;

        //Header must exist and start with 'Bearer '
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            res.status(401)
            throw new Error("Unauthorized, token missing");
        }
        const token = authHeader.split(' ')[1];
        //verify token
        const decoded= jwt.verify(token, process.env.JWT_SECRET);

        //Attach user info to request object
        req.user= {
            userId: decoded.userId,
        }
        next();
        } catch(err){
            console.log("🔴 AUTH MIDDLEWARE ERROR:", err.message);
            res.status(401)
            throw new Error("Not authorized, token invalid or expired");
        }
}