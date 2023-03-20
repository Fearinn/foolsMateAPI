import {convertAndCeil} from "./convertAndCeil.js";

export function paginate<T = unknown>(
  filteredData: T[],
  originalData: T[],
  page?: unknown,
  itemsPerPage?: unknown,
) {
  const itemsPerPageCeiled =
    convertAndCeil(itemsPerPage) || originalData.length;

  const numberOfPages = convertAndCeil(
    filteredData.length / itemsPerPageCeiled
  );

  const pageCeiled =
    (convertAndCeil(page) || 1) > numberOfPages
      ? numberOfPages
      : convertAndCeil(page) || 1;

  const paginatedData = filteredData.slice(
    itemsPerPageCeiled * (pageCeiled - 1),
    itemsPerPageCeiled * pageCeiled
  );

  return {
    count: paginatedData.length,
    totalCount: filteredData.length,
    currentPage: pageCeiled,
    numberOfPages,
    items: paginatedData,
  };
}
