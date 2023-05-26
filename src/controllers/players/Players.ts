import express from "express";
import { instance } from "../../services/index.js";
import { Player, ZPlayer } from "../../models/types/Player.js";
import { BadRequest } from "../../utils/errors/BadRequest.js";
import { NotFound } from "../../utils/errors/NotFound.js";
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
      const isValidUsername = z.string().min(1).safeParse(username).success;

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

      if (username2) {
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
