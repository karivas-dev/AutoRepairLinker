import { useState } from "react";
import { saveLoginData,logout } from "../context/AuthContext";
import axiosRoute from "../utils/route";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient } from "react-query";
const loginAttempt = (user) =>  axiosRoute.post('login', null, user);

const userLoginAttempt = () => {
    const navigation = useNavigation();
    const createUserLogin = useMutation({
        mutationFn: loginAttempt,
        
        onError: (error) => {
            console.log(error);
        },
        onSuccess: (data) => {
            saveLoginData(data.data?.token);
            axiosRoute.refreshToken();
            navigation.navigate('Home', {screen: 'HomePage'});     
        },
    });
    return createUserLogin;
}

const logoutAttempt = () => axiosRoute.post('logout');

const userLogoutAttempt = () => {
    const queryClient = new useQueryClient();
    const navigation = useNavigation();

    const createUserLogOut = useMutation({
        mutationFn: logoutAttempt,

        onError: (error) => {
            console.log(error);
        }, onSuccess: (data) => {
            logout();
            axiosRoute.refreshToken();
            queryClient.clear(); // resetea todos los queries 
            console.log(data);
            navigation.navigate('Login');
        },

    });
    return createUserLogOut;
}

export {userLoginAttempt, userLogoutAttempt};