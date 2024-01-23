import React, { FC, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ModalProps,
} from "react-native";
import CustomButton from "./CustomButton";
import ComponentsLayout from "../../screens/layouts/components/ComponentsLayout";

interface ICustomModal extends ModalProps {
  children: React.ReactNode;
  title: string;
  buttonText?: string | React.ReactNode;
  customActive?: React.ReactNode;
}
const CustomModal: FC<ICustomModal> = ({ children, title, customActive }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={[styles.modalBackground, styles.centeredView]}>
          <View style={[styles.modalView]}>
            <CustomButton
              onPress={() => setModalVisible(!modalVisible)}
              title={"hide modal"}
              theme="primary"
            />
            {children}
          </View>
          <ComponentsLayout style={{ marginTop: 100 }}>
            <Text>dsdsa</Text>
          </ComponentsLayout>
        </View>
      </Modal>
      <CustomButton
        onPress={() => setModalVisible(true)}
        title={title}
        theme="primary"
      />
    </>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default CustomModal;
