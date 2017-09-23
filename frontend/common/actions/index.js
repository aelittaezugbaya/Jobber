const changeTab = (openTab) => {
  return {
    type: 'CHANGE_TAB',
    payload: {
      openTab
    }
  }
};


export default {
  changeTab
};