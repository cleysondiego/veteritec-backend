import Clinic from '../models/Clinic';

class ClinicController {
  async index(req, res) {
    const clinics = await Clinic.find();

    return res.status(200).json({ clinics });
  }

  async store(req, res) {
    const { name } = req.body;

    if (await Clinic.findOne({ name })) {
      return res.status(400).json({ error: 'Clinic already exists.' });
    }

    const { _id } = await Clinic.create({ name });

    return res.status(201).json({ _id, name });
  }
}

export default new ClinicController();
