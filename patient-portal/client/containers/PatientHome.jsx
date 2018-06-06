import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';

import Appointments from './Appointments';
import PatientDetails from '../components/PatientDetails';
import Files from '../components/Files';
import { withStyles } from 'material-ui/styles';

import { patient, pendingAppts, pastAppts, files } from '../dummyData';

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
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      patient: {},
    };
  }

  componentDidMount() {
    console.log("HERE");
    this.props.getPatientData(this.props.user.id);
  }

  render() {
    const classes = { ...this.props.classes };
    return (
      <div className="container">
        <h2>Welcome back, Luna Lovegood.</h2>
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
          <div>No upcoming appointments.</div>
          <h3>Pending Appointments</h3>
          <Appointments
            appointments={pendingAppts}
            type="pending"
            viewer="patient"
          />
          <h3>Past Appointments</h3>
          <Appointments appointments={pastAppts} type="past" viewer="patient" />
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
};

/**
 * CONTAINER
 */
const mapState = (state) => ({
  user: state.user,
});

const mapDispatch = (dispatch) => ({
  getPatientData(uuid) {
    dispatch(getSinglePatient(uuid));
  },
});

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withStyles(styles)(connect(mapState, mapDispatch)(PatientHome));

