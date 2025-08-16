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
  payable: number;
  issuedBy: string;
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
    payable,
    issuedBy,
    date = new Date().toLocaleDateString(),
  } = data;

  // 1. Generate HTML receipt
  const html = `
  <html>
  <head>
    <meta charset="utf-8" />
    <style>
      @page {
        size: 58mm auto;
        margin: 5mm;
      }
      body {
        font-family: Arial, sans-serif;
        font-size: 10px;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 100%;
        max-width: 58mm;
        margin: 0 auto;
      }
      .header {
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .section {
        margin-bottom: 6px;
      }
      .row {
        display: flex;
        justify-content: space-between;
        padding: 2px 0;
        border-bottom: 1px dashed #ccc;
      }
      .label {
        font-size: 14px;
        font-weight: normal;
        color: #333;
      }
      .value {
        font-size: 17px;
       s
        color: #000;
        text-align: right;
      }
      .footer {
        font-size: 8px;
        margin-top: 10px;
        text-align: center;
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
        <div class="row"><div class="label">Amount Payable (GH₵):</div><div class="value">${payable.toFixed(
          2
        )}</div></div>
        <div class="row"><div class="label">Issued By:</div><div class="value">${issuedBy}</div></div>
      </div>

      <div class="footer">Thank you for your business!</div>
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

  const randomNumber = Math.floor(10000 + Math.random() * 90000); // 5-digit random number
  const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

  const fileName = `${name
    .replace(/\s+/g, " ")
    .trim()}_${randomNumber}_${currentDate}.pdf`;

  const newUri = receiptsDir + fileName;

  await FileSystem.moveAsync({
    from: uri,
    to: newUri,
  });

  // console.log("PDF saved to:", newUri);
  return newUri; // return for future use or navigation
}
