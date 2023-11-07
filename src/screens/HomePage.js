import {Pressable, Text, View, FlatList} from 'react-native';
import { useState,useCallback } from 'react';
import {AuthenticateLayout} from '../layouts/AuthenticateLayout';
import {Card} from '../components/Card';
import {useNavigation} from '@react-navigation/native';
import {getAuthToken} from '../context/AuthContext';
import { TxtInput } from '../components/TxtInput';
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export const HomePage = () => {
    const navigation = useNavigation();
   /*  const tok = async() => {
        
        return await getAuthToken();
    }
    console.log(tok()); */
    const indexOptions  = [
        {icon: <Octicons name="tools" size={24} color="white" /> , name:'Replacements', route:'ReplacementsList'}, 
        {icon:<MaterialIcons name="store" size={24} color="white"/>, name:'Stores', route:'StoresList'}, 
        {icon:<AntDesign name="profile" size={24} color="white" /> ,name:'Brands', route:'BrandsList'}, 
        {icon:<Ionicons name="ios-receipt" size={24} color="white" />, name:'Tickets', route:'TicketsList'},
        {icon:<MaterialCommunityIcons name="garage" size={24} color="white" /> ,name:'Garages', route:'GarageList'},
    ];

    const [search, setSearch] = useState("");
    const [filterOptions, setFilterOptions] = useState(indexOptions);

    const handleSearch = (text) => {
        setSearch(text.toLowerCase());
        const textSearch = text.toLowerCase();
        if (text.trim().length !== 0) {
            let filteredData = indexOptions.filter((op) => {
                const lowerName = op.name.toLowerCase();
                return (
                    lowerName.includes(textSearch.trim())
                );
            });
            setFilterOptions(filteredData);
        } else {
            setFilterOptions(indexOptions);
        }
    };

    const renderItem = useCallback(({ item: option }) => {
        return (
            <Card>
                <View className="flex flex-row">
                    <View className="py-3">
                        {option.icon}
                    </View>
                    <View className="grow py-4">
                        <View className="ml-4">
                            <Pressable onPress={() => (
                                 navigation.navigate(option.route),setSearch(""))}
                            > 
                                <Text className="text-gray-200 text-md font-bold ">
                                    {option.name}
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Card>
        );
    }, []);

    return (
        <AuthenticateLayout>
            <View className="flex flex-1 flex-col justify-center items-center ">
                <View className="w-full max-w-sm">
                    <Text className="font-bold mb-6 text-gray-200 mt-5 text-3xl">Welcome Back !</Text>
                    {
                        indexOptions.length != 0 ? (
                            <TxtInput placeholder={'Search'} value={search} onChangeText={(text) => handleSearch(text)}/>
                        ):null
                    }
                    <FlatList horizontal={true}
                        data={search.length == 0 ? indexOptions : filterOptions}
                        renderItem={renderItem}
                        ItemSeparatorComponent={() => {return (<View className="ml-4"/>);}}
                        keyExtractor={(item, index) => index}
                        style={{ flex: 1 }}
                    />
                </View>
            </View>
        </AuthenticateLayout>
    ); 
}