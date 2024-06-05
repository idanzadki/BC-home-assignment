import { Box, IconButton, Tooltip } from "@mui/material";
import { PostData, UserData } from "../../../types";
import { useModal } from "../../modal";
import { Delete, Edit, ThumbUp } from "@mui/icons-material";
import { ContionalWrapper } from "../../conditionalWrapper";
import { MyButton } from "../../button";
import { styles } from "./styles";

export const PostTools = ({
  post,
  user,
  likes,
  onLike,
  onUpdate,
  onDelete,
}: {
  post: PostData;
  user: UserData;
  likes: string;
  onLike?: (postId: number) => void;
  onUpdate?: (post: PostData) => void;
  onDelete?: (post: PostData) => void;
}) => {
  const { openModal } = useModal();

  return (
    <Box sx={styles.postTools}>
      {user?.id === post?.userId ? (
        <Box>
          <MyButton
            icon={<Edit color="action" />}
            onClick={() => onUpdate && onUpdate(post)}
          />
          <MyButton
            icon={<Delete color="action" />}
            onClick={() => onDelete && onDelete(post)}
          />
        </Box>
      ) : (
        <div style={{ width: 40 }} />
      )}

      <ContionalWrapper
        title={likes}
        condition={post.likes && post.likes?.length > 0}
      >
        <IconButton
          onClick={() => {
            post && post.id && onLike && onLike(post?.id);
          }}
          sx={{}}
        >
          <ThumbUp
            color={
              user && post?.likes?.includes(user?.id) ? "primary" : "action"
            }
          />
          <Box sx={styles.likes}>
            <Box sx={styles.likeText}>{post?.likes?.length || 0}</Box>
          </Box>
        </IconButton>
      </ContionalWrapper>
    </Box>
  );
};
