//by using try catch block more and more in get or post request call it gaves us utility to use it when it will be needed

const asyncHandler = (requestHandler)=>{
    return (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>{
            return next(err);
        })
    }
}
export {asyncHandler}