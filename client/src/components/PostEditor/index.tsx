import { useCallback, useState } from "react";
import { Box, Button } from "@mui/material";
import { PostData, UserData } from "../../types";
import { dateParser } from "../../utils/helpers";
import { PostContent } from "./postContent";
import { Preview } from "./imagePreview";
import { styles } from "./styles";
import "./style.css";

export const PostEditor = ({
  post = {
    id: -1,
    content: "",
    userId: -1,
    date: new Date().toString(),
  },
  user,
  onSubmit,
}: {
  post?: PostData;
  user: UserData | null | undefined;
  onSubmit?: (post: PostData) => void;
}) => {
  const [content, setContent] = useState(post.content);
  const [imgUrl, setImageUrl] = useState<string | undefined>(post.imageUrl);

  const handleImage = useCallback(
    (img: any) => {
      const src = img.currentTarget.value;
      setImageUrl(src);
    },
    [setImageUrl]
  );

  const handleContent = useCallback(
    (txt: any) => {
      const content = txt.currentTarget.value;
      setContent(content);
    },
    [setContent]
  );

  return (
    <Box sx={styles.preview}>
      <Preview imgUrl={imgUrl} handleImage={handleImage} />
      <PostContent content={content} onChange={handleContent} />
      {post.updated_at && <Box>Modified at: {dateParser(post.updated_at)}</Box>}
      <Button
        onClick={() => {
          if (user) {
            onSubmit &&
              onSubmit({
                ...post,
                userId: user?.id,
                content,
                imageUrl: imgUrl,
              });
          }
        }}
      >
        {post.id > 0 ? "Update" : "Create"}
      </Button>
    </Box>
  );
};
