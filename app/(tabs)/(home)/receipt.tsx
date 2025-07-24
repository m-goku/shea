import { generateAndSaveReceipt } from "@/components/GeneratePdf";
import { COLORS } from "@/constants/Colors";
import { SCREEN } from "@/constants/Screen";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { LogBox, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const [isSaving, setIsSaving] = useState(false);
  const handleSaveReceipt = async () => {
    setIsSaving(true);
    await generateAndSaveReceipt(data);
    router.replace("/(tabs)/(home)");
    router.navigate("/(tabs)/(receipts)");
    setIsSaving(false);
  };

  return (
    <>
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
          disabled={isSaving}
        >
          <Text style={styles.buttonText}>Save Receipt</Text>
        </TouchableOpacity>
      </View>
    </>
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
    fontSize: 25,
    fontWeight: "600",
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
    backgroundColor: COLORS.green.deep,
  },
  label: {
    fontSize: 20,
    color: "black",
    fontWeight: "600",
  },
  value: {
    fontSize: 25,
    fontWeight: "600",
    color: "black",
  },
  list: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
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
});
