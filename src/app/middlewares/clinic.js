import mongoose from 'mongoose';

import Clinic from '../models/Clinic';

const { ObjectId } = mongoose.Types;

export default async (req, res, next) => {
  const { clinicid } = req.headers;

  if (!clinicid) {
    return res.status(401).json({ error: 'Clinic Id not provided.' });
  }

  try {
    await Clinic.findById(new ObjectId(clinicid));

    req.clinicId = clinicid;

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Clinic not found.' });
  }
};
