import React from 'react';
import PropTypes from 'prop-types';

import LabeledText from './LabeledText';

const PatientDetails = ({ patient }) => {
  // BO: Since the address is now a more complex object, the next few lines of logic prepare it to be rendered.
  const addressObj = patient.address[0];
  const address = `${addressObj.address}, ${addressObj.city}, ${addressObj.state}, ${addressObj.zip}`;
  return (
    <div className="patient-details">
      <LabeledText label="DOB" value={patient.dateOfBirth} />
      <LabeledText label="Email address" value={patient.email} />
      <LabeledText label="Phone" value={patient.phoneNumber} />
      <LabeledText label="Address" value={address} />
    </div>
  );
};

PatientDetails.propTypes = {
  patient: PropTypes.object,
};

export default PatientDetails;
