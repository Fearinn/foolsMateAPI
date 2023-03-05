function dataFilter<T = unknown>(list: T[], body: Partial<T>) {
  let filteredList = list;
  for (const prop in body) {
    filteredList = filteredList.filter((item) => {
      if (body[prop] === "" && !item[prop]) return true;
      if (!body[prop]) return true;
      return item[prop] === body[prop];
    });
  }
  return filteredList;
}

export default dataFilter;
