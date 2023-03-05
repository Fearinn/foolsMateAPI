import IAvatarItem, {
  IAvatarItemGender,
  IAvatarItemKind,
  IAvatarRarity,
} from "../types/AvatarItem";

function isAvatarItem(item: unknown): item is IAvatarItem {
  return !!(item as IAvatarItem).rarity && !!(item as IAvatarItem).type;
}

function isAvatarItemGender(gender: unknown): gender is IAvatarItemGender {
  return gender === "FEMALE" || gender === "MALE" || gender === "";
}

function isAvatarItemKind(kind: unknown): kind is IAvatarItemKind {
  return (
    kind === "SHIRT" ||
    kind === "HAIR" ||
    kind === "FRONT" ||
    kind === "GRAVESTONE" ||
    kind === "BACK" ||
    kind === "MOUTH" ||
    kind === "GLASSES" ||
    kind === "MASK"
  );
}

function isAvatarItemRarity(rarity: unknown): rarity is IAvatarRarity {
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
  isAvatarItemKind,
  isAvatarItemRarity,
};
