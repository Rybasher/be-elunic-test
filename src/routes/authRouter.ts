import { Router } from 'express';

import {userMiddleware} from "../middlewares/userMiddleware";
import {authController} from "../controllers/authController";


const route = Router();

route.post('/registration', userMiddleware.checkUserFields, userMiddleware.isUserExistForRegistration, authController.registration);
route.post('/login', userMiddleware.checkUserFieldsOnLogin, userMiddleware.isUserExistForLogin, authController.login);

export const authRouter = route;
