import mongoose from 'mongoose';

const ClinicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Clinic', ClinicSchema);
