import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const mySchema = appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: "farmers",
      columns: [
        { name: "name", type: "string" },
        { name: "community", type: "string" },
        { name: "nationalId", type: "string", isOptional: true },
        { name: "prefinance", type: "number" },
        { name: "balance", type: "number" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },

        // New fields
        { name: "total_kg_brought", type: "number", isOptional: true },
        { name: "total_amount", type: "number", isOptional: true },
        { name: "crop_type", type: "string", isOptional: true },
        { name: "farm_size", type: "string", isOptional: true },
        { name: "input_supplied", type: "string", isOptional: true }, // comma-separated or JSON string
        { name: "farm_location_lat", type: "number", isOptional: true },
        { name: "farm_location_lng", type: "number", isOptional: true },
        { name: "farm_location_description", type: "string", isOptional: true },
        { name: "repayment_status", type: "string", isOptional: true },
      ],
    }),
  ],
});
