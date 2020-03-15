import express from "express";
import mime from "mime";

import { auth, common } from "../../../src/server/middleware";
import { MarkerModel } from "../../../src/server/models";

const app = express();

app.use(common);
app.use(auth);

app.use(async (req, res) => {
  const imageFilename = req.query.filename;
  const imageDoc = await MarkerModel.findOne(
    {
      imageFilename
    },
    "imageFilename image"
  );

  if (imageDoc) {
    res.contentType(mime.getType(imageDoc.imageFilename));

    res.send(imageDoc.image);
  } else {
    res.sendStatus(404);
  }
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default app;
