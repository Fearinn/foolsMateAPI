import express from "express";
import { instance } from "../../services/index.js";
import { TDataRequest } from "../../types/DataRequest.js";
import { IRoleIcon } from "../../types/RoleIcon.js";
import { isRoleIcon } from "../../utils//typeGuards/isRoleIcon.js";
import { dataFilter } from "../../utils/dataFilter.js";
import { BaseError } from "../../utils/errors/BaseError.js";
import { filterByType } from "../../utils/filterByType.js";
import { isRarity } from "../../utils/typeGuards/isRarity.js";

export class RoleIconsController {
  static getAll = async (
    request: TDataRequest<IRoleIcon>,
    _: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { data } = await instance.get("/items/roleIcons");

      if (!Array.isArray(data)) {
        throw new BaseError(
          "Type of response data doesn't match the expected type"
        );
      }

      const { rarity, roleId } = request.query;

      const filterBody: Partial<IRoleIcon> = {
        rarity: isRarity(rarity) ? rarity : undefined,
        roleId:
          typeof roleId === "string"
            ? new RegExp(roleId.replace(/\s+/g, "-"), "i")
            : undefined,
      };

      const safeData = filterByType<IRoleIcon>(data, isRoleIcon);
      const filteredData = dataFilter<IRoleIcon>(safeData, filterBody);

      request.data = filteredData;
      next();
    } catch (err) {
      next(err);
    }
  };
}
