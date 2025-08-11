import { database } from "./db";
import Farmer from "./model";

const farmersCollection = database.get<Farmer>("farmers");

// 🟢 CREATE
export const createFarmer = async (data: {
  name: string;
  community: string;
  nationalId: string;
  prefinance: number;
}) => {
  await database.write(async () => {
    await farmersCollection.create((farmer) => {
      let alpha = data.community.split("").slice(0, 3);
      let genId =
        alpha.join("").toUpperCase() + Math.floor(Math.random() * 1000000);

      farmer._raw.id = genId;
      farmer.name = data.name.replace(/\s+/g, " ").trim();
      farmer.nationalId = data.nationalId;
      farmer.community = data.community.replace(/\s+/g, " ").trim();
      farmer.prefinance = data.prefinance;
      farmer.balance = data.prefinance;
      farmer.totalKgBrought = 0;
      farmer.totalAmount = 0;
      farmer.cropType = "";
      farmer.farmSize = "";
      farmer.inputSupplied = "";
      farmer.farmLocationLat = 0;
      farmer.farmLocationLng = 0;
      farmer.farmLocationDescription = "";
      farmer.repaymentStatus = "pending";
    });
  });
};

// 🔵 READ ALL
export const getAllFarmers = async (): Promise<Farmer[]> => {
  return await farmersCollection.query().fetch();
};

// 🔍 READ BY ID
export const getFarmerById = async (id: string): Promise<Farmer | null> => {
  try {
    return await farmersCollection.find(id);
  } catch {
    return null;
  }
};

// 🟡 UPDATE
export const updateFarmer = async (
  id: string,
  updatedFields: Partial<{
    name: string;
    nationalId: string;
    community: string;
    prefinance: number;
    balance: number;
    total_kg_brought?: number;
    total_amount?: number;
    crop_type?: string;
    farm_size?: string;
    input_supplied?: string;
    farm_location_lat?: number;
    farm_location_lng?: number;
    farm_location_description?: string;
    repayment_status?: string;
  }>
) => {
  const farmer = await getFarmerById(id);
  if (!farmer) return;

  await database.write(async () => {
    await farmer.update((f) => {
      if (updatedFields.name !== undefined) f.name = updatedFields.name;
      if (updatedFields.nationalId !== undefined)
        f.nationalId = updatedFields.nationalId;
      if (updatedFields.community !== undefined)
        f.community = updatedFields.community;
      if (updatedFields.prefinance !== undefined)
        f.prefinance = updatedFields.prefinance;
      if (updatedFields.balance !== undefined)
        f.balance = updatedFields.balance;

      if (updatedFields.total_kg_brought !== undefined)
        f.totalKgBrought = updatedFields.total_kg_brought;
      if (updatedFields.total_amount !== undefined)
        f.totalAmount = updatedFields.total_amount;
      if (updatedFields.crop_type !== undefined)
        f.cropType = updatedFields.crop_type;
      if (updatedFields.farm_size !== undefined)
        f.farmSize = updatedFields.farm_size;
      if (updatedFields.input_supplied !== undefined)
        f.inputSupplied = updatedFields.input_supplied;
      if (updatedFields.farm_location_lat !== undefined)
        f.farmLocationLat = updatedFields.farm_location_lat;
      if (updatedFields.farm_location_lng !== undefined)
        f.farmLocationLng = updatedFields.farm_location_lng;
      if (updatedFields.farm_location_description !== undefined)
        f.farmLocationDescription = updatedFields.farm_location_description;
      if (updatedFields.repayment_status !== undefined)
        f.repaymentStatus = updatedFields.repayment_status;
    });
  });
};

// 🔴 DELETE
export const deleteFarmer = async (id: string) => {
  const farmer = await getFarmerById(id);
  if (!farmer) return;

  await database.write(async () => {
    await farmer.markAsDeleted(); // use .destroyPermanently() to hard-delete
  });
};
