import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogRow from "../components/BlogRow";
import { Blog } from "../interfaces/Blog";

export default function AdminPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  return (
    <>
      <div className="h-dvh">
        <div className="max-w-4xl px-3 py-5 mx-auto">
          <div className="text-center">
            <p className="text-4xl font-semibold">Panel de control</p>
            <p className="mt-3 text-lg text-rose-600">
              Mantén este URL confidencial.
            </p>
          </div>
          <div className="flex justify-end w-full">
            <Link
              to={"/admin/new"}
              className="px-5 py-4 mt-5 font-semibold text-center text-white transition duration-300 bg-green-500 border border-green-600 hover:shadow-xl"
            >
              NUEVO BLOG +
            </Link>
          </div>

          {}

          {blogs && blogs.length >= 1 ? (
            <table className="w-full mx-auto mt-5 text-center">
              <thead>
                <tr className="text-white bg-neutral-600">
                  <th className="">#</th>
                  <th className="">Titulo</th>
                  <th className="">Opciones</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog: Blog, index: number) => {
                  return <BlogRow key={blog.id} index={index} blog={blog} />;
                })}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center w-full mt-5 border border-dashed border-neutral-600 h-96 bg-neutral-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
                />
              </svg>

              <p className="font-semibold">No hay blogs en el sistema.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
