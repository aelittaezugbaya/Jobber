import constants from '../constants';

const initialState = {
  openTab: constants.TABS.BUYING
};

function jobber(state = initialState, action) {
  switch(action.type) {
    case 'CHANGE_TAB':
      return Object.assign(
        {},
        state,
        action.payload
      );
      break;
    case 'ADD_CURRENT_USER':
      return Object.assign(
          {},
          state,
          action.payload
      );
      break;
    case 'LOGOUT':
      return Object.assign(
          {},
          state,
          action.payload
      );
      break;
    case 'SAVE_RECEIVER_USER':
      return Object.assign(
        {},
        state,
        action.payload
      );
      break;
    case 'SAVE_NEAR_SERVICES':
      return Object.assign(
        {},
        state,
        action.payload
      );
      break;
    case 'SET_CHOSEN_POSITION':
      return Object.assign(
        {},
        state,
        action.payload
      );
      break;
    default:
      return state;
  }
}

export default jobber;