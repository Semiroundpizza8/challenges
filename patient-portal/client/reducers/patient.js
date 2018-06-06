import axios from 'axios';

/**
 * ACTION TYPES
 */

const GET_SINGLE_PATIENT = 'GET_SINGLE_PATIENT';

/**
 * ACTION CREATORS
 */
export const getSinglePatientAction = (patientInfo) => ({
  type: GET_SINGLE_PATIENT, patientInfo,
});

/**
 * REDUCER
 */
export default function (state = null, action) {
  switch (action.type) {
    case GET_SINGLE_PATIENT:
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

