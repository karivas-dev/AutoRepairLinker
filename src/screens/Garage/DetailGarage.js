import { View, Text, Image, ActivityIndicator } from 'react-native';
import { AuthenticateLayout } from '../../layouts/AuthenticateLayout';

import { FontAwesome } from '@expo/vector-icons';
import { PrimaryButton } from '../../components/PrimaryButton';
import { DangerButton } from '../../components/DangerButton';

import { MaterialIcons } from '@expo/vector-icons';
import { Messages } from '../../components/Messages';
import { Card } from '../../components/Card';
import { Header } from '../../components/Header';
import { deleteGarage, getGarage } from '../../hooks/GarageApi';

export const DetailGarage = ({ navigation, route }) => {

    const { id } = route.params;

    const { data: garage, isLoading, isError, error, isFetching, isSuccess } = getGarage(id);

    const deleteGarageMutation = deleteGarage();

    const handleGarageDelete = async () => {
        if (confirm('You want to delete this Brand ??? ..')) {
            await deleteGarageMutation.mutate(garage?.data);
        }
    }

    return (
        <AuthenticateLayout>
            <Header navigation={navigation} />
            <View className="flex flex-1 flex-col justify-center items-center">
                <View className="flex-none w-full max-w-sm">
                    <Card>
                        {
                            isLoading || isFetching ? (
                                <ActivityIndicator size="large" style={{ marginVertical: 16 }} color="white" />
                            ) : (
                                <View className="flex flex-row justify-between">
                                    {isError ? (
                                        <View>
                                            <MaterialIcons name="error-outline" size={60} color="white" />
                                            <Messages message={`Here was a problem processing Brands : ${error.message}`} level={'error'} />
                                        </View>
                                    ) : null}

                                    {isSuccess ? (
                                        <>
                                            <View className="py-2">
                                                <FontAwesome name="th-list" size={62} color="white" />
                                                <View className="mt-4">
                                                    <Text className="text-gray-200 text-lg font-bold text-center">{garage?.data.name}</Text>
                                                </View>
                                                <View className="text-gray-200 text-lg text-center" >
                                                    <Text className="text-gray-200 text-lg font-bold" >Email: </Text> 
                                                </View>
                                                <View className="text-gray-200 text-lg text-center" >
                                                    <Text className="text-gray-200 text-lg font-bold" >Phone: </Text> 
                                                </View>
                                                <View className="text-gray-200 text-lg text-center" >
                                                    <Text className="text-gray-200 text-lg font-bold" >Branch Detail: </Text> 
                                                </View>
                                                <View className="text-gray-200 text-lg text-center" >
                                                    <Text className="text-gray-200 text-lg font-bold" >District: </Text> 
                                                </View>
                                            </View>
                                            <View className="py-2">
                                                <PrimaryButton message='Edit' onPress={() => navigation.navigate('FormGarage', { id: id, name: garage?.data.name })} />

                                                <View className="mt-2">
                                                    <DangerButton message="delete" onPress={() => handleGarageDelete()} />
                                                </View>

                                            </View>
                                        </>
                                    ) : null}
                                </View>
                            )
                        }
                    </Card>
                </View>
                <View className="w-full max-w-sm">
                {
                            deleteGarageMutation.isLoading ? (
                                <ActivityIndicator size="large" style={{marginVertical:16}} color="white"/>
                            ):(
                                <View>
                                    {deleteGarageMutation.isError ? (
                                        <Messages message={`Here was a problem processing Form : ${deleteGarageMutation.error}`} level={'error'}/>
                                    ) : null}
                                </View>
                            )
                        }
                </View>
            </View>
        </AuthenticateLayout>

    )

}