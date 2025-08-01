import { ScreenWrapper } from "@/components/ScreenWrapper";
import { COLORS } from "@/constants/Colors";
import { SCREEN } from "@/constants/Screen";
import { updateFarmer } from "@/db/crud";
import { router, useLocalSearchParams } from "expo-router";
import { Formik, FormikHelpers } from "formik";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";

interface ProfileFormValues {
  name: string;
  id: string;
  community: string;
  prefinance: string;
  balance: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  id: Yup.string().required("ID is required"),
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
  const { id, name, community, preFinance, ballance } = useLocalSearchParams();
  const data = {
    id: String(id),
    name: String(name),
    community: String(community),
    preFinance: String(preFinance),
    ballance: String(ballance),
  };

  const initialValues: ProfileFormValues = {
    id: data.id,
    name: data.name,
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

    console.log("Submitted:", prepared);
    await updateFarmer(data.id, prepared);
    actions.resetForm();
    router.push("/(tabs)/(admin)/list");
  };

  const renderError = (touched?: boolean, error?: string) => {
    return touched && error ? <Text style={styles.error}>{error}</Text> : null;
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
          <View style={styles.container}>
            {/* Name */}
            <Text style={[styles.label, { fontFamily: "Poppins" }]}>Name</Text>
            <TextInput
              placeholder="Name"
              style={[styles.input, { fontFamily: "Poppins" }]}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />

            {/* ID */}
            <Text style={[styles.label, { fontFamily: "Poppins" }]}>
              ID Number
            </Text>
            <TextInput
              placeholder="ID"
              style={[styles.input, { fontFamily: "Poppins" }]}
              onChangeText={handleChange("id")}
              onBlur={handleBlur("id")}
              value={values.id}
            />

            {/* Community */}
            <Text style={[styles.label, { fontFamily: "Poppins" }]}>
              Community
            </Text>
            <TextInput
              placeholder="Community"
              style={[styles.input, { fontFamily: "Poppins" }]}
              onChangeText={handleChange("community")}
              onBlur={handleBlur("community")}
              value={values.community}
            />

            {/* Prefinance */}
            <Text style={[styles.label, { fontFamily: "Poppins" }]}>
              Pre-Finance Amount
            </Text>
            <TextInput
              placeholder="Prefinance"
              style={[styles.input, { fontFamily: "Poppins" }]}
              keyboardType="numeric"
              onChangeText={handleChange("prefinance")}
              onBlur={handleBlur("prefinance")}
              value={values.prefinance}
            />

            {/* Balance */}
            <Text style={[styles.label, { fontFamily: "Poppins" }]}>
              Balance
            </Text>
            <TextInput
              placeholder="Balance"
              style={[styles.input, { fontFamily: "Poppins" }]}
              keyboardType="numeric"
              onChangeText={handleChange("balance")}
              onBlur={handleBlur("balance")}
              value={values.balance}
            />

            {/* Submit */}

            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: COLORS.green.deep,
                },
              ]}
              activeOpacity={0.7}
              onPress={() => handleSubmit()}
              disabled={!isValid || !dirty}
            >
              <Text
                style={[styles.buttonText, { fontFamily: "PoppinsSemiBold" }]}
              >
                Update
              </Text>
            </TouchableOpacity>
          </View>
        </ScreenWrapper>
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
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
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
    color: COLORS.gray.deep,
  },
});

export default CreateProfileForm;
