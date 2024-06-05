import { Tooltip } from "@mui/material";
import { ReactElement } from "react";

export const ContionalWrapper = ({
  condition,
  title,
  children,
}: {
  condition?: boolean;
  title: string;
  children: ReactElement<any, any>;
}) => {
  if (condition) return <Tooltip title={title}>{children}</Tooltip>;
  else return children;
};
