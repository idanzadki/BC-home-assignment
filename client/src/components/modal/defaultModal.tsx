import { Box, Button, Modal } from "@mui/material";
import { styles } from "./styles";
import { useModal } from ".";
import { PostData, UserData } from "../../types";
import { PostEditor } from "../PostEditor";
import { ReactNode } from "react";

interface DefaultModalProps {
  children?: ReactNode;
}

const DefaultModal = ({ children }: DefaultModalProps) => {
  const { closeModal } = useModal();
  return (
    <Modal sx={styles.modal} open>
      <form>
        <Box sx={styles.modalForm}>
          <Button onClick={closeModal}>X</Button>
          {children}
        </Box>
      </form>
    </Modal>
  );
};

export default DefaultModal;
