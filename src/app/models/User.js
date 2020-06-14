import mongoose from 'mongoose';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../../config/auth';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    clinic: {
      type: mongoose.Types.ObjectId,
      ref: 'Clinic',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await hash(this.password, 8);
});

UserSchema.methods = {
  compareHash(password) {
    return compare(password, this.password);
  },
};

UserSchema.statics = {
  generateToken({ id }) {
    return sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });
  },
};

export default mongoose.model('User', UserSchema);
