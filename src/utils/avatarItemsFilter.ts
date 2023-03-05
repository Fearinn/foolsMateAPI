import IAvatarItem from "../types/AvatarItem";

function avatarItemsFilter(list: IAvatarItem[], body: IAvatarItem) {
  console.log(body);
  let filteredList = list;
  for (const prop in body) {
    filteredList = filteredList.filter((item) => {
      return (
        item[prop as keyof IAvatarItem] === body[prop as keyof IAvatarItem]
      );
    });
  }
  return filteredList;
}

export default avatarItemsFilter;
