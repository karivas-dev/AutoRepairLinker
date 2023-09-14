import axios from "axios";
import { useQuery } from "react-query";

const authApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
});

const loginAttempt = (user) =>  (authApi.post('/login',user));


  /*   const res = authApi.post('/login',{ params: {
        email: user.email,
        password: user.password
    }}); */
 
const logoutAttempt = async () => {
    const res = await authApi.post('/logout');
    return res.data;
}


export {loginAttempt,logoutAttempt};