import React from "react";

import { AuthenticateLayout } from "../../layouts/AuthenticateLayout";

import { View,Text } from "react-native";

export const UserProfile = ({navigation}) => {

    return (
        
        <AuthenticateLayout>
            <View>
                <Text tw="text-gray-200">Perfil del usuario</Text>
            </View>
        </AuthenticateLayout>
    )
}