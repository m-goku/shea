import { COLORS } from "@/constants/Colors";
import { SCREEN } from "@/constants/Screen";
import { updateFarmer } from "@/db/crud";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AlertModal } from "../AlertModal";

function List({ label, value }: { label: string; value: any }) {
  return (
    <View style={styles.list}>
      <Text style={[styles.label, { fontFamily: "Poppins" }]}>{label}</Text>
      <Text
        style={[
          styles.value,
          {
            color: label == "Balance (GH₵):" ? "red" : "black",
            fontFamily: "PoppinsSemiBold",
          },
        ]}
      >
        {value}{" "}
      </Text>
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
  id: string;
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
  const [payable, setPayable] = useState(0);

  const handleChange = (value: string) => {
    setInput(value);

    const number = parseFloat(value);
    if (!isNaN(number)) {
      setTotal(number * 20); // Replace this with your calculation
    } else {
      setTotal(0);
    }
  };

  async function handleComplete() {
    const update = {
      name: name,
      community: community,
      prefinance: preFinance,
      balance: ballance >= total ? ballance - total : 0,
    };

    await updateFarmer(id, update);

    router.replace({
      pathname: "/(tabs)/(home)/receipt",
      params: {
        id: id,
        kilograms: input,
        total: total,
        payable: ballance < total ? total - ballance : 0,
      },
    });
  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <View style={styles.nameView}>
            <Text style={[styles.name, { fontFamily: "PoppinsSemiBold" }]}>
              {name}
            </Text>
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
          <Text style={[styles.label, { fontFamily: "Poppins" }]}>
            Total Cost (GH₵):
          </Text>
          <Text style={[styles.value, { fontFamily: "PoppinsSemiBold" }]}>
            {total}
          </Text>
        </View>
        <View style={[styles.kg, { marginTop: 20 }]}>
          <Text style={[styles.label, { fontFamily: "Poppins" }]}>
            Weight (Kg):
          </Text>
          <View style={styles.inputView}>
            <TextInput
              style={[styles.input, { fontFamily: "PoppinsSemiBold" }]}
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
        onPress={() => {
          AlertModal({
            title: "Complete Transaction?",
            message: "Do you want to complete this Transaction?",
            onYes: () => handleComplete(),
            onNo: () => {},
          });
        }}
        disabled={total <= 0}
      >
        <Text style={[styles.buttonText, { fontFamily: "PoppinsSemiBold" }]}>
          Complete
        </Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN.width * 0.9,
    height: SCREEN.height * 0.4,
    backgroundColor: COLORS.green.extraLight,
    borderRadius: 10,
    marginTop: 50,
    elevation: 1,
  },
  container2: {
    width: SCREEN.width * 0.9,
    height: SCREEN.height * 0.2,
    backgroundColor: COLORS.orange.extraLight,
    borderRadius: 10,
    marginTop: 10,
    elevation: 1,
    padding: 25,
  },

  list: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  label: {
    fontSize: 20,
    color: "black",
  },
  value: {
    fontSize: 23,
    color: "black",
  },
  name: {
    fontSize: 25,
    color: "black",
  },
  detailsContainer: {
    padding: 20,
  },
  nameView: {
    backgroundColor: COLORS.green.light,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.gray.extraDeep,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
  button: {
    width: SCREEN.width * 0.9,
    height: SCREEN.height * 0.06,
    borderRadius: 25,
    marginTop: 10,
    elevation: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  modalButton: {
    width: SCREEN.width * 0.6,
    height: SCREEN.height * 0.06,
    backgroundColor: COLORS.green.deep,
    borderRadius: 25,
    marginTop: 50,
    elevation: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 50,
    width: 130,
    backgroundColor: COLORS.gray.extraLight,
    fontSize: 25,
    marginLeft: 10,
    borderRadius: 10,
    color: "black",
  },
  inputView: {
    height: 60,
    width: 150,
    backgroundColor: COLORS.gray.extraLight,
    marginLeft: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
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
