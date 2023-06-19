import mongoose, { SchemaTypes } from "mongoose";
import { ZAura, Role } from "../types/Role.js";

const RoleSchema = new mongoose.Schema<Role>({
  id: SchemaTypes.String,
  team: {
    type: SchemaTypes.String,
    enum: ["VILLAGER", "WEREWOLF", "SOLO"]
  },
  aura: {
    type: SchemaTypes.String,
    enum: ZAura._def.values,
  },
  name: SchemaTypes.String,
  description: SchemaTypes.String,
  image: {
    url: SchemaTypes.String,
    width: SchemaTypes.Number,
    height: SchemaTypes.Number,
  },
});

export const RoleModel = mongoose.model("role", RoleSchema);
