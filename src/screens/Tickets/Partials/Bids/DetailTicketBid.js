import { View, Text, Image, ActivityIndicator} from 'react-native';
import { AuthenticateLayout } from '../../../../layouts/AuthenticateLayout';

import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PrimaryButton } from '../../../../components/PrimaryButton';
import { DangerButton } from '../../../../components/DangerButton';
import { MaterialIcons } from '@expo/vector-icons';

import { Messages } from '../../../../components/Messages';
import { Card } from '../../../../components/Card';
import { Header } from '../../../../components/Header';
import { getTicketBid, deleteTicketBid } from '../../../../hooks/BidsApi';
import { BidDetailList } from './BidDetailList';

export const DetailTicketBid = ({navigation,route}) => {
    const { data:bid, isLoading, isError, error, isFetching ,isSuccess} = getTicketBid(route.params.id);

    const deleteBidMutation = deleteTicketBid();

    const handleBidDelete = async() => {
        if (confirm('You want to delete this Ticket Bid ??? ..')) {
            await deleteBidMutation.mutateAsync(bid?.data);
        }
    }
    return (
        <AuthenticateLayout >
            <Header navigation={navigation}/>
            <View className="flex-none w-full max-w-sm">
                {
                    deleteBidMutation.isLoading ? (
                        <ActivityIndicator size="large" style={{marginVertical:16}} color="white"/>
                    ):(
                        <View>
                                {deleteBidMutation.isError ? (
                                deleteBidMutation.error.response.data.message ? (<Messages message={`${deleteBidMutation.error.response.data.message}`} level={'error'}/>)
                                : (<Messages message={`Here was a problem processing Form : ${deleteBidMutation.error}`} level={'error'}/>)
                            ) : null}
                        </View>
                    )
                }
            </View>
            <View className="flex flex-1 flex-col justify-center items-center" >
                {
                    isLoading || isFetching ? (
                        <ActivityIndicator size="large" style={{marginVertical:16}} color="white"/>
                    ): (
                        <>
                            {isError ? (
                                <View>
                                    <MaterialIcons name="error-outline" size={60} color="white" />
                                    <Messages message={`Here was a problem processing Bid : ${error.message}`} level={'error'}/>
                                </View>
                            ):null}

                            { isSuccess ? (
                                <>
                                    <View className="flex-none w-full max-w-sm" >
                                        <Card>
                                            <View className="flex flex-row justify-between">
                                                <View className="py-2">
                                                    <MaterialCommunityIcons name="offer" size={60} color="#F1F6F5" />
                                                </View>
                                                <View>
                                                    <View>
                                                        <PrimaryButton message='Edit' onPress={() => navigation.navigate('CreateEditTicketBid',{
                                                                id: bid?.data.id,
                                                                ticket_id: route.params.ticket_id,
                                                                bid_status_id: bid?.data.status.id,
                                                                timespan: bid?.data.timespan,
                                                                details: bid?.data.details,
                                                            })
                                                        }/>
                                                    </View>
                                                    <View className="mt-2">
                                                        <DangerButton message="Delete" onPress={() => handleBidDelete()} />
                                                    </View>
                                                </View>
                                            </View>
                                        </Card>
                                    </View>

                                    <View className="w-full max-w-sm">
                                        <Card>
                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >Status: </Text> {bid?.data.status?.name}
                                            </Text><Text>{`\n`}</Text>
                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >Timespan: </Text> {bid?.data.timespan}
                                            </Text><Text>{`\n`}</Text>
                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >Budget: </Text> {bid?.data.budget}
                                            </Text><Text>{`\n`}</Text>
                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >Created at: </Text> {bid?.data.created_at}
                                            </Text><Text>{`\n`}</Text>
                                            <Text className="text-gray-200 text-lg text-center" > 
                                                <Text className="text-gray-200 text-lg font-bold" >Updated at: </Text> {bid?.data.updated_at}
                                            </Text><Text>{`\n`}</Text>
                                        </Card>
                                    </View>
                                    <View className="w-full max-w-sm">
                                        <BidDetailList
                                            details={bid?.data.details}
                                        />
                                    </View>
                                </>   
                            ) : null}
                        </>
                    )
                }
            </View>
       </AuthenticateLayout>
    )
}