import IRoleIcon from "../types/RoleIcon";

function isAvatarIcon(item: unknown): item is IRoleIcon {
    return !!(item as IRoleIcon).rarity && !!(item as IRoleIcon).roleId;
  }

export {isAvatarIcon}