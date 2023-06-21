import mongoose, { SchemaTypes } from "mongoose";
import { ZAura, Role } from "../types/Role.js";

const RoleSchema = new mongoose.Schema<Role>({
  id: SchemaTypes.String,
  team: {
    type: SchemaTypes.String,
    enum: ["VILLAGER", "WEREWOLF", "SOLO", "RANDOM"],
    required: true,
  },
  aura: {
    type: SchemaTypes.String,
    enum: ZAura._def.values,
    required: true,
  },
  name: { type: SchemaTypes.String, required: true },
  description: { type: SchemaTypes.String, required: true },
  image: {
    type: {
      url: SchemaTypes.String,
      width: SchemaTypes.Number,
      height: SchemaTypes.Number,
    },
    required: true,
  },
  possibleRoles: [SchemaTypes.String],
  advancedRoles: [SchemaTypes.String],
});

export const RoleModel = mongoose.model("role", RoleSchema);
