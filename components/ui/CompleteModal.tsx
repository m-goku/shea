import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

export default function CompleteModal({ visible }: { visible: boolean }) {
  return (
    <Modal visible={visible} style={styles.modal}>
      <View style={styles.modalView}>
        <Text>CompleteModal</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {},
  modalView: {},
});
