import { generateAndSaveReceipt } from "@/components/GeneratePdf";
import Header from "@/components/Header";
import SaveButton from "@/components/ui/buttons/SaveButton";
import LabelText from "@/components/ui/texts/LabelText";
import ValueText from "@/components/ui/texts/ValueText";
import { PlainWrapper } from "@/components/ui/wrappers/PlainWrapper";
import { COLORS } from "@/constants/Colors";
import { SCREEN } from "@/constants/Screen";
import { getFarmerById } from "@/db/crud";
import Farmer from "@/db/model";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

function List({ label, value }: { label: string; value: any }) {
  return (
    <View style={styles.list}>
      <LabelText label={label} />
      <ValueText label={label} value={value} />
    </View>
  );
}

export default function Receipt() {
  const { id, total, kilograms, payable, issuedBy } = useLocalSearchParams();
  const [farmer, setFarmer] = useState<Farmer | null>();
  const data = {
    id: String(id),
    name: String(farmer?.name),
    community: String(farmer?.community),
    preFinance: Number(farmer?.prefinance),
    ballance: Number(farmer?.balance),
    kilograms: Number(kilograms),
    total: Number(total),
    payable: Number(payable),
    issuedBy: String(issuedBy),
  };

  async function getFarmer() {
    const get = await getFarmerById(data.id);
    setFarmer(get);
  }
  useFocusEffect(() => {
    getFarmer();
  });

  const [isSaving, setIsSaving] = useState(false);
  const handleSaveReceipt = async () => {
    setIsSaving(true);
    await generateAndSaveReceipt(data);
    router.replace("/(tabs)/(home)");
    router.navigate("/(tabs)/(receipts)");
    setIsSaving(false);
  };

  return (
    <PlainWrapper>
      <View style={styles.main}>
        <Header title="Preview" />
        <View style={styles.container}>
          <Text
            allowFontScaling={false}
            style={{ fontSize: 25, marginBottom: 20, fontWeight: 500 }}
          >
            Receipt Preview
          </Text>
          <List label="ID:" value={farmer?.id} />
          <List label="Name:" value={farmer?.name.slice(0, 25)} />
          <List label="Community:" value={farmer?.community.slice(0, 15)} />
          <List label="Pre-Finance (GH₵):" value={farmer?.prefinance} />
          <List label="Balance (GH₵):" value={farmer?.balance} />
          <List label="Weight (Kg):" value={data.kilograms} />
          <List label="Total (GH₵):" value={data.total} />
          <List label="Amount Payable (GH₵):" value={data.payable} />
          <List label="Issued By:" value={data.issuedBy} />
        </View>
        <SaveButton handleSave={handleSaveReceipt} isSaving={isSaving} />
      </View>
    </PlainWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN.width * 0.9,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.green.dark,
    marginTop: 20,
  },
  main: {
    //flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  list: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
});
