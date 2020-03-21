import express from "express";

import { auth, common } from "../../src/server/middleware";
import { MarkerModel } from "../../src/server/models";

const app = express();

app.use(common);
app.use(auth);

app.use(async (_req, res) => {
  res.send(
    await MarkerModel.find(
      {},
      "position desc points _id author imageFilename"
    ).sort({ _id: -1 })
  );
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default app;
