import mongoose from 'mongoose';
import Pet from '../models/Pet';

const { ObjectId } = mongoose.Types;

class PetController {
  async index(req, res) {
    const clinic = req.clinicId;
    const { customerId: customer } = req.params;

    if (customer) {
      const pets = await Pet.find({
        clinic,
        customer,
      });

      return res.status(200).json({ pets });
    }
    const pets = await Pet.find({ clinic });

    return res.status(200).json({ pets });
  }

  async store(req, res) {
    const {
      name,
      birth,
      species,
      breed,
      size,
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
      size,
      weight,
      comments,
      customer: new ObjectId(customer),
      clinic: new ObjectId(clinic),
    });

    return res.status(201).json(pet);
  }

  async change(req, res) {
    const {
      id,
      name,
      birth,
      species,
      breed,
      size,
      weight,
      comments,
      customer,
    } = req.body;

    const clinic = req.clinicId;

    const pet = await Pet.findOneAndUpdate(
      { _id: new ObjectId(id), clinic },
      {
        name,
        birth,
        species,
        breed,
        size,
        weight,
        comments,
        customer: new ObjectId(customer),
        clinic: new ObjectId(clinic),
      },
      { new: true }
    );

    if (!pet) {
      return res.status(400).json({ error: 'Pet not found.' });
    }

    return res.status(200).json(pet);
  }

  async delete(req, res) {
    const { id } = req.params;

    await Pet.deleteOne({ _id: new ObjectId(id) });

    return res.status(200).json({ success: 'Deletado com sucesso' });
  }
}

export default new PetController();
