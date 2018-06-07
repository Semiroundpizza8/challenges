import { Router } from 'express';
import db from '../db';
import { ROLES, MODELS } from '../db/db-constants';

const userProperties = ['firstName', 'lastName', 'email'];

export default Router()
  .get('/', (req, res) => {
    res.status(200).send(db
      .get(MODELS.USER)
      .filter({ role: ROLES.DOCTOR })
      .value());
  })
  .get('/patients/:id', (req, res) => {
    // BO: Gather a list of that doctors appointments
    const appointments = db.get(MODELS.APPOINTMENT)
      .filter({ doctor_id: req.params.id })
      .value();

    // BO: Gather the unique patient_ids from the relevant appointments
    let doctorsPatients = [];
    appointments.forEach((appointment) => {
      const currId = appointment.patient_id;
      if (!doctorsPatients.includes(currId)) doctorsPatients.push(currId);
    });

    // BO: Populate information for each individual patient
    doctorsPatients = doctorsPatients.map((patientId) => {
      const patientInfo = db.get(MODELS.PATIENT)
        .find({ id: patientId })
        .value();

      const userInfo = db
        .get(MODELS.USER)
        .find({ id: patientInfo.user_id })
        .pick(userProperties)
        .value();

      return {
        ...userInfo,
        ...patientInfo,
      };
    });

    res.status(200).send(doctorsPatients);
  });
