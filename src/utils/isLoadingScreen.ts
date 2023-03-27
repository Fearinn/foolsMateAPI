import { ILoadingScreen } from "../types/LoadingScreen";

export function isLoadingScreen(item: unknown): item is ILoadingScreen {
  return (
    !!(item as ILoadingScreen).image &&
    !!(item as ILoadingScreen).imageWide &&
    !!(item as ILoadingScreen).imagePrimaryColor
  );
}
