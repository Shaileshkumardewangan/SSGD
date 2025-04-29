// import express from 'express'
// import userAuth from '../middleware/userAuth.js';
// import { getUserData } from '../controllers/userController.js';

// const userRouter = express.Router();

// userRouter.get('/data', userAuth, getUserData);

// export default userRouter;

import express from 'express';
import { getUserData } from '../controllers/userController.js';
import userAuth from '../middleware/userAuth.js';

const userRouter = express.Router();
userRouter.get('/data', userAuth, getUserData);

export default userRouter;
