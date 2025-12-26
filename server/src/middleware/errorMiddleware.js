// Global Error Handler — catches all backend errors in one place

export const errorMiddleware = (err, req, res, next)=> {
    console.log("🔴 ERROR HANDLER:", err.name, err.message);
    
    if(err.name === 'CastError'){
        return res.status(400).json({
            success: false,
            message: "Invalid ID format"
        });
    }

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
}