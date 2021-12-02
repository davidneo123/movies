import { movieConstants } from '../_constants';

export function cast(state = {}, action) {
  switch (action.type) {
    case movieConstants.GETCAST_REQUEST:
      return {
        loading: true
      };
    case movieConstants.GETCAST_SUCCESS:
      return {
        items: action.cast
      };
    case movieConstants.GETCAST_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}