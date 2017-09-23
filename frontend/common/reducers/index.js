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
    default:
      return state;
  }
}

export default jobber;