function dataFilter<T = unknown>(list: T[], body: Partial<T>) {
  let filteredList = list;
  for (const prop in body) {
    filteredList = filteredList.filter((item) => {
      if (item[prop] === body[prop]) return true;
      if (body[prop] === "" && !item[prop]) return true;
      if (!body[prop] && body[prop] !== "") return true;
    });
  }
  return filteredList;
}

export default dataFilter;
