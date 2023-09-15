import axios from "axios";
import { useAuth } from "react-query";

const authApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
});

const loginAttempt = (user) =>  (authApi.post('/login',user));


  /*   const res = authApi.post('/login',{ params: {
        email: user.email,
        password: user.password
    }}); */
 
const logoutAttempt = async () => {

    const {getToken } = useAuth();
    const config = {
        headers: {Authorization: `Bearer ${getToken()}`}
    }
    const res = await authApi.post('/logout',config);
    return res;
}


export {loginAttempt,logoutAttempt};