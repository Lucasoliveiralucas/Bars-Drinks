export const LOGGEDIN = "LOGGEDIN";
export const LOGGEDOUT = "LOGGEDOUT";
export const SET = "SET";

export const loggedin = (user) => ({ type: LOGGEDIN, payload: { ...user } });
export const loggedout = () => ({ type: LOGGEDOUT });
export const set = (user) => ({ type: SET, payload: user });
