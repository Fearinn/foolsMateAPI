import IAvatarItem, { IAvatarItemGender } from "../types/AvatarItem";

function isAvatarItem(item: unknown): item is IAvatarItem {
  return !!(item as IAvatarItem).rarity && !!(item as IAvatarItem).type;
}

function isAvatarItemGender (gender: unknown): gender is IAvatarItemGender {
  return gender === "FEMALE" || gender === "MALE" || gender === ""
}

function convertIntoAvatarItemsList(list: unknown[]): IAvatarItem[] {
  const avatarItemsList = list.filter((item): item is IAvatarItem =>
    isAvatarItem(item)
  );
  return avatarItemsList;
}
export { convertIntoAvatarItemsList, isAvatarItem, isAvatarItemGender };
