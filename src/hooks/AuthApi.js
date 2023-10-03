import {logout, saveLoginData} from "../context/AuthContext";
import axiosRoute from "../utils/route";
import {useNavigation} from "@react-navigation/native";
import {useMutation, useQueryClient} from "react-query";

const loginAttempt = (user) =>  axiosRoute.post('login', null, user);

const userLoginAttempt = (formikErrors) => {
    const navigation = useNavigation();
    return useMutation({
        mutationFn: loginAttempt,

        onError: (error) => {
            formikErrors(error.response.data.errors);
        },
        onSuccess: async (data) => {
            await saveLoginData(data.data?.token);
            await axiosRoute.refreshToken();
            navigation.navigate('Home', {screen: 'HomePage'});
        },
    });
}

const logoutAttempt = () => axiosRoute.post('logout');

const userLogoutAttempt = () => {
    const queryClient = new useQueryClient();
    const navigation = useNavigation();

    return useMutation({
        mutationFn: logoutAttempt,

        onSuccess: async (data) => {
            await logout();
            await axiosRoute.refreshToken();
            queryClient.clear(); // resetea todos los queries
            navigation.navigate('Login');
        },
    });
}

export {userLoginAttempt, userLogoutAttempt};