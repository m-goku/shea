// ReceiptGenerator.tsx
import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";

export interface ReceiptData {
  id: string;
  name: string;
  community: string;
  preFinance: number;
  ballance: number;
  kilograms: number;
  total: number;
  date?: string;
}

export async function generateAndSaveReceipt(
  data: ReceiptData
): Promise<string> {
  const {
    id,
    name,
    community,
    preFinance,
    ballance,
    kilograms,
    total,
    date = new Date().toLocaleDateString(),
  } = data;

  // 1. Generate HTML receipt
  const html = `
   <html>
    <head>
      <meta charset="utf-8" />
      <style>
        @page {
          size: A4;
          margin: 40px;
        }
        body {
          font-family: Arial, sans-serif;
          font-size: 14px;
          padding: 0;
          margin: 0;
        }
        .container {
          width: 100%;
          max-width: 800px;
          margin: auto;
        }
        .header {
     
          text-align: center;
          font-size: 44px;
          font-weight: bold;
          margin-bottom: 70px;
        }
        .section {
          margin-bottom: 16px;
        }
        .row {
          display: flex;
          justify-content: space-between;
          padding: 6px 0;
          border-bottom: 1px solid #eee;
         
          margin-top : 40px
        }
        .label {
        font-size: 34px;
          font-weight: 500;
          color: #555;
        }
        .value {
        font-size: 34px;
          font-weight: 600;
          color: #111;
        }
        .footer {
        font-size: 24px;
          margin-top: 40px;
          text-align: center;
          font-size: 12px;
          color: #888;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">GWI/FUJI RECEIPT</div>

        <div class="section">
          <div class="row"><div class="label">Date:</div><div class="value">${date}</div></div>
          <div class="row"><div class="label">ID:</div><div class="value">${id}</div></div>
          <div class="row"><div class="label">Name:</div><div class="value">${name}</div></div>
          <div class="row"><div class="label">Community:</div><div class="value">${community}</div></div>
        </div>

        <div class="section">
          <div class="row"><div class="label">Pre-Finance (GH₵):</div><div class="value">${preFinance.toFixed(
            2
          )}</div></div>
          <div class="row"><div class="label">Balance (GH₵):</div><div class="value">${ballance.toFixed(
            2
          )}</div></div>
          <div class="row"><div class="label">Weight (Kg):</div><div class="value">${kilograms}</div></div>
          <div class="row"><div class="label">Total (GH₵):</div><div class="value">${total.toFixed(
            2
          )}</div></div>
        </div>

      </div>
    </body>
  </html>
  `;

  // 2. Generate PDF file temporarily
  const { uri } = await Print.printToFileAsync({ html });

  // 3. Create "Receipts" folder if it doesn't exist
  const receiptsDir = FileSystem.documentDirectory + "Receipts/";
  const dirInfo = await FileSystem.getInfoAsync(receiptsDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(receiptsDir, { intermediates: true });
  }

  // 4. Move the file to that folder with a descriptive name
  const fileName = `${name.replace(/ /g, "_")}_${Date.now()}.pdf`;
  const newUri = receiptsDir + fileName;

  await FileSystem.moveAsync({
    from: uri,
    to: newUri,
  });

  console.log("PDF saved to:", newUri);
  return newUri; // return for future use or navigation
}
