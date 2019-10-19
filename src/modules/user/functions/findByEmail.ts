import * as admin from "firebase-admin";
import { errors } from "../../../utils/response";
import { auth } from "../../../vendors/firebase";
import UserRecord = admin.auth.UserRecord;

export default async (email: string): Promise<UserRecord | Error> =>
  await auth.getUserByEmail(email).catch(errors);
