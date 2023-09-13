
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HeaderItem from './Header';
import { HomePage } from '../screens/HomePage';
import {FormOwner} from "../screens/Owners/FormOwner";
import { DetailOwner } from '../screens/Owners/DetailOwner';
const Stack = createNativeStackNavigator();

export const HeaderPrueba = () => {

   return (
       <NavigationContainer
            initialRouteName='Home'
            screenOptions={{headerShown: false}}
       >
           <Stack.Navigator>
               <Stack.Screen
                   name="Home"
                   component={HomePage}
                   options={{
                       headerTitle: () => <HeaderItem name="Home"/>,
                       // Add a placeholder button without the `onPress` to avoid flicker
                       headerRight: () => (
                           <View>
                               <TouchableOpacity style={{marginRight : 15}}>
                                    <MaterialCommunityIcons name="dots-vertical-circle-outline" size={24} color="#F1F6F5" />
                               </TouchableOpacity>
                           </View>
                       ),
                       
                   }}
               />
               <Stack.Screen
                   name="FormOwner"
                   component={FormOwner}
                   options={{
                       headerTitle: (props) => <HeaderItem name="Form Owner"/>,
                       // Add a placeholder button without the `onPress` to avoid flicker
                       headerRight: () => (
                           <View>
                               <TouchableOpacity style={{marginRight : 28}}>
                                   <MaterialCommunityIcons name='dots-vertical' size={28} color="#2C3B64"/>
                               </TouchableOpacity>
                           </View>
                       ),
                        headerStyle:{
                            height: 150,
                            borderBottomLeftRadius:50,
                            borderBottomRightRadius:50,
                            backgroundColor: '#2C3B64',
                            shadowColor:"#000",
                            elevation:25
                        }
                   }}
               />
               <Stack.Screen
                   name="DetailOwner"
                   component={DetailOwner}
                   options={{
                       headerTitle: (props) => <HeaderItem name="Form Owner"/>,
                       // Add a placeholder button without the `onPress` to avoid flicker
                       headerRight: () => (
                           <View>
                               <TouchableOpacity style={{marginRight : 15}}>
                                   <MaterialCommunityIcons name='dots-vertical' size={28} color="#2C3B64"/>
                               </TouchableOpacity>
                           </View>
                       ),
                       headerStyle:{
                           height: 150,
                           borderBottomLeftRadius:50,
                           borderBottomRightRadius:50,
                           backgroundColor: '#2C3B64',
                           shadowColor:"#000",
                           elevation:25
                       }
                   }}
               />
           </Stack.Navigator>

       </NavigationContainer>
   )
}