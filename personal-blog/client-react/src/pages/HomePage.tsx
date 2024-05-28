import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/blogs")
      .then((response) => response.json())
      .then((response) => {
        setPosts(response);
        console.log(response);
      });
  }, []);

  return (
    <div className="bg-slate-900 min-h-screen text-center text-slate-200 px-5 pb-5">
      <h1 className="text-5xl mb-10 pt-10 text-slate-200">Posts Examples</h1>
      <p className="text-slate-400 mb-14 px-10">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui, vitae!
      </p>
      <div className="flex justify-center">
        <div className="grid max-md:gap-10 md:gap-5 max-md:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-center">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              time={post.updatedAt}
              description={post.content}
              image={post.image}
            />
          ))}
        </div>
      </div>
      <footer className="pt-10">
        Created and directed by the CodeCrew team ©← 2024
      </footer>
    </div>
  );
}
