import * as Sharing from "expo-sharing";

export const openPDF = async (uri: string) => {
  const available = await Sharing.isAvailableAsync();
  if (available) {
    await Sharing.shareAsync(uri);
  } else {
    throw new Error("Sharing is not available on this device");
  }
};
