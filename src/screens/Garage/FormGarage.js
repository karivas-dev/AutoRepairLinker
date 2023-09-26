import { View, Text, TextInput, Pressable, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Header } from '../../components/Header';
import { AuthenticateLayout } from '../../layouts/AuthenticateLayout';
import { TxtInput } from '../../components/TxtInput';
import { SelectInput } from '../../components/SelectInput';
import { PrimaryButton } from '../../components/PrimaryButton';
import { AntDesign } from '@expo/vector-icons';

export const FormGarage = ({ navigation }) => {
    const district = [
        {
            id: 1, name: 'prueba'
        },
        {
            id: 2, name: 'hola'
        }
    ];

    const BranchType = [
        {
            id: 1, name: 'taller'
        },
        {
            id: 2, name: 'oficina'
        }
    ];

    return (
        <AuthenticateLayout>
            <Header navigation={navigation} />
            <View className="flex-1 items-center justify-center p-8">
                <View className="w-full p-8 max-w-sm">
                    <Text className="text-lg font-extrabold text-gray-200 text-center mb-4">Registro de Garage</Text>
                    <TxtInput placeholder='name' />
                    <TxtInput placeholder='email' />
                    <TxtInput placeholder='phone number' />
                    <SelectInput DefaultPlaceholder="Branch Type" data={BranchType} />
                    <SelectInput DefaultPlaceholder="Select District" data={district} />
                    <View className="block w-full ">
                        <PrimaryButton message='Save or edit'/>
                    </View>
                </View>
            </View>
        </AuthenticateLayout>

    )

}