import mongoose from 'mongoose';
import Pet from '../models/Pet';

const { ObjectId } = mongoose.Types;

class PetController {
  async index(req, res) {
    const clinic = req.clinicId;
    const pets = await Pet.find({ clinic });

    return res.status(200).json({ pets });
  }

  async store(req, res) {
    const {
      name,
      birth,
      species,
      breed,
      weight,
      comments,
      customer,
    } = req.body;

    if (await Pet.findOne({ name, customer: new ObjectId(customer) })) {
      return res
        .status(400)
        .json({ error: 'Pet already registered for this customer.' });
    }

    const clinic = req.clinicId;

    const pet = await Pet.create({
      name,
      birth,
      species,
      breed,
      weight,
      comments,
      customer: new ObjectId(customer),
      clinic: new ObjectId(clinic),
    });

    return res.status(201).json(pet);
  }
}

export default new PetController();
