import { z } from "zod";

const ZGameMode = z.enum([
  "quick",
  "sandbox",
  "advanced",
  "ranked-league-silver",
  "ranked-league-gold",
  "crazy-fun",
]);

export const ZRotation = z.object({
  gameMode: ZGameMode,
  roleRotations: z
    .object({
      roleRotation: z.object({
        id: z.string(),
        roles: z
          .object({
            role: z.string().optional(),
            roles: z.string().array().optional(),
          })
          .array()
          .array(),
      }),
    })
    .array(),
});

export const ZRotationResponse = z
  .object({
    gameMode: ZGameMode,
    roleRotations: z
      .object({
        id: z.string(),
        roles: z.string().array(),
      })
      .array(),
  })
  .array();

export type Rotation = z.infer<typeof ZRotation>;

export type RotationResponse = z.infer<typeof ZRotationResponse>;
