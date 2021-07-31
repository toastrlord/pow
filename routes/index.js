const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const lobby = require('../lobby');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signin');
});

router.post('/',
  body('message').trim().isLength({min: 1}).withMessage('Please enter a message!'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('lobby', {messages: lobby.getMessages(), errors: errors.array()});
    }
    else {
      lobby.addMessage(req.cookies.name, req.body.message);
      res.redirect('/');
    }
  }
);


router.get('/signin', function(req, res, next) {
  res.render('signin');
});

router.post('/signin',
  body('name').trim().isLength({min: 1}).withMessage('Please enter a name.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('signin', {errors: errors.array()});
    }
    else {
      res.cookie('name', req.body.name, {maxAge: 36000});
      res.redirect('/');
    }
  }
);

module.exports = router;
