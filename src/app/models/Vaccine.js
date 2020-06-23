import mongoose from 'mongoose';

const VaccineSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    hour: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    veterinary: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    customer: {
      type: mongoose.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    pet: {
      type: mongoose.Types.ObjectId,
      ref: 'Pet',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Vaccine', VaccineSchema);
