import mongoose from 'mongoose';

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

export default mongoose.model('Pet', PetSchema);
