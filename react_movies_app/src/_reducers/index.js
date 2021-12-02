import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { movies } from './movies.reducer';
import { cast } from './cast.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  movies,
  alert,
  cast,
});

export default rootReducer;