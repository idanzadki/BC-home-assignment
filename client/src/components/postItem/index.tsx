import { Box, Card, IconButton, Tooltip } from "@mui/material";
import { PostData, UserData } from "../../types";
import { likesParser } from "../../utils/helpers";
import { useModal } from "../modal";
import { PostEditor } from "../PostEditor";
import { PostHeader } from "./postHeader";
import { PostTools } from "./postTools";

export const PostItem = ({
  post,
  user,
  users,
  postUser,
  handleLike,
  onEdit,
  onDelete,
}: {
  post: PostData;
  user: UserData;
  users: UserData[];
  postUser: UserData | null;
  handleLike: (postId: number) => void;
  onEdit: (item: PostData) => void;
  onDelete: (item: PostData) => void;
}) => {
  const likes = likesParser(users, post, user) || "";

  return (
    <Card sx={{ width: "600px" }}>
      <PostHeader postUser={postUser} post={post} />
      <img
        style={{ width: "100%", margin: "10px" }}
        alt={""}
        src={post.imageUrl}
      />
      <Box sx={{ direction: "ltr", margin: "15px" }}>{post.content}</Box>
      <PostTools
        onUpdate={onEdit}
        onLike={handleLike}
        onDelete={onDelete}
        likes={likes}
        user={user}
        post={post}
      />
    </Card>
  );
};
