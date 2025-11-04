import {Router} from 'express'
import { AuthController } from '../../controller/auth.controller.js';
import { jwtAuthorizationToken} from '../../middlewares/jwtAuthorization.js';
const authRouter = Router();
const authController = new AuthController();

authRouter.post('/register',authController.createUser.bind(authController))

authRouter.post('/login',authController.authenticationUser.bind(authController))

authRouter.post("/recover", authController.recoverPassword.bind(AuthController))

authRouter.post("/logout", jwtAuthorizationToken ,authController.logout.bind(authController));

authRouter.post("/refresh",authController.newToken.bind(authController));

authRouter.get("/verify", authController.verifyToken.bind(authController))

authRouter.put("/update-password",authController.updatePassword.bind(authController))

authRouter.get("/me",jwtAuthorizationToken,authController.getMe.bind(authController))
export default authRouter;