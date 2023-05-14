const passport=require('passport')
const User=require('./../Model/user.model')
const jwt=require('jsonwebtoken')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
require('dotenv').config()
passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    // console.log(profile);
    User.findOne({ email: profile.email }, function (err, user) {
        console.log(user);
      if(user!=[]&&user!=null){  
        console.log("17==========line",user)
        let token= jwt.sign({user_id:user._id,user_email:user.email},'secret',{expiresIn:"1d"})
      console.log("19 line==>",token);
      return done(err, user);
      }
      else if(err)
      {
        return done(err);
      }
      else{
        console.log("3");
        let newUser = new User({email: profile.email,googleId:profile.id})
        newUser.save().then(saved_user => {
            let user_details=User.findOne({'email':profile.email}).then((ud)=>{  
                      console.log("ud=======>>",ud);       
                       let token= jwt.sign({user_id:ud._id,user_email:ud.email},'secret',{expiresIn:"1d"})
                // res.send(token);
                console.log(token);
            }
            )
            return done(err,user);
        })

      }
    });
  }
));

passport.serializeUser((user,done)=>{
    done(null,user);
});

passport.deserializeUser((user,done)=>{
    done(null,user);
})