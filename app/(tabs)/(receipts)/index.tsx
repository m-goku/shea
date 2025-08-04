import { openPDF } from "@/components/OpenPdf";
import { ReceiptFile, listSavedReceipts } from "@/components/REceiptList";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import { PlainWrapper } from "@/components/ui/wrappers/PlainWrapper";
import { COLORS } from "@/constants/Colors";
import { SCREEN } from "@/constants/Screen";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  LogBox,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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
    .slice(0, 30);

  return (
    <PlainWrapper>
      <View style={styles.container}>
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
          showsVerticalScrollIndicator={false}
          data={filteredFarmers}
          keyExtractor={(item) => item.uri}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleOpen(item.uri)}
              style={styles.card}
            >
              <FontAwesome5
                name="receipt"
                size={24}
                color={COLORS.green.dark}
              />
              <Text
                allowFontScaling={false}
                style={[styles.name, { fontFamily: "Poppins" }]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: "Poppins",
                  fontSize: 20,
                  color: COLORS.gray.deep,
                }}
              >
                You Have No Receipts
              </Text>
            </View>
          }
        />
      </View>
    </PlainWrapper>
  );
}

const styles = StyleSheet.create({
  input: {
    width: SCREEN.width * 0.9,
    height: 50,
    borderColor: COLORS.green.dark,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "white",
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
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    marginTop: (StatusBar.currentHeight as number) + 40,
    margin: 10,
  },
});
