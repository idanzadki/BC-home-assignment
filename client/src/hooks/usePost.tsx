import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Button } from "@mui/material";
import { useModal } from "../components/modal";
import { PostData, UserData } from "../types";
import {
  addNewPost,
  deletePost,
  getAllPosts,
  updatePost,
} from "../services/postServices";
import { PostEditor } from "../components";

export const usePost = ({
  user,
  onError,
}: {
  user?: UserData | null;
  error?: boolean;
  onError?: () => void;
  users: UserData[] | null;
}) => {
  const [posts, setPosts] = useState<PostData[]>([]);

  const sorted = useMemo(() => {
    return posts.sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      if (aDate < bDate) return 1;
      else if (aDate > bDate) return -1;
      return 0;
    });
  }, [posts]);

  const { openModal, closeModal } = useModal();

  const handleGetPosts = useCallback(async () => {
    try {
      const posts = await getAllPosts();
      setPosts(posts);
      return posts;
    } catch (error) {
      onError && onError;
      return false;
    }
  }, [setPosts]);

  const handleAddPost = useCallback(
    async (post: PostData) => {
      try {
        if (user) {
          const newPost: Omit<PostData, "id"> = { ...post, userId: user?.id };
          const n = await addNewPost(newPost);
          if (n) {
            setPosts(n);
            closeModal();
            return true;
          }
        }
      } catch (error: any) {
        closeModal();
        openModal("error", { title: "Error", text: `${error}` });
      }
    },
    [setPosts, user]
  );

  const handleDeletePost = useCallback(
    async (post?: PostData) => {
      openModal("default", {
        children: (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              padding: "10px",
              gap: 5,
            }}
          >
            <Box
              sx={{ fontSize: 30, fontWeight: "bold" }}
            >{`Are You Sure?`}</Box>
            <Box
              sx={{
                fontSize: 20,
                fontWeight: "300",
                width: 200,
                textAlign: "center",
              }}
            >{`this will delete this post and all it's content!`}</Box>
            <Button
              sx={{ border: "1px solid black", borderRadius: "10px" }}
              onClick={async () => {
                if (post) {
                  const res = await deletePost(post);
                  if (res) {
                    setPosts(res);
                    closeModal();
                  }
                }
              }}
            >
              Delete
            </Button>
          </Box>
        ),
      });
    },
    [setPosts]
  );

  const handleUpdatePost = useCallback(
    async (update: PostData) => {
      openModal("default", {
        children: (
          <PostEditor
            user={user}
            post={update}
            onSubmit={async (post) => {
              const res: PostData[] = await updatePost(post);
              if (res) {
                setPosts(res);
                closeModal();
              }
            }}
          />
        ),
      });
    },
    [setPosts]
  );

  const handleLike = useCallback(
    async (postId: number) => {
      let newOb: PostData | null = posts.find((i) => i.id === postId) || null;
      if (newOb && user) {
        if (newOb.likes) {
          if (!newOb.likes.includes(user.id))
            newOb = { ...newOb, likes: [...newOb.likes, user.id] };
          else
            newOb = {
              ...newOb,
              likes: newOb.likes.filter((i) => i !== user.id),
            };
        } else newOb = { ...newOb, likes: [user.id] };
        const res = await updatePost(newOb);
        res && setPosts(res);
      }
    },
    [posts, setPosts, user]
  );

  useEffect(() => {
    handleGetPosts();
  }, []);

  return {
    posts,
    sorted,
    handleUpdatePost,
    handleGetPosts,
    handleAddPost,
    handleLike,
    handleDeletePost,
  };
};
