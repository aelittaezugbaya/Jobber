const changeTab = (openTab) => {
  return {
    type: 'CHANGE_TAB',
    payload: {
      openTab
    }
  }
};

const addCurrentUser = (user)=>{
  return {
    type:'ADD_CURRENT_USER',
    payload:{
      user
    }
  }
};

const logout = ()=>{
  return {
    type:'LOGOUT',
    payload:{
      user: null
    }
  }
};

export default {
  changeTab,
  addCurrentUser,
  logout
};