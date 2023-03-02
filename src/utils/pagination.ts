import convertAndCeil from "./convertAndCeil";

export default function paginate(
  array: unknown[],
  page?: number | string,
  itemsPerPage?: number | string
) {
  const pageCeiled = convertAndCeil(page) || 1
  const itemsPerPageCeiled = convertAndCeil(itemsPerPage) || 20;
  return array.slice(
    itemsPerPageCeiled * (pageCeiled - 1),
    itemsPerPageCeiled * pageCeiled
  );
}
