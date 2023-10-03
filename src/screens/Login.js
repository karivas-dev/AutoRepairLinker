import {ActivityIndicator, Image, Pressable, Text, View} from 'react-native';
import {GuestLayout} from '../layouts/GuestLayout';
import {PrimaryButton} from '../components/PrimaryButton';
import {TxtInput} from '../components/TxtInput'
import {userLoginAttempt} from '../hooks/AuthApi';
import {useFormik} from "formik";
import * as Yup from 'yup';
import {FormikInput} from "../components/FormikInput";

export const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required().email(),
            password: Yup.string().required(),
        }),
        onSubmit: async (user) => await loginAttempt.mutateAsync(user)
    });
    const loginAttempt = userLoginAttempt(formik.setErrors);

    return (
        <GuestLayout>
            <View className="items-center justify-center">
                <Image
                    className="w-32 h-32 rounded-full"
                    source={{
                        uri: 'https://static-00.iconduck.com/assets.00/patreon-icon-2048x2048-f80b89j2.png',
                    }}
                />
            </View>

            <Text className="text-5xl font-bold mb-6 text-gray-200 mt-5">Sign In</Text>
            {/* form */}
            <FormikInput valueName="email" formik={formik} placeholder="Enter your email" />
            <FormikInput valueName="password" formik={formik} placeholder="Enter your password" passEntry={true}/>

            <View className="flex flex-row justify-between items-center mt-3">
                <Pressable>
                    <Text
                        className="underline text-sm text-gray-200 hover:text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pinkC-400">
                        Reset Password
                    </Text>
                </Pressable>
            </View>

            <View className="flex flex-row justify-end mt-5">
                <PrimaryButton onPress={formik.handleSubmit} message='log in'/>
            </View>

            {formik.isSubmitting ? (
                <ActivityIndicator size="large" style={{marginVertical: 16}} color="white"/>
            ) : null}
        </GuestLayout>
    );
}