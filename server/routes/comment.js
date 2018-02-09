import express from 'express';
import Memo from '../models/memo';
import mongoose from 'mongoose';

const router = express.Router();

/*
    WRITE MEMO: POST /api/comment
    BODY SAMPLE: { contents: "sample "}
    ERROR CODES
        1: NOT LOGGED IN
        2: EMPTY CONTENTS
*/
router.post('/', (req, res) => {
    // CHECK LOGIN STATUS
    if(typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 1
        });
    }

    // CHECK CONTENTS VALID
    if(typeof req.body.contents !== 'string') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if(req.body.contents === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    Memo.findOne({ _id: req.body.memoId }, (err, rawContent) => {
    if (err) throw err;
    rawContent.comments.push({
      author: req.session.loginInfo.username,
      content: req.body.contents
    });
    rawContent.save((error, replyResult) => {
      if (error) throw error;
      return res.json(replyResult);
    });
  });
});

export default router;
