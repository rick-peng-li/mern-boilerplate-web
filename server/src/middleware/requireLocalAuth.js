import User, { validateUser } from '../models/User.js';

const requireLocalAuth = async (req, res, next) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) return res.status(400).json({ message: 'User with this email already exists.' });

    const existingUsername = await User.findOne({ username: req.body.username });
    if (existingUsername) return res.status(400).json({ message: 'Username already taken.' });

    const user = new User({
      provider: 'email',
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    await user.registerUser(user);
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export default requireLocalAuth;