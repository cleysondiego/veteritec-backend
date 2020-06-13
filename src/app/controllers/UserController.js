import User from '../models/User';

class UserController {
  async store(req, res) {
    const { email, password, name } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    await User.create({ name, email, password });

    return res.status(201).json({ name, email });
  }
}

export default new UserController();
