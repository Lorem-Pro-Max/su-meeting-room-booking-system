import { Router } from "express";
import { getAllRoomsController } from "./controller.js";

const roomRouter = Router();

roomRouter.get("/", getAllRoomsController);

export default roomRouter;
