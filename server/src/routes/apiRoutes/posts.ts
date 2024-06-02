
import { Router } from "express";
import { addNewPost, allPosts, deletePost, updatePost } from "../../services/postServices";

export const postRouter = Router()

postRouter.get("/", allPosts)
    .post("/", addNewPost)
    .put("/", updatePost)
    .delete("/delete/:id", deletePost);
