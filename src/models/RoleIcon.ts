import mongoose, { SchemaTypes } from "mongoose";
import { z } from "zod";
import { ZRarity } from "../types/Rarity.js";
import { ZRoleIcon } from "../types/items/RoleIcon.js";

const roleIconSchema = new mongoose.Schema<z.infer<typeof ZRoleIcon>>({
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
