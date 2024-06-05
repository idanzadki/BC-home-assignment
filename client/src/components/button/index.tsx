import { IconButton } from "@mui/material";

export const MyButton = ({
  onClick,
  text,
  icon,
}: {
  text?: string;
  onClick?: () => void;
  icon?: JSX.Element;
}) => <IconButton onClick={onClick}>{text || icon}</IconButton>;
