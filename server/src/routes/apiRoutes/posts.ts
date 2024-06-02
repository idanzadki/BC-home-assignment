
import { Router } from "express";
import { addNewPost, allPosts, deletePost, updatePost } from "../../services/postServices";

export const postRouter = Router()

postRouter.get("/", allPosts);


postRouter.post("/api/posts", addNewPost);

postRouter.put("/api/posts", updatePost);


postRouter.delete("/api/deletePost/:id", deletePost);
