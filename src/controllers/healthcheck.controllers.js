import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


//The purpose of this health check API is to verify whether the server is running properly and responding to requests.

//Defines an async function for health check and wraps it with error handling.
const healthcheck = asyncHandler( async (req,res)=>{
    return res
    .status(200)
    .json(new ApiResponse(200,"ok","health check passed"))//Sends a JSON response confirming the server is running.
})

export {healthcheck} //Exports the function for use in routes.