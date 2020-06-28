import mongoose from 'mongoose';

import Pet from './Pet';

const CustomerSchema = new mongoose.Schema(
  {
    cpf: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    zipcode: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    neighborhood: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    cellNumber: {
      type: String,
      required: false,
    },
    email: {
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

CustomerSchema.pre('deleteOne', async function (next) {
  await Pet.deleteMany({ customer: this.getQuery()._id });
  return next();
});

export default mongoose.model('Customer', CustomerSchema);
