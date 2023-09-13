import { Text,Pressable } from "react-native";

export const DangerButton = ({message}) => {

    return (
        <Pressable 
            className="px-8 py-2.5 rounded-full 
            tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 text-center
            bg-red-800 hover:bg-red-600 active:bg-red-600 focus:bg-red-600 focus:ring-pinkC-400"
        >
           <Text className="font-extrabold text-sm text-gray-200 uppercase">{message}</Text>
        </Pressable>
    );
}