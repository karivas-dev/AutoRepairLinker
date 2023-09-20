import axiosRoute from "../utils/route";
const loginAttempt = (user) =>  axiosRoute.post('login', null, user);

const logoutAttempt = () => axiosRoute.post('logout');


export {loginAttempt,logoutAttempt};