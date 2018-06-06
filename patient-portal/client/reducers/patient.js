import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_SINGLE_PATIENT = 'GET_SINGLE_PATIENT';

/**
 * ACTION CREATORS
 */
const getSinglePatient = (patientInfo) => ({ type: GET_SINGLE_PATIENT, patientInfo });

/**
 * REDUCER
 */
export default function (patientInfo = {}, action) {
  switch (action.type) {
    case GET_SINGLE_PATIENT:
      return action.patientInfo;
    default:
      return patientInfo;
  }
}

/**
 * THUNK CREATORS
 */
export const fetchAvailability = (uuid) => (dispatch) => {
  axios.get(`/api/patients/${uuid}`)
    .then((res) =>
      dispatch(getSinglePatient(res.data)))
    .catch((err) => console.log(err));
};

