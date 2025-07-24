import { database } from "./db";
import Farmer from "./model";

const farmersCollection = database.get<Farmer>("farmers");

// 🟢 CREATE
export const createFarmer = async (data: {
  name: string;
  community: string;
  prefinance: number;
  balance: number;
}) => {
  await database.write(async () => {
    await farmersCollection.create((farmer) => {
      farmer.name = data.name;
      farmer.community = data.community;
      farmer.prefinance = data.prefinance;
      farmer.balance = data.balance;
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
    community: string;
    prefinance: number;
    balance: number;
  }>
) => {
  const farmer = await getFarmerById(id);
  if (!farmer) return;

  await database.write(async () => {
    await farmer.update((f) => {
      if (updatedFields.name !== undefined) f.name = updatedFields.name;
      if (updatedFields.community !== undefined)
        f.community = updatedFields.community;
      if (updatedFields.prefinance !== undefined)
        f.prefinance = updatedFields.prefinance;
      if (updatedFields.balance !== undefined)
        f.balance = updatedFields.balance;
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
