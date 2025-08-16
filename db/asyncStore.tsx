import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToLocalStore = async (key: string, value: string | number) => {
  try {
    await AsyncStorage.setItem(key, value.toString());
    //console.log("saved to storage");
  } catch (error) {
    console.error("Failed to save :", error);
  }
};

export const getFromLocalStore = async (
  key: string
): Promise<string | number | null> => {
  try {
    const value = await AsyncStorage.getItem(key);

    if (value === null) return null; // not found

    // If it’s a number string, convert it
    const num = Number(value);
    return isNaN(num) ? value : num;
  } catch (error) {
    console.error("Failed to get value:", error);
    return null;
  }
};
