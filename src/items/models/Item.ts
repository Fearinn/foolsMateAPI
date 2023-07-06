import mongoose, { SchemaTypes } from "mongoose";
import { Item } from "../types/Item.js";

const itemSchema = new mongoose.Schema<Item>({
  id: {
    type: SchemaTypes.String,
    required: true,
    unique: true,
    index: true,
  },
  image: {
    type: {
      url: SchemaTypes.String,
      width: SchemaTypes.Number,
      height: SchemaTypes.Number,
    },
    required: true,
  },
});

export const ItemModel = mongoose.model("Item", itemSchema);
