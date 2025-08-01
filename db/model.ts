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
}
