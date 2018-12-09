import {
    BALANCE_ON_ADD,
    BALANCE_ON_EDIT,
    ALLOW_REGISTRATION
} from './type'

export const setBalanceOnAdd = () => {
    var setting = JSON.parse(window.localStorage.getItem('settings'));

    setting.balanceOnAdd = !setting.balanceOnAdd;

    localStorage.setItem('settings',JSON.stringify(setting));

    return {
        type: BALANCE_ON_ADD,
        payload: setting
    }
}

export const setBalanceOnEdit = () => {
    var setting = JSON.parse(window.localStorage.getItem('settings'));

    setting.balanceOnEdit = !setting.balanceOnEdit;

    localStorage.setItem('settings',JSON.stringify(setting));

    return {
        type: BALANCE_ON_EDIT,
        payload: setting
    }
}

export const setAllowRegistration = () => {
    var setting = JSON.parse(window.localStorage.getItem('settings'));

    setting.allowRegistration = !setting.allowRegistration;

    localStorage.setItem('settings',JSON.stringify(setting));

    return {
        type: ALLOW_REGISTRATION,
        payload: setting
    }
}