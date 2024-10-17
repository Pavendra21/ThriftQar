// const jwt = require('jsonwebtoken');
// const User = require('../Model/Signup')
// const secret = "pavendra@nodejs";


// const authMiddleware =async (req, res, next) =>{
//         console.log("Auth Middleware Triggered");
//         console.log("Cookies in authMiddleware:", req.cookies);

// try
//  {

//     const token = req.cookies.token;
//     console.log(token);
    
//     if(!token )  
// {
// //    console.log("Unthorized, no token found");
// //      return res.status(401).json({message: 'Unthorized, no token found'})
// res.redirect('/login');

// }

// const decoded = jwt.verify(token, secret);
// const user = await User.findById(decoded._id);

// if(!user)
// {      console.log("User not found");

//     return res.status(404).json({message: 'User not found'})
// }
// req.user = user;
// next();

// }

// catch (error)
// {

//     // console.error('error during authentication', error);
//     // return res.status(500).json({message: 'internal error'})
//     return res.redirect('/login');
// }



//     }
//     module.exports = authMiddleware;