// crud/farmerCrud.ts
import { database } from "./db";
import Farmer from "./model";

// types/Farmer.ts
export interface FarmerInput {
  id: string;
  name: string;
  community: string;
  prefinance: number;
  balance: number;
}

const farmersCollection = database.get<Farmer>("farmers");

export const writeManyFarmers = async (farmers: FarmerInput[]) => {
  await database.write(async () => {
    const batch = farmers.map((data) =>
      farmersCollection.prepareCreate((farmer) => {
        farmer._raw.id = data.id; // optional, but useful for syncing with backend
        farmer.name = data.name;
        farmer.community = data.community;
        farmer.prefinance = data.prefinance;
        farmer.balance = data.balance;
      })
    );

    await database.batch(...batch);
  });
};
