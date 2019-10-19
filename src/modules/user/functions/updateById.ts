import * as admin from "firebase-admin";
import { errors } from "../../../utils/response";
import { auth } from "../../../vendors/firebase";
import UpdateRequest = admin.auth.UpdateRequest;
import UserRecord = admin.auth.UserRecord;

export default async (uid: string, props: UpdateRequest): Promise<UserRecord | Error> =>
  await auth.updateUser(uid, props).catch(errors);
