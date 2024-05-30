import { Box } from "@mui/material";
import { ReactNode } from "react";
import { Header } from "./header";
import { useModal } from "../modal";
import { PostEditor } from "../PostEditor";
import { PostData, UserData } from "../../types";

interface LayoutProps {
  children?: ReactNode;
  user?: UserData | null;
  onNewPost: (post: PostData) => void;
}

export const Layout = ({ children, user, onNewPost }: LayoutProps) => {
  const { openModal } = useModal();

  return (
    <Box>
      <Header
        onSubmit={onNewPost}
        // openPostEditor={() => {
        //   console.log("Open Editor");
        //   openModal("default", {
        //     children: <PostEditor user={user} />,
        //   });
        // }}
      />
      {children}
    </Box>
  );
};
