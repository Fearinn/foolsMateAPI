import IRarity from "./Rarity";

type IRoleIcon = {
  rarity: IRarity;
  img: {
    url: string;
    width: number;
    height: number;
  };
  roleId: string;
};

export default IRoleIcon
