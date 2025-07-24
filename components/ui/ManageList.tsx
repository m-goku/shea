import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS } from "@/constants/Colors";
import { SCREEN } from "@/constants/Screen";
import { Data } from "@/db/data";
import AntDesign from "@expo/vector-icons/AntDesign";

export const ManageCard = ({ data }: { data: Data }) => {
  const [modal, setModal] = useState(false);
  const [option, setOption] = useState("");
  const [selected, setSelected] = useState("");

  function ManageModal({
    isVisible,
    icon,
    option,
    message,
    name,
  }: {
    isVisible: boolean;
    icon: any;
    option: string;
    message: string;
    name: string;
  }) {
    return (
      <Modal
        visible={isVisible}
        style={styles.modal}
        transparent
        animationType="slide"
      >
        <View style={styles.modal}>
          <View style={styles.modalView}>
            <Text style={styles.modalMessage}>{message}</Text>
            <Text style={styles.modalMessageName}>{name}</Text>
            <AntDesign
              name={icon}
              size={100}
              color={option == "delete" ? "red" : COLORS.green.extraDeep}
            />
            <TouchableOpacity
              style={styles.modalButton}
              activeOpacity={0.7}
              //   onPress={() => {
              //     setModal(false);
              //     router.replace({
              //       pathname: "/(tabs)/(home)/receipt",
              //       params: {
              //         id: id,
              //         name: name,
              //         community: community,
              //         preFinance: preFinance,
              //         ballance: ballance,
              //         kilograms: input,
              //         total: total,
              //       },
              //     });
              //   }}
              onPress={() => {
                selected == "Edit"
                  ? console.log("Edit")
                  : console.log("Delete");
              }}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modalButton,
                { backgroundColor: "red", marginTop: 5 },
              ]}
              activeOpacity={0.7}
              onPress={() => {
                setModal(false);
                setOption("");
              }}
            >
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <>
      {option == "Edit" && (
        <ManageModal
          icon={"edit"}
          isVisible={modal}
          message="Do you want to Edit"
          option="edit"
          name={data.name}
        />
      )}
      {option == "Delete" && (
        <ManageModal
          icon={"delete"}
          isVisible={modal}
          message="Do you want to Delete"
          option="delete"
          name={data.name}
        />
      )}

      <View style={styles.card} key={data.id}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.initials}>
            <Text
              style={[styles.initialText, { fontFamily: "PoppinsSemiBold" }]}
            >
              {data.name.split("")[0]}
            </Text>
          </View>
          <Text style={[styles.cardText, { fontFamily: "Poppins" }]}>
            {data.name}
          </Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => {
              setOption("Edit");
              setSelected("Edit");
              setModal(true);
            }}
          >
            <AntDesign name="edit" size={24} color="green" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOption("Delete");
              setSelected("Delete");
              setModal(true);
            }}
          >
            <AntDesign name="delete" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    width: SCREEN.width * 0.9,
    height: 50,
    backgroundColor: COLORS.gray.light,
    marginVertical: 5,
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardText: {
    fontSize: 20,
  },
  initials: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.gray.extraLight,
    marginRight: 10,
  },
  initialText: {
    fontSize: 20,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  modalView: {
    height: SCREEN.height * 0.4,
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
    marginTop: 20,
    elevation: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
  modalMessage: {
    fontSize: 20,
    color: "red",
  },
  modalMessageName: {
    fontSize: 22,
    marginBottom: 20,
  },
});
