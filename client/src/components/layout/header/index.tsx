import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import "./styles.css";
import { UserAvatar } from "../../UserAvatar";
import { UserData } from "../../../types";

type HeaderProps = {
  openPostEditor: () => void;
};

export const Header: React.FC<HeaderProps> = ({ openPostEditor }) => {
  const user: UserData = { id: 0, name: "" }; // CHANGE ME

  return (
    <AppBar position="static">
      <Toolbar disableGutters className="app-toolbar">
        <Tooltip title="Switch User">
          <IconButton
            onClick={() => {
              console.log("Switch User");
            }}
          >
            <UserAvatar user={user} className="user-avatar" />
          </IconButton>
        </Tooltip>
        <div>
          <Typography className="app-title main" variant="h6">
            BriefCam Social
          </Typography>
          <Typography className="app-title" variant="subtitle1" lineHeight={1}>
            {user.name}
          </Typography>
        </div>
        <Tooltip title="Add Post">
          <IconButton onClick={openPostEditor}>
            <AddOutlined htmlColor="white" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};
