import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import Farmer from "./model";
import { mySchema } from "./schema";

const adapter = new SQLiteAdapter({
  schema: mySchema,

  dbName: "MyApp",
});

export const database = new Database({
  adapter,
  modelClasses: [Farmer],
});
