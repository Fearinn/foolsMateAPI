import {IRarity} from "./Rarity";

export type ILoadingScreen = {
  id: string;
  rarity: IRarity;
  image: IImage;
  imageWide: IImage;
  imagePrimaryColor: string;
};

type IImage = {
  url: string;
  width: number;
  height: number;
};
