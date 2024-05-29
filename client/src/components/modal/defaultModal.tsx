import { Box, Button, Modal } from "@mui/material";
import { styles } from "./styles";
import { useModal } from ".";
import { PostData, UserData } from "../../types";
import { PostEditor } from "../PostEditor";

const DefaultModal = ({
  item,
  user = { id: -1, name: "No User" },
  onSubmit,
}: {
  item?: PostData;
  user?: UserData | null;
  onSubmit?: (item: PostData) => void;
}) => {
  const { closeModal } = useModal();
  return (
    <Modal sx={styles.modal} open>
      <form>
        <Box sx={styles.modalForm}>
          <Button onClick={closeModal}>X</Button>
          <PostEditor onSubmit={onSubmit} user={user} post={item} />
        </Box>
      </form>
    </Modal>
  );
};

export default DefaultModal;
