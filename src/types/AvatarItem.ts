import IRarity from "./Rarity";

type IAvatarItem = {
  id: string;
  rarity: IRarity;
  costInGold?: number;
  costInRoses?: number;
  imageUrl: "string";
  type: IAvatarItemType;
  gender?: IAvatarItemGender;
  event?: RegExp | string;
};

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

export { IAvatarItemType, IAvatarItemGender};

export default IAvatarItem;
