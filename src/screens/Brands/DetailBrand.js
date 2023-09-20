import { View, Text, Image, ActivityIndicator} from 'react-native';
import { AuthenticateLayout } from '../../layouts/AuthenticateLayout';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { PrimaryButton } from '../../components/PrimaryButton';
import {SecondaryButton }from '../../components/SecondaryButton'

import { Messages } from '../../components/Messages';
import { Card } from '../../components/Card';
import { Header } from '../../components/Header';
import { fetchOneBrand } from '../../hooks/BrandApi';
import { useQuery } from 'react-query';

export const DetailBrand = ({navigation, route}) => {
    
    const { id } = route.params;
    console.log(id);
    
    const { data:brand, isLoading, isError, error,isFetching } = useQuery({
        queryKey: ['brand'], 
        queryFn: () => fetchOneBrand(id), 
        onSuccess:(data,context) => {
            console.log(data);
            //console.log(brands);
        },
        onError : (error) => {
            console.log(error);
        },
        refetchOnWindowFocus:false
    });
    console.log(isFetching);
    console.log(isLoading);
    return (
        <AuthenticateLayout>
            <Header navigation={navigation}/>
            <View className="flex flex-1 flex-col justify-center items-center" >
               <View className="flex-none w-full max-w-sm" >
                    <Card>
                        <View className="flex flex-row justify-between">
                            <View className="py-2">
                                <FontAwesome name="th-list" size={62} color="white" />
                            </View>
                            <View>
                                {
                                    isLoading || isFetching ? (
                                        <ActivityIndicator size="large" style={{marginVertical:16}} color="white"/>
                                    ) : isError ? (
                                        <MaterialIcons name="error-outline" size={24} color="white" />
                                    ):(
                                        <View>
                                            <PrimaryButton message='Edit' onPress={() => navigation.navigate('CreateEditBrand', { id: id , name: brand?.data.name})}/>
                                            <View className="mt-4">
                                                <Text className="text-gray-200 text-lg font-bold text-center" >{brand?.data.name}</Text>
                                            </View>
                                        </View>
                                    )
                                }
                            </View>
                        </View>
                    </Card>
               </View>
                <View className="w-full max-w-sm">
                    {
                        isError ? (
                            <Messages message={`Here was a problem processing Brands : ${error.message}`} level={'error'}/>
                        ):null
                    }     
                </View>
            </View>
          
       </AuthenticateLayout>
    ) 
}
