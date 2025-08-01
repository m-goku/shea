import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "farmers",
      columns: [
        { name: "name", type: "string" },
        { name: "community", type: "string" },
        { name: "nationalId", type: "string" },
        { name: "prefinance", type: "number" },
        { name: "balance", type: "number" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
  ],
});
