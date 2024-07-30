import { Router } from 'express';

import {authRouter} from "./authRouter";
import {userRoute} from "./userRoute";


const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRoute);
export const apiRouter = router;
