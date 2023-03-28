import express from "express";
import { instance } from "../../services/index.js";
import { IRoleIcon } from "../../types/RoleIcon.js";
import { isRoleIcon } from "../../utils//typeGuards/isRoleIcon.js";
import { dataFilter } from "../../utils/dataFilter.js";
import { filterByType } from "../../utils/filterByType.js";
import { paginate } from "../../utils/pagination.js";
import { isRarity } from "../../utils/typeGuards/isRarity.js";

export class RoleIconsController {
  static getAll = async (
    request: express.Request,
    response: express.Response
  ) => {
    try {
      const { data, status } = await instance.get("/items/roleIcons");

      if (!Array.isArray(data)) {
        throw new Error("Type of response data don't match the expected type");
      }

      const limit = request.query.limit;
      const page = request.query.page;
      const rarity = request.query.rarity;
      const roleId = request.query.roleId;

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
        filteredData,
        originalData: safeData,
        page,
        itemsPerPage: limit,
      });

      response.status(status).json(dataPage);
    } catch (error) {
      console.log(error);
      response
        .status(500)
        .send("An unexpected error occurred! Please try again later");
    }
  };
}
