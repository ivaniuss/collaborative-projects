import { Link } from "react-router-dom";

export default function EventsPage() {
    return (
      <>
        <h1>EventsPage</h1>
        <p>this must show all the events, and a form of se details and inscrive to the event</p>
        <p>Whith filters, diferents pages...</p>
        <Link to={"/event/something"}>
          <h1>Event</h1>
          <p>A litle description</p>
          <p>Some photo</p>
        </Link>
        <a href="">Inscrive</a>
        </>
    )
}