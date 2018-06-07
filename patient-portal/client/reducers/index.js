import { combineReducers } from 'redux';

import user from './auth';
import patient from './patient';
import doctorsPatients from './doctorsPatients';

const rootReducer = combineReducers({ user, patient, doctorsPatients });

export default rootReducer;
