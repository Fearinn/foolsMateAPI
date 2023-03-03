import convertAndCeil from "./convertAndCeil.js";

export default function paginate(
  originalData: unknown[],
  page?: unknown,
  itemsPerPage?: unknown
) {
  const itemsPerPageCeiled =
    convertAndCeil(itemsPerPage) || originalData.length;

  const numberOfPages = convertAndCeil(
    originalData.length / itemsPerPageCeiled
  );

  const pageCeiled =
    (convertAndCeil(page) || 1) > numberOfPages
      ? numberOfPages
      : convertAndCeil(page) || 1;

  let paginatedData: unknown[] = [];

  paginatedData = originalData.slice(
    itemsPerPageCeiled * (pageCeiled - 1),
    itemsPerPageCeiled * pageCeiled
  );

  return {
    count: paginatedData.length,
    totalCount: originalData.length,
    currentPage: pageCeiled,
    numberOfPages,
    items: paginatedData,
  };
}
