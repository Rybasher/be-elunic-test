import { Router } from 'express';

import {userController} from "../controllers/userController";



const route = Router();

route.get('/get', userController.users);
export const userRoute = route;
