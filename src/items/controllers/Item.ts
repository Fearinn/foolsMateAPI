import express from "express";
import { instance } from "../../common/services/index.js";
import { BaseError } from "../../common/utils/errors/BaseError.js";
import { ItemModel } from "../models/Item.js";
import { ZItem } from "../types/Item.js";

export { AvatarItemsController } from "./AvatarItems.js";
export { BackgroundsController } from "./Backgrounds.js";
export { LoadingScreensController } from "./LoadingScreens.js";
export { RoleIconsController } from "./RoleIcons.js";

export class ItemController {
  static updateAll = async (
    req: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { authorization } = req.headers;

      if (authorization !== process.env["UPDATE_AUTHORIZATION"]) {
        throw new BaseError("Access unauthorized", 401);
      }

      const { data: avatarItems } = await instance.get("items/avatarItems");

      const { data: roleIcons } = await instance.get("items/roleIcons");

      const { data: emojis } = await instance.get("items/emojis");

      const { data: loadingScreens } = await instance.get(
        "items/loadingScreens"
      );

      const parsedAvatarItems = ZItem.array().parse(avatarItems);

      const parsedRoleIcons = ZItem.array().parse(roleIcons);

      const parsedLoadingScreens = ZItem.array().parse(loadingScreens);

      const parsedEmojis = ZItem.array().parse(emojis);

      const finalData = parsedAvatarItems
        .concat(parsedLoadingScreens)
        .concat(parsedRoleIcons)
        .concat(parsedEmojis);

      const dataInsertion = finalData.map((item) => {
        return {
          updateOne: {
            filter: { id: item.id },
            upsert: true,
            document: item,
            update: {
              $set: item,
            },
          },
        };
      });

      const result = await ItemModel.bulkWrite(dataInsertion, {
        ordered: false,
      });

      response.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };
}
