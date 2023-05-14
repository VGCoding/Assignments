const router=require('express').Router();
const {Create_User,Sign_In,check_Authentication,ud,Create_City,Get_City_And_User}=require('./../Controllers/user.contoller')
const userAuthentication=require('./../MiddleWare/authentication')
const passport = require('passport');
require('./../MiddleWare/authentication')
require('./../MiddleWare/googleauthentication')
router.get('/test',(req, res) => {
    console.log(req)
    return res.status(200).json({
        "message": "success"
    })
})
router.post('/signup',Create_User);
router.post('/signin',Sign_In);
// //for checking the authentication using passport-jwt
router.get('/check',passport.authenticate('jwt',{session:false}),check_Authentication)
router.post('/logout')
// checking google authentication details
router.get('/details',ud)

router.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

router.get( '/auth/google/callback',
    passport.authenticate( 'google',{
        successRedirect: 'http://192.168.29.11:3000/',
        failureRedirect: '/signup'
}));
router.post('/create-city',Create_City)
router.get('/city/:cityName',Get_City_And_User);
module.exports.appRoutes=router
