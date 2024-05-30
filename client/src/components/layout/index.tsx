import { Box } from "@mui/material";
import { ReactNode } from "react";
import { Header } from "./header";
import { useModal } from "../modal";
import { PostEditor } from "../PostEditor";

interface LayoutProps {
  children?: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { openModal } = useModal();

  return (
    <Box>
      <Header
        openPostEditor={() => {
          console.log("Open Editor");
          openModal("default", { children: <PostEditor /> });
        }}
      />
      {children}
    </Box>
  );
};
