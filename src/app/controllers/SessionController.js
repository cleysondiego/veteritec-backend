import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'User not found.' });
    }

    if (!(await user.compareHash(password))) {
      return res.status(400).json({ error: 'Invalid password.' });
    }

    const { name, clinic } = user;

    if (req.clinicId !== String(clinic)) {
      return res.status(400).json({ error: 'Clinic invalid for this user.' });
    }

    return res.json({ user: { email, name }, token: User.generateToken(user) });
  }
}

export default new SessionController();
