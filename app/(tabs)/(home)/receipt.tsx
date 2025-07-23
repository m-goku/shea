import { generateAndSaveReceipt } from "@/components/GeneratePdf";
import { COLORS } from "@/constants/Colors";
import { SCREEN } from "@/constants/Screen";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function List({ label, value }: { label: string; value: any }) {
  return (
    <View style={styles.list}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value} </Text>
    </View>
  );
}

export default function Receipt() {
  const { id, name, community, preFinance, ballance, total, kilograms } =
    useLocalSearchParams();
  const data = {
    id: Number(id),
    name: String(name),
    community: String(community),
    preFinance: Number(preFinance),
    ballance: Number(ballance),
    kilograms: Number(kilograms),
    total: Number(total),
  };

  const handleSaveReceipt = async () => {
    console.log("1");
    const savedUri = await generateAndSaveReceipt(data);
    console.log("2");
    Alert.alert("Saved!", `Receipt saved to:\n${savedUri}`);
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={{ fontSize: 25, marginBottom: 50 }}>
          ********* GWI/FUJi RECEIPT *********
        </Text>
        <List label="ID:" value={data.id} />
        <List label="Name:" value={data.name} />
        <List label="Community:" value={data.community} />
        <List label="Pre-Finance (GH₵):" value={data.preFinance} />
        <List label="Balance (GH₵):" value={data.ballance} />
        <List label="Weight (Kg):" value={data.kilograms} />
        <List label="Total (GH₵):" value={data.total} />
      </View>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={handleSaveReceipt}
      >
        <Text style={styles.buttonText}>Save Receipt</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN.width * 0.9,
    height: SCREEN.height * 0.6,
    backgroundColor: COLORS.gray.light,
    borderRadius: 10,
    marginTop: 50,
    elevation: 1,
    padding: 30,
  },
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: COLORS.green.deep,
  },
  label: {
    fontSize: 18,
    color: COLORS.gray.extraDeep,
    fontWeight: "bold",
  },
  value: {
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.gray.extraDeep,
  },
  list: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
