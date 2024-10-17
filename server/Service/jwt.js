const jwt = require('jsonwebtoken');
const secret = "pavendra@nodejs";
const User = require ('../Model/Signup')

// SetUser function


const setUser = (user) => {

    return jwt.sign({

        _id: user._id,
        email: user.email,


    }, secret)

}

// getUser function


const getUser = async(req,res)=>{
     

try{

const token = req.cookies.token;
 

if(!token)
{
return res.status(401).json({message: "unauthorized"});

}

const decoded = jwt.verify(token, secret);

const user = await User.findById(decoded._id);
 

if(!user)
{
    
    return res.status(404).json({ message: 'User not found' });
}

return res.status(200).json({ user });

}


catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
}



}

// AuthMiddleware

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token; // Get the token from cookies
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized. No token provided.' });
    }
  
    try {
      // Verify the token using your secret
      const decoded = jwt.verify(token, secret);
  
      // Find the user by ID stored in the token
      const user = await User.findById(decoded._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Attach user data to the request object
      req.user = user;
      next(); // Move on to the next middleware or route handler
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({ message: 'Unauthorized. Invalid token.' });
    }
  };
 

module.exports = {setUser, getUser,authMiddleware}