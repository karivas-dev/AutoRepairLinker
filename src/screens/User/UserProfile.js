import { View, Text,Image, ActivityIndicator} from 'react-native';
import { AuthenticateLayout } from '../../layouts/AuthenticateLayout';
import { Feather } from '@expo/vector-icons';
import { PrimaryButton } from '../../components/PrimaryButton';
import {SecondaryButton }from '../../components/SecondaryButton'
import {DangerButton} from '../../components/DangerButton';
import { Card } from '../../components/Card';
import { Header } from '../../components/Header';
import { Messages } from '../../components/Messages';

import { useMutation } from 'react-query';
import { logoutAttempt } from '../../hooks/AuthApi';

import { logout ,getAuthToken} from '../../context/AuthContext';

export const UserProfile = ({navigation}) => {

    const userLogOut = useMutation({
        mutationFn:logoutAttempt,

        onError: (error,variables,context) => {
            console.log(error);
        },
        onSuccess: (data, variables, context) => {
            logout();
            console.log(data);
            navigation.navigate('Login');
        },
        
    });

    const handleLogOut = async() => {
        if(confirm('You want to Log Out ??? ..')){
            await userLogOut.mutate();
        }
    }

    return (
        <AuthenticateLayout>
            <View className="flex flex-1 flex-col justify-center items-center" >
                {/* Log Out Handling */}
                <View className="w-full max-w-sm">
                    {   userLogOut.isLoading ? (
                            <ActivityIndicator size="large" style={{marginVertical:16}} color="white"/>
                        ) : (
                            <View>
                                {userLogOut.isError ? (
                                    <Messages message={`Here was a problem processing Logout : ${userLogOut.error}`} level={'error'}/>
                                ) : null}

                              {/*   {userLogOut.isSuccess ? navigation.navigate('Login') : null} */}
                            </View>
                        )
                    } 
                </View>
            
                <View className="flex-none w-full max-w-sm" >
                    <Card>
                        <View className="flex flex-row justify-between">
                            <View className="py-2">
                                <Feather name="user" size={62} color="#F1F6F5" />
                            </View>
                            <View>
                            <View>
                                <PrimaryButton message='Edit'/>
                            </View>
                            <View className="mt-2">
                                <DangerButton onPress={() => handleLogOut()} message="Log Out" />    
                            </View>
                            </View>
                        </View>
                    </Card>
                </View>
                <View className="w-full max-w-sm">
                    <Card >
                        <Text className="text-gray-200 text-lg font-bold text-center" >User.Name, User.Lastname</Text><Text>{`\n`}</Text>
                        <Text className="text-gray-200 text-lg text-center">User.Email</Text><Text>{`\n`}</Text>

                        <Text className="text-gray-200 text-lg text-center" > 
                            <Text className="text-gray-200 text-lg font-bold" >Phone: </Text> User.Phone
                        </Text><Text>{`\n`}</Text>
                        <Text className="text-gray-200 text-lg text-center" > 
                            <Text className="text-gray-200 text-lg font-bold" >District: </Text> User.District
                        </Text><Text>{`\n`}</Text>
                    </Card>
                </View>
                <View className="flex-none w-full max-w-sm">
                    <Card>
                        <Text className="text-gray-200 text-lg font-extrabold " >User.Area</Text>
                    </Card>
                </View>
            </View> 
        </AuthenticateLayout>
    )
}