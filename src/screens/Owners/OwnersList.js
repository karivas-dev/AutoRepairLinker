import { View,Text,FlatList,TouchableOpacity,ActivityIndicator ,TextInput} from "react-native"
import { AuthenticateLayout } from '../../layouts/AuthenticateLayout';
import { useState, useEffect, useCallback } from "react";
import {Card} from '../../components/Card';
import { TxtInput } from "../../components/TxtInput";
import { PrimaryButton } from "../../components/PrimaryButton";
import { Messages } from "../../components/Messages";
import { Ionicons, createIconSetFromFontello } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { filter, includes } from "lodash";
import { getOwners } from "../../hooks/OwnerApi";
import { useQuery } from "react-query";

export const OwnersList = ({navigation}) => {

    const {isLoading,  data:owners, isError, error} = useQuery(['owners'], getOwners,{refetchOnWindowFocus: false,});
    //const {owners, isLoading,isError,error} = GetAllOwners();
    const [filterOwners,setFilterOwners] = useState(owners);
    //console.log(owners);
    //console.log(filterOwners);
    
    const [search, setSearch] = useState('');
    useEffect(() =>{
        console.log('useEffect value',filterOwners)
    },[search])
    const renderItem = useCallback(({item: owner}) => {
        return (
            <Card>
                <View className="flex flex-row py-2" >
                    <View className="">
                        <Ionicons name="person" size={30} color="white" />
                    </View>
                    <View className="grow">
                        <View className="ml-4" >
                            <Text className="text-gray-200 text-md font-bold ">{owner.FirstName} , {owner.LastName}</Text>
                            <Text className="text-gray-200 text-md ">{owner.email}</Text>
                        </View>
                    </View>
                    <View className="">
                        <TouchableOpacity onPress={() => navigation.navigate('DetailOwner')}>
                            <MaterialIcons name="arrow-forward-ios" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                
            </Card>
        )
    },[owners])

    const handleSearch = (text) => {
        setSearch(text.toLowerCase());
        const textSearch = text.toLowerCase();
        if(text.trim().length !== 0 ){
            let filteredData = owners.filter((owner) => {
                const lowerFirstName = owner.FirstName.toLowerCase();
                const lowerLastName = owner.LastName.toLowerCase();
                const lowerEmail = owner.email.toLowerCase();

                return (
                    lowerFirstName.includes(textSearch.trim()) ||
                    lowerLastName.includes(textSearch.trim()) ||
                    lowerEmail.includes(textSearch.trim())
                );
            });
            setFilterOwners(filteredData);
        }else{
            setFilterOwners(owners);
        }
    }
    const keyExtractorOwner = useCallback((item) => `${item.id}`);
    return (
        <AuthenticateLayout>
            <View className="flex-1 items-center justify-center">
                <View className="w-full max-w-sm">
                    <View className="flex flex-row justify-between">
                        <Text className="font-bold mb-6 text-gray-200 mt-5" style={{fontSize:34}}>Owners</Text>
                        <View className="justify-end mt-5 mb-6">
                            <PrimaryButton onPress={() => navigation.navigate('FormOwner')} message="+ Owner"/>
                        </View>
                    </View>
                    
                    {
                        isLoading ? (
                            <Text></Text>
                        ) : isError ? (
                            <MaterialIcons name="error-outline" size={24} color="white" />
                        ):(
                            <TextInput
                                className="w-full h-12 px-4 mb-4 bg-blueC-500  border-blueC-400 focus:border-grayC-500 focus:ring-grayC-500
                                rounded-lg shadow-sm p-2.5 text-gray-200"
                                placeholderTextColor="#E0E0E0"
                                placeholder={"Search"}
                                clearButtonMode="always"
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={search}
                                onChangeText={(text) => handleSearch(text)}
                            />
                        )
                    }
                </View>
                <View className="flex-1 w-full max-w-sm">
                    {
                        isLoading ? (
                            <ActivityIndicator size="large" style={{marginVertical:16}} color="white"/>
                        ): isError ? (
                            <Messages message={`here was a problem processing Owners : ${error.message}`} level={'error'}/>
                           
                        ) : owners ? (
                            <FlatList
                                data={search.length == 0 ? owners: filterOwners}
                                renderItem={renderItem}
                                keyExtractor={keyExtractorOwner}
                                style={{flex: 1}}
                            /> 
                        ) : (
                            <Messages message={'No data of Owners in our records ...'} level={'info'}/>
                        )
                    }
                </View>
            </View>
        </AuthenticateLayout>
    ); 
}