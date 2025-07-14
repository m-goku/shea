import { COLORS } from "@/constants/Colors";
import { SCREEN } from "@/constants/Screen";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import CompleteModal from "./CompleteModal";

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
      <CompleteModal visible={modal} />
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
        style={styles.button}
        activeOpacity={0.7}
        onPress={() => setModal(true)}
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
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
  },
  button: {
    width: SCREEN.width * 0.9,
    height: SCREEN.height * 0.07,
    backgroundColor: COLORS.green.deep,
    borderRadius: 10,
    marginTop: 10,
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
});
