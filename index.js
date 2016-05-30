var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/user', require('./routes/user-routes'))
app.use('/setup', require('./routes/create-tables'))

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err);
});

app.get('/',function(req,res){
  res.send('<h1>Try another url</h1>')
})

app.listen(PORT,function(){
  console.log('Listening on port ',PORT)
})

