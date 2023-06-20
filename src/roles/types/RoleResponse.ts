import { z } from "zod";
import { ZRole } from "./Role.js";

const ZRandoms = z.record(z.string().array());

const ZAdvanceds = z.record(z.string().array());

export const ZRoleResponse = z.object({
  roles: ZRole.array(),
  randomRolesMapping: ZRandoms,
  advancedRolesMapping: ZAdvanceds,
});

export type RoleResponse = z.infer<typeof ZRoleResponse>;
