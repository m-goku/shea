import { database } from "./db";

export const resetFarmers = async () => {
  const collection = database.get("farmers");
  const allRecords = await collection.query().fetch();

  await database.write(async () => {
    const deletions = allRecords.map((record) =>
      record.prepareDestroyPermanently()
    );
    await database.batch(deletions);
  });
};
