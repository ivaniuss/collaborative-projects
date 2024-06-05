import { Link } from "react-router-dom";
import { Blog } from "../interfaces/Blog";

interface BlogRowProps {
  blog: Blog;
  index: number;
}

export default function BlogRow({ blog, index }: BlogRowProps) {
  return (
    <tr className="even:bg-neutral-100">
      <td>{index}</td>
      <td>{blog.title}</td>
      <td className="flex justify-center gap-2 ">
        <Link
          to={"/post/" + blog.id}
          className="text-blue-500 hover:text-blue-700 hover:underline"
        >
          Ver
        </Link>
        <Link
          to={"/edit/" + blog.id}
          className="text-blue-500 hover:text-blue-700 hover:underline"
        >
          Editar
        </Link>
      </td>
    </tr>
  );
}
