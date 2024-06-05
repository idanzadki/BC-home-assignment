import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Layout } from "../../components/layout";
import { useModal } from "../../components/modal";
import { useUser } from "../../hooks/useUser";
import { usePost } from "../../hooks/usePost";
import { PostItem } from "../../components/postItem";
import { styles } from "./styles";

const Home = () => {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean | string>(true);

  const {
    users = [],
    user,
    handleSwitchUser,
  } = useUser({
    error,
    onError: (error) => setError(true),
  });

  const {
    handleAddPost,
    handleLike,
    handleDeletePost,
    handleUpdatePost,
    sorted,
  } = usePost({
    users,
    user,
    error,
    onError: () => {
      setError(true);
    },
  });
  const { openModal } = useModal();

  useEffect(() => {
    if (error) {
      openModal("error", {
        title: "Server Error",
        text: "Please Check you server",
      });
    }
    if (user) {
      setLoading(false);
    }
  }, [error, users, user, setError]);

  return error ? (
    <Box>Error</Box>
  ) : (
    <Layout
      user={user}
      onSwitchUser={handleSwitchUser}
      onNewPost={(post) => {
        handleAddPost(post);
      }}
    >
      {loading && !error ? (
        <Box>Loading...</Box>
      ) : (
        user && (
          <Box sx={styles.posts_wrapper}>
            {sorted.length > 0 ? (
              sorted.map((i) => (
                <PostItem
                  key={i.id}
                  post={i}
                  users={users || []}
                  user={user}
                  postUser={users?.find((j) => j.id === i.userId) || null}
                  onDelete={handleDeletePost}
                  handleLike={handleLike}
                  onEdit={handleUpdatePost}
                />
              ))
            ) : (
              <Box>No Posts yet...</Box>
            )}
          </Box>
        )
      )}
    </Layout>
  );
};

export default Home;
