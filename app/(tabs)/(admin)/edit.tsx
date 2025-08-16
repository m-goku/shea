import Header from "@/components/Header";
import CreateButton from "@/components/ui/buttons/CreateButton";
import FormInput from "@/components/ui/textInputs/FormInput";
import { ScreenWrapper } from "@/components/ui/wrappers/ScreenWrapper";
import { COLORS } from "@/constants/Colors";
import { SCREEN } from "@/constants/Screen";
import { updateFarmer } from "@/db/crud";
import { router, useLocalSearchParams } from "expo-router";
import { Formik, FormikHelpers } from "formik";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import * as Yup from "yup";

interface ProfileFormValues {
  id: string;
  name: string;
  nationalId: string;
  community: string;
  prefinance: string;
  balance: string;
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
  const { id, name, community, preFinance, ballance, nationalId } =
    useLocalSearchParams();
  const data = {
    id: String(id),
    nationalId: String(nationalId),
    name: String(name),
    community: String(community),
    preFinance: String(preFinance),
    ballance: String(ballance),
  };

  const initialValues: ProfileFormValues = {
    id: data.id,
    name: data.name,
    nationalId: data.nationalId,
    community: data.community,
    prefinance: data.preFinance,
    balance: data.ballance,
  };

  const handleSubmit = async (
    values: ProfileFormValues,
    actions: FormikHelpers<ProfileFormValues>
  ) => {
    const prepared = {
      ...values,
      prefinance: values.prefinance ? parseFloat(values.prefinance) : 0,
      balance: values.balance ? parseFloat(values.balance) : 0,
    };

    await updateFarmer(data.id, prepared);

    Alert.alert("Updated", "Data Updated Successfully ", [
      {
        text: "OK",
        onPress: () => {
          actions.resetForm();
          router.push("/(tabs)/(admin)/list");
        },
      },
    ]);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnMount
    >
      {({ handleChange, handleBlur, handleSubmit, values, isValid, dirty }) => (
        <>
          <Header allowBack title="Edit Data" />
          <ScreenWrapper>
            {/* <View style={styles.title}>
            <Text style={styles.titleText}>Add Data</Text>
          </View> */}
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

              {/* Balance */}
              <FormInput
                numeric
                label=" Current Balance"
                onBlur={handleBlur("balance")}
                onChangeText={handleChange("balance")}
                value={values.balance}
              />

              {/* Submit */}
              <CreateButton
                name="Update"
                dirty={dirty}
                isValid={isValid}
                onPress={() => handleSubmit()}
              />
            </View>
          </ScreenWrapper>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
    gap: 10,
  },
  title: {
    padding: 20,
  },
  titleText: {
    fontSize: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.green.dark,
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: 14,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
  button: {
    width: SCREEN.width * 0.85,
    height: SCREEN.height * 0.05,
    borderRadius: 25,
    marginTop: 10,
    elevation: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: COLORS.green.dark,
  },
});

export default CreateProfileForm;
