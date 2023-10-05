import { View, Text, Image, ActivityIndicator} from 'react-native';
import { AuthenticateLayout } from '../../layouts/AuthenticateLayout';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PrimaryButton } from '../../components/PrimaryButton';
import { DangerButton } from '../../components/DangerButton';
import { MaterialIcons } from '@expo/vector-icons';

import { Feather } from '@expo/vector-icons';
import { Messages } from '../../components/Messages';
import { Card } from '../../components/Card';
import { Header } from '../../components/Header';
import { useEffect } from 'react';
import { getStore, deleteStore } from '../../hooks/StoreApi';


export const DetailStore = ({navigation, route}) => {

    const { id } = route.params;
    
    const { data:store, isLoading, isError, error, isFetching ,isSuccess} = getStore(id);

    const deleteStoreMutation = deleteStore(); //haber xd

    useEffect(() => {
        console.log(store);
    },[store])

    const handleStoreDelete = async() => {
        if (confirm('You want to delete this Store ??? ..')) {
            await deleteStoreMutation.mutate(store?.data);
        }
    }
    return (
        <AuthenticateLayout>
            <Header navigation={navigation}/>
            
            <View className="flex flex-1 flex-col justify-center items-center" >
                {
                    isLoading || isFetching ? (
                        <ActivityIndicator size="large" style={{marginVertical:16}} color="white"/>
                    ): (
                        <>
                            {isError ? (
                                <View>
                                    <MaterialIcons name="error-outline" size={60} color="white" />
                                    <Messages message={`Here was a problem processing Owners : ${error.message}`} level={'error'}/>
                                </View>
                            ):null}

                            { isSuccess ? (
                                <>
                                    <View className="flex-none w-full max-w-sm" >
                                        <Card>
                                            <View className="flex flex-row justify-between">
                                                <View className="py-2">
                                                    <MaterialCommunityIcons name="warehouse" size={60} color="white" />
                                                </View>
                                                <View>
                                                    <View>
                                                        <PrimaryButton onPress={() => (navigation.navigate('CreateEditStore',{id: store?.data.id, name: store?.data.name}))}
                                                            message="Edit"
                                                        />
                                                    </View>
                                                    <View className="mt-2">
                                                        <DangerButton message="Delete" onPress={() => handleStoreDelete()} />
                                                    </View>
                                                </View>
                                            </View>
                                        </Card>
                                    </View>

                                    <View className="w-full max-w-sm">
                                        <Card >
                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >Name: </Text> {store?.data.name}
                                            </Text><Text>{`\n`}</Text>

                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >Mas datos de branch: </Text> prueba
                                            </Text><Text>{`\n`}</Text>
                                           
                                        </Card>
                                    </View>
                                </>   
                            ) : null}
                        </>
                    )
                }
               
                <View className="flex-none w-full max-w-sm">
                    {
                        deleteStoreMutation.isLoading ? (
                            <ActivityIndicator size="large" style={{marginVertical:16}} color="white"/>
                        ):(
                            <View>
                                {deleteStoreMutation.isError ? (
                                    deleteStoreMutation.error.response.data.message ? (<Messages message={`${deleteStoreMutation.error.response.data.message}`} level={'error'}/>)
                                    : (<Messages message={`Here was a problem processing Form : ${deleteStoreMutation.error}`} level={'error'}/>)
                                ) : null}
                            </View>
                        )
                    }
                </View>
                
            </View>
          
       </AuthenticateLayout>
    ) 
}
