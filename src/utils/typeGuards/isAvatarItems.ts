import IAvatarItem, {
  IAvatarItemGender,
  IAvatarItemType,
} from "../../types/AvatarItem";

export function isAvatarItem(item: unknown): item is IAvatarItem {
  return !!(item as IAvatarItem).rarity && !!(item as IAvatarItem).type;
}

export function isAvatarItemGender(
  gender: unknown
): gender is IAvatarItemGender {
  return gender === "FEMALE" || gender === "MALE" || gender === "";
}

export function isAvatarItemType(type: unknown): type is IAvatarItemType {
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
