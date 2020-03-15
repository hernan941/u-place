import { Router } from "express";
import ignoreWarnings from "ignore-warnings";
import morgan from "morgan";

export const common = Router();

common.use(morgan("combined"));
ignoreWarnings(["this may result in stalled requests"]);
