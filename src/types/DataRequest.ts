import express from "express";

export type TDataRequest<T> = {
  data?: T[];
} & express.Request;
