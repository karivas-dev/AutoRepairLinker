import { Picker } from '@react-native-picker/picker';
export const SelectInput = ({ data, DefaultPlaceholder }) => {

    return (
        <Picker
            className="w-full h-12 px-4 mb-4 bg-blueC-500  border-blueC-400 focus:border-grayC-500 focus:ring-grayC-500
           rounded-lg shadow-sm p-2.5 text-gray-200"
        >
            {DefaultPlaceholder && (
                <Picker.Item

                    label={DefaultPlaceholder}
                    value={null}
                />
            )}
            {
                data.map((object, index) => {
                    return (
                        <Picker.Item

                            key={index}
                            label={object.name}
                            value={object.id}

                        />
                    )
                })
            }

            {/* <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" /> */}
        </Picker>

    )

}