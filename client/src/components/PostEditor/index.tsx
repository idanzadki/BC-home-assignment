import { useCallback, useEffect, useState } from "react";
import { Box, Button, Card, Input } from "@mui/material";
import { PostData, UserData } from "../../types";
import { useModal } from "../modal";
import "./styles.css";
import { Image } from "@mui/icons-material";

const nadinePic =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fih1.redbubble.net%2Fimage.3118230836.9249%2Fflat%2C750x%2C075%2Cf-pad%2C750x1000%2Cf8f8f8.jpg&f=1&nofb=1&ipt=53afd58b7e63952f2bef953f2f630de1d383d36e14ca0e1fd4f863a09931079a&ipo=images";

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

  useEffect(() => {
    console.log("post: ", post);
  }, []);

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
          }}
        >
          {imgPreview ? (
            <img
              style={{ height: 400, width: 400 }}
              src={imgUrl}
              alt={"Post Image"}
            />
          ) : (
            <Box />
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
      <Button
        onClick={() => {
          if (user) {
            onSubmit &&
              onSubmit({ ...post, id: user?.id, content, imageUrl: imgUrl });
          }
        }}
      >
        Save
      </Button>
    </Box>
  );

  // return (
  //   <div
  //     style={{
  //       display: "flex",
  //       flex: 1,
  //       flexDirection: "column",
  //       alignItems: "center",
  //       direction: "rtl",
  //     }}
  //   >
  //     {post ? (
  //       <div>
  //         <h2>{new Date(post?.date || "").toLocaleDateString()}</h2>
  //       </div>
  //     ) : (
  //       <div>Create New Post</div>
  //     )}

  //     <div
  //       style={{
  //         padding: "10px",
  //       }}
  //     >
  //       <div
  //         style={{
  //           display: "flex",
  //           flexDirection: "column",
  //           background: "white",
  //           border: "1px solid black",
  //           marginTop: "10px",
  //           height: "auto",
  //           width: "100%",
  //           minWidth: "300px",
  //           maxWidth: "800px",
  //           borderRadius: "15px",
  //           boxShadow: "1px 4px 9px",
  //         }}
  //       >
  //         <textarea
  //           style={{
  //             background: "none",
  //             resize: "none",
  //             direction: "rtl",
  //             width: "100%",
  //             height: "300px",
  //             // border: "none",
  //             padding: "20px",
  //             border: "1px solid black",
  //           }}
  //           onChange={(val) => {
  //             console.log(val.currentTarget.value);
  //             setMyText(val.currentTarget.value);
  //           }}
  //           value={myText}
  //         />
  //       </div>
  //     </div>
  //     <Button
  //       onClick={() => {
  //         let newPost: PostData;
  //         if (post) {
  //           newPost = {
  //             ...post,
  //             content: myText,
  //             userId: user?.id,
  //             date: new Date().toString(),
  //           };
  //         } else {
  //           newPost = {
  //             content: myText,
  //             userId: user?.id,
  //             date: new Date().toString(),
  //           };
  //         }
  //         onSubmit && onSubmit(newPost);
  //       }}
  //     >
  //       Save
  //     </Button>
  //   </div>
  // );
};
