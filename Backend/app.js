//https://expressjs.com/en/starter/hello-world.html
const express = require('express')
const app = express()
const urlprefix = '/api'
const mongoose = require('mongoose')
const fs = require('fs');
const cert = fs.readFileSync('keys/certificate.pem');
const options = {
    server: { sslCA: cert}};
    const connstring = 'mongodb+srv://PreshenR:Pre20109266@cluster0.jlzpbk5.mongodb.net/?retryWrites=true&w=majority';

 const fruitRoutes = require('./routes/fruit')
 const userRoutes = require('./routes/user')


    mongoose.connect(connstring)
    .then(()=>
    {
        console.log('Connected :-)')
    })
    .catch(()=>
    {
console.log('NOT connected :-(')
    },options);

    //https://expressjs.com/en/api.html#express.json
    app.use(express.json())

    app.use((reg,res,next)=>
{
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
 res.setHeader('Access-Control-Allow-Methods', '*');
 next();
});


//https://expressjs.com/en/4x/api.html#app.get
app.get(urlprefix+'/', (req, res) => {
    res.send('Hello World')
})

app.use(urlprefix+'/fruits',fruitRoutes)
app.use(urlprefix+'/users',userRoutes)

module.exports = app;
