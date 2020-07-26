var fs = require('fs');
var path = require('path')
var express = require('express');
// body-parser is a middle ware.
var bodyparser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydatabase', {useNewUrlParser: true});
var app = express();
// express specific stuff
app.use('/static',express.static('static'));
app.use(express.urlencoded());
//mongoose schema
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  desc: String,
  feedback: String
});
const contact = mongoose.model('contact', contactSchema);
// pug specific stuff
app.set('view engine', 'pug');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req, res)=>{
    const params = { }
    res.render('home.pug',params)
})
app.get('/contact',(req, res)=>{
    const params = { }
    res.render('Contact.pug',params)
})
app.post('/contact',(req, res)=>{
  var mydata = new contact(req.body);
  mydata.save().then(()=>{
    res.render('thanks.pug');
  }).catch(()=>{
    res.send("error generated")
  })
})

app.listen(80,()=>{
  console.log('listening to port 80');
});


// always see documentation 
// modules used are express,pug template,path for making address to file,mongoose,body-parser.
// see install them and make this file setup 