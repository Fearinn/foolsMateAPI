export type IActiveOffer = {
  id: string;
  type: IActiveOfferType;
  expireDate: string;
  promoImageUrl: string;
  costInGems?: number;
  avatarItemSetIds?: string[];
  advancedRoleCardOfferId?: string;
  emojisCollectionId?: string;
};

export type IActiveOfferType =
  | "LUV_OUTFITS"
  | "ADVANCED_ROLE_CARDS"
  | "AVATAR_ITEMS_SET"
  | "EMOJIS";
