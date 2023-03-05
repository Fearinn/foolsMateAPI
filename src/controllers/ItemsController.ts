import instance from "../services/index.js";
import express from "express";
import pagination from "../utils/pagination.js";
import { convertIntoAvatarItemsList } from "../utils/isAvatarItems.js";
import avatarItemsFilter from "../utils/avatarItemsFilter.js";
import IAvatarItem from "../types/AvatarItem.js";

class AvatarItemsController {
  static getAll = async (
    request: express.Request,
    response: express.Response
  ) => {
    try {
      const { data, status } = await instance.get("/items/avatarItems");

      if (!Array.isArray(data)) {
        throw new Error("Type of response data don't match the expected type");
      }

      const limit = request.query.limit;
      const page = request.query.page;
      const reqBody: IAvatarItem = request.body

      const safeData = convertIntoAvatarItemsList(data);
      const filteredData = avatarItemsFilter(safeData, reqBody);

      const dataPage = pagination<IAvatarItem>(filteredData, safeData, page, limit);

      response.status(status).json(dataPage);
    } catch (error) {
      console.log(error);
      response
        .status(501)
        .send("An unexpected error occurred! Please try again later");
    }
  };
}

// class AvatarItemsSetsController {
//   static getAll = async (
//     request: express.Request,
//     response: express.Response
//   ) => {
//     try {
//       const { data, status } = await instance.get("/items/avatarItemSets");
//       if (!Array.isArray(data)) {
//         throw new Error("Type of response data don't match the expected type");
//       }

//       const limit = request.query.limit;
//       const page = request.query.page;
//       const dataPage = pagination(data, page, limit);

//       response.status(status).json(dataPage);
//     } catch (error) {
//       console.log(error);
//       response
//         .status(501)
//         .send("An unexpected error occurred! Please try again later");
//     }
//   };
// }

// class RoleIconsController {
//   static getAll = async (
//     request: express.Request,
//     response: express.Response
//   ) => {
//     try {
//       const { data, status } = await instance.get("/items/roleIcons");
//       if (!Array.isArray(data)) {
//         throw new Error("Type of response data don't match the expected type");
//       }

//       const limit = request.query.limit;
//       const page = request.query.page;
//       const dataPage = pagination(data, page, limit);

//       response.status(status).json(dataPage);
//     } catch (error) {
//       console.log(error);
//       response
//         .status(501)
//         .send("An unexpected error occurred! Please try again later");
//     }
//   };
// }

export {
  AvatarItemsController,
  // AvatarItemsSetsController,
  // RoleIconsController,
};
