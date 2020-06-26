import mongoose from 'mongoose';

import Vaccine from '../models/Vaccine';
import Customer from '../models/Customer';
import Pet from '../models/Pet';

const { ObjectId } = mongoose.Types;

class VaccineController {
  async index(req, res) {
    const clinic = req.clinicId;
    const vaccines = await Vaccine.find({ clinic });

    return res.status(200).json({ vaccines });
  }

  async store(req, res) {
    const clinic = req.clinicId;
    const { date, hour, description, veterinary, customer, pet } = req.body;

    const { name: nameCustomer } = await Customer.findById({
      _id: new ObjectId(customer),
    });

    const { name: namePet } = await Pet.findById({ _id: new ObjectId(pet) });

    const [nameCustomerParsed] = nameCustomer.split(' ');

    const [namePetParsed] = namePet.split(' ');

    const displayName = `${nameCustomerParsed} - ${namePetParsed} - ${date} - ${hour}`;

    const vaccine = await Vaccine.create({
      date,
      hour,
      description,
      displayName,
      clinic: new ObjectId(clinic),
      veterinary: new ObjectId(veterinary),
      customer: new ObjectId(customer),
      pet: new ObjectId(pet),
    });

    return res.status(201).json({ vaccine });
  }

  async change(req, res) {
    const clinic = req.clinicId;
    const { id, date, hour, description, veterinary, customer, pet } = req.body;

    const vaccine = await Vaccine.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        date,
        hour,
        description,
        clinic: new ObjectId(clinic),
        veterinary: new ObjectId(veterinary),
        customer: new ObjectId(customer),
        pet: new ObjectId(pet),
      },
      { new: true }
    );

    if (!vaccine) {
      return res.status(400).json({ error: 'Vaccine not found.' });
    }

    return res.status(200).json(vaccine);
  }

  async delete(req, res) {
    const { id } = req.params;

    await Vaccine.deleteOne({ _id: new ObjectId(id) });

    return res.status(200).json({ success: 'Deletado com sucesso' });
  }
}

export default new VaccineController();
