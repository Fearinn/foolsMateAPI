export function convertAndCeil(query: unknown) {
  if (!query) return NaN;
  const convertedQuery = Number(query);
  const ceiledQuery = Math.ceil(convertedQuery);
  return ceiledQuery;
}


