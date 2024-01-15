import AsyncStorage from "@react-native-async-storage/async-storage";

const getUserId = async () => await AsyncStorage.getItem("uid");

export default getUserId;
