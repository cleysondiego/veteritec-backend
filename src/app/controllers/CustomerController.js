import Customer from '../models/Customer';

class CustomerController {
  async index(req, res) {
    const clinic = req.clinicId;
    const customers = await Customer.find({ clinic });

    return res.status(200).json(customers);
  }

  async store(req, res) {
    const {
      cpf,
      name,
      zipcode,
      street,
      number,
      neighborhood,
      phoneNumber,
      cellNumber,
      email,
    } = req.body;

    const clinic = req.clinicId;

    if (await Customer.findOne({ cpf, clinic })) {
      return res
        .status(400)
        .json({ error: 'Customer already exists for this clinic.' });
    }

    const customer = await Customer.create({
      cpf,
      name,
      zipcode,
      street,
      number,
      neighborhood,
      phoneNumber: phoneNumber !== undefined ? phoneNumber : '',
      cellNumber: cellNumber !== undefined ? cellNumber : '',
      email,
      clinic,
    });

    return res.status(201).json(customer);
  }
}

export default new CustomerController();
