import { View, Text, TextInput, Pressable, Image,TouchableOpacity ,ActivityIndicator } from 'react-native';
import React, { useState } from 'react';

import {Header} from '../../components/Header';

import { AuthenticateLayout } from '../../layouts/AuthenticateLayout';
import { TxtInput } from '../../components/TxtInput';
import { Messages } from '../../components/Messages';

import { PrimaryButton } from '../../components/PrimaryButton';
import { createEditBrand} from '../../hooks/BrandApi';

export const CreateEditBrand = ({navigation , route}) => {

    const { id , name } = route.params;
    const [brand, setBrand] = useState({ id:id, name:name });

    const mutation = createEditBrand(brand);

    const handleSubmit = async() => {
        console.log(brand);
        await mutation.mutate(brand);
        if(mutation.isSuccess){
            setBrand({ id:'',name:'' });
            (id == '' ? console.log('store') : console.log('update'))
        }
    }

    return (
        <AuthenticateLayout>
            
            <Header navigation={navigation}/>

            <View className="flex-1 items-center justify-center p-8">
                <View className="w-full p-8 max-w-sm">
                    <Text className="text-lg font-extrabold text-gray-200 text-center mb-4">{ id == '' ? 'Add new Brand' : 'Update a Brand' }</Text>
                    {
                        id == '' ? (
                            null
                        ):(
                            <Text className="text-gray-200 mt-2 mb-2">Name: </Text>
                        )
                    }
                    
                    <TxtInput value={brand.name} onChangeText={(text) => setBrand({...brand , name:text})} placeholder="Brand Name: " />
                    {   
                        mutation.isLoading ? (
                            <ActivityIndicator size="large" style={{marginVertical:16}} color="white"/>
                        ) : (
                            <View>
                                <View>
                                    {
                                        mutation.isError ? (
                                            mutation.error.response.data?.message ? (
                                                <>
                                                    <Messages message={`${mutation.error.response.data?.message} `} level={'error'}/>
                                                    {mutation.error.response.data?.errors?.name && ( <Messages message={`${mutation.error.response.data?.errors?.name} `} level={'error'}/>)}

                                                </>
                                            ):(
                                                <Messages message={`Here was a problem processing Form : ${ mutation.error}`} level={'error'}/>
                                            )    
                                        ) : null
                                    }
                                </View>
                                <View className="block w-full mt-2">
                                    <PrimaryButton onPress={() => handleSubmit()}  message={id == '' ? 'Store Brand' : 'Edit Brand'}/>
                                </View>
                            </View>
                        )
                    } 
                </View>
            </View>
        </AuthenticateLayout>
    )
}