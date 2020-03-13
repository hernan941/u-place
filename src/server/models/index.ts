import dotenv from "dotenv";
import mongoose, { Document, model, Model } from "mongoose";

import { IMarker, User } from "../../interfaces";
import { MarkerSchema } from "./Marker";
import { UserSchema } from "./User";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

declare global {
  namespace NodeJS {
    interface Global {
      dbConnected?: true;
    }
  }
}
if (!global.dbConnected) {
  global.dbConnected = true;
  mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
}

mongoose.models = {};

export const UserModel: Model<User & Document> = model("User", UserSchema);

export const MarkerModel: Model<IMarker & Document> = model(
  "Markers",
  MarkerSchema
);
