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

export const CreateEditReplacement = ({ navigation, route }) => {
  const formik = useFormik({
    initialValues: {
      id: route.params.id ?? "",
      brand_id: route.params.brand_id ?? "",
      name: route.params.name ?? "",
      description: route.params.description ?? "",
      model: route.params.model ?? "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      brand_id: Yup.number().required(),
      model: Yup.number().required(),
    }),
    onSubmit: async (replacement) =>
      await createEditAttempt.mutateAsync(replacement),
  });
  const createEditAttempt = createEditReplacement(
    formik.setErrors,
    formik.values
  );

  const [selectedBrand, setSelectedBrand] = useState({ brand_id: 0 });
  const brand = getBrand();

  const firstTime = useRef(true);
  
  useEffect(() => {
    const brand_id = formik.values.brand_id;
    if (brand_id != "" && brand) {
      const model = brand?.find((b) => b.id == formik.values.brand_id).model;
      setSelectedBrand({
        ...selectedBrand,
        brand_id: brand?.model.find((m) => m.id == formik.values.model)
          .brand_id,
        model: model,
      });
      formik.setFieldValue("brand_id", brand_id);
    }
  }, [brand]);

  return (
    <AuthenticateLayout>
      <Header navigation={navigation} />

      <View className="flex-1 items-center justify-center p-8">
        <View className="w-full p-8 max-w-sm">
          <Text className="text-lg font-extrabold text-gray-200 text-center mb-2">
            {formik.values.id == ""
              ? "Add new Replacement"
              : "Update a Replacement"}
          </Text>
          <FormikInput valueName="name" formik={formik} placeholder="Name" />
          <FormikInput
            valueName="description"
            formik={formik}
            placeholder="Description"
          />
          <FormikInput valueName="model" formik={formik} placeholder="Model" />
          <FormikInput valueName="brand" formik={formik} placeholder="Brand" />

          {brand == null ? null : ( <>
                        <SelectInput selectedValue={selectedBrand.brand} onValueChange={(brand) => setSelectedBrand({brand: id})}
                                     DefaultPlaceholder="Selecciona Departamento" data={brand?.brand}/>
                        <SelectInput selectedValue={selectedBrand.brand_id}
                                     onValueChange={(id) => {setSelectedBrand({...selectedBrand, model: brand_id}); formik.setFieldValue('model', '');}}
                                     DefaultPlaceholder="Selecciona Municipio" data={brand?.model.filter(m => m.model == selectedBrand.model)}/>
                          <Text className="text-red-500 capitalize-first">
                            { formik.touched.model && formik.errors.model }
                        </Text>
                    </>)}



          <View className="block w-full mt-2">
            {formik.isSubmitting ? (
              <ActivityIndicator
                size="large"
                style={{ marginVertical: 16 }}
                color="white"
              />
            ) : (
              <PrimaryButton
                onPress={formik.handleSubmit}
                message={
                  formik.values.id == ""
                    ? "Store Replacement"
                    : "Edit Replacement"
                }
              />
            )}
          </View>
        </View>
      </View>
    </AuthenticateLayout>
  );
}
