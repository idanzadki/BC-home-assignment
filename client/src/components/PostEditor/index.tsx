import { useCallback, useEffect, useState } from "react";
import { Box, Button, Card, Input } from "@mui/material";
import { PostData, UserData } from "../../types";
import { useModal } from "../modal";
import "./styles.css";

export const PostEditor = ({
  post = {
    id: 1,
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
  const [content, setContent] = useState(post?.content || "");
  const [imgUrl, setImageUrl] = useState(post?.imageUrl || "");
  const [imgPreview, setImagePreview] = useState(post.imageUrl);

  const { closeModal } = useModal();

  const handleImage = useCallback(
    (img: any) => {
      const src = img.currentTarget.value;
      setImageUrl(src);
    },
    [setImageUrl]
  );
  const handleImagePreview = useCallback(
    (img: any) => {
      setImagePreview(img);
    },
    [setImagePreview]
  );

  const handleContent = useCallback(
    (txt: any) => {
      const content = txt.currentTarget.value;
      setContent(content);
    },
    [setContent]
  );

  return (
    <Box sx={{ direction: "ltr" }}>
      {/* <Box sx={{ border: "1px solid black" }}>{user?.id || "No User"}</Box> */}
      <Box sx={{ justifyContent: "center", alignItems: "center" }}>
        <Card
          sx={{
            border: "1px solid black",
            height: 400,
            maxWidth: 400,
            margin: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {imgPreview ? (
            <Box
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {imgUrl.length > 0 ? (
                <img
                  style={{ height: 400, width: 400 }}
                  src={imgUrl}
                  alt={"Post Image"}
                />
              ) : (
                <Box sx={{ textAlign: "" }}>No Image</Box>
              )}
            </Box>
          ) : (
            <Box>Press On Preview</Box>
          )}
        </Card>

        <Box
          sx={{
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>Image Url:</Box>
          <Input
            type="text"
            placeholder="Select Image url"
            sx={{
              padding: "5px",
              margin: "5px",
            }}
            value={imgUrl}
            onChange={handleImage}
          />
        </Box>
      </Box>
      <Button onClick={handleImagePreview}>Preview</Button>
      <textarea
        placeholder="New Post"
        style={{
          background: "none",
          resize: "none",
          direction: "ltr",
          width: "100%",
          height: "300px",
          // border: "none",
          padding: "20px",
          border: "1px solid black",
        }}
        onChange={handleContent}
        value={content}
      />
      {post.updated_at && (
        <Box>
          Last Modified: {new Date(post.updated_at).toLocaleDateString()}
        </Box>
      )}
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
        Save
      </Button>
    </Box>
  );
};
