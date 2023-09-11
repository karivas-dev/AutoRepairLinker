import { View,Text,FlatList,TouchableOpacity,ActivityIndicator ,TextInput} from "react-native"
import { AuthenticateLayout } from '../../layouts/AuthenticateLayout';
import { useState, useEffect, useCallback } from "react";
import {Card} from '../../components/Card';
import { TxtInput } from "../../components/TxtInput";
import { PrimaryButton } from "../../components/PrimaryButton";

import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { filter, includes } from "lodash";

let limit = 10;
let loadMore = true;

export const OwnersList = ({navigation}) => {

    const [owners, setOwners] = useState([]);
    const [search, setSearch] = useState('');

    const [skip, setSkip] = useState(0);
    const [showLoader, setShowLoader] = useState(false);
    useEffect( () => {
        fetchData();
    },[]);


    const fetchData =  () => {
        setShowLoader(true);
        let query = `?skip=${skip}&limit=${limit}&q=${search}`;
        fetch('https://dummyjson.com/users' + query)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            (res.users.length == 0 ? loadMore = false : loadMore = true);
            setOwners([...owners, ...res.users]);

            setSkip(skip + 10);
            setShowLoader(false);
        })
        .catch((error => {
            console.log('error raised, ',error)
        }));
    }

    const renderItem = useCallback(({item: owner}) => {
        return (
            <Card>
                <View className="flex flex-row py-2" >
                    <View className="">
                        <Ionicons name="person" size={30} color="white" />
                    </View>
                    <View className="grow">
                        <View className="ml-4" >
                            <Text className="text-gray-200 text-md font-bold ">{owner.firstName} , {owner.lastName}</Text>
                            <Text className="text-gray-200 text-md ">{owner.email}</Text>
                        </View>
                    </View>
                    <View className="">
                        <TouchableOpacity>
                            <MaterialIcons name="arrow-forward-ios" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                
            </Card>
        )
    },[owners])

    const keyExtractorOwner = useCallback((owner) => `${owner.id}`);
    const onEndReachedOwners = () => {
        if(loadMore){
            setShowLoader(true);
            fetchData();
        }
    }
    const ListFooterComponentOwners = useCallback(() => {
        return (
            <ActivityIndicator size="large" style={{marginVertical:16}} color="white"/>
        )
    },[]);

    
    const handleSearch = (query) => {
        setSearch(query);
        console.log(search);
        //setShowLoader(true);
        //fetchData();
    }

    return (
        //Por lo tanto, si la condición es true, el elemento que aparece inmediatamente después && aparecerá en la salida. 
        //Si es así false, React lo ignorará y lo omitirá.
        <AuthenticateLayout>
            <View className="flex-1 items-center justify-center">
                <View className="w-full max-w-sm">
                    <View className="flex flex-row justify-between">
                        <Text className="font-bold mb-6 text-gray-200 mt-5" style={{fontSize:34}}>Owners</Text>
                        <View className="justify-end mt-5 mb-6">
                            <PrimaryButton message="+ Owner"/>
                        </View>
                    </View>
                    <TextInput
                        className="w-full h-12 px-4 mb-4 bg-blueC-500  border-blueC-400 focus:border-grayC-500 focus:ring-grayC-500
                        rounded-lg shadow-sm p-2.5 text-gray-200"
                        placeholderTextColor="#E0E0E0"
                        placeholder={"Search"}
                        clearButtonMode="always"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={search}
                        onChangeText={(query) => handleSearch(query)}
                    />

                </View>

                <View className="flex-1 w-full max-w-sm">
                    <FlatList
                        data={owners}
                        renderItem={renderItem}
                        keyExtractor={keyExtractorOwner}
                        onEndReached={onEndReachedOwners}
                        ListFooterComponent={showLoader && ListFooterComponentOwners} 
                        style={{flex: 1}}
                    />
                </View>
            </View>
        </AuthenticateLayout>
    ); 

}



/* const handleSearch = (query) => {
        setSearch(query);
        const formattedQuery = query.toLowerCase();
        const filteredData = filter(owners, (owner) => {
            return contains(owner,formattedQuery)
        });
        setOwners(filteredData);
    }
    const contains = ({firstName,email},query) => {
        const {first, last} = firstName;
        if(first?.includes(query) || last?.includes(query) || email?.includes(query)){
            return true;
        }
        return false;
    } */