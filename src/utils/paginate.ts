export function paginate<T = unknown>(data: T[], page = 1, limit = 10) {
  const limitCeiled = Math.ceil(limit) || 10;

  const numberOfPages = Math.ceil(data.length / limitCeiled);

  const pageCeiled =
    (Math.ceil(page) || 1) > numberOfPages
      ? numberOfPages
      : Math.ceil(page) || 1;

  const paginatedData = data.slice(
    limitCeiled * (pageCeiled - 1),
    limitCeiled * pageCeiled
  );

  return {
    count: paginatedData.length,
    totalCount: data.length,
    currentPage: pageCeiled,
    numberOfPages,
    items: paginatedData,
  };
}
