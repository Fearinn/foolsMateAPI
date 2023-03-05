function dataFilter<T = unknown>(list: T[], body: Partial<T>) {
  console.log(body);
  let filteredList = list;
  for (const prop in body) {
    if (!body[prop as keyof T]) {
      continue;
    }
    filteredList = filteredList.filter((item) => {
      return (
        item[prop as keyof T] === body[prop as keyof T]
      );
    });
  }
  return filteredList;
}

export default dataFilter;
