import { convertAndCeil } from "./convertAndCeil.js";

export function paginate<T = unknown>(args: {
  data: T[];
  page?: unknown;
  itemsPerPage?: unknown;
}) {
  const itemsPerPageCeiled = convertAndCeil(args.itemsPerPage) || 25;

  const numberOfPages = convertAndCeil(args.data.length / itemsPerPageCeiled);

  const pageCeiled =
    (convertAndCeil(args.page) || 1) > numberOfPages
      ? numberOfPages
      : convertAndCeil(args.page) || 1;

  const paginatedData = args.data.slice(
    itemsPerPageCeiled * (pageCeiled - 1),
    itemsPerPageCeiled * pageCeiled
  );

  return {
    count: paginatedData.length,
    totalCount: args.data.length,
    currentPage: pageCeiled,
    numberOfPages,
    items: paginatedData,
  };
}
