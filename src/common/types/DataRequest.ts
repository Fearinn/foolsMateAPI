import express from "express";

export type DataRequest<T> = {
  data?: T[];
} & express.Request;
