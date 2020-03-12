import { Document, Schema } from "mongoose";

import { IMarker } from "../../interfaces";

export const UserSchema = new Schema<IMarker & Document>({
  position: { type: [Number], required: true },
  desc: { type: String },
  author: { type: String, required: true },
  image: { type: Buffer, required: true },
  imageFilename: { type: String, required: true },
  points: { type: Number, default: 0 }
});
