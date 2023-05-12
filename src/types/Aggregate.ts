import mongoose from "mongoose";
import express from "express";

export type AggregateResponse = {
  totalData: unknown[];
  totalCount: {
    count: number;
  }[];
}[];

export type AggregateRequest<DocType = unknown> = {
  data?: mongoose.Aggregate<DocType>;
} & express.Request;
