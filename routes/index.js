var express = require('express'),
    router = express.Router(),
    mongodb = require('mongodb'),
    mongourl = process.env.MONGO_URL,
    Mp4Convert = require('mp4-convert'),
    ffmpeg = require('fluent-ffmpeg'),
    xss = require('xss'),
    sha1 = require('sha1');

//middleware sprawdzający czy użytkownik jest zalogowany
var logged = function (req, res, next) {
  if ( req.session.login != undefined){
    next();
  } 
  else{
    res.redirect('/');
  }
}; 

//kontroler rejestracji użytkowników CRUD
router.post('/register', function(req, res, next){

  var login = xss(req.body.login);
  var email = xss(req.body.email);
  var password = xss(req.body.password);
  var password_repeat = xss(req.body.password_repeat);

  //sprawdzamy hasła jeśli są różne zwracamy alert
  if(password != password_repeat){
    res.json({status : 'error', message: 'podane hasła są nieprawidłowe'});
  }

  //sprawdzamy adres email
  if( !(/\S+@\S+\.\S+/.test(email)) ){
    res.json({status : 'error', message: 'podano niepoprawny adres email'});
  }

  //sprawdzamy czy taki użytkownik już istnieje
  mongodb.connect(mongourl, function(err, db) {
    var collection = db.collection('users');
    collection.find(  { $or: [ { login: login }, { email: email } ] }  ).toArray(function(err, docs){
    
      if( Object.keys(docs).length != 0){
        //podany uzytkownik już istnieje zwracamy błąd
        res.json({status : 'error', message: 'podany uzytkownik już istnieje'});
      }
      else{
        //tworzymy nowego użytkownika
        mongodb.connect(mongourl, function(err, db) {
          var collection = db.collection('users');
          result = collection.insert({login: login, email: email, password: sha1(password) }, function(err,docs){
            
            req.session.login = docs.ops[0].login;
            req.session.id_user = docs.ops[0]._id;
            
            res.json({status : 'logged', message: 'zalogowano'});
            db.close();
            
          });  
        });
      }
    });
    db.close();
  });
});


//kontroler logowania użytkowników CRUD
router.post('/login', function(req, res, next) {
  
  var login = xss( req.body.login );
  var password = sha1( xss( req.body.password ) );

  mongodb.connect(mongourl, function(err, db) {
    var collection = db.collection('users');
    collection.find({ $or: [{ "login": login }, { "email": login }], 'password' : password}).toArray(function(err, docs) {
    
      if( Object.keys(docs).length != 0){

        //jeśli użytkownik posiada konto logujemy go
        req.session.login = docs[0].login;
        req.session.id_user = docs[0]._id;
        
        console.log(req.session.login, req.session.id_user );
        //res.json({'id' : docs._id,'login' : docs.login });
        res.json({status : 'logged', message: 'zalogowano'});
      }
      else{
        res.json({status : 'error', message: 'nieprawidłowy login lub hasło'});
      }

    });
    db.close();
  });

});


//wyświetlenie strony indeksowej
router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/');
});


//wyświetlenie strony indeksowej
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
