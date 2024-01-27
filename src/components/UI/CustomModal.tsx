import React, { FC, useEffect, useState } from "react";
import { Modal, StyleSheet, View, ModalProps, ScrollView } from "react-native";
import CustomButton from "./CustomButton";
import ComponentsLayout from "../../screens/layouts/components/ComponentsLayout";
import { useSelector } from "react-redux";
import { IModalCloser } from "../../store/reducers/types";

interface ICustomModal extends ModalProps {
  children: React.ReactNode;
  title: string;
  customActive?: React.ReactNode;
}
const CustomModal: FC<ICustomModal> = ({ children, title, customActive }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { isModalClose } = useSelector(
    (store: any) => store.modalClose as IModalCloser
  );
  useEffect(() => {
    if (isModalClose) {
      setModalVisible(false);
    }
  }, [isModalClose]);
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
        <View style={styles.layout}>
          <ComponentsLayout style={[styles.modalView]}>
            <CustomButton
              onPress={() => setModalVisible(!modalVisible)}
              title={"Close modal"}
              theme="primary"
            />
            <ScrollView keyboardDismissMode="on-drag">{children}</ScrollView>
          </ComponentsLayout>
        </View>
      </Modal>
      {customActive ? (
        <CustomButton
          onPress={() => setModalVisible(true)}
          title={""}
          theme="none"
        >
          {customActive}
        </CustomButton>
      ) : (
        <CustomButton
          onPress={() => setModalVisible(true)}
          title={title}
          theme="primary"
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "95%",
    paddingVertical: 20,
    // paddingBottom: 20,
  },
});

export default CustomModal;
