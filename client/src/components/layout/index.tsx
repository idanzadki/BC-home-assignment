import { Box } from "@mui/material";
import { ReactNode } from "react";
import { Header } from "./header";
import { useModal } from "../modal";
import { PostData, UserData } from "../../types";

interface LayoutProps {
  children?: ReactNode;
  user?: UserData | null;
  onNewPost: (post: PostData) => void;
  onSwitchUser: () => void;
}

export const Layout = ({
  children,
  user,
  onNewPost,
  onSwitchUser,
}: LayoutProps) => {
  const { openModal } = useModal();

  return (
    <Box>
      {user && (
        <Header user={user} onSubmit={onNewPost} onSwitchUser={onSwitchUser} />
      )}
      {children}
    </Box>
  );
};
