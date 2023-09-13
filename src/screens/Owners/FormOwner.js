import { View, Text, TextInput, Pressable, Image,TouchableOpacity } from 'react-native';
import React from 'react';

import {Header} from '../../components/Header';

import { AuthenticateLayout } from '../../layouts/AuthenticateLayout';
import { TxtInput } from '../../components/TxtInput';
import { SelectInput } from '../../components/SelectInput';
import { PrimaryButton } from '../../components/PrimaryButton';
import { AntDesign } from '@expo/vector-icons';

export const FormOwner = ({navigation}) => {

    const algo = [
        {
            id: 1, name: 'waos'
        },
        {
            id: 2, name: 'yessi'
        }
    ];
    return (
        <AuthenticateLayout>
            
            <Header navigation={navigation}/>

            <View className="flex-1 items-center justify-center p-8">
                <View className="w-full p-8 max-w-sm">
                    <Text className="text-lg font-extrabold text-gray-200 text-center mb-4">Registro de Dueño</Text>
                    <TxtInput placeholder="Nombre" />
                    <TxtInput placeholder="Apellido" />
                    <TxtInput placeholder="Correo Electrónico" />
                    <TxtInput placeholder="Teléfono" />

                    <SelectInput DefaultPlaceholder="Selecciona Departamento" data={algo} />
                    
                    <View className="block w-full ">
                        <PrimaryButton message='Save or edit'/>
                    </View>
                </View>
            </View>
        </AuthenticateLayout>
       

    )

}