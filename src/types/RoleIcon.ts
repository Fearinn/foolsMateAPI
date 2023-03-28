import { IRarity } from "./Rarity";

export type IRoleIcon = {
  rarity: IRarity;
  img: {
    url: string;
    width: number;
    height: number;
  };
  roleId: RegExp | string;
  event: RegExp | string;
};
