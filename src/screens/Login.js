import {ActivityIndicator, Image, Pressable, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Messages} from '../components/Messages';
import {GuestLayout} from '../layouts/GuestLayout';
import {PrimaryButton} from '../components/PrimaryButton';
import {TxtInput} from '../components/TxtInput'
import {userLoginAttempt} from '../hooks/AuthApi';

export const Login = () => {

    const [user,setUser] = useState({email: '' , password:''});

    const UserLogin = userLoginAttempt();

    useEffect(() => {
        if(UserLogin?.isSuccess){
           setUser({email: '' , password:''});
           console.log('Fui exitoso');
        }
    },[UserLogin?.isSuccess]);

    const handleLogin = async () => {
        if (user.email == '' || user.password == '') {
            alert('No Null values !!!');
        } else {
            await UserLogin.mutate(user);
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
            <TxtInput value={user.email} onChangeText={(text) => setUser({...user, email:text})}placeholder="Enter your Email"/>
            <TxtInput value={user.password} onChangeText={(text) => setUser({...user, password:text})} placeholder="Enter your password" passEntry={true}/>

            <View className="flex flex-row justify-between items-center mt-3">
                <Pressable>
                    <Text
                        className="underline text-sm text-gray-200 hover:text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pinkC-400">
                        Reset Password
                    </Text>
                </Pressable>
            </View>

            <View className="flex flex-row justify-end mt-5">
                <PrimaryButton onPress={() => { handleLogin() }} message='log in'/>
            </View>

            {UserLogin.isLoading ? (
                <ActivityIndicator size="large" style={{marginVertical: 16}} color="white"/>
            ) : (
                <View className="mt-2">
                    {UserLogin.isError ? (
                        UserLogin.error.response.data?.message ? (
                            <>
                                {/* <Messages message={`${UserLogin.error.response.data?.message}`} level={'error'}/> */}
                                {UserLogin.error.response.data?.errors?.email && ( <Messages message={`${UserLogin.error.response.data?.errors?.email}`} level={'error'}/>)}
                                {UserLogin.error.response.data?.errors?.password && ( <Messages message={`${UserLogin.error.response.data?.errors?.password}`} level={'error'}/>)}
                            </>
                        ) : (
                            <Messages message={`Here was a problem processing Login: ${ UserLogin.error}`} level={'error'}/>
                        )
                    ) : null}
                </View>)}
        </GuestLayout>
    );
}