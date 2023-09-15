import { View, Text, TextInput, Pressable, Image, TouchableOpacity  } from 'react-native';
import { AuthenticateLayout } from '../layouts/AuthenticateLayout';
import { Card } from '../components/Card';
import { useAuth } from '../context/AuthContext';


export const HomePage = ({navigation}) => {
    const { getToken } = useAuth();
    console.log(getToken());

    return (
        <AuthenticateLayout>
            <View className="flex flex-1 flex-col justify-center items-center ">
                <View className="block w-full mb-4">
                    <Card>
                        <View className="flex flex-row justify-between">
                            <View className="py-2">
                                <TouchableOpacity onPress={() => navigation.navigate('FormOwner')} >
                                    <Text className="text-gray-200 text-lg font-bold text-center" >
                                        ForOwner
                                    </Text>

                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => navigation.navigate('DetailOwner')} >
                                    <Text className="text-gray-200 text-lg font-bold text-center" >
                                        DetailOwner
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Card>
                </View>
            </View>
        
        </AuthenticateLayout>
       /*<FormUser />*/
    ) 
}