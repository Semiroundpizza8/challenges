import axios from 'axios';

/**
 * ACTION TYPES
 */

const GET_DOCS_PATIENTS = 'GET_DOCS_PATIENTS';

/**
 * ACTION CREATORS
 */
export const getDoctorsPatientsAction = (docsPatients) => ({
  type: GET_DOCS_PATIENTS, docsPatients,
});

/**
 * REDUCER
 */
export default function (state = null, action) {
  switch (action.type) {
    case GET_DOCS_PATIENTS:
      return action.docsPatients;
    default:
      return state;
  }
}

/**
 * THUNK CREATORS
 */
export const getDoctorsPatients = (docId) => (dispatch) => {
  axios.get(`/api/doctors/patients/${docId}`)
    .then((res) =>
      dispatch(getDoctorsPatientsAction(res.data)))
    .catch((err) => console.log(err));
};