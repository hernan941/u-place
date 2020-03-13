import express from "express";

import { IMarker } from "../../src/interfaces";
import { common } from "../../src/server/middleware";
import { MarkerModel } from "../../src/server/models";
import { validation } from "../../src/server/utils/validation";

const app = express();
app.use(common);

app.use(
  validation({
    position: {
      isArray: {
        options: {
          min: 2,
          max: 2
        }
      }
    },
    "position.*": {
      isNumeric: true,
      toFloat: true
    },
    desc: {
      isString: true,
      optional: true
    },
    author: {
      isString: true,
      isLength: {
        options: {
          min: 3
        }
      }
    },
    image: {
      matches: {
        options: /^data:image\/(png|jpeg|jpg);base64,(.+)/
      }
    },
    imageFilename: {
      matches: {
        options: /\.(png|jpeg|jpg)$/i
      },
      isString: true
    }
  }),
  async (req, res) => {
    const { author, desc, image, imageFilename, position } = req.body as Pick<
      IMarker,
      "author" | "desc" | "imageFilename" | "position"
    > & { image: string };

    const imgBuffer = Buffer.from(image.split(",")[1], "base64");

    const imgDoc = await MarkerModel.findOneAndUpdate(
      { imageFilename: author + "_" + imageFilename },
      {
        author,
        desc,
        image: imgBuffer,
        position
      },
      {
        upsert: true,
        new: true
      }
    );

    res.send(
      await MarkerModel.findById(
        imgDoc._id,
        "_id author desc imageFilename points position"
      )
    );
  }
);

export default app;
