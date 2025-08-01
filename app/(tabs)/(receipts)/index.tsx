import { openPDF } from "@/components/OpenPdf";
import { ReceiptFile, listSavedReceipts } from "@/components/REceiptList";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import { ScreenWrapper } from "@/components/ScreenWrapper";
import { COLORS } from "@/constants/Colors";
import { SCREEN } from "@/constants/Screen";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  LogBox,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function index() {
  const [search, setSearch] = useState("");

  const [receipts, setReceipts] = useState<ReceiptFile[]>([]);

  useEffect(() => {
    const loadReceipts = async () => {
      const files = await listSavedReceipts();
      setReceipts(files);
    };

    loadReceipts();
  }, [receipts]);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const handleOpen = async (uri: string) => {
    try {
      await openPDF(uri);
    } catch (error) {
      Alert.alert("Error", "Unable to open this file.");
      console.error(error);
    }
  };

  const filteredFarmers = receipts
    .filter((farmer) =>
      farmer.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <ScreenWrapper>
      <TextInput
        style={styles.input}
        placeholder="Search by name or community"
        value={search}
        onChangeText={setSearch}
      />

      {/* <FlatList
        style={{ flex: 1 }}
        data={filteredFarmers}
        renderItem={(item) => <ListCard data={item.item} />}
      /> */}
      <FlatList
        data={filteredFarmers}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleOpen(item.uri)}
            style={styles.card}
          >
            <FontAwesome5 name="receipt" size={24} color="black" />
            <Text style={[styles.name, { fontFamily: "Poppins" }]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No receipts saved.</Text>
        }
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  input: {
    width: SCREEN.width * 0.9,
    height: 50,
    borderColor: COLORS.gray.deep,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    marginTop: 20,
  },

  card: {
    alignItems: "center",
    gap: 15,
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#f2f2f2",
    marginBottom: 10,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
  },
  meta: { fontSize: 12, color: "#666" },
  empty: { textAlign: "center", marginTop: 40, color: "#999" },
});
