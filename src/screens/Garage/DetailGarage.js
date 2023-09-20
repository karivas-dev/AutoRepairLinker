import { View, Text, Image } from 'react-native';
import { AuthenticateLayout } from '../../layouts/AuthenticateLayout';
import { Feather } from '@expo/vector-icons';
import { PrimaryButton } from '../../components/PrimaryButton';
import { SecondaryButton } from '../../components/SecondaryButton'
import { Card } from '../../components/Card';
import { Header } from '../../components/Header';
import { MaterialIcons } from '@expo/vector-icons';

export const DetailGarage = ({ navigation }) => {
    return (
        <AuthenticateLayout>
            <Header navigation={navigation} />
            <View className="flex flex-1 flex-col justify-center items-center">
                <View className="flex-none w-full max-w-sm">
                    <Card>
                        <View className="flex flex-row justify-between">
                            <View className="py-2">
                                <MaterialIcons name="build-circle" size={62} color="#F1F6F5" />
                            </View>
                            <View>
                                <View>
                                    <PrimaryButton message='Edit' />
                                </View>
                            </View>
                        </View>
                    </Card>
                </View>
                <View className="w-full max-w-sm">
                    <Card>
                        <Text className="text-gray-200 text-lg text-center" >
                            <Text className="text-gray-200 text-lg font-bold" >Name: </Text> Garage.Name
                        </Text><Text>{`\n`}</Text>
                        <Text className="text-gray-200 text-lg text-center" >
                            <Text className="text-gray-200 text-lg font-bold" >Email: </Text> Garage.Email
                        </Text><Text>{`\n`}</Text>
                        <Text className="text-gray-200 text-lg text-center" >
                            <Text className="text-gray-200 text-lg font-bold" >Phone: </Text> Garage.Phone
                        </Text><Text>{`\n`}</Text>
                        <Text className="text-gray-200 text-lg text-center" >
                            <Text className="text-gray-200 text-lg font-bold" >Branch Detail: </Text> Garage.Branch
                        </Text><Text>{`\n`}</Text>
                        <Text className="text-gray-200 text-lg text-center" >
                            <Text className="text-gray-200 text-lg font-bold" >District: </Text> Garage.District
                        </Text><Text>{`\n`}</Text>
                    </Card>
                </View>
            </View>
        </AuthenticateLayout>

    )

}