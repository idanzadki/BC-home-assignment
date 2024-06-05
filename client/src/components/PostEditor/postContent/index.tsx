export const PostContent = ({
  content,
  onChange,
}: {
  onChange: (text: any) => void;
  content: string;
}) => (
  <textarea
    placeholder="New Post Content"
    className="post-content"
    onChange={onChange}
    value={content}
  />
);
