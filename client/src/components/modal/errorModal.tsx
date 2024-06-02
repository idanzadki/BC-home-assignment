import { Box, Button, Modal } from "@mui/material";
import { styles } from "./styles";
import { useModal } from ".";
import { PostData } from "../../types";
import { PostEditor } from "../PostEditor";

const ErrorModal = ({
  text = "No Text",
  title = "No Title",
  onSubmit,
}: {
  text?: string;
  title?: string;
  onSubmit?: () => void;
}) => {
  const { closeModal } = useModal();
  return (
    <Modal sx={styles.modal} open>
      <form>
        <Box sx={styles.modalForm}>
          <h3>{title}</h3>
          <h2>{text}</h2>
          <Button
            onClick={() => {
              onSubmit && onSubmit();
              closeModal();
            }}
          >
            OK
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default ErrorModal;
