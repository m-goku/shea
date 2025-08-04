import CreateButton from "@/components/ui/buttons/CreateButton";
import FormInput from "@/components/ui/textInputs/FormInput";
import { ScreenWrapper } from "@/components/ui/wrappers/ScreenWrapper";
import { createFarmer } from "@/db/crud";
import { router } from "expo-router";
import { Formik, FormikHelpers } from "formik";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Yup from "yup";

interface ProfileFormValues {
  name: string;
  nationalId: string;
  community: string;
  prefinance: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  nationalId: Yup.string().required("ID is required"),
  community: Yup.string().required("Community is required"),
  prefinance: Yup.number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .typeError("Prefinance must be a number"),
  balance: Yup.number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .typeError("Balance must be a number"),
});

const CreateProfileForm: React.FC = () => {
  const initialValues: ProfileFormValues = {
    name: "",
    nationalId: "",
    community: "",
    prefinance: "",
  };

  const handleSubmit = async (
    values: ProfileFormValues,
    actions: FormikHelpers<ProfileFormValues>
  ) => {
    const prepared = {
      ...values,
      prefinance: values.prefinance ? parseFloat(values.prefinance) : 0,
    };

    // console.log("Submitted:", prepared);
    await createFarmer(prepared);

    actions.resetForm();
    router.navigate("/(tabs)/(admin)");
    router.navigate("/(tabs)/(home)");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnMount
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
        dirty,
      }) => (
        <ScreenWrapper>
          <View style={styles.title}>
            <Text allowFontScaling={false} style={styles.titleText}>
              Add Data
            </Text>
          </View>
          <View style={styles.container}>
            {/* Name */}
            <FormInput
              label="Name"
              onBlur={handleBlur("name")}
              onChangeText={handleChange("name")}
              value={values.name}
            />

            {/* ID */}
            <FormInput
              label="ID Number"
              onBlur={handleBlur("nationalId")}
              onChangeText={handleChange("nationalId")}
              value={values.nationalId}
            />

            {/* Community */}
            <FormInput
              label="Community"
              onBlur={handleBlur("community")}
              onChangeText={handleChange("community")}
              value={values.community}
            />

            {/* Prefinance */}

            <FormInput
              numeric
              label=" Pre-Finance Amount"
              onBlur={handleBlur("prefinance")}
              onChangeText={handleChange("prefinance")}
              value={values.prefinance}
            />

            <CreateButton
              name="Add "
              dirty={dirty}
              isValid={isValid}
              onPress={() => handleSubmit()}
            />
          </View>
        </ScreenWrapper>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 30,
    padding: 20,
    gap: 10,
  },
  title: {
    padding: 20,
    marginTop: 30,
  },
  titleText: {
    fontSize: 25,
  },
});

export default CreateProfileForm;
