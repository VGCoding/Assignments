const express=require('express');
const mongoose=require('mongoose')
const app=express();
const {appRoutes}=require('./Routes/routes')
const url='mongodb://127.0.0.1:27017/assignment_database'
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  }));
mongoose.connect(url,
    {useNewUrlParser: true})
.then(()=>{
    console.log("DataBase Connected");
})
.catch((err)=>{console.log(err)});
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(passport.initialize())
app.use(passport.session())
// app.use((req, res, next) => {
//     console.log(req.url);
//     next();
//   });
  
  app.use('/',appRoutes);
app.listen(5000,()=>{
    console.log("Server Started")
});