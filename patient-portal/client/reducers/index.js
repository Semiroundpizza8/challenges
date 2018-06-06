import { combineReducers } from 'redux';

import user from './auth';
import patient from './patient';

const rootReducer = combineReducers({ user, patient });

export default rootReducer;
