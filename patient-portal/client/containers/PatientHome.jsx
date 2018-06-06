import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';

import Appointments from './Appointments';
import PatientDetails from '../components/PatientDetails';
import Files from '../components/Files';
import { withStyles } from 'material-ui/styles';

import { files } from '../dummyData';

import { connect } from 'react-redux';
import { getSinglePatient } from '../reducers/patient';

const styles = {
  buttonWrapper: {
    marginTop: 30,
  },
  button: {
    color: 'white',
    textDecoration: 'none',
    fontSize: 12,
  },
};

export class PatientHome extends React.Component {
  componentDidMount() {
    this.props.getPatientData(this.props.user.id);
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
    const classes = { ...this.props.classes };
    const patient = { ...this.props.patient };

    // BO: All three appointment variables are sorted and filled via this.parseAppointments();
    const { pendingAppts, pastAppts, upcomingAppts } = this.parseAppointments(patient.appointments);

    return (
      <div className="container">
        <h2>Welcome back, {`${patient.firstName} ${patient.lastName}`}</h2>
        <div className="profile">
          <div>
            <h3>Your Profile</h3>
            <PatientDetails patient={patient} />
          </div>
          <div className={classes.buttonWrapper}>
            <Button variant="raised" color="primary">
              <Link to="/request-appointment" className={classes.button}>Request Appointment</Link>
            </Button>
          </div>
        </div>
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
        <div>
          <h3>Your Files</h3>
          <Files files={files} />
        </div>
      </div>
    );
  }
}

PatientHome.propTypes = {
  classes: PropTypes.object.isRequired,
  patient: PropTypes.object,
};

/**
 * CONTAINER
 */
const mapState = (state) => ({
  user: state.user,
  patient: state.patient,
});

const mapDispatch = (dispatch) => ({
  getPatientData(uuid) {
    dispatch(getSinglePatient(uuid));
  },
});

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(withStyles(styles)(PatientHome));

