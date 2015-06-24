var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var currentUser = req.cookies.currentUser;
  var backgroundColor = req.cookies.color;
  var visits = parseInt(req.cookies.visits, 10) || 0;
    visits ++
    res.cookie('visits', visits);
  res.render('index', {
    title: 'Cookie Demo',
    currentUser: currentUser,
    visits: visits,
    backgroundColor: backgroundColor
    });
});

router.post('/fake-login', function(req, res, next){
  res.cookie('currentUser', req.body.user_name);
  res.redirect('/');
});

router.post('/logout', function(req, res, next){
  res.clearCookie('currentUser');
  res.clearCookie('visits');
  res.clearCookie('color');
  res.redirect('/');
});

router.post('/color', function(req, res, next){
  res.cookie('color', req.body.color);
  res.redirect('/');
});



module.exports = router;
