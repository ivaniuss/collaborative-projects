import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

type Inputs = {
  title: string;
  content: string;
  image: string;
};

export default function NewBlogPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [imageSrc, setImageSrc] = useState("");

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = async (form) => {
    try {
      const formBody = Object.entries(form)
        .map(
          ([key, value]) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(value)
        )
        .join("&");

      const request = await fetch("http://localhost:3000/blogs", {
        method: "POST",
        body: formBody,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      });

      if (!request.ok) return;

      return navigate("/admin", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  const watchedImage = watch("image");

  useEffect(() => {
    setImageSrc(watchedImage);
  }, [watchedImage]);

  return (
    <>
      <div className="h-dvh">
        <div className="max-w-4xl px-3 py-5 mx-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <Link
              to={"/admin"}
              className="text-blue-500 hover:text-blue-700 hover:underline w-fit"
            >
              Volver
            </Link>
            <label className="font-bold" htmlFor="title">
              Titulo
            </label>
            <input
              className="py-1 border ps-2"
              defaultValue={faker.lorem.sentence(5)}
              {...register("title", { required: true })}
            />

            {errors.title && (
              <span className="text-red-500">Este campo es necesario</span>
            )}

            <label className="font-bold" htmlFor="content">
              Contenido
            </label>
            <input
              className="py-1 border ps-2"
              defaultValue={faker.lorem.sentence()}
              {...register("content", { required: true })}
            />

            {errors.content && (
              <span className="text-red-500">Este campo es necesario</span>
            )}

            <label className="font-bold" htmlFor="image">
              Imagen
            </label>
            <input
              className="py-1 border ps-2"
              defaultValue={faker.image.url()}
              {...register("image", { required: true })}
            />

            {errors.image && (
              <span className="text-red-500">Este campo es necesario</span>
            )}

            <img src={imageSrc} />

            <input
              className="px-5 py-4 mt-5 font-semibold text-white transition duration-300 bg-black border border-gray-400 hover:bg-green-500 hover:border-green-600 hover:shadow-xl hover:cursor-pointer"
              type="submit"
            />
          </form>
        </div>
      </div>
    </>
  );
}
