import { Box, Card, Input } from "@mui/material";
import { styles } from "./styles";

export const Preview = ({
  imgUrl = "",
  handleImage,
}: {
  imgUrl: string | undefined;
  handleImage: (img: any) => void;
}) => (
  <Box sx={styles.preview}>
    <Card sx={styles.imageBox}>
      {imgUrl.startsWith("http") &&
      imgUrl.endsWith(".jpg" || "png" || ".jpeg") ? (
        <img style={styles.image} src={imgUrl} alt={"Post Image"} />
      ) : (
        <Box sx={{ textAlign: "center" }}>No Image</Box>
      )}
    </Card>
    <Box sx={styles.inputWrapper}>
      <Box>Image Url:</Box>
      <Input
        title="Title"
        type="text"
        placeholder="Select Image url"
        sx={styles.urlInput}
        value={imgUrl}
        onChange={handleImage}
      />
    </Box>
  </Box>
);
