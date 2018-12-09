import {
    BALANCE_ON_ADD,
    BALANCE_ON_EDIT,
    ALLOW_REGISTRATION
} from '../action/type'

// Local storage stuff
if (window.localStorage.getItem('settings') === null) {
    const defaultSetting = {
      balanceOnAdd: false,
      balanceOnEdit: false,
      allowRegistration: true
    }
  
    window.localStorage.setItem('settings', JSON.stringify(defaultSetting))
}
  
const initialState = {
setting: JSON.parse(window.localStorage.getItem('settings')),
}

export default function(state = initialState, action) {
    switch(action.type) {
        case BALANCE_ON_ADD:
            return {
                ...state,
                setting: action.payload
                
            }
        case BALANCE_ON_EDIT:
            return {
                ...state,
                setting: action.payload
                
            }
        case ALLOW_REGISTRATION:
            return {
                ...state,
                setting: action.payload
            }
        default:
            return {
                ...state
            }
    }
}