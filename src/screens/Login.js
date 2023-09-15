import { View, Text, TextInput, Pressable,Image,ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Messages } from '../components/Messages';
import { GuestLayout } from '../layouts/GuestLayout';
import { PrimaryButton } from '../components/PrimaryButton';
import {TxtInput }from '../components/TxtInput'
import { Card } from '../components/Card';
import { loginAttempt} from '../hooks/AuthApi';
import { useMutation } from 'react-query';
import { useAuth } from '../context/AuthContext';


export const Login = ({navigation}) => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [generalException,setGeneralException] = useState([]);
    const { login, logout, getToken } = useAuth();

    const UserLogin = useMutation({
        mutationFn: loginAttempt,
        
        onError: (error,variables,context) => {
            console.log(error);
            setGeneralException(error?.response?.data ? false : true);

        },
        onSuccess: (data, variables, context) => {
            login(data.data?.token)
            console.log(data.data);
        },
    })

    const handleLogin = () => {
        if(email.trim().length ==0 || password.trim().length == 0){
            console.log('No Null values !!!');
        }else{
            const user = {
                email:email,
                password:password
            }   
            UserLogin.mutate(user);
        }
        
    }
    return (
        <GuestLayout>
            <View className="items-center justify-center">
                <Image
                    className="w-32 h-32 rounded-full"
                    source={{
                        uri: 'https://static-00.iconduck.com/assets.00/patreon-icon-2048x2048-f80b89j2.png',
                    }}
                />
            </View>
            
            <Text className="text-5xl font-bold mb-6 text-gray-200 mt-5">Sign In</Text>
            {/* form */}
            <TxtInput onChangeText={(text) => setEmail(text)} placeholder="Enter your Email"/> 
            <TxtInput onChangeText={(text) => setPassword(text)}  placeholder="Enter your password" passEntry={true}/> 
            
            <View className="flex flex-row justify-between items-center mt-3" >
                <View className="flex-row items-center">
                    <Pressable className="h-6 w-6 mr-2 rounded bg-blueC-300  border-blueC-400 focus:border-grayC-400 focus:ring-grayC-400"></Pressable>
                    
                    <Text className="text-sm text-gray-200">Remember me</Text>
                    
                </View>
    
                <Pressable>
                    <Text className="underline text-sm text-gray-200 hover:text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pinkC-400" >
                        Reset Password
                    </Text>
                </Pressable>
            </View>

            <View className="flex flex-row justify-end mt-5">         
               <PrimaryButton onPress={() => {handleLogin()}} 
                message='log in'/>
            </View>

            {   UserLogin.isLoading ? (
                    <ActivityIndicator size="large" style={{marginVertical:16}} color="white"/>
                ) : (
                    <View>
                        {UserLogin.isError ? (
                            generalException ? (
                                <Messages message={`Here was a problem processing Login : ${UserLogin.error}`} level={'error'}/>
                            ):(
                                <Messages message={`${UserLogin.error.response.data?.message } \n ${UserLogin.error.response.data?.error?.email ? UserLogin.error.response.data?.error?.email : ''} \n ${UserLogin.error.response.data?.error?.password ? UserLogin.error.response.data?.error?.password : ''}`} 
                                    level={'error'}
                                /> 
                            )    
                        ) : null}

                        {UserLogin.isSuccess ? navigation.navigate('Home',{screen: 'HomePage'}) : null}
                    </View>
                )
            } 
        </GuestLayout>
    );
}
/* Pasar parametros en  navigation */
/* {UserLogin.isSuccess ? navigation.navigate('Home',{
    screen: 'HomePage',
    params: { token: success.token },
}) : null} */
