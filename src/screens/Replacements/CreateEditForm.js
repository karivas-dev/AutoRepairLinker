import { View, Text, ActivityIndicator } from 'react-native';
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormikInput } from "../../components/FormikInput";
import  {getBrand}  from "../../hooks/ReplacementApi";
import { set } from "lodash";
import { AuthenticateLayout } from "../../layouts/AuthenticateLayout";
import { PrimaryButton } from '../../components/PrimaryButton';
import { SelectInput } from '../../components/SelectInput';
import {Header} from '../../components/Header';
import { createEditReplacement } from '../../hooks/ReplacementApi';


const CreateEditForm = ({ navigation , route }) => {
    return(
        <View>
            <Text>
                hola
            </Text>
        </View>
    );

}

export { CreateEditForm}