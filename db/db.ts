import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
// import { migrations } from "./migrations";
import Farmer from "./model";
import { mySchema } from "./schema";

const adapter = new SQLiteAdapter({
  schema: mySchema,
  // migrations,
  dbName: "MyApp",
});

export const database = new Database({
  adapter,
  modelClasses: [Farmer],
});
