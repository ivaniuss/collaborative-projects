import { Link } from "react-router-dom";

export default function HomePage() {
    return (
      <>
        <h1>HomePage</h1>
        <p>The page where the trending and recomended events will be show</p>
        <p>If you press some event it will redirect you to his event page with details</p>
        <Link to={"/event/something"}>
          <h1>Event</h1>
          <p>A litle description</p>
          <p>Some photo</p>
        </Link>
        <p>Also a button to se all the events</p>
        <Link to={"/events"}> See more </Link>
        <Link to={"/participations/something"}>See my inscritions</Link>
        <Link to={"/admin"}>Admin button (obviously only for admins)</Link>
      </>
    )
}