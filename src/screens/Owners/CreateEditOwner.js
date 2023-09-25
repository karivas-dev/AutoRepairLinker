import { View, Text, TextInput, Pressable, Image,TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';

import {Header} from '../../components/Header';

import { AuthenticateLayout } from '../../layouts/AuthenticateLayout';
import { Messages } from '../../components/Messages';
import { TxtInput } from '../../components/TxtInput';
import { SelectInput } from '../../components/SelectInput';
import { PrimaryButton } from '../../components/PrimaryButton';
import { createEditOwner } from '../../hooks/OwnerApi';

export const CreateEditOwner = ({navigation, route}) => {

    const {ownerParms } = route.params;
    const [owner, setOwner] = useState(ownerParms); 
    console.log(owner);

    const mutation = createEditOwner(owner)
    const algo = [
        {
            id: 1, name: 'Atiquizaya'
        },
        {
            id: 2, name: 'El Refugio'
        },
        {
            id: 3, name: 'San Lorenzo'
        },
        {
            id: 12, name: 'San Pedro Puxtla'
        },
    ];
 
    const handleSubmit = async() => {
        console.log(owner);
        if(owner.firstname  == '' || owner.lastname == '' || owner.email == '' || owner.district_id == ''){
            alert('No Puede ingresar campos Nulos o Vacios...');
        }else{
            await mutation.mutate(owner);
            if(mutation.isSuccess){
                setOwner({   id: '',firstname:'',lastname: '', email: '', telephone: '', district_id: '' });
                (owner.id == '' ? console.log('store') : console.log('update'))
            }
        }
       
    }
    
    return (
        <AuthenticateLayout>
            
            <Header navigation={navigation}/>

            <View className="flex-1 items-center justify-center p-8">
                <View className="w-full p-8 max-w-sm">
                    <Text className="text-lg font-extrabold text-gray-200 text-center mb-4">{ owner.id == '' ? 'Add new Owner' : 'Update a Owner' }</Text>
                    <TxtInput placeholder="Nombre" value={owner.firstname}  onChangeText={(text) => setOwner({...owner, firstname: text})}/>
                    <TxtInput placeholder="Apellido" value={owner.lastname} onChangeText={(text) => setOwner({...owner, lastname: text})}/>
                    <TxtInput placeholder="Correo Electrónico" value={owner.email} onChangeText={(text) => setOwner({...owner, email: text})}/>
                    <TxtInput placeholder="Teléfono" value={owner.telephone} onChangeText={(text) => setOwner({...owner, telephone: text})}/>

                    <SelectInput selectedValue={owner.district_id} onValueChange={(id) => setOwner({...owner, district_id: id})} 
                    DefaultPlaceholder="Selecciona Departamento" data={algo} />
                    
                    {
                        mutation.isLoading ? (
                            <ActivityIndicator size="large" style={{marginVertical:16}} color="white"/>
                        ) : (
                            <>
                                {mutation.isError ? (
                                    mutation.error.response.data?.message ? (
                                        <>
                                            <Messages message={`${mutation.error.response.data?.message} `} level={'error'}/>
                                            {mutation.error.response.data?.errors?.firstname && (<Messages message={`${mutation.error.response.data?.errors?.firstname} `} level={'error'}/>)}
                                            {mutation.error.response.data?.errors?.lastname&& (<Messages message={`${mutation.error.response.data?.errors?.lastname } `} level={'error'}/>)}
                                            {mutation.error.response.data?.errors?.email && (<Messages message={`${mutation.error.response.data?.errors?.email } `} level={'error'}/>)}
                                            {mutation.error.response.data?.errors?.telephone && (<Messages message={`${mutation.error.response.data?.errors?.telephone } `} level={'error'}/>)}
                                            {mutation.error.response.data?.errors?.district_id && (<Messages message={`${mutation.error.response.data?.errors?.district_id } `} level={'error'}/>)}
                                        </>
                                    ):(
                                        <Messages message={`Here was a problem processing Form : ${ mutation.error}`} level={'error'}/>
                                    )    
                                ) : null}
                                <View className="block w-full mt-4">
                                    <PrimaryButton onPress={() => handleSubmit()}  message={owner.id == '' ? 'Store Owner' : 'Edit Owner'}/>
                                </View>
                            </>
                        )
                    }
                </View>
            </View>
        </AuthenticateLayout>
       

    )

}