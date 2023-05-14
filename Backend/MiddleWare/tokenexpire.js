const jwt = require('jsonwebtoken')
const verifyAndExpireToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (token) {
      try {

        const decodToken = jwt.verify(token, 'secret');
        if (decodToken.exp) {
          const currentTime = Date.now() / 1000; 
          if (decoded.exp > currentTime) {
            return next();
          }
        }
      } catch (error) {
        console.error('Error verifying token:', error);
      }
    }

    return res.status(401).json({ message: 'Unauthorized' });
  };
  

  