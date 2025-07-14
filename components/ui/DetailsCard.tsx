import { COLORS } from "@/constants/Colors";
import { SCREEN } from "@/constants/Screen";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

function List({ label, value }: { label: string; value: any }) {
  return (
    <View style={styles.list}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value} </Text>
    </View>
  );
}

export default function DetailsCard({
  id,
  name,
  community,
  preFinance,
  ballance,
}: {
  id: number;
  name: string;
  community: string;
  preFinance: number;
  ballance: number;
}) {
  const [input, setInput] = useState("");
  const [total, setTotal] = useState(0);
  const [accBallance, setAccBalance] = useState(ballance);
  const [pFinance, setPfinance] = useState(preFinance);
  const [modal, setModal] = useState(false);

  function CompleteModal({ isVisible }: { isVisible: boolean }) {
    return (
      <Modal
        visible={isVisible}
        style={styles.modal}
        transparent
        animationType="slide"
      >
        <View style={styles.modal}>
          <View style={styles.modalView}>
            <Entypo name="check" size={150} color={COLORS.green.extraDeep} />
            <TouchableOpacity
              style={styles.modalButton}
              activeOpacity={0.7}
              onPress={() => {
                setModal(false);
                router.replace({
                  pathname: "/(tabs)/(home)/receipt",
                  params: {
                    id: id,
                    name: name,
                    community: community,
                    preFinance: preFinance,
                    ballance: ballance,
                    total: total,
                  },
                });
              }}
            >
              <Text style={styles.buttonText}>View Receipt</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  const handleChange = (value: string) => {
    setInput(value);

    const number = parseFloat(value);
    if (!isNaN(number)) {
      setTotal(number * 20); // Replace this with your calculation
    } else {
      setTotal(0);
    }
  };
  return (
    <>
      <CompleteModal isVisible={modal} />
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <View style={styles.nameView}>
            <Text style={styles.name}>{name}</Text>
          </View>
          <List label="ID:" value={id} />
          {/* <List label="Name:" value={name} /> */}
          <List label="Community:" value={community} />
          <List label="Prefinance (GH₵):" value={pFinance} />
          <List label="Balance (GH₵):" value={accBallance} />
        </View>
      </View>

      <View style={styles.container2}>
        <View style={styles.kg}>
          <Text style={styles.label}>Total Cost (GH₵):</Text>
          <Text style={styles.value}>{total}</Text>
        </View>
        <View style={[styles.kg, { marginTop: 20 }]}>
          <Text style={styles.label}>Weight (Kg):</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={input}
              onChangeText={handleChange}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor:
              total <= 0 ? COLORS.green.light : COLORS.green.deep,
          },
        ]}
        activeOpacity={0.7}
        onPress={() => setModal(true)}
        disabled={total <= 0}
      >
        <Text style={styles.buttonText}>Complete</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN.width * 0.9,
    height: SCREEN.height * 0.4,
    backgroundColor: COLORS.gray.light,
    borderRadius: 10,
    marginTop: 50,
    elevation: 1,
  },
  container2: {
    width: SCREEN.width * 0.9,
    height: SCREEN.height * 0.2,
    backgroundColor: COLORS.gray.light,
    borderRadius: 10,
    marginTop: 10,
    elevation: 1,
    padding: 20,
  },

  list: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    color: COLORS.gray.extraDeep,
    fontWeight: "bold",
  },
  value: {
    fontSize: 35,
    fontWeight: "bold",
    color: COLORS.gray.extraDeep,
  },
  name: {
    fontSize: 35,
    fontWeight: "bold",
    color: COLORS.gray.extraDeep,
  },
  detailsContainer: {
    padding: 20,
  },
  nameView: {
    backgroundColor: COLORS.gray.extraLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.gray.extraDeep,
  },
  buttonText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  button: {
    width: SCREEN.width * 0.9,
    height: SCREEN.height * 0.06,
    borderRadius: 10,
    marginTop: 10,
    elevation: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  modalButton: {
    width: SCREEN.width * 0.6,
    height: SCREEN.height * 0.06,
    backgroundColor: COLORS.green.deep,
    borderRadius: 10,
    marginTop: 50,
    elevation: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 50,
    width: 150,
    backgroundColor: COLORS.gray.extraLight,
    fontSize: 30,
    marginLeft: 10,
    borderRadius: 10,
    fontWeight: "bold",
    color: COLORS.gray.extraDeep,
  },
  inputView: {
    height: 50,
    width: 150,
    backgroundColor: COLORS.gray.extraLight,
    marginLeft: 20,
    borderRadius: 10,
  },
  kg: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  modalView: {
    height: SCREEN.height * 0.35,
    width: SCREEN.width * 0.8,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
