import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { HomePage } from "../screens/HomePage";

import {CreateEditOwner} from "../screens/Owners/CreateEditOwner";
import {DetailOwner} from '../screens/Owners/DetailOwner';

import { UserProfile } from "../screens/User/UserProfile";

import { ReplacementsList } from "../screens/Replacements/ReplacementsList";
import { DetailReplacement } from "../screens/Replacements/DetailReplacement";
import { EditCreateReplacement } from "../screens/Replacements/EditCreateReplacement";

import { StoresList } from "../screens/Stores/StoresList";
import { DetailStore } from "../screens/Stores/DetailStore";
import { CreateEditStore } from "../screens/Stores/CreateEditStore";

import { OwnersList } from "../screens/Owners/OwnersList";
import { Login } from "../screens/Login";
import { ResetPassword } from "../screens/ResetPassword";
import {BrandsList} from '../screens/Brands/BrandsList'
import { DetailBrand } from "../screens/Brands/DetailBrand";
import { CreateEditBrand } from "../screens/Brands/CreateEditBrand";

import { DetailModel } from "../screens/Models/DetailModel";
import { CreateEditModel } from "../screens/Models/CreateEditModel";

import { CarsList } from "../screens/Cars/CarsList";
import { DetailCar } from "../screens/Cars/DetailCar";
import { TicketsList } from "../screens/Tickets/TicketsList";
import { DetailTicket } from "../screens/Tickets/DetailTicket";





const Tab = createBottomTabNavigator();
const screenOptionsTabStyle = {
    headerShown:false,
    tabBarStyle:{
        backgroundColor:'#374A7A',
        height:60,
        borderTopWidth: 0,
    }
}
const BottomTabItemIcon = (IconLib,size, name, focused) => {
    return (<IconLib size={24} name={name} color={focused ? '#6987B7': 'white'}/>)
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
                name="BrandsList"
                component={BrandsList}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({focused}) => (
                        <MaterialIcons  name="format-list-bulleted"  size={24} color={focused ? '#6987B7': 'white'} />
                    ),
                }}
                initialParams={{level: '', flashMessage: ''}}
            />
             <Tab.Screen
                name="CarsList"
                component={CarsList}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({focused}) => (
                        /* <AntDesign name="car" size={24} color={focused ? '#6987B7': 'white'} /> */
                        BottomTabItemIcon(AntDesign,24,'car',focused) 
                    ),
                }}
                initialParams={{level: '', flashMessage: '' , page: 1}}
            />
            <Tab.Screen
                name="OwnersList"
                component={OwnersList}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({focused}) => (
                        <MaterialIcons name="groups" size={24} color={focused ? '#6987B7': 'white'} />
                    ),
                }}
                initialParams={{level: '', flashMessage: '', page: 1}}
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
export const HomeStackNavigator = () => {

    return (
        <Stack.Navigator screenOptions={screenOptionsStyle} >
            <Stack.Screen name="Home" component={BottomTabNavigator} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />

            <Stack.Screen name="CreateEditOwner" component={CreateEditOwner} />
            <Stack.Screen name="DetailOwner" component={DetailOwner} />
            <Stack.Screen name="DetailBrand" component={DetailBrand} initialParams={{level: '', flashMessage: '', page: 1}}/>
            <Stack.Screen name="CreateEditBrand" component={CreateEditBrand} />

            <Stack.Screen name="StoresList" component={StoresList} initialParams={{level: '', flashMessage: '', page: 1}}/>
            <Stack.Screen name="DetailStore" component={DetailStore} />
            <Stack.Screen name="CreateEditStore" component={CreateEditStore} />

            <Stack.Screen name="DetailModel" component={DetailModel} />
            <Stack.Screen name="CreateEditModel" component={CreateEditModel} />
            <Stack.Screen name="DetailCar" component={DetailCar} />

            <Stack.Screen name="ReplacementsList" component={ReplacementsList} initialParams={{level: '', flashMessage: '', page: 1}}/>
            <Stack.Screen name="DetailReplacement" component={DetailReplacement} />
            <Stack.Screen name="EditCreateReplacement" component={EditCreateReplacement} />

            <Stack.Screen name="TicketsList" component={TicketsList} initialParams={{level: '', flashMessage: '', page: 1}}/>
            <Stack.Screen name="DetailTicket" component={DetailTicket} />

        </Stack.Navigator>
    )
};

export const LoginStackNavigator = () => {
    
    return (
        <Stack.Navigator screenOptions={screenOptionsStyle} >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={BottomTabNavigator} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />

            <Stack.Screen name="CreateEditOwner" component={CreateEditOwner} />
            <Stack.Screen name="DetailOwner" component={DetailOwner} />
            <Stack.Screen name="DetailBrand" component={DetailBrand} initialParams={{level: '', flashMessage: '', page: 1}}/>
            <Stack.Screen name="CreateEditBrand" component={CreateEditBrand} />

            <Stack.Screen name="StoresList" component={StoresList} initialParams={{level: '', flashMessage: '', page: 1}}/>
            <Stack.Screen name="DetailStore" component={DetailStore} />
            <Stack.Screen name="CreateEditStore" component={CreateEditStore} />

            <Stack.Screen name="DetailModel" component={DetailModel} />
            <Stack.Screen name="CreateEditModel" component={CreateEditModel} />

            <Stack.Screen name="ReplacementsList" component={ReplacementsList} initialParams={{level: '', flashMessage: '', page: 1}}/>
            <Stack.Screen name="DetailReplacement" component={DetailReplacement} />
            <Stack.Screen name="DetailCar" component={DetailCar} />
            <Stack.Screen name="EditCreateReplacement" component={EditCreateReplacement} />

            <Stack.Screen name="TicketsList" component={TicketsList} initialParams={{level: '', flashMessage: '', page: 1}}/>
            <Stack.Screen name="DetailTicket" component={DetailTicket} />

        </Stack.Navigator>
    )
};



