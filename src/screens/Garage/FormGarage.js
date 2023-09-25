import { View, Text, TextInput, Pressable, Image,TouchableOpacity ,ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { SelectInput } from '../../components/SelectInput';

import {Header} from '../../components/Header';

import { AuthenticateLayout } from '../../layouts/AuthenticateLayout';
import { TxtInput } from '../../components/TxtInput';
import { Messages } from '../../components/Messages';

import { PrimaryButton } from '../../components/PrimaryButton';
import { createEditGarage} from '../../hooks/GarageApi';

export const FormGarage = ({ navigation, route }) => {
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

    const { id , name } = route.params;
    const [garage, setGarage] = useState({ id:id, name:name });

    const mutation = createEditGarage(garage);

    const handleSubmit = async() => {
        console.log(garage);
        await mutation.mutate(garage);
        if(mutation.isSuccess){
            setGarage({ id:'',name:'' });
            (id == '' ? console.log('store') : console.log('update'))
        }
    }

    return (
        <AuthenticateLayout>
            <Header navigation={navigation} />
            <View className="flex-1 items-center justify-center p-8">
                <View className="w-full p-8 max-w-sm">
                <Text className="text-lg font-extrabold text-gray-200 text-center mb-4">{ id == '' ? 'Add new Garage' : 'Update a Garage' }</Text>
                    {
                        id == '' ? (
                            null
                        ):(
                            <Text className="text-gray-200 mt-2 mb-2">Name: </Text>
                        )
                    }
                    <TxtInput value={garage.name} onChangeText={(text) => setGarage({...garage , name:text})} placeholder="Garage Name: " />
                    <TxtInput placeholder='email' />
                    <TxtInput placeholder='phone number' />
                    <SelectInput DefaultPlaceholder="Branch Type" data={BranchType} />
                    <SelectInput DefaultPlaceholder="Select District" data={district} />
                    <View className="block w-full ">
                    {   
                        mutation.isLoading ? (
                            <ActivityIndicator size="large" style={{marginVertical:16}} color="white"/>
                        ) : (
                            <View>
                                <View>
                                    {
                                        mutation.isError ? (
                                            mutation.error.response.data?.message ? (
                                                <Messages message={`${mutation.error.response.data?.errors?.name ? mutation.error.response.data?.errors?.name : ''} `} level={'error'}/>
                                            ):(
                                                <Messages message={`Here was a problem processing Form : ${ mutation.error}`} level={'error'}/>
                                            )    
                                        ) : null
                                    }
                                </View>
                                <View className="block w-full mt-2">
                                    <PrimaryButton onPress={() => handleSubmit()}  message={id == '' ? 'Store Garage' : 'Edit Garage'}/>
                                </View>
                            </View>
                        )
                    } 
                    </View>
                </View>
            </View>
        </AuthenticateLayout>

    )

}