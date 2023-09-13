import { View } from 'react-native';
import React from 'react';
import { StatusBar } from "expo-status-bar";

export const AuthenticateLayout = (props) => {

    return (
        <View 
            className="flex-1 px-6 py-4 bg-blueC-600 "
        >

            {props.children}
            {/* <StatusBar
                backgroundColor="#22325B"
            /> */}
        </View>

    );

}