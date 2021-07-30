const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const lobby = require('../lobby');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('lobby', { title: 'Express', messages: lobby.getMessages()});
});

router.post('/', function(req, res, next) {
  console.log('POSTAN');
  body('message').trim().escape(),
  (req, res, next) => {
    lobby.addMessage('Me', req.body.message);
    console.log(lobby.getMessages());
    res.redirect('/', {title: 'Express', messages: lobby.getMessages()})
  }
});

module.exports = router;
