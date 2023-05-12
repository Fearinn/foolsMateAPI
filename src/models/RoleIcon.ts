import mongoose, { SchemaTypes } from "mongoose";
import { ZRarity } from "../types/Rarity.js";
import { RoleIcon } from "./types/RoleIcon.js";

const roleIconSchema = new mongoose.Schema<RoleIcon>({
  id: {
    type: SchemaTypes.String,
    unique: true,
    required: true,
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
