import express from "express";
import mongoose from "mongoose";
import { z } from "zod";
import { RoleIconModel } from "../../models/RoleIcon.js";
import { instance } from "../../services/index.js";
import { TAggregateRequest } from "../../types/Aggregate.js";
import { ZRarity } from "../../types/Rarity.js";
import { ZRoleIcon } from "../../types/RoleIcon.js";
import { BaseError } from "../../utils/errors/BaseError.js";
import { ZId } from "../../types/Id.js";

const partialIcon = ZRoleIcon.partial();

export class RoleIconsController {
  static getAll = async (
    req: TAggregateRequest<z.infer<typeof partialIcon>>,
    _: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { rarity = null, roleId = null } = req.query;

      const parsedRarity = ZRarity.nullable().parse(rarity);

      const parsedRoleId = ZId.nullable().parse(roleId)?.replace(/\s+/g, "-");

      const filterBody: mongoose.FilterQuery<z.infer<typeof partialIcon>> = {};

      if (parsedRoleId) filterBody.roleId = parsedRoleId;

      if (parsedRarity)
        filterBody.rarity = { $regex: parsedRoleId, $options: "im" };

      const data = RoleIconModel.aggregate<z.infer<typeof partialIcon>>([
        {
          $match: filterBody,
        },
      ]);

      const parsedData = z
        .instanceof(mongoose.Aggregate<z.infer<typeof partialIcon>>)
        .parse(data);

      req.data = parsedData;
      next();
    } catch (err) {
      next(err);
    }
  };

  static updateAll = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { data } = await instance.get("/items/roleIcons");

      const { Authorization } = req.headers;

      if (Authorization === process.env["UPDATE_AUTHORIZATION"]) {
        throw new BaseError("Access unauthorized", 401);
      }

      const parsedData = ZRoleIcon.array().parse(data);

      const dataInsertion = parsedData.map((item) => {
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

      const result = await RoleIconModel.bulkWrite(dataInsertion, {
        ordered: false,
      });

      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };
}
