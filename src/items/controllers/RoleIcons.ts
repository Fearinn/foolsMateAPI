import express from "express";
import mongoose from "mongoose";
import { z } from "zod";
import { instance } from "../../common/services/index.js";
import { AggregateRequest } from "../../common/types/Aggregate.js";
import { ZRarity } from "../../common/types/Rarity.js";
import { BaseError } from "../../common/utils/errors/BaseError.js";
import { RoleIconModel } from "../models/RoleIcon.js";
import { RoleIcon, ZRoleIcon } from "../types/RoleIcon.js";
import { ZId } from "../../common/types/Id.js";

type PartialIcon = Partial<RoleIcon>;

export class RoleIconsController {
  static getAll = async (
    req: AggregateRequest<PartialIcon>,
    _: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const {
        id = null,
        rarity = null,
        roleId = null,
        event = null,
      } = req.query;

      const parsedId = ZId.nullable().parse(id);

      const parsedRarity = ZRarity.nullable().parse(rarity);

      const parsedRoleId = z
        .string()
        .nullable()
        .parse(roleId)
        ?.replace(/\s+/g, "-");

      const parsedEvent = z
        .string()
        .nullable()
        .parse(event)
        ?.replace(/\s+/g, "_");

      const filterBody: mongoose.FilterQuery<PartialIcon> = {};

      if (parsedId) filterBody.id = parsedId;

      if (parsedRoleId)
        filterBody.roleId = { $regex: parsedRoleId, $options: "im" };

      if (parsedRarity) filterBody.rarity = parsedRarity;

      if (parsedEvent)
        filterBody.event = { $regex: parsedEvent, $options: "im" };

      const data = RoleIconModel.aggregate<RoleIcon>([
        {
          $match: filterBody,
        },
      ]);

      const parsedData = z
        .instanceof(mongoose.Aggregate<PartialIcon>)
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

      const { authorization } = req.headers;

      if (authorization !== process.env["UPDATE_AUTHORIZATION"]) {
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
