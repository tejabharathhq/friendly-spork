import { Collection, MongoClient } from "mongodb";
import { getDatabaseUri } from "../utils/config";
import type { UserDoc } from "../types/user";
import type { SessionDoc } from "../types/session";

const client = new MongoClient(getDatabaseUri());
export const connectDb = async () => {
  await client.connect();
  console.log("Connected to the DB ✅");
};

const db = client.db();
const User = db.collection("users") as Collection<UserDoc>;
const Session = db.collection("sessions") as Collection<SessionDoc>;

export const getUserDb = () => User;

export const getSessionDb = () => Session;

export const getDb = () => db;
