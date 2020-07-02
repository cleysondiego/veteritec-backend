import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema(
  {
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
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

export default mongoose.model('Location', LocationSchema);
