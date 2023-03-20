import IRoleIcon from "../types/RoleIcons";

function isAvatarIcon(item: unknown): item is IRoleIcon {
    return !!(item as IRoleIcon).rarity && !!(item as IRoleIcon).roleId;
  }

export {isAvatarIcon}