import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div>
        <h1>LoginPage</h1>
        <p>A normal login page, with the server, or with google</p>
        <p>When the user login, he will be sent to the home page</p>
        <p>If he is an organizer, he go with more options</p>
        <Link to={"/home"}> Sumbit Button </Link>
    </div>
  )
}

