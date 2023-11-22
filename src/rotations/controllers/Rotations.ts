import express from "express";
import { instance } from "../../common/services/index.js";
import { ZRotation, ZRotationResponse } from "../types/RoleRotations.js";

export class RotationsController {
  static getAll = async (
    _: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { data } = await instance.get(`/roleRotations`);

      const parsedRotations = ZRotation.array().parse(data);

      const response = parsedRotations.map((item) => {
        const formattedRoles: string[] = [];

        item.roleRotations.forEach((rotation) => {
          rotation.roleRotation.roles.forEach((item) => {
            return item.forEach((innerObject) => {
              if (innerObject.roles) {
                formattedRoles.concat(innerObject.roles);
                return;
              }

              if (innerObject.role) {
                formattedRoles.push(innerObject.role);
              }
            });
          });
        });

        const newItems: { id: string; roles: string[] }[] = [];

        item.roleRotations.forEach((rotation) => {
          newItems.push({
            id: rotation.roleRotation.id,
            roles: Array.from(new Set(formattedRoles)),
          });
        });

        return { ...item, roleRotations: newItems };
      });

      const parsedResponse = ZRotationResponse.parse(response);

      res.status(200).send(parsedResponse);
    } catch (err) {
      next(err);
    }
  };
}
