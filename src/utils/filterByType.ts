export function filterByType<T>(
  list: unknown[],
  typeGuard: (item: unknown) => boolean
): T[] {
  if (!list.length) return [];
  const avatarItemsList = list.filter((item): item is T => typeGuard(item));
  return avatarItemsList;
}
