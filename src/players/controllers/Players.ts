import express from "express";
import { instance } from "../../common/services/index.js";
import { Player, ZPlayer } from "../types/Player.js";
import { BadRequest } from "../../common/utils/errors/BadRequest.js";
import { NotFound } from "../../common/utils/errors/NotFound.js";
import { AxiosError } from "axios";
import { z } from "zod";

export class PlayersController {
  static searchByUsername = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { username = null, username2 = null } = req.query;
      const isValidUsername = z.string().min(3).safeParse(username).success;
      const isValidUsername2 = z.string().min(3).safeParse(username2).success;

      if (!isValidUsername) {
        next(
          new BadRequest("The query 'username' must be a valid player username")
        );
        return;
      }

      const players: Player[] = [];

      try {
        const { data: player1 } = await instance.get(
          `/players/search?username=${username}`
        );
        const parsedPlayer1 = ZPlayer.parse(player1);

        players.push(parsedPlayer1);
      } catch (err) {
        if (err instanceof AxiosError && err.response?.status === 404) {
          next(new NotFound(`player ${username}`));
        } else {
          next(err);
        }
        return;
      }

      if (isValidUsername2) {
        try {
          const { data: player2 } = await instance.get(
            `/players/search?username=${username2}`
          );

          const parsedPlayer2 = ZPlayer.parse(player2);

          players.push(parsedPlayer2);
        } catch (err) {
          if (err instanceof AxiosError && err.response?.status === 404) {
            next(new NotFound(`player ${username2}`));
          } else {
            next(err);
          }
          return;
        }
      }

      res.status(200).send(players);
    } catch (err) {
      next(err);
    }
  };
}
