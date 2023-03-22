import IRarity from "./Rarity";

type IRoleIcon = {
  rarity: IRarity;
  img: {
    url: string;
    width: number;
    height: number;
  };
  roleId: RegExp | string;
  event: RegExp | string
};

export default IRoleIcon
