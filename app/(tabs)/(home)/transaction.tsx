import Header from "@/components/Header";
import DetailsCard from "@/components/ui/DetailsCard";
import { ScreenWrapper } from "@/components/ui/wrappers/ScreenWrapper";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function TransactionPage() {
  const {
    id,
    name,
    community,
    preFinance,
    balance,
    nationalId,
    repaymentStatus,
    totalAmount,
    totalKgBrought,
  } = useLocalSearchParams();
  const data = {
    id: String(id),
    name: String(name),
    nationalId: String(nationalId),
    community: String(community),
    preFinance: Number(preFinance),
    balance: Number(balance),
    repaymentStatus: String(repaymentStatus),
    totalAmount: Number(totalAmount),
    totalKgBrought: Number(totalKgBrought),
  };
  return (
    <>
      <Header allowBack title="Transaction" />
      <ScreenWrapper>
        <View style={styles.container}>
          <DetailsCard
            id={data.id}
            nationalId={data.nationalId}
            name={data.name}
            community={data.community}
            preFinance={data.preFinance}
            balance={data.balance}
            repaymentStatus={data.repaymentStatus}
            totalAmount={data.totalAmount}
            totalKgBrought={data.totalKgBrought}
          />
        </View>
      </ScreenWrapper>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
