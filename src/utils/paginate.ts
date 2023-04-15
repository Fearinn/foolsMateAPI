import { convertAndCeil } from "./convertAndCeil.js";

export function paginate<T = unknown>(args: {
  data: T[];
  page?: unknown;
  limit?: unknown;
}) {
  const limitCeiled = convertAndCeil(args.limit) || 10;

  const numberOfPages = convertAndCeil(args.data.length / limitCeiled);

  const pageCeiled =
    (convertAndCeil(args.page) || 1) > numberOfPages
      ? numberOfPages
      : convertAndCeil(args.page) || 1;

  const paginatedData = args.data.slice(
    limitCeiled * (pageCeiled - 1),
    limitCeiled * pageCeiled
  );

  return {
    count: paginatedData.length,
    totalCount: args.data.length,
    currentPage: pageCeiled,
    numberOfPages,
    items: paginatedData,
  };
}
