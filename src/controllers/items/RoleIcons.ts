import express from "express";
import { z } from "zod";
import { instance } from "../../services/index.js";
import { TDataRequest } from "../../types/DataRequest.js";
import { ZRarity } from "../../types/Rarity.js";
import { ZRoleIcon } from "../../types/RoleIcon.js";
import { dataFilter } from "../../utils/dataFilter.js";

export class RoleIconsController {
  static getAll = async (
    request: TDataRequest<typeof ZRoleIcon>,
    _: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { data } = await instance.get("/items/roleIcons");

      const { rarity, roleId } = request.query;

      const parsedData = ZRoleIcon.array().parse(data);

      const parsedRoleId = z
        .string()
        .optional()
        .parse(roleId)
        ?.replace(/\s+/g, "-");

      const filterBody = {
        rarity: ZRarity.optional().parse(rarity),
        roleId: parsedRoleId ? new RegExp(parsedRoleId, "i") : undefined,
      };

      const filteredData = dataFilter<z.infer<typeof ZRoleIcon>>(
        parsedData,
        filterBody
      );

      request.data = filteredData;
      next();
    } catch (err) {
      next(err);
    }
  };
}
