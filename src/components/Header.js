import { View, Text } from 'react-native'
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export const Header = ({navigation}) => {
    return(
        <View className="flex flex-row justify-start mt-5">   
                 
            <TouchableOpacity onPress={ () => navigation.goBack()}>
                <AntDesign name="arrowleft" size={40} color="white" />
            </TouchableOpacity>
        
        </View>
    )
}

