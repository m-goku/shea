// crud/farmerCrud.ts
import { database } from "./db";
import Farmer from "./model";

// types/Farmer.ts
export interface FarmerInput {
  id?: string;
  name: string;
  community: string;
  prefinance: number;
}

const farmersCollection = database.get<Farmer>("farmers");

export const writeManyFarmers = async (farmers: FarmerInput[]) => {
  await database.write(async () => {
    const batch = farmers.map((data) =>
      farmersCollection.prepareCreate((farmer) => {
        let alpha = data.community.split("").slice(0, 3);
        let genId = alpha.join("") + Math.floor(Math.random() * 1000000);
        farmer._raw.id = genId; // optional, but useful for syncing with backend
        farmer.name = data.name;
        farmer.community = data.community;
        farmer.prefinance = data.prefinance;
        farmer.balance = data.prefinance;
      })
    );

    await database.batch(...batch);
  });
};
