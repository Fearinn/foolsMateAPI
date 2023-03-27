import { convertAndCeil } from "./convertAndCeil.js";

export function paginate<T = unknown>(args: {
  filteredData: T[];
  originalData: T[];
  page?: unknown;
  itemsPerPage?: unknown;
}) {
  const itemsPerPageCeiled =
    convertAndCeil(args.itemsPerPage) || args.originalData.length;

  const numberOfPages = convertAndCeil(
    args.filteredData.length / itemsPerPageCeiled
  );

  const pageCeiled =
    (convertAndCeil(args.page) || 1) > numberOfPages
      ? numberOfPages
      : convertAndCeil(args.page) || 1;

  const paginatedData = args.filteredData.slice(
    itemsPerPageCeiled * (pageCeiled - 1),
    itemsPerPageCeiled * pageCeiled
  );

  return {
    count: paginatedData.length,
    totalCount: args.filteredData.length,
    currentPage: pageCeiled,
    numberOfPages,
    items: paginatedData,
  };
}
