const express = require('express');
const app = express()

var cors = require('cors')
app.use(cors())

var morgan = require('morgan');
app.use(morgan('tiny'))

var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


const routerr = require('./routers/user.js');
app.use(routerr);

app.use(express.static('./public'));

app.listen(3000,function(req,res){
    console.log('server is running');
});

app.get('/test',(req,res)=>{
    var one = {firstname:"sanjoy",lastname:"giri"};
    var two = {firstname:"soumitra",lastname:"patra"};
    res.json([one ,two]);
});


