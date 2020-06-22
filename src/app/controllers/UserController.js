import mongoose from 'mongoose';
import User from '../models/User';

const { ObjectId } = mongoose.Types;

class UserController {
  async store(req, res) {
    const { email, password, name } = req.body;
    const { clinicId } = req;

    const parsedClinic = new ObjectId(clinicId);

    if (await User.findOne({ email, clinic: parsedClinic })) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    await User.create({ name, email, password, clinic: clinicId });

    return res.status(201).json({ name, email });
  }
}

export default new UserController();
