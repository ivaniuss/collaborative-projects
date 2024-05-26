import PostCard from "../components/PostCard";
import { posts } from "../data/posts";

export default function HomePage() {
  return (
    <div className="bg-slate-900 min-h-screen text-center text-slate-200 px-5">
      <h1 className="text-5xl mb-10 pt-10 text-slate-200">Posts Examples</h1>
      <p className="text-slate-400 mb-14 px-10">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui, vitae!
      </p>
      <div className="flex justify-center">
        <div className="grid max-md:gap-10 md:gap-5 max-md:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-center">
          {posts.map((post) => (
            <PostCard
              title={post.title}
              time={post.time}
              description={post.description}
              image={post.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
