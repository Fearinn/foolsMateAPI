type IAvatarItem = {
  id: string;
  rarity: IAvatarItemRarity;
  costInGold?: number;
  costInRoses?: number;
  imageUrl: "string";
  type: IAvatarItemType;
  gender?: IAvatarItemGender;
  event?: RegExp | string;
};

type IAvatarItemRarity = "COMMON" | "RARE" | "EPIC" | "LEGENDARY";

type IAvatarItemType =
  | "HAIR"
  | "FRONT"
  | "SHIRT"
  | "HAT"
  | "GLASSES"
  | "BACK"
  | "MASK"
  | "GRAVESTONE"
  | "MOUTH";

type IAvatarItemGender = "FEMALE" | "MALE" | "";

export { IAvatarItemType, IAvatarItemGender, IAvatarItemRarity};

export default IAvatarItem;
