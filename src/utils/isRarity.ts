import IRarity from "../types/Rarity";

export function isRarity(rarity: unknown): rarity is IRarity {
    return (
      rarity === "COMMON" ||
      rarity === "RARE" ||
      rarity === "EPIC" ||
      rarity === "LEGENDARY"
    );
  }