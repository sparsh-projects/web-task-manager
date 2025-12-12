// Global Error Handler — catches all backend errors in one place

export const errorMiddleware = (err, req, res, next)=> {
    console.log("🔴 ERROR HANDLER:", err.message);
    console.error("Error:", err.message);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
}