import mongoose from "mongoose";
import { TAggregateResponse } from "../types/Aggregate";

export async function paginateDb(
  data: mongoose.Aggregate<TAggregateResponse>,
  page = 1,
  limit = 10
) {
  const dbPagination = await data
    .facet({
      totalData: [{ $skip: limit * (page - 1) }, { $limit: limit }],
      totalCount: [{ $count: "count" }],
    })
    .exec();

  const totalData = dbPagination[0].totalData;
  const totalCount =
    totalData.length > 0 ? dbPagination[0].totalCount[0].count : 0;
  const numberOfPages = Math.ceil(totalCount / limit);
  const realPage = page > numberOfPages ? numberOfPages : page;

  const paginatedData = {
    count: totalData.length,
    totalCount,
    numberOfPages,
    currentPage: realPage,
    items: totalData,
  };

  return paginatedData;
}
