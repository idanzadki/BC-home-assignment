import { PostData, UserData } from "../../../types";
import { dateParser } from "../../../utils/helpers";
import { UserAvatar } from "../../UserAvatar";

export const PostHeader = ({
  post,
  postUser,
}: {
  post: PostData;
  postUser?: UserData | null;
}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: 5,
        padding: 10,
        margin: 10,
      }}
    >
      {postUser && (
        <div>
          <UserAvatar user={postUser} className="user-avatar" />
          <div>{postUser?.name}</div>
          <div style={{ color: "gray" }}>{dateParser(post.date)}</div>
        </div>
      )}
    </div>
  );
};
