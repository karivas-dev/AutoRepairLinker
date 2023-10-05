import { View, Text, TextInput, Pressable, Image,TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';

import {Header} from '../../components/Header';

import { AuthenticateLayout } from '../../layouts/AuthenticateLayout';
import { Messages } from '../../components/Messages';
import { TxtInput } from '../../components/TxtInput';

import { PrimaryButton } from '../../components/PrimaryButton';
import { createEditStore } from '../../hooks/StoreApi';

export const CreateEditStore = ({navigation, route}) => {

    const {storeParms } = route.params;
    const [store, setStore] = useState(storeParms); 
    console.log(store);

    const mutation = createEditStore(store)
   
    const handleSubmit = async() => {
        console.log(store);
        if(store.name  == '' ){
            alert('No Puede ingresar campos Nulos o Vacios...');
        }else{
            await mutation.mutate(store);
            if(mutation.isSuccess){
                setStore({id: '',name:''});
                (store.id == '' ? console.log('store') : console.log('update'))
            }
        }
       
    }
    
    return (
        <AuthenticateLayout>
            
            <Header navigation={navigation}/>

            <View className="flex-1 items-center justify-center p-8">
                <View className="w-full p-8 max-w-sm">
                    <Text className="text-lg font-extrabold text-gray-200 text-center mb-4">{ store.id == '' ? 'Add new Store' : 'Update Store' }</Text>
                    <TxtInput placeholder="Nombre" value={store.name}  onChangeText={(text) => setStore({...store, name: text})}/>
                    
                    {
                        mutation.isLoading ? (
                            <ActivityIndicator size="large" style={{marginVertical:16}} color="white"/>
                        ) : (
                            <>
                                {mutation.isError ? (
                                    mutation.error.response.data?.message ? (
                                        <>
                                            <Messages message={`${mutation.error.response.data?.message} `} level={'error'}/>
                                            {mutation.error.response.data?.errors?.name && (<Messages message={`${mutation.error.response.data?.errors?.name} `} level={'error'}/>)}
                                        </>
                                    ):(
                                        <Messages message={`Here was a problem processing Form : ${ mutation.error}`} level={'error'}/>
                                    )    
                                ) : null}
                                <View className="block w-full mt-4">
                                    <PrimaryButton onPress={() => handleSubmit()}  message={store.id == '' ? 'Save Store' : 'Edit Store'}/>
                                </View>
                            </>
                        )
                    }
                </View>
            </View>
        </AuthenticateLayout>
       

    )

}