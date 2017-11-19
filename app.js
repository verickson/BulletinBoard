var express = require('express');
var app = express();
var query = require('./query');



// var all_messages = [];
// query('select * from messages', [], function(err, results){
//  //handle the error and results as appropriate.
//  if(err){
//   console.log(err);
//   return done(client);
//  }
//  all_messages = results.rows;
// });
//
// app.set('view engine', 'pug');
//
// app.get('/', function(req, res){
//   res.render('index',{
//      messages: all_messages,
//      title: 'Here are all the messages:'
//   });
// });
//
// app.get('/form', function(req, res){
//   res.render('form',{
//      title: 'Add a message:'
//   });
// });
//
// app.post('/add-message', function(req, res){
//   console.log(req.body.title);
//   res.render('index',{
//      messages: all_messages,
//      title: 'You are in! Here are all the messages:'
//   });
// });
//
// app.get('*', function(req, res) {
//   res.status(404).send('<h1>uh oh! page not found!</h1>');
// });
//
// var server = app.listen(3333, function(){
//   console.log('Open http://localhost:3333 in the browser');
// });




var all_messages = [];

function get_all_messages(){
  return new Promise(function(resolve, reject){
    query('select * from messages order by id desc', function(err, result) {
      if(err){
        reject(err);
      }
      // resolve(results.rows);
      resolve(result.rows);
    });
  });
}




app.set('view engine', 'pug');

app.get('/', function(req, res){
  get_all_messages().then(function(all_messages){
    res.render('index',{
      messages: all_messages,
      title:"bulletin board app"
    });
  });
});

app.get('/form', function(req, res){
  res.render('form',{
    title:"add a message"
  });
});

app.get('/add-message', function(req, res){
  query('insert into messages (title, body) values ($1, $2)', [req.query.title, req.query.body], function(err, result) {
    if(err){
      console.log(err);
      return done (client);
    }
    console.log('Message inserted.');
  });
  return res.redirect('/');
});

app.get('*', function(req, res){
  res.status(404).send('page not found!');
});

var server = app.listen(3999, function(){
  console.log('open http://localhost:3999 in the browser');
});
