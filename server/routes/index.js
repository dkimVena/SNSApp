import express from 'express';
import account from './account';
import memo from './memo';
import comment from './comment';

const router = express.Router();
router.use('/account', account);
router.use('/memo', memo);
router.use('/comment', comment);

export default router;
