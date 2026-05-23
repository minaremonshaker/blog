import { Router } from "express";
import * as postService from "./posts.service.js";
import { requestsAsyncHandler } from "../../utils/asyncHandler.js";
import Auth from "../../middlewares/auth.middleware.js";

const postRouter = Router();

postRouter.use(Auth);
postRouter.get("/", requestsAsyncHandler(postService.index));
postRouter.get("/:id", requestsAsyncHandler(postService.show));
postRouter.post("/", requestsAsyncHandler(postService.store));
postRouter.patch("/:id", requestsAsyncHandler(postService.store));
postRouter.delete("/:id", requestsAsyncHandler(postService.store));

export default postRouter;
