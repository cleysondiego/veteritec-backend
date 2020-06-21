import mongoose from 'mongoose';
import Pet from '../models/Pet';

const { ObjectId } = mongoose.Types;

class PetController {
  async index(req, res) {
    const { customerId } = req.params;

    try {
      const pets = await Pet.find({ customer: new ObjectId(customerId) });

      return res.status(200).json({ pets });
    } catch (error) {
      return res
        .status(400)
        .json({ error: 'Pet not founded by this customer.' });
    }
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

    if (await Pet.findOne({ name, customer })) {
      return res
        .status(400)
        .json({ error: 'Pet already registered for this customer.' });
    }

    const pet = await Pet.create({
      name,
      birth,
      species,
      breed,
      weight,
      comments,
      customer,
    });

    return res.status(201).json(pet);
  }
}

export default new PetController();
