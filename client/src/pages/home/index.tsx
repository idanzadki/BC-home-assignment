import { Box } from "@mui/material";
import { useUser } from "../../hooks/useUser";
import { useModal } from "../../components/modal";
import { styles } from "./styles";
import { Layout } from "../../components/layout";
import { PostEditor } from "../../components";

const Home = () => {
  const {
    users,
    posts,
    user,
    handleAddPost,
    handleSwitchUser,
    handleLike,
    handleUpdatePost,
    handleDeletePost,
  } = useUser();
  const { openModal } = useModal();

  const openEditor = () => openModal("default", { children: <PostEditor /> });

  return (
    <Layout>
      <Box sx={styles.posts_wrapper}>Home Page</Box>
    </Layout>
  );
};

export default Home;
