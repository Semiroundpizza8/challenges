import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Icon from 'material-ui/Icon';
import Card from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';

import PatientList from '../components/PatientList';

import { connect } from 'react-redux';
import { getDoctorsPatients } from '../reducers/doctorsPatients';

const styles = {
  welcomeMessage: {
    color: 'black',
  },
  searchWrapper: {
    padding: '5px 10px',
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 7,
  },
  search: {
    fontSize: 11,
  },
  patients: {
    marginTop: 40,
  },
};

class DoctorHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
    };
  }

  componentDidMount() {
    this.props.initInfo(this.props.user.id);
  }

  onFilterChange = (event) => {
    this.setState({ filterText: event.target.value });
  }

  render() {
    if (!this.props.doctorsPatients) return (<div>Loading</div>);

    const classes = { ...this.props.classes };
    const patients = [...this.props.doctorsPatients];

    const tempPatients = patients.filter((currPatient) => {
      let name = `${currPatient.firstName} ${currPatient.lastName}`;
      name = name.toLowerCase();
      const filter = this.state.filterText.toLowerCase();
      return name.includes(filter);
    });

    return (
      <div className="container">
        <h2 className={classes.welcomeMessage}>Welcome back, Dr.{this.props.user.lastName}.</h2>
        <div className={classes.patients}>
          {patients ?
            <div>
              <Card className={classes.searchWrapper}>
                <Icon className={classes.searchIcon}>search</Icon>
                <TextField
                  name="search"
                  placeholder="Search patients"
                  className={classes.search}
                  inputProps={{ style: { fontSize: 12 } }}
                  onChange={this.onFilterChange}
                />
              </Card>
              <PatientList patients={tempPatients} />
            </div>
            : <div>{'You don\'t have any patients.'}</div>
          }
        </div>
      </div>
    );
  }
}

DoctorHome.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
  doctorsPatients: PropTypes.array,
};

const mapState = (state) => ({
  user: state.user,
  doctorsPatients: state.doctorsPatients,
});

const mapDispatch = (dispatch) => ({
  initInfo: (uuid) => {
    dispatch(getDoctorsPatients(uuid));
  },
});

export default connect(mapState, mapDispatch)(withStyles(styles)(DoctorHome));
