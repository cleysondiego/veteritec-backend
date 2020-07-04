import mongoose from 'mongoose';

import Vaccine from './Vaccine';
import Location from './Location';

const PetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    birth: {
      type: String,
      required: true,
    },
    species: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
      required: false,
    },
    customer: {
      type: mongoose.Types.ObjectId,
      ref: 'Customer',
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

PetSchema.pre('deleteOne', async function (next) {
  await Vaccine.deleteMany({ pet: this.getQuery()._id });
  await Location.deleteMany({ pet: this.getQuery()._id });
  return next();
});

PetSchema.pre('deleteMany', async function (next) {
  await Vaccine.deleteMany({ customer: this.getQuery().customer });
  await Location.deleteMany({ pet: this.getQuery()._id });
  return next();
});

export default mongoose.model('Pet', PetSchema);
