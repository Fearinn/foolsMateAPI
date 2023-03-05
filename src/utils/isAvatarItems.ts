import IAvatarItem from "../types/AvatarItem";

function isAvatarItem(item: unknown): item is IAvatarItem {
  return !!(item as IAvatarItem).rarity && !!(item as IAvatarItem).type;
}

function convertIntoAvatarItemsList(list: unknown[]): IAvatarItem[] {
  const avatarItemsList = list.filter((item): item is IAvatarItem =>
    isAvatarItem(item)
  );
  return avatarItemsList;
}
export { convertIntoAvatarItemsList, isAvatarItem };
