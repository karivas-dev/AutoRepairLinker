import React,{useEffect, useState} from 'react';
import "./styles.css";
import { useNavigation } from '@react-navigation/native';
import { Login } from './src/screens/Login';
import { FormOwner } from './src/screens/Owners/FormOwner';
import {HomePage} from "./src/screens/HomePage";
import { DetailOwner } from './src/screens/Owners/DetailOwner';
import { UserProfile } from './src/screens/User/UserProfile';
import { ResetPassword } from './src/screens/ResetPassword';
/* //import { Header } from './src/components/Header'; */
import { NavigationContainer } from '@react-navigation/native';
import HomeStackNavigator from './src/Navigations/Navigator';
import { getAuthToken } from './src/context/AuthContext';

import { QueryClient, QueryClientProvider } from 'react-query';

export default function App() {
  //const navigation = useNavigation();
  useEffect( () => {
    checkLoginStatus();
  },[]);
  
  const queryClient = new QueryClient();
  const [haveToken,setHaveToken] = useState(false);
  const checkLoginStatus = async () => {
    try {
      const token = await getAuthToken();
      console.log(token)
      // Si existe un token, el usuario ya ha iniciado sesión, navega al flujo principal
      if (token) {
        setHaveToken(true);
      } else {
        setHaveToken(false);
        //navigation.navigate('Login')
      }
    } catch (error) {
      console.error('Error al verificar el estado de inicio de sesión: ', error);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      {
       haveToken ? (
          <NavigationContainer>
              <HomeStackNavigator></HomeStackNavigator>
          </NavigationContainer>
         
        ):(
          <NavigationContainer>
             <Login/>
          </NavigationContainer>
        )
      }
    </QueryClientProvider>
  )
 
  
}