import { SCREEN } from "@/constants/Screen";
import React from "react";
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "@/constants/Colors";
import { database } from "@/db/db";
import { syncDatabase } from "@/db/syncData";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";

const LoadingModal = ({ loading }: { loading: boolean }) => {
  return (
    <Modal transparent visible={loading} style={styles.modal}>
      <View style={styles.modalView}>
        <ActivityIndicator animating={loading} size={50} />
        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: 20,
            color: "black",
          }}
        >
          Syncing...
        </Text>
      </View>
    </Modal>
  );
};

export default function SettingsPage() {
  const [isLoading, setIsloading] = React.useState(false);

  async function handleSync() {
    setIsloading(true);
    try {
      await syncDatabase(database);
    } catch (error) {
      console.log(error);
      setIsloading(false);
    } finally {
      setIsloading(false);
    }
  }

  // async function handleLoad() {
  //   try {
  //     await writeManyFarmers(DATA);
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     console.log("DATA LOADED SUCCESSFULLY");
  //   }
  // }
  // async function handleDelete() {
  //   try {
  //     await resetFarmers();
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     console.log("DATA DELETED SUCCESSFULLY");
  //   }
  // }
  return (
    <>
      <LoadingModal loading={isLoading} />
      <View style={styles.container}>
        <View style={{ marginTop: 40 }}>
          <TouchableOpacity
            style={styles.options}
            activeOpacity={0.8}
            onPress={() => handleSync()}
          >
            <FontAwesome5 name="sync-alt" size={24} color={COLORS.green.dark} />
            <Text
              allowFontScaling={false}
              style={[styles.text, { fontFamily: "Poppins" }]}
            >
              Sync with Database
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.options}
            activeOpacity={0.8}
            onPress={() => router.push("/(tabs)/(admin)/list")}
          >
            <Feather name="users" size={24} color={COLORS.green.dark} />
            <Text
              allowFontScaling={false}
              style={[styles.text, { fontFamily: "Poppins" }]}
            >
              Manage Data
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.options}
            activeOpacity={0.8}
            onPress={() => router.push("/(tabs)/(admin)/weight")}
          >
            <FontAwesome6
              name="weight-scale"
              size={24}
              color={COLORS.green.dark}
            />
            <Text
              allowFontScaling={false}
              style={[styles.text, { fontFamily: "Poppins" }]}
            >
              Set Weight (Kg)
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.options}
            activeOpacity={0.8}
            onPress={() => handleLoad()}
          >
            <Text
              allowFontScaling={false}
              style={[styles.text, { fontFamily: "Poppins" }]}
            >
              Load
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.options}
            activeOpacity={0.8}
            onPress={() => handleDelete()}
          >
            <Text
              allowFontScaling={false}
              style={[styles.text, { fontFamily: "Poppins" }]}
            >
              Delete
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  options: {
    flexDirection: "row",
    width: SCREEN.width * 0.9,
    height: 70,
    backgroundColor: "white",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 1,
  },
  text: {
    fontSize: 20,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});
