import { IBackground } from "../../types/Background";

export function isBackground(item: unknown): item is IBackground {
  return (
    !!(item as IBackground).backgroundColorDay &&
    !!(item as IBackground).imageNight &&
    !!(item as IBackground).imageDay
  );
}
