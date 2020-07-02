import mongoose from 'mongoose';

import Location from '../models/Location';

const { ObjectId } = mongoose.Types;

class LocationController {
  async index(req, res) {
    const { petId } = req.params;

    const location = await Location.findOne({ pet: new ObjectId(petId) }).sort({
      _id: -1,
    });

    return res.status(200).json({ location });
  }

  async store(req, res) {
    const { pet, latitude, longitude } = req.body;

    await Location.create({
      pet: new ObjectId(pet),
      latitude,
      longitude,
    });

    return res.status(201).json({ response: 'success' });
  }
}

export default new LocationController();
