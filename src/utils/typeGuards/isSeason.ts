import { Season } from "../../types/Season";

export function isSeason(item: unknown): item is Season {
  return (
    !!(item as Season).durationInDays &&
    !!(item as Season).seasonBackgroundId &&
    !!(item as Season).rewards
  );
}
