import mongoose, { SchemaTypes } from "mongoose";
import { RoleIcon } from "../types/RoleIcon";
import { ZRarity } from "../../common/types/Rarity.js";

const roleIconSchema = new mongoose.Schema<RoleIcon>({
  id: {
    type: SchemaTypes.String,
    required: true,
    index: true,
    unique: true,
  },
  rarity: {
    type: SchemaTypes.String,
    enum: ZRarity._def.values,
    required: true,
  },
  image: {
    type: new mongoose.Schema({
      url: {
        type: SchemaTypes.String,
        required: true,
      },
      width: {
        type: SchemaTypes.Number,
        required: true,
      },
      height: {
        type: SchemaTypes.Number,
        required: true,
      },
    }),
    required: true,
  },
  roleId: { type: SchemaTypes.String, required: true },
  event: SchemaTypes.String,
});

export const RoleIconModel = mongoose.model("roleIcon", roleIconSchema);
