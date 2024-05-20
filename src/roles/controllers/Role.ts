import express from "express";
import mongoose from "mongoose";
import { z } from "zod";
import { instance } from "../../common/services/index.js";
import { AggregateRequest } from "../../common/types/Aggregate.js";
import { BaseError } from "../../common/utils/errors/BaseError.js";
import { RoleModel } from "../models/Role.js";
import { Role, ZAura } from "../types/Role.js";
import { RoleResponse, ZRoleResponse } from "../types/RoleResponse.js";

type PartialRole = Partial<Role>;

export class RolesController {
  static getAll = async (
    req: AggregateRequest<PartialRole>,
    _: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const {
        id = null,
        name = null,
        team = null,
        aura = null,
        advancedRoles = null,
        possibleRoles = null,
      } = req.query;

      const parsedId = z.string().nullable().parse(id);

      const parsedName = z.string().nullable().parse(name);

      const parsedTeam = z.string().nullable().parse(team)?.toUpperCase();

      const parsedAura = ZAura.nullable().parse(aura)?.toUpperCase();

      const parsedAdvancedRoles = z
        .string()
        .nullable()
        .parse(advancedRoles)
        ?.split(":");

      const parsedPossibleRoles = z
        .string()
        .nullable()
        .parse(possibleRoles)
        ?.split(":");

      const filterBody: mongoose.FilterQuery<PartialRole> = {};

      if (parsedTeam) filterBody.team = parsedTeam;

      if (parsedAura) filterBody.aura = parsedAura;

      if (parsedId) filterBody.id = { $regex: parsedId, $options: "im" };

      if (parsedName) filterBody.name = { $regex: parsedName, $options: "im" };

      if (parsedAdvancedRoles)
        filterBody.advancedRoles = { $all: parsedAdvancedRoles };

      if (parsedPossibleRoles)
        filterBody.possibleRoles = { $all: parsedPossibleRoles };

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
      const { authorization } = req.headers;

      if (authorization !== process.env["UPDATE_AUTHORIZATION"]) {
        throw new BaseError("Access unauthorized", 401);
      }

      const { data } = await instance.get<RoleResponse>("/roles");

      const parsedData = ZRoleResponse.parse(data);

      parsedData.roles = parsedData.roles.map((role) => {
        if (
          role.id.split("-").includes("random") &&
          parsedData.randomRolesMapping[role.id]
        ) {
          role.possibleRoles = parsedData.randomRolesMapping[role.id];
          role.description = role.description.replace(
            /\{0\}/g,
            z.coerce.string().parse(role.possibleRoles).replaceAll(",", ", ")
          );
        }
        return role;
      });

      parsedData.roles = parsedData.roles.map((role) => {
        if (parsedData.advancedRolesMapping[role.id]) {
          role.advancedRoles = parsedData.advancedRolesMapping[role.id];
        }

        return role;
      });

      const dataInsertion = parsedData.roles.map((item) => {
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

      await RoleModel.bulkWrite(dataInsertion, {
        ordered: false,
      });

      const result = "";

      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };
}
