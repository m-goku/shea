// file: listReceipts.ts
import * as FileSystem from "expo-file-system";

export interface ReceiptFile {
  name: string;
  uri: string;
  size: number;
  modificationTime: number;
}

export async function listSavedReceipts(): Promise<ReceiptFile[]> {
  const receiptsDir = FileSystem.documentDirectory + "Receipts/";

  const dirInfo = await FileSystem.getInfoAsync(receiptsDir);
  if (!dirInfo.exists) {
    return [];
  }

  const fileNames = await FileSystem.readDirectoryAsync(receiptsDir);

  const receiptFiles: ReceiptFile[] = await Promise.all(
    fileNames.map(async (name) => {
      const fileUri = receiptsDir + name;
      const info: any = await FileSystem.getInfoAsync(fileUri);
      return {
        name,
        uri: fileUri,
        size: info.size ?? 0,
        modificationTime: info.modificationTime ?? 0,
      };
    })
  );

  // Sort most recent first
  return receiptFiles.sort((a, b) => b.modificationTime - a.modificationTime);
}
