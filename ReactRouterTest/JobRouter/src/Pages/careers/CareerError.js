import { Link, useRouteError } from "react-router-dom"

export default function CareersError() {
    const error = useRouteError() // error we will be throwing in careerdetails. check app.js how I associated error to this throw

    return (
        <div className="careers-error">
            <h2>Error</h2>
            <p>{error.message}</p>
            <Link to="/">Back to the Homepage</Link>
        </div>
    )
}