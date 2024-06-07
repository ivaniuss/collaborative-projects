import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function EventPage() {
  const { postId } = useParams();

  return (
      <>
        <h1>{postId}</h1>
        <p>It has to get the info from the event and put all here</p>
        <p>And mayby a form to sing up to the event</p>
        <Link to="/home">A link back to the home</Link>
      </>
    )
}