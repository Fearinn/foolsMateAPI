import convertAndCeil from "./convertAndCeil.js";

export default function paginate(
  originalData: unknown[],
  page?: unknown,
  itemsPerPage?: unknown
) {
  const pageCeiled = convertAndCeil(page) || 1;
  const itemsPerPageCeiled = convertAndCeil(itemsPerPage) || 20;
  const numberOfPages = convertAndCeil(
    originalData.length / itemsPerPageCeiled
  );
  const paginatedData = originalData.slice(
    itemsPerPageCeiled * (pageCeiled - 1),
    itemsPerPageCeiled * pageCeiled
  );

  return {
    count: paginatedData.length,
    totalCount: originalData.length,
    currentPage: pageCeiled,
    numberOfPages,
    data: paginatedData,
  };
}
