import express from 'express';
import upload from '../../config/file-upload-s3-config.js';

import {createTweet, getTweet} from '../../controllers/tweet-controller.js'
import { toggleLike } from '../../controllers/like-controller.js';
import { createComment } from '../../controllers/comment-controller.js';
import { login, signup } from '../../controllers/auth-controller.js';
import { authenticate } from '../../middlewares/authenticate.js';

const router = express.Router();
router.post('/tweets',authenticate,createTweet);
router.post('/likes/toggle',toggleLike);
router.post('/comments',authenticate,createComment);
router.get('/tweet/:id',getTweet);
router.post('/signup',signup);
router.post('/login',login);
 export default router;

