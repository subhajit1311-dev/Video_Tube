import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express();
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
)
//common middlewares
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true ,limit:"16kb"}));
app.use(express.static("public"))

app.use(cookieParser())

//import routes
import healthcheckRouter from "./routes/healthcheck.routes.js"
import userRouter from "./routes/user.routes.js"
import { errorHandler } from "./middlewares/error.middlewares.js";

//routes 
app.use("/api/v1/healthcheck",healthcheckRouter)
app.use("/api/v1/users",userRouter)
// app.use("/api/v1/users", userRouter); directs all "/api/v1/users/*" requests to userRouter.
// Inside userRouter, we define specific routes like POST /register and GET /profile.
// The correct route handler (controller function) is called based on the request.
// The response is sent back to the client after processing.





//app.use(errorHandler)
export {app}