import express from "express";
import { instance } from "../../services/index.js";
import { IRoleIcon } from "../../types/RoleIcon.js";
import { isRoleIcon } from "../../utils//typeGuards/isRoleIcon.js";
import { dataFilter } from "../../utils/dataFilter.js";
import { filterByType } from "../../utils/filterByType.js";
import { paginate } from "../../utils/pagination.js";
import { isRarity } from "../../utils/typeGuards/isRarity.js";
import { BaseError } from "../../utils/errors/BaseError.js";

export class RoleIconsController {
  static getAll = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { data, status } = await instance.get("/items/roleIcons");

      if (!Array.isArray(data)) {
        throw new BaseError(
          "Type of response data doesn't match the expected type"
        );
      }

      const { limit, page, rarity, roleId } = request.query;

      const filterBody: Partial<IRoleIcon> = {
        rarity: isRarity(rarity) ? rarity : undefined,
        roleId:
          typeof roleId === "string"
            ? new RegExp(roleId.replace(/\s+/g, "-"), "i")
            : undefined,
      };

      const safeData = filterByType<IRoleIcon>(data, isRoleIcon);
      const filteredData = dataFilter<IRoleIcon>(safeData, filterBody);

      const dataPage = paginate<IRoleIcon>({
        data: filteredData,
        page,
        itemsPerPage: limit,
      });

      response.status(status).json(dataPage);
    } catch (err) {
      next(err);
    }
  };
}
