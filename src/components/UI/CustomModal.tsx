import React, { FC, useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  ModalProps,
  ScrollView,
  Platform,
} from "react-native";
import CustomButton from "./CustomButton";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ComponentsLayout from "../../core/layouts/components/ComponentsLayout";
import { useTheme } from "../../core/themes/useTheme";

interface ICustomModal extends ModalProps {
  children: React.ReactNode;
  title?: string;
  customActive?: React.ReactNode;
  theme?: "none" | "primary" | "secondary" | "transparent";
}

const theme = useTheme();
const CustomModal: FC<ICustomModal> = ({
  children,
  title,
  customActive,
  ...props
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { isModalClose } = useSelector((store: RootState) => store.modalClose);
  useEffect(() => {
    if (isModalClose) {
      setModalVisible(false);
    }
  }, [isModalClose]);
  return (
    <>
      <Modal
        visible={modalVisible}
        animationType={Platform.OS === "android" ? "fade" : "slide"}
        presentationStyle="formSheet"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        {...props}
      >
        <View style={styles.layout}>
          <ComponentsLayout style={[styles.modalView]}>
            <ScrollView keyboardDismissMode="on-drag">{children}</ScrollView>
          </ComponentsLayout>
        </View>
      </Modal>
      {customActive ? (
        <CustomButton
          onPress={() => setModalVisible(true)}
          title={""}
          theme={props.theme}
          style={{ borderWidth: 0 }}
        >
          {customActive}
        </CustomButton>
      ) : (
        <CustomButton
          onPress={() => setModalVisible(true)}
          title={title}
          theme={props.theme}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: theme.background,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "95%",
    paddingBottom: 20,
  },
});

export default CustomModal;
