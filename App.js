import React,{useEffect, useState} from 'react';
import { NativeWindStyleSheet } from "nativewind";

import { NavigationContainer } from '@react-navigation/native';
import { HomeStackNavigator } from './src/Navigations/Navigator';
import { LoginStackNavigator } from './src/Navigations/Navigator';
import { getAuthToken } from './src/context/AuthContext';

import { QueryClient, QueryClientProvider } from 'react-query';

NativeWindStyleSheet.setOutput({
  default: "native",
});

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
      // Si existe un token, el usuario ya ha iniciado sesión, navega al flujo principal
      if (token) {
        setHaveToken(true);
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