import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { HomePage } from "../screens/HomePage";

import {FormOwner} from '../screens/Owners/FormOwner';
import {DetailOwner} from '../screens/Owners/DetailOwner';
import { UserProfile } from "../screens/User/UserProfile";



const Tab = createBottomTabNavigator();
const screenOptionsTabStyle = {
    headerShown:false,
    tabBarStyle:{
        backgroundColor:'#374A7A',
        position:'absolute',
        bottom:15,
        left:20,
        right:20,
        elevation:0,
        height:60,
        borderColor:'#374A7A',
        borderRadius:15,
        
    }
}
const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={screenOptionsTabStyle}
        >
            <Tab.Screen
                name="HomePage"
                component={HomePage}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({focused}) => (
                        <AntDesign name="home" color={focused ? '#6987B7': 'white'} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="UserProfile"
                component={UserProfile}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({focused}) => (
                        <FontAwesome5 name="user" size={24} color={focused ? '#6987B7': 'white'} />
                    ),
                   
                }}
            />
        </Tab.Navigator>
    )
}

const Stack = createStackNavigator();
const screenOptionsStyle = {
    headerShown:false
}
const HomeStackNavigator = () => {
    
    return (
        <Stack.Navigator screenOptions={screenOptionsStyle} >
           <Stack.Screen name="Home" component={BottomTabNavigator} />

           <Stack.Screen name="FormOwner" component={FormOwner} />
           <Stack.Screen name="DetailOwner" component={DetailOwner} />

        </Stack.Navigator>
    )
};

export default HomeStackNavigator;
