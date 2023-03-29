import { IRewardType, ISeason } from "../../types/Season";

export function isSeason(item: unknown): item is ISeason {
  return (
    !!(item as ISeason).durationInDays &&
    !!(item as ISeason).seasonBackgroundId &&
    !!(item as ISeason).rewards
  );
}

export function isRewardType(item: unknown): item is IRewardType {
  if (typeof item !== "string") return false;
  return (
    item === "AVATAR_ITEM" ||
    item === "ROLE_ICON" ||
    item === "ROSE_PACKAGE" ||
    item === "GOLD" ||
    item === "GEM" ||
    item === "EMOJI" ||
    item === "ROLE_CARD_ABILITY_EXCHANGE_VOUCHER" ||
    item === "LOADING_SCREEN"
  );
}
