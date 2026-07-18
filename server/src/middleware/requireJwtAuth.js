import pkg from 'jsonwebtoken';
const { verify } = pkg;

import User from '../models/User.js';

const requireJwtAuth = async (req, res, next) => {
  try {
    let token = null;
    
    if (req.headers['x-auth-token']) {
      token = req.headers['x-auth-token'];
    } else if (req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied.' });
    }
    
    const secret = process.env.JWT_SECRET_PROD || process.env.JWT_SECRET_DEV || 'dev-secret-key';
    const decoded = verify(token, secret);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid.' });
    }
    
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid.' });
  }
};

export default requireJwtAuth;