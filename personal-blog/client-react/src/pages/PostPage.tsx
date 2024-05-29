import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/blogs/" + postId)
      .then((response) => response.json())
      .then((response) => {
        setPost(response);
        console.log(response);
      });
  }, []);

  return (
    <div className="bg-slate-900 min-h-screen text-center text-slate-200 px-5 pb-5">
      <h1 className="text-5xl mb-16 pt-10 text-slate-200">{post.title}</h1>
      <p className="text-slate-400 mb-16 max-md:px-10 md:px-32 text-start">
        {post.content}
      </p>
      <img
        src={post.image}
        alt=""
        className="rounded-xl m-auto  max-md:max-w-96 md:w-3/4 lg:w-2/4 "
      />
    </div>
  );
}
