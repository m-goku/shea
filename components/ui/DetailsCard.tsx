import { COLORS } from "@/constants/Colors";
import { SCREEN } from "@/constants/Screen";
import { updateFarmer } from "@/db/crud";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AlertModal } from "./wrappers/AlertModal";

import { getFromLocalStore } from "@/db/asyncStore";
import LargeButton from "./buttons/LargeButton";
import WeightInput from "./textInputs/WeightInput";
import LabelText from "./texts/LabelText";
import StatusText from "./texts/StatusText";
import ValueText from "./texts/ValueText";

function List({ label, value }: { label: string; value: any }) {
  return (
    <View style={styles.list}>
      <LabelText label={label} />
      {label == "Re-Payment Status:" ? (
        <StatusText value={value} />
      ) : (
        <ValueText label={label} value={value} />
      )}
    </View>
  );
}

export default function DetailsCard({
  id,
  name,
  nationalId,
  community,
  preFinance,
  balance,
  totalAmount,
  totalKgBrought,
  repaymentStatus,
}: //,
{
  id: string;
  name: string;
  nationalId: string;
  community: string;
  preFinance: number;
  balance: number;
  totalAmount: number;
  totalKgBrought: number;
  repaymentStatus: string;
}) {
  const [input, setInput] = useState("");
  const [total, setTotal] = useState(0);
  const [price, setPrice] = useState(0);
  const [issuedBy, setIssuedBy] = useState("");

  const STORAGE_KEY = "MY_NUMBER_VALUE";
  async function handleGet() {
    const num = await getFromLocalStore(STORAGE_KEY);
    const n = await getFromLocalStore("NAME");

    const numValue = Number(num);
    setPrice(!isNaN(numValue) ? numValue : 0);
    setIssuedBy(typeof n === "string" ? n : "");
  }

  useEffect(() => {
    handleGet();
  }, []);

  const handleChange = (value: string) => {
    setInput(value);

    const number = parseFloat(value);
    if (!isNaN(number) && !isNaN(price)) {
      setTotal(number * price);
    } else {
      setTotal(0);
    }
  };

  async function handleComplete() {
    const update = {
      name: name,
      community: community,
      prefinance: preFinance,
      balance: balance >= total ? balance - total : 0,
      repaymentStatus: balance == preFinance ? "pending" : "paid",
      totalAmount: totalAmount + total,
      totalKgBrought: totalKgBrought + Number(input),
    };

    await updateFarmer(id, update);

    router.replace({
      pathname: "/(tabs)/(home)/receipt",
      params: {
        id: id,
        kilograms: input,
        total: total,
        payable: balance < total ? total - balance : 0,
        issuedBy: issuedBy,
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
          {/* <List label="Re-Payment Status:" value={repaymentStatus} /> */}
          <List label="Balance (GH₵):" value={balance} />
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
    marginTop: 15,
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
    marginTop: 5,
    fontSize: 20,
    color: "black",
  },
  detailsContainer: {
    padding: 5,
  },
  nameView: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    borderColor: COLORS.gray.extraDeep,
  },
  kg: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
