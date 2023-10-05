import {Pressable, Text, View} from 'react-native';
import {AuthenticateLayout} from '../layouts/AuthenticateLayout';
import {Card} from '../components/Card';
import {useNavigation} from '@react-navigation/native';
import {getAuthToken} from '../context/AuthContext';


export const HomePage = () => {
   
    const navigation = useNavigation();
    const tok = async() => {
        return await getAuthToken();
    }


    return (
        <AuthenticateLayout>
            <View className="flex flex-1 flex-col justify-center items-center ">
                <View className="block w-full mb-4">
                    <Card>
                        <View className="flex flex-row justify-between">
                            
                            <View className="py-2">

                                <Pressable onPress={() => navigation.navigate('ReplacementList')} >
                                    <Text className="text-gray-200 text-lg font-bold text-center" >
                                        Replacements
                                    </Text>
                                </Pressable>
                            </View>

                            <View  className="py-2">
                                <Pressable onPress={() => navigation.navigate('StoresList')} >
                                    <Text className="text-gray-200 text-lg font-bold text-center" >
                                       Store Index
                                    </Text>

                                </Pressable>
                            </View>
                        </View>
                    </Card>
                </View>
            </View>
        
        </AuthenticateLayout>
       /*<FormUser />*/
    ) 
}