import { format } from "date-fns";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
>>>>>>> 39a6c79 (feat: the blogs are get of the server (#22) (#26))

function PostCard(props) {
  let time = "";
  if (props.time != undefined)
    time = format(props.time, "MMMM dd, yyyy - HH:mm");

  return (
<<<<<<< HEAD
    <Link to={"/post/" + props.id}>
      <div className="max-md:max-w-96 md:max-w-80  bg-slate-800 text-center max-md:h-[30rem] md:h-[26rem] rounded-3xl overflow-hidden hover:-translate-y-6 transition">
        <img src={props.image} alt="" className="mb-5" />
        <div className="px-5">
          <h3 className="max-md:text-2xl md:text-lg mb-1 overflow-hidden overflow-ellipsis line-clamp-2">
            {props.title}
          </h3>
          <h4 className="max-md:text-lg md:text-base text-slate-500 mb-3">
            {time}
          </h4>
          <p className="max-md:text-lg md:text-base text-base overflow-hidden overflow-ellipsis line-clamp-2">
=======
    <a href="">
      <div className="max-md:max-w-96 md:max-w-80  bg-slate-800 text-center max-md:h-[30rem] md:h-[26rem] rounded-3xl overflow-hidden hover:-translate-y-6 transition">
        <img src={props.image} alt="" className="mb-5" />
        <div className="px-5">
          <h3 className="max-md:text-2xl md:text-lg mb-1">{props.title}</h3>
          <h4 className="max-md:text-lg md:text-base text-slate-500 mb-3">
            {time}
          </h4>
          <p className="max-md:text-lg md:text-base break-words text-base overflow-hidden overflow-ellipsis">
>>>>>>> 39a6c79 (feat: the blogs are get of the server (#22) (#26))
            {props.description}
          </p>
        </div>
      </div>
<<<<<<< HEAD
    </Link>
=======
    </a>
>>>>>>> 39a6c79 (feat: the blogs are get of the server (#22) (#26))
  );
}

export default PostCard;
