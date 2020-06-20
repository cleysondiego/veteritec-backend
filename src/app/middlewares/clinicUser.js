import User from '../models/User';

export default async (req, res, next) => {
  const user = await User.findOne({ _id: req.userId });

  if (!user) {
    return res.status(400).json({ error: 'User not exists for this Clinic.' });
  }

  return next();
};
