import express from "express";
import mongoose from "mongoose";
import { z } from "zod";
import { instance } from "../../common/services/index.js";
import { AggregateRequest } from "../../common/types/Aggregate.js";
import { BaseError } from "../../common/utils/errors/BaseError.js";
import { RoleModel } from "../models/Role.js";
import { Role, ZAura, ZRole } from "../types/Role.js";

type PartialRole = Partial<Role>;

export class RolesController {
  static getAll = async (
    req: AggregateRequest<PartialRole>,
    _: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { id = null, name = null, team = null, aura = null } = req.query;

      const parsedId = z.string().nullable().parse(id);

      const parsedName = z.string().nullable().parse(name);

      const parsedTeam = z.string().nullable().parse(team)?.toUpperCase();

      const parsedAura = ZAura.nullable().parse(aura)?.toUpperCase();

      const filterBody: mongoose.FilterQuery<PartialRole> = {};

      if (parsedTeam) filterBody.team = parsedTeam;

      if (parsedAura) filterBody.team = parsedAura;

      if (parsedId) filterBody.id = { $regex: parsedId, $options: "im" };

      if (parsedName) filterBody.name = { $regex: parsedName, $options: "im" };

      const data = RoleModel.aggregate<Role>([
        {
          $match: filterBody,
        },
      ]);

      const parsedData = z
        .instanceof(mongoose.Aggregate<PartialRole>)
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
      const { data } = await instance.get<{ roles: Role[] }>("/roles");

      const { Authorization } = req.headers;

      if (Authorization === process.env["UPDATE_AUTHORIZATION"]) {
        throw new BaseError("Access unauthorized", 401);
      }

      const parsedData = ZRole.array().parse(data.roles);

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

      const result = await RoleModel.bulkWrite(dataInsertion, {
        ordered: false,
      });

      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };
}
