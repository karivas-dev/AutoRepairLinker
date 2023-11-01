import { View, Text, Image, ActivityIndicator} from 'react-native';
import { AuthenticateLayout } from '../../layouts/AuthenticateLayout';
import { Header } from '../../components/Header';
import { FontAwesome } from '@expo/vector-icons';
import { PrimaryButton } from '../../components/PrimaryButton';
import { DangerButton } from '../../components/DangerButton';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Messages } from '../../components/Messages';
import { Card } from '../../components/Card';
import { getReplacement ,deleteReplacement} from '../../hooks/ReplacementApi';

export const DetailReplacement = ({navigation, route}) => {

    const { data:replacement, isLoading, isError, error, isFetching ,isSuccess} = getReplacement(route.params.id);

    const deleteReplacementMutation = deleteReplacement();

    const handleDelete = async() => {
        if (confirm('You want to delete this Replacement ??? ..')) {
            await deleteReplacementMutation.mutateAsync(replacement?.data);
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
                                 error.response.data?.message ? (
                                    <View>
                                        <MaterialIcons name="error-outline" size={60} color="white" />
                                        <Messages message={`${error.response.data?.message}`} level={'error'}/>

                                    </View>
                                ) 
                                : (<Messages message={`Here was a problem processing Car : ${error.message}`} level={'error'}/>)
                               
                            ):null}

                            { isSuccess ? (
                                <>
                                    <View className="flex-none w-full max-w-sm" >
                                        <Card>
                                            <View className="flex flex-row justify-between">
                                                <View className="py-2">
                                                    <MaterialCommunityIcons name="toolbox-outline" size={62} color="#F1F6F5" />
                                                </View>
                                                <View>
                                                <View>
                                                    <PrimaryButton message='Edit' onPress={() => 
                                                        navigation.navigate("EditCreateReplacement", {
                                                            id: replacement?.data.id,
                                                            name: replacement?.data.name,
                                                            description: replacement?.data.description,
                                                            brand_id: replacement?.data.model.brand.id,
                                                            model_id: replacement?.data.model.id,
                                                        })}
                                                    />
                                                </View>
                                                <View className="mt-2">
                                                    <DangerButton message="Delete" onPress={() => handleDelete()} />
                                                </View>
                                                </View>
                                            </View>
                                        </Card>
                                    </View>

                                    <View className="w-full max-w-sm">
                                        <Card >
                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >Name : </Text> {replacement?.data.name}
                                            </Text><Text>{`\n`}</Text>
                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >Description : </Text> {replacement?.data.description}
                                            </Text><Text>{`\n`}</Text>
                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >Brand : </Text> {replacement?.data.model.brand.name}
                                            </Text><Text>{`\n`}</Text>
                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >Model : </Text> {replacement?.data.model.name}
                                            </Text><Text>{`\n`}</Text>
                                            <Text className="font-extrabold mb-3 text-center text-gray-200 mt-3 text-2xl">Inventory Details</Text>
                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >Quantity #: </Text> {replacement?.data.inventory.quantity}
                                            </Text><Text>{`\n`}</Text>
                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >Unit Price : $</Text> {replacement?.data.inventory.unit_price}
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
                        deleteReplacementMutation .isLoading ? (
                            <ActivityIndicator size="large" style={{marginVertical:16}} color="white"/>
                        ):(
                            <View>
                                {deleteReplacementMutation.isError ? (
                                    deleteReplacementMutation.error.response.data.message ?  (
                                        <Messages message={`${deleteReplacementMutation.error.response.data?.message}`} level={'error'}/>
                                        ):(<Messages message={`Here was a problem processing Form : ${deleteReplacementMutation.error}`} level={'error'}/>)   
                                    ) 
                                : null}
                            </View>
                        )
                    }
                </View>
            </View>         
       </AuthenticateLayout>
    );
}