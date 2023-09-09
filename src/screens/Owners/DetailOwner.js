import { View, Text,Image} from 'react-native';
import { AuthenticateLayout } from '../../layouts/AuthenticateLayout';
import { Feather } from '@expo/vector-icons';
import { PrimaryButton } from '../../components/PrimaryButton';
import {SecondaryButton }from '../../components/SecondaryButton'
import { Card } from '../../components/Card';
import { Header } from '../../components/Header';

export const DetailOwner = ({navigation}) => {

    return (
        <AuthenticateLayout>
            <Header navigation={navigation}/>
            <View className="flex flex-1 flex-col justify-center items-center" >
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
                                    <SecondaryButton message="Add Car" />
                               </View>
                            </View>
                        </View>
                    </Card>
               </View>
                <View className="w-full max-w-sm">
                    <Card >
                        <Text className="text-gray-200 text-lg font-bold text-center" >Owner.Name, Owner Lastname</Text><Text>{`\n`}</Text>
                        <Text className="text-gray-200 text-lg text-center">Owner.Email</Text><Text>{`\n`}</Text>

                        <Text className="text-gray-200 text-lg text-center" > 
                            <Text className="text-gray-200 text-lg font-bold" >Phone: </Text> Owner.Phone
                        </Text><Text>{`\n`}</Text>
                        <Text className="text-gray-200 text-lg text-center" > 
                            <Text className="text-gray-200 text-lg font-bold" >District: </Text> Owner.District
                        </Text><Text>{`\n`}</Text>
                    </Card>
                </View>
                <View className="flex-none w-full max-w-sm">
                    <Card>
                        <Text className="text-gray-200 text-lg font-extrabold " >Cars</Text>
                    </Card>
                </View>
                
            </View>
          
       </AuthenticateLayout>
    ) 
}
