import { ScreenWrapper } from "@/components/ScreenWrapper";
import { COLORS } from "@/constants/Colors";
import { SCREEN } from "@/constants/Screen";
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
  const initialValues: ProfileFormValues = {
    name: "",
    id: "",
    community: "",
    prefinance: "",
    balance: "",
  };

  const handleSubmit = (
    values: ProfileFormValues,
    actions: FormikHelpers<ProfileFormValues>
  ) => {
    const prepared = {
      ...values,
      prefinance: values.prefinance ? parseFloat(values.prefinance) : null,
      balance: values.balance ? parseFloat(values.balance) : null,
    };

    console.log("Submitted:", prepared);
    actions.resetForm();
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
            <TextInput
              placeholder="Name"
              style={styles.input}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />

            {/* ID */}
            <TextInput
              placeholder="ID"
              style={styles.input}
              onChangeText={handleChange("id")}
              onBlur={handleBlur("id")}
              value={values.id}
            />

            {/* Community */}
            <TextInput
              placeholder="Community"
              style={styles.input}
              onChangeText={handleChange("community")}
              onBlur={handleBlur("community")}
              value={values.community}
            />

            {/* Prefinance */}
            <TextInput
              placeholder="Prefinance"
              style={styles.input}
              keyboardType="numeric"
              onChangeText={handleChange("prefinance")}
              onBlur={handleBlur("prefinance")}
              value={values.prefinance}
            />

            {/* Balance */}
            <TextInput
              placeholder="Balance"
              style={styles.input}
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
                Create
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
    marginTop: 50,
    padding: 20,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    padding: 12,
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
});

export default CreateProfileForm;
