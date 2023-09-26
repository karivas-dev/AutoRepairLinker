import React,{useEffect, useState} from 'react';
import "./styles.css";

import { NavigationContainer } from '@react-navigation/native';
import { HomeStackNavigator } from './src/Navigations/Navigator';
import { LoginStackNavigator } from './src/Navigations/Navigator';
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
        console.log('aqui')
      } else {
        setHaveToken(false);
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
            <LoginStackNavigator></LoginStackNavigator>
          </NavigationContainer>
        )
      }
    </QueryClientProvider>
  );
}