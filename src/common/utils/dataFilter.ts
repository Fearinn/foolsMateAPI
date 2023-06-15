export function dataFilter<T = unknown>(list: T[], body: Partial<T>) {
  let filteredList = list;
  for (const prop in body) {
    filteredList = filteredList.filter((item) => {
      if (
        body[prop] instanceof RegExp &&
        typeof item[prop] === "string" &&
        (body[prop] as RegExp).test(item[prop] as string)
      )
        return true;
      if (item[prop] === body[prop]) return true;
      if (body[prop] === "" && !item[prop]) return true;
      if (!body[prop] && body[prop] !== "") return true;
    });
  }
  return filteredList;
}
