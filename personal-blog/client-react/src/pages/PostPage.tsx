import { useParams } from "react-router-dom";

export default function PostPage() {
  const { postId } = useParams();
  return (
    <>
      <div>This page must be rendered dynamic fetching data</div>
      <div>Post ID: {postId}</div>
    </>
  );
}
