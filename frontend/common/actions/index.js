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

const saveReceiverUser= (receiver)=>{
  return{
    type:'SAVE_RECEIVER_USER',
    payload:{
      receiver
    }
  }
}

const saveNearServices = (nearServices)=>{
  return{
    type:'SAVE_NEAR_SERVICES',
    payload:{
      nearServices
    }
  }
}

const setChosenPosition = (chosenPosition) => {
  return {
    type: 'SET_CHOSEN_POSITION',
    payload: {
      chosenPosition
    }
  }
}

export default {
  changeTab,
  addCurrentUser,
  logout,
  saveReceiverUser,
  saveNearServices,
  setChosenPosition
};