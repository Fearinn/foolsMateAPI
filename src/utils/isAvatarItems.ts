import IAvatarItem, {
  IAvatarItemGender,
  IAvatarItemType,
  IAvatarItemRarity,
} from "../types/AvatarItem";

function isAvatarItem(item: unknown): item is IAvatarItem {
  return !!(item as IAvatarItem).rarity && !!(item as IAvatarItem).type;
}

function isAvatarItemGender(gender: unknown): gender is IAvatarItemGender {
  return gender === "FEMALE" || gender === "MALE" || gender === "";
}

function isAvatarItemType(type: unknown): type is IAvatarItemType {
  return (
    type === "SHIRT" ||
    type === "HAIR" ||
    type === "FRONT" ||
    type === "GRAVESTONE" ||
    type === "BACK" ||
    type === "MOUTH" ||
    type === "GLASSES" ||
    type === "MASK"
  );
}

function isAvatarItemRarity(rarity: unknown): rarity is IAvatarItemRarity {
  return (
    rarity === "COMMON" ||
    rarity === "RARE" ||
    rarity === "EPIC" ||
    rarity === "LEGENDARY"
  );
}

function convertIntoAvatarItemsList(list: unknown[]): IAvatarItem[] {
  const avatarItemsList = list.filter((item): item is IAvatarItem =>
    isAvatarItem(item)
  );
  return avatarItemsList;
}
export {
  convertIntoAvatarItemsList,
  isAvatarItem,
  isAvatarItemGender,
  isAvatarItemType,
  isAvatarItemRarity,
};
