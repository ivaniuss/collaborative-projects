import { Link } from "react-router-dom";

export default function AdminPage() {
    return (
      <>
        <h1>AdminPage</h1>
        <p>a place to see, create, delete, or edit all your events and accept and reject inscriptions</p>
        <Link to="/form/something">Edit</Link>
        </>
    )
}