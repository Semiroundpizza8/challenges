import axios from 'axios';

/**
 * ACTION TYPES
 */

const GET_SINGLE_PATIENT = 'GET_SINGLE_PATIENT';
const GET_SINGLE_PATIENT_BY_ID = 'GET_SINGLE_PATIENT_BY_ID';

/**
 * ACTION CREATORS
 */
export const getSinglePatientAction = (patientInfo) => ({
  type: GET_SINGLE_PATIENT, patientInfo,
});
export const getSinglePatientByIdAction = (patientInfo) => ({
  type: GET_SINGLE_PATIENT_BY_ID, patientInfo,
});

/**
 * REDUCER
 */
export default function (state = null, action) {
  switch (action.type) {
    case GET_SINGLE_PATIENT:
      return action.patientInfo;
    case GET_SINGLE_PATIENT_BY_ID:
      return action.patientInfo;
    default:
      return state;
  }
}

/**
 * THUNK CREATORS
 */
export const getSinglePatient = (uuid) => (dispatch) => {
  axios.get(`/api/patients/${uuid}`)
    .then((res) =>
      dispatch(getSinglePatientAction(res.data)))
    .catch((err) => console.log(err));
};
export const getSinglePatientById = (uuid) => (dispatch) => {
  axios.get(`/api/patients/byid/${uuid}`)
    .then((res) =>
      dispatch(getSinglePatientByIdAction(res.data)))
    .catch((err) => console.log(err));
};

