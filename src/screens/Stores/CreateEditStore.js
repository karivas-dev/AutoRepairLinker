import { View, Text, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';

import {Header} from '../../components/Header';

import { AuthenticateLayout } from '../../layouts/AuthenticateLayout';
import { Messages } from '../../components/Messages';
import { TxtInput } from '../../components/TxtInput';
import { SelectInput } from '../../components/SelectInput';

import { PrimaryButton } from '../../components/PrimaryButton';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {FormikInput} from "../../components/FormikInput";
import { createEditStore } from '../../hooks/StoreApi';

export const CreateEditStore = ({navigation, route}) => {

    const formik = useFormik({
        initialValues: {
            id: route.params.id ?? '',
            name: route.params.name ?? '',
            branch: {
                id: route.params.branch.id ?? '',
                email: route.params.branch.email ?? '',
                telephone: route.params.branch.telephone ?? '',
                main: route.params.branch.main ?? '',
                district_id: route.params.branch.district_id ?? '',
                branchable_id: route.params.branch.branchable_id ?? '',
                branchable_type: route.params.branch.branchable_type ?? "Store"
            }
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(),
            branch: {
                email: Yup.string().required().email(),
                telephone: Yup.string().required().matches("^(2|6|7|8)[0-9]{7}$"),
                main: Yup.bool().required(),
                district_id: Yup.number().required(),
                branchable_id: Yup.number().required(),
                branchable_type: Yup.string().required()
            }
        }),
        onSubmit: async (store) => await createEditAttempt.mutateAsync(store)
    });
     
    console.log(formik.values);

    const prueba = [
        {
            id: '1',
            name: 'Atiquizaya'
        },
        {
            id: '2',
            name: 'El Refugio'
        },
        {
            id: '3',
            name: 'San Lorenzo'
        },
    ]

    const tipo = [
        {
            id: '0',
            name: 'cuartel'
        },
        {
            id: '1',
            name: 'regular'
        }
    ]

    const createEditAttempt = createEditStore(formik.setErrors, formik.values);
    
    return (
        <AuthenticateLayout>
            
            <Header navigation={navigation}/>

            <View className="flex-1 items-center justify-center p-8">
                <View className="w-full p-8 max-w-sm">
                    
                    <Text className="text-lg font-extrabold text-gray-200 text-center mb-2">
                        { formik.values.id == '' ? 'Add new Store' : 'Update Store' }
                    </Text>

                    <FormikInput valueName="name" formik={formik} placeholder="Store name:" label={formik.values.id == '' ? null : 'Name: '}/>
                    <FormikInput valueName="branch.email" formik={formik} placeholder="Correo Eletrónico"/>
                    <FormikInput valueName="branch.telephone" formik={formik} placeholder="Teléfono"/>
                    <SelectInput selectedValue={formik.values.branch.district_id} onValueChange={formik.handleChange("branch.district_id")} data={prueba} />
                    <SelectInput selectedValue={formik.values.branch.main} onValueChange={formik.handleChange("branch.main")} data={tipo} />


                    {/*{location == null ? null : ( <>
                        <SelectInput selectedValue={selectedLocation.state_id} onValueChange={(id) => setSelectedLocation({state_id: id, town_id: 0})}
                                     DefaultPlaceholder="Selecciona Departamento" data={location?.states}/>
                        <SelectInput selectedValue={selectedLocation.town_id}
                                     onValueChange={(id) => {setSelectedLocation({...selectedLocation, town_id: id}); formik.setFieldValue('district_id', '');}}
                                     DefaultPlaceholder="Selecciona Municipio" data={location?.towns.filter(t => t.state_id == selectedLocation.state_id)}/>
                        <SelectInput selectedValue={formik.values.district_id} onValueChange={formik.handleChange('district_id')}
                                     DefaultPlaceholder="Selecciona Distrito" data={location?.districts.filter(d => d.town_id == selectedLocation.town_id)}/>
                        <Text className="text-red-500 capitalize-first">
                            { formik.touched.district_id && formik.errors.district_id }
                        </Text>
                    </>)}*/}

                    <View className="block w-full mt-2">
                    { formik.isSubmitting ? (
                        <ActivityIndicator size="large" style={{marginVertical:16}} color="white"/>
                    ) : (
                        <PrimaryButton onPress={formik.handleSubmit}  message={formik.values.id == '' ? 'Create Store' : 'Edit Store'}/>
                    )}
                    </View>
                </View>
            </View>
        </AuthenticateLayout>
       

    )

}