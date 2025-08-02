import { ScreenWrapper } from "@/components/ScreenWrapper";
import DetailsCard from "@/components/ui/DetailsCard";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function TransactionPage() {
  const { id, name, community, preFinance, ballance, nationalId } = useLocalSearchParams();
  const data = {
    id: String(id),
    name: String(name),
    nationalId : String(nationalId),
    community: String(community),
    preFinance: Number(preFinance),
    ballance: Number(ballance),
  };
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <DetailsCard
          id={data.id}
          nationalId = {data.nationalId}
          name={data.name}
          community={data.community}
          preFinance={data.preFinance}
          ballance={data.ballance}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
