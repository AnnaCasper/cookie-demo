var express = require('express');
var router = express.Router();
console.log(process.env.MONGO_URI);
var db = require('monk')(process.env.MONGO_URI);

var cookieCollection = db.get('cookies');

var bcrypt = require('bcryptjs');
/* GET home page. */
router.get('/', function(req, res, next) {
  var currentUser = req.cookies.currentUser;
  var backgroundColor = req.cookies.color;
  var currentLoginUser = req.cookies.currentLoginUser
  var error = req.query.error;
  var visits = parseInt(req.cookies.visits, 10) || 0;
    visits ++
    res.cookie('visits', visits);
  res.render('index', {
    title: 'Cookie Demo',
    currentUser: currentUser,
    visits: visits,
    backgroundColor: backgroundColor,
    currentLoginUser: currentLoginUser,
    error: error,
    });
});

router.post('/signup', function(req, res, next){
  res.cookie('currentUser', req.body.user_name);
  var hash = bcrypt.hashSync(req.body.password, 8);
  cookieCollection.insert({ username: req.body.user_name, password: hash}, function (err, record) {
    console.log(err, record);
    res.redirect('/');
  });
});

router.post('/login', function(req, res, next){
  cookieCollection.findOne({ username: req.body.login_user_name}, function(err, data){
    console.log('hello');
    var compare = bcrypt.compareSync(req.body.login_password, data.password);
    if (compare === true) {
      res.cookie('currentLoginUser', req.body.login_user_name);
      res.redirect('/');
    } else {
      res.redirect('/?error=BOO!!');
    };
  });
});

router.post('/logout', function(req, res, next){
  res.clearCookie('currentUser');
  res.clearCookie('visits');
  res.clearCookie('color');
  res.clearCookie('currentLoginUser');
  res.redirect('/');
});

router.post('/color', function(req, res, next){
  res.cookie('color', req.body.color);
  res.redirect('/');
});



module.exports = router;
