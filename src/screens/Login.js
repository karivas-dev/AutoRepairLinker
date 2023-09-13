import { View, Text, TextInput, Pressable,Image } from 'react-native';
import React from 'react';

import { GuestLayout } from '../layouts/GuestLayout';
import { PrimaryButton } from '../components/PrimaryButton';
import {TxtInput }from '../components/TxtInput'
import { Card } from '../components/Card';

export const Login = () => {

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
            <TxtInput placeholder="Enter your Email"/> 
            <TxtInput placeholder="Enter your password" passEntry={true}/> 
            
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
            {/* buttom*/}
            <View className="flex flex-row justify-end mt-5">         
               <PrimaryButton message='log in'/>
            </View>
           {/*  <Card>
                HOLA
            </Card> */}
        </GuestLayout>
    );
}