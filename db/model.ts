import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class Farmer extends Model {
  static table = "farmers";

  @field("name") name!: string;
  @field("community") community!: string;
  @field("nationalId") nationalId!: string;
  @field("prefinance") prefinance!: number;
  @field("balance") balance!: number;

  @field("created_at") createdAt!: number;
  @field("updated_at") updatedAt!: number;

  // New fields
  @field("total_kg_brought") totalKgBrought!: number;
  @field("total_amount") totalAmount!: number;
  @field("crop_type") cropType!: string;
  @field("farm_size") farmSize!: string;
  @field("input_supplied") inputSupplied!: string; // comma-separated or JSON string
  @field("farm_location_lat") farmLocationLat!: number;
  @field("farm_location_lng") farmLocationLng!: number;
  @field("farm_location_description") farmLocationDescription!: string;
  @field("repayment_status") repaymentStatus!: string;
}
