import { COLORS } from "@/constants/Colors";
import { SCREEN } from "@/constants/Screen";
import { updateFarmer } from "@/db/crud";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AlertModal } from "../AlertModal";

import AsyncStorage from "@react-native-async-storage/async-storage";
import LargeButton from "./buttons/LargeButton";
import WeightInput from "./textInputs/WeightInput";
import LabelText from "./texts/LabelText";
import ValueText from "./texts/ValueText";

function List({ label, value }: { label: string; value: any }) {
  return (
    <View style={styles.list}>
      <LabelText label={label} />
      <ValueText label={label} value={value} />
    </View>
  );
}

export default function DetailsCard({
  id,
  name,
  nationalId,
  community,
  preFinance,
  ballance,
}: {
  id: string;
  name: string;
  nationalId: string;
  community: string;
  preFinance: number;
  ballance: number;
}) {
  const [input, setInput] = useState("");
  const [total, setTotal] = useState(0);
  const [price, setPrice] = useState(0);

  async function handleGet() {
    const num = await getNumber();

    if (!isNaN(num)) {
      setPrice(num);
    } else {
      setPrice(0);
    }
  }

  const STORAGE_KEY = "MY_NUMBER_VALUE";

  const getNumber = async (): Promise<number> => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      return value ? parseFloat(value) : 0;
    } catch (error) {
      console.error("Failed to get number:", error);
      return 0;
    }
  };

  useEffect(() => {
    handleGet();
  }, [price]);

  const handleChange = (value: string) => {
    setInput(value);

    const number = parseFloat(value);
    if (!isNaN(number)) {
      setTotal(number * price); // Replace this with your calculation
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
            <Text
              allowFontScaling={false}
              style={[styles.name, { fontFamily: "PoppinsSemiBold" }]}
            >
              {name.replace(/\s+/g, "  ").trim()}
            </Text>
          </View>
          <List label="User ID:" value={id} />
          <List label="National ID:" value={nationalId} />
          <List
            label="Community:"
            value={community.slice(0, 15).replace(/\s+/g, " ").trim()}
          />
          <List label="Prefinance (GH₵):" value={preFinance} />
          <List label="Balance (GH₵):" value={ballance} />
        </View>
      </View>

      <View style={styles.container2}>
        <View style={styles.kg}>
          <LabelText label="Total Cost (GH₵):" />
          <ValueText value={total} />
        </View>
        <View style={[styles.kg, { marginTop: 20 }]}>
          <LabelText label=" Weight (Kg):" />
          <WeightInput handleChange={handleChange} value={input} />
        </View>
      </View>
      <LargeButton
        name="Complete"
        prop={total}
        onPress={() => {
          AlertModal({
            title: "Complete Transaction?",
            message: "Do you want to complete this Transaction?",
            onYes: () => handleComplete(),
            onNo: () => {},
          });
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN.width * 0.9,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 20,
    elevation: 1,
    borderWidth: 1,
    borderColor: COLORS.green.dark,
  },
  container2: {
    width: SCREEN.width * 0.9,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 10,
    elevation: 1,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.green.dark,
  },

  list: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  name: {
    marginTop: 10,
    fontSize: 25,
    color: "black",
  },
  detailsContainer: {
    padding: 5,
  },
  nameView: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderColor: COLORS.gray.extraDeep,
  },
  kg: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
