import React, { FC } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";

type SW = {
  children: any;
};

export const ScreenWrapper: FC<SW> = ({ children }) => {
  StatusBar.currentHeight;
  return (
    <>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <KeyboardAvoidingView>{children}</KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight as number + 40,
    margin: 10,
  },
});
