const userModel=require('./../Model/user.model')
const cityModel=require('./../Model/city.model')
const jwt=require('jsonwebtoken')
exports.Create_User=async(req,res)=>{
    console.log(req.body);
     if(!req.body) res.status(400).send('Details not found');
    let newUser = new userModel(req.body)
    newUser.validate().then((_noerr) => {
        newUser.save().then(saved_user => {

            return res.status(201).json(saved_user)
        }).catch(err => {
            // return _throw400Err(res, err)
           return res.status(500).send(err);
        })
    }).catch(err => {
        
        // return _throw400Err(res, err)
       return res.status(500).send(err);
    })
}
exports.Sign_In=async(req,res)=>{
    if(!Object.keys(req.body).length) res.status(400).send('Details not found');
    let user_details=await userModel.findOne({'email':req.body.email,'password':req.body.password});
    if(!user_details) return res.status(400).json('user not found')
    let token= jwt.sign({user_id:user_details._id,user_email:user_details.email},'secret',{expiresIn:"1d"})
   
     res.status(200).send({
      'user':user_details,
      'token':token
     });
}
//for checking the authentication using passport-jwt
exports.check_Authentication=async(req,res)=>{
    // console.log(req.userId);
     res.status(200).send(req.user);
}
//checking for google login
exports.ud=async(req,res)=>{
    res.status(200).send(req.user);
}
exports.Create_City=async(req,res)=>{
    if(!req.body) res.status(400).send('Details Not Found')
    let newCity= new cityModel(req.body);
    newCity.validate().then((_noerr) => {
        newCity.save().then(saved_user => {

            return res.status(201).json(saved_user)
        }).catch(err => {
            // return _throw400Err(res, err)
           return res.status(500).send(err);
        })
    }).catch(err => {
        
        // return _throw400Err(res, err)
       return res.status(500).send(err);
    })
}
exports.Get_City_And_User=async(req,res)=>{
    if(!req.body) res.status(400).send('Add city to see the details');
    cityModel.aggregate([
        {
          $match: { name: req.query.cityName }, // Match specific city
        },
        {
          $lookup: {
            from: 'user', // Name of the User collection
            localField: 'users',
            foreignField: '_id',
            as: 'userDetails',
          },
        },
        {
          $unwind: '$userDetails',
        },
      ])
        .exec((err, results) => {
          if (err) {
            console.error('Error pulling data:', err);
          } else {
            res.status(200).send(results)
            console.log('City data with user information:', results);
          }
        });
}
