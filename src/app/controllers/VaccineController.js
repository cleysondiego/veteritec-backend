import mongoose from 'mongoose';

import Vaccine from '../models/Vaccine';

const { ObjectId } = mongoose.Types;

class VaccineController {
  async index(req, res) {
    const clinic = req.clinicId;
    const vaccines = await Vaccine.find({ clinic });

    return res.status(200).json({ vaccines });
  }

  async store(req, res) {
    const { date, hour, description, veterinary, customer, pet } = req.body;

    const vaccine = await Vaccine.create({
      date,
      hour,
      description,
      veterinary: new ObjectId(veterinary),
      customer: new ObjectId(customer),
      pet: new ObjectId(pet),
    });

    return res.status(201).json({ vaccine });
  }
}

export default new VaccineController();
