import { View, Text, TextInput, Pressable, Image,TouchableOpacity ,ActivityIndicator } from 'react-native';
import React, { useState } from 'react';

import {Header} from '../../components/Header';

import { AuthenticateLayout } from '../../layouts/AuthenticateLayout';
import { TxtInput } from '../../components/TxtInput';
import { Messages } from '../../components/Messages';

import { PrimaryButton } from '../../components/PrimaryButton';
import { AntDesign } from '@expo/vector-icons';
import { useMutation, useQueryClient } from 'react-query';
import { storeBrand,updateBrand } from '../../hooks/BrandApi';

export const CreateEditBrand = ({navigation , route}) => {

    const queryClient = new useQueryClient();

    const { id , name } = route.params;
    const [generalException,setGeneralException] = useState([]);
    const [brand, setBrand] = useState({ id:id, name:name });
    //const [brandName, setBrandName] = useState(name);

    console.log(id,name);
    const mutation = useMutation({
        mutationFn: (id == '' ?  storeBrand : updateBrand),
        
        onError: (error,variables,context) => {
            console.log(brand);
            console.log(error);
            setGeneralException(error?.response?.data ? false : true);
        },
        onSuccess: (data, variables, context) => {
            console.log(brand);
            console.log(data.data);
            console.log('guardado');
            setBrand({ id:'',name:'' });
            queryClient.invalidateQueries('brands'); //para recargar el query supuestamente xd
            navigation.navigate('Home',{screen: 'BrandsList'}); //aca depende si no esta en el button Nav seria navigation.navigate('nombre en el Stack',{BrandsList});
        },
    });

    const handleSubmit = async() => {
        console.log(brand);
        if(id == ''){
            console.log('store');
            await mutation.mutate(brand);
        }
        else{
            console.log('update');
            await mutation.mutate(brand);
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
                            <Text></Text>
                        ):(
                            <Text className="text-gray-200 mt-2 mb-2">Name: </Text>
                        )
                    }
                    
                  {/*   <TxtInput value={brandName} onChangeText={(text) => setBrandName(text)} placeholder="Brand Name: " /> */}
                    <TxtInput value={brand.name} onChangeText={(text) => setBrand({...brand , name:text})} placeholder="Brand Name: " />
                    {   
                        mutation.isLoading ? (
                            <ActivityIndicator size="large" style={{marginVertical:16}} color="white"/>
                        ) : (
                            <View>
                                <View>
                                    {
                                        mutation.isError ? (
                                            generalException ? (
                                                <Messages message={`Here was a problem processing Form : ${mutation.error}`} level={'error'}/>
                                            ):(
                                                <Messages message={`${mutation.error.response.data?.message } \n ${mutation.error.response.data?.error?.name ? mutation.error.response.data?.error?.name : ''} `} 
                                                    level={'error'}
                                                /> 
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