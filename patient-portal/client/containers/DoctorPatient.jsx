import React from 'react';

import PropTypes from 'prop-types';
import Appointments from './Appointments';
import PatientDetails from '../components/PatientDetails';
import Files from '../components/Files';

import { files } from '../dummyData';

import { connect } from 'react-redux';
import { getSinglePatientById } from '../reducers/patient';

export class DoctorPatient extends React.Component {
  componentDidMount() {
    this.props.getPatientData(this.props.match.params.id);
  }

  // BO: Function to separate out appointments into their respective timeframes
  parseAppointments = (appointments) => {
    const result = {
      pendingAppts: [],
      pastAppts: [],
      upcomingAppts: [],
    };

    appointments.forEach((currAppointment) => {
      const now = Date.now();
      const apptTime = Date.parse(currAppointment.datetime);

      if (apptTime <= now) result.pastAppts.push(currAppointment);

      else if (currAppointment.status === 'confirmed') result.upcomingAppts.push(currAppointment);

      else result.pendingAppts.push(currAppointment);
    });

    return result;
  };


  render() {
    if (!this.props.patient) return (<div>Loading</div>);
    const patient = { ...this.props.patient };

    // BO: All three appointment variables are sorted and filled via this.parseAppointments();
    const { pendingAppts, pastAppts, upcomingAppts } = this.parseAppointments(patient.appointments);

    return (
      <div className="container">
        <h2>{patient.firstName} {patient.lastName}</h2>
        <PatientDetails patient={patient} />
        <div>

          <h3>Upcoming Appointments</h3>
          {upcomingAppts.length ?
            <Appointments
              appointments={upcomingAppts}
              type="upcoming"
              viewer="patient"
            /> :
            <div> You have no upcoming appointments</div>}

          <h3>Pending Appointments</h3>
          {pendingAppts.length ?
            <Appointments
              appointments={pendingAppts}
              type="pending"
              viewer="patient"
            /> :
            <div> You have no pending appointments</div>}

          <h3>Past Appointments</h3>
          {pastAppts.length ?
            <Appointments
              appointments={pastAppts}
              type="past"
              viewer="patient"
            /> :
            <div> You have no past appointments</div>}

        </div>
      </div>
    );
  }
}

DoctorPatient.propTypes = {
  patient: PropTypes.object,
};

const mapState = (state) => ({
  patient: state.patient,
});

const mapDispatch = (dispatch) => ({
  getPatientData: (uuid) => {
    dispatch(getSinglePatientById(uuid));
  },
});
export default connect(mapState, mapDispatch)(DoctorPatient);
