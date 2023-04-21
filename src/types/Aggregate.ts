import mongoose from "mongoose";
import express from "express";

export type TAggregateResponse = {
  totalData: unknown[];
  totalCount: {
    count: number;
  }[];
}[];

export type TAggregateRequest<DocType = unknown> = {
  data?: mongoose.Aggregate<DocType>;
} & express.Request;
