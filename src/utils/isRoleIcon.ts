import IRoleIcon from "../types/RoleIcon";

function isRoleIcon(item: unknown): item is IRoleIcon {
    return !!(item as IRoleIcon).rarity && !!(item as IRoleIcon).roleId;
  }

export {isRoleIcon}