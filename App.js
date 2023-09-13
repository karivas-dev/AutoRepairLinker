import React from 'react';
import "./styles.css";

import { Login } from './src/screens/Login';
import { FormOwner } from './src/screens/Owners/FormOwner';
import {HomePage} from "./src/screens/HomePage";
import { DetailOwner } from './src/screens/Owners/DetailOwner';

import { ResetPassword } from './src/screens/ResetPassword';
/* //import { Header } from './src/components/Header'; */
import { NavigationContainer } from '@react-navigation/native';
import HomeStackNavigator from './src/Navigations/Navigator';

export default function App() {
  return (
    <NavigationContainer>
        <HomeStackNavigator></HomeStackNavigator>
    </NavigationContainer>
    /* <FormOwner/> */
  );
}