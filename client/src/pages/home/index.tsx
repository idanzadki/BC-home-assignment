import { Box } from "@mui/material";
import { useUser } from "../../hooks/useUser";
import { useModal } from "../../components/modal";
import { styles } from "./styles";
import { Layout } from "../../components/layout";
import { PostEditor } from "../../components";
import { usePost } from "../../hooks/usePost";
import { useEffect, useState } from "react";

const Home = () => {
  const { users, user, handleSwitchUser } = useUser();
  const [error, setError] = useState<boolean | string>("Error");
  const { handleAddPost } = usePost();
  const { openModal } = useModal();

  useEffect(() => {
    console.log("Error: ", error);
  }, [error]);

  return (
    <Layout onNewPost={handleAddPost}>
      {error ? (
        <Box>Error {error}</Box>
      ) : (
        <Box sx={styles.posts_wrapper}>
          <Box>Home Page</Box>
          <Box>PostList</Box>
        </Box>
      )}
    </Layout>
  );
};

export default Home;
