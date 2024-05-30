import { Box, IconButton, Tooltip } from "@mui/material";
import { useUser } from "../../hooks/useUser";
import { useModal } from "../../components/modal";
import { styles } from "./styles";
import { Layout } from "../../components/layout";
import { PostEditor, UserAvatar } from "../../components";
import { usePost } from "../../hooks/usePost";
import { useEffect, useState } from "react";
import { PostData } from "../../types";
import { Delete, Edit, ThumbUp } from "@mui/icons-material";

const Home = () => {
  const [error, setError] = useState<boolean | string>(false);
  const { users = false, user, handleSwitchUser } = useUser();
  const { handleAddPost, handleLike, handleDeletePost, posts } = usePost();
  const { openModal } = useModal();

  const PostContent = ({ post }: { post?: PostData }) => (
    <Box>{post && post.content}</Box>
    // <div
    //   style={{
    //     // border: "1px solid black",
    //     color: "gray",
    //     padding: 10,
    //     // textAlign: "center",
    //   }}
    // >
    // </div>
  );

  const PostImage = ({ url }: { url?: string }) => {
    return url ? (
      // <img width={600} alt={i.imageUrl} src={user.avatar} />
      <img
        style={{ maxWidth: 600, margin: 10 }}
        // width={600}
        alt={url}
        src={url}
      />
    ) : (
      <Box>No Image</Box>
    );
  };

  const PostTools = ({ post }: { post?: PostData }) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: 10,
        }}
      >
        {user?.id === post?.userId ? (
          <div style={{ display: "flex" }}>
            <IconButton
              onClick={() => {
                console.log("onEdit: ", post);
              }}
            >
              <Edit color="action" />
            </IconButton>
            <IconButton
              onClick={() => {
                openModal("error", {
                  title: `Delete ${post?.id}`,
                  text: "Are You Sure?",
                  onSubmit: () => handleDeletePost(post),
                });
              }}
            >
              <Delete color="action" />
            </IconButton>
          </div>
        ) : (
          <div style={{ width: 40 }} />
        )}

        <Tooltip
          title={post?.likes
            ?.map((i) => {
              const ob = users.find((j) => j.id === i);
              return ob?.name || i;
            })
            .join(`${" , "}`)}
        >
          <div
            style={{ display: "flex" }}
            onClick={() => {
              console.log("onLike: ", post);
              post && post.id && handleLike(post?.id);
            }}
          >
            <ThumbUp
              color={
                user && post?.likes?.includes(user?.id) ? "primary" : "action"
              }
            />
            <div
              style={{
                // display: "flex",
                height: 25,
                width: 25,
                borderRadius: 30,
                background: "blue",
                position: "relative",
                bottom: 15,
                textAlign: "center",
                color: "white",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {post?.likes?.length || 0}
            </div>
          </div>
        </Tooltip>
      </div>
    );
  };

  const PostHeader = ({ post }: { post: PostData }) => {
    const postUser = users.find((i) => i.id === post.userId);

    return (
      <div
        style={{
          // border: "1px solid black",
          display: "flex",
          gap: 5,
          padding: 10,
          margin: 10,
          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        {postUser && (
          <div>
            <UserAvatar user={postUser} className="user-avatar" />
            <div>{postUser?.name}</div>
            <div style={{ color: "gray" }}>
              {`${new Date(post.date).toLocaleDateString()}
      ${new Date(post.date).toLocaleTimeString()}`}
            </div>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (!users) {
      setError("No Users");
    } else if (error) {
      console.log("Main Arror");
    } else {
      // console.log("Main Users: ", users);
      console.log("User: ", user);
    }
  }, [error, users, user, setError]);

  return (
    <Layout
      user={user}
      onSwitchUser={handleSwitchUser}
      onNewPost={(post) => {
        handleAddPost(post);
      }}
    >
      {error ? (
        <Box>Error {error}</Box>
      ) : (
        <Box sx={styles.posts_wrapper}>
          {posts.length > 0 ? (
            posts.map((i) => (
              <div
                key={i.id}
                style={{
                  display: "flex",
                  // border: "1px solid black",
                  margin: 10,
                  flexDirection: "column",
                  borderRadius: 5,
                  boxShadow: " 0.5px 0.5px 0.5px",
                }}
              >
                <PostHeader post={i} />
                {i.imageUrl && <PostImage url={i.imageUrl} />}
                <PostContent post={i} />
                <PostTools post={i} />
              </div>
            ))
          ) : (
            <Box>No Posts yet...</Box>
          )}
        </Box>
      )}
    </Layout>
  );
};

export default Home;
