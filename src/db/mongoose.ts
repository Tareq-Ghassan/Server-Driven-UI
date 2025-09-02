import mongoose, { Connection, Model } from "mongoose";
import { StepperSchema, StepperDoc } from "./schema/stepper";

export type DbModels = { Stepper: Model<StepperDoc> };
export type DbContext = { conn: Connection; models: DbModels };

let cached: DbContext | null = null;

export async function connectMongo(uri: string): Promise<DbContext> {
  if (cached) return cached;
  await mongoose.connect(uri);                      // connect once
  const conn = mongoose.connection;

  const Stepper =
    (conn.models.Stepper as Model<StepperDoc> | undefined) ??
    conn.model<StepperDoc>("Stepper", StepperSchema);
  if (!conn.db) {
    throw new Error("MongoDB connection is not established (conn.db is undefined)");
  }
  await conn.db.admin().command({ ping: 1 });
  cached = { conn, models: { Stepper } };
  return cached;
}

export async function closeMongo() {
  if (cached) { await cached.conn.close(); cached = null; }
}
