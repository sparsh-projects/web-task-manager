// asyncHandler: wraps async controllers and forwards errors automatically

const asyncHandler = (fn) =>{
    return (req, res, next) =>{
        console.log("🟢 Middleware: asyncHandler");
        Promise.resolve(fn(req, res, next))
            .catch(next);
    }
}

export default asyncHandler;