import mongoose, { Connection, Model } from "mongoose";
import { FormSchema, FormDoc } from './schema/form'
import { UISchema, UIDoc } from './schema/ui'

export type DbModels = { Form: Model<FormDoc>; Screen: Model<UIDoc> };
export type DbContext = { conn: Connection; models: DbModels };

let cached: DbContext | null = null;

export async function connectMongo(uri: string): Promise<DbContext> {
  if (cached) return cached;
  await mongoose.connect(uri);                      // connect once
  const conn = mongoose.connection;

  const Form =
    (conn.models.Form as Model<FormDoc> | undefined) ??
    conn.model<FormDoc>('Form', FormSchema)

  const Screen =
    (conn.models.Screen as Model<UIDoc> | undefined) ??
    conn.model<UIDoc>('Screen', UISchema)

  if (!conn.db) {
    throw new Error("MongoDB connection is not established (conn.db is undefined)");
  }
  await conn.db.admin().command({ ping: 1 });
  cached = { conn, models: { Form, Screen } };
  return cached;
}

export async function closeMongo() {
  if (cached) { await cached.conn.close(); cached = null; }
}
