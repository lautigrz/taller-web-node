import {Router} from 'express'
import { AuthController } from '../../controller/auth.controller.js';
import { jwtAuthorizationToken} from '../../middlewares/jwtAuthorization.js';
const authRouter = Router();
const authController = new AuthController();

authRouter.post('/register',authController.createUser.bind(authController))

authRouter.post('/login',authController.authenticationUser.bind(authController))

authRouter.get("/", jwtAuthorizationToken ,authController.pruebaRuta.bind(authController));

authRouter.get("/refresh",authController.newToken.bind(authController));

export default authRouter;