import { View, Text, FlatList, ActivityIndicator , TextInput, Pressable} from "react-native"
import { AuthenticateLayout } from '../../layouts/AuthenticateLayout';
import { useState, useEffect, useCallback } from "react";
import {Card} from '../../components/Card';
import { TxtInput } from "../../components/TxtInput";
import { PrimaryButton } from "../../components/PrimaryButton";
import { Messages } from "../../components/Messages";
import { Ionicons, createIconSetFromFontello } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import { filter, includes } from "lodash";
import { fetchBrands } from "../../hooks/BrandApi";
import { QueryCache, QueryClient, useQuery } from "react-query";
import {useInfiniteQuery} from "react-query";
let loadMore = true;
export const BrandsList = ({navigation}) => {
    const [page, setPage] = useState(1)   
    const [filterBrands,setFilterBrands] = useState(brands?.data);
    const [brands,setBrands] = useState([]);
    const [search, setSearch] = useState('');
    //const [showLoader,SetShowLoader] = useState(false);

    const { data, isLoading, isError, isFetching, error } = useQuery({
        queryKey: ['brands',page], 
        queryFn: () => fetchBrands(page), 
        onSuccess:(data) => {
           /*  if(data.links.next === null){
                loadMore = false
            } */
            console.log(data?.meta?.current_page);
            if(data?.meta?.current_page === 1){
                setBrands(data?.data);
            }else{
                setBrands([...brands, ...data?.data]);
            }
            //console.log(brands);
        },
        keepPreviousData:true,
        refetchOnWindowFocus:false
    });
    
    useEffect(() =>{
        console.log('useEffect value',brands);
        console.log(isFetching)
    },[brands]);

    const renderItem = useCallback(({ item:brand }) => {
        return (
            <Card>
                <View className="flex flex-row py-2" >
                    <View className="">
                        <FontAwesome name="ticket" size={30} color="white" />
                    </View>
                    <View className="grow">
                        <View className="ml-4" >
                            <Text className="text-gray-200 text-md font-bold ">{brand.name}</Text>
                        </View>
                    </View>
                    <View className="">
                        <Pressable onPress={() => navigation.navigate('DetailBrand', { id:brand.id })}>
                            <MaterialIcons name="arrow-forward-ios" size={30} color="white" />
                        </Pressable>
                    </View>
                </View>
                
            </Card>
        )
    },[]);
    /* const onEndReachedBrands= () => {
        if(loadMore){
            setPage(page + 1)
            return (
                <View className="mt-2">
                    <PrimaryButton message={'load more'} onPress={() =>  setPage(page + 1)}></PrimaryButton>
                </View>
            )
        }
    }  */
    const ListFooterComponentBrands = () => {
        if(data?.links?.next != null){
            return (
                <View className="mt-2">
                    <PrimaryButton message={'load more'} onPress={ () =>  setPage(page + 1) }></PrimaryButton>
                </View>
            )        
        }
    };
    const handleSearch = (text) => {
        setSearch(text.toLowerCase());
        const textSearch = text.toLowerCase();
        if(text.trim().length !== 0 ){
            let filteredData = brands.filter((brand) => {
                const lowerName = brand.name.toLowerCase();

                return (
                    lowerName.includes(textSearch.trim())
                );
            });
            setFilterBrands(filteredData);
        }else{
            setFilterBrands(brands);
        }
    }

    return (
        <AuthenticateLayout>
            <View className="flex-1 items-center justify-center">
                <View className="w-full max-w-sm">
                    <View className="flex flex-row justify-between">
                        <Text className="font-bold mb-6 text-gray-200 mt-5" style={{fontSize:34}}>Brands</Text>
                        <View className="justify-end mt-5 mb-6">
                            <PrimaryButton onPress={() => navigation.navigate('CreateEditBrand',{id:'' ,name:''})} message="+ Brand"/>
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
                            <Messages message={`Here was a problem processing Brands : ${error.message}`} level={'error'}/>
                           
                        ) : brands ? (
                            <FlatList
                                data={search.length ==0 ? brands : filterBrands}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id.toString()}
                                ListFooterComponent={ListFooterComponentBrands}
                                style={{flex: 1}}
                            /> 
                        ): (
                            <Messages message={'No data of Brands in our records ...'} level={'info'}/>
                        )
                    }
                </View>
            </View>
        </AuthenticateLayout>
    ); 
}

