import {Router} from "express"
import { registerUser } from "../controllers/user.controllers.js"
import {upload} from "../middlewares/multer.middlewares.js"
const router = Router();

// POST /register sends user data to the server.
// The server processes the data (e.g., checks for existing users, hashes the password, stores the user).
// The server responds with a success message and the newly created user details.

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser)

export default router