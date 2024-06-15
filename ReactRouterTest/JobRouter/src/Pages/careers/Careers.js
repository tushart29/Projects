import { Link, useLoaderData } from "react-router-dom"

export default function Careers() {
    // to handle the promise and access that data we have to useLoaderDATA hook
    // react router will grab the data for us and resolve the promoise 
    const careers = useLoaderData()

    return (
        <div className="careers">
            {careers.map(career => (
                <Link to={career.id.toString()} key={career.id}>
                    <p>{career.title}</p>
                    <p>Based in {career.location}</p>
                </Link>
            ))}
        </div>
    )
}

// data loader
export const careersLoader = async () => {
    // help of json server package will allows us to wrap a server with API endpoitsn so we can interact as a rest API
    const res = await fetch('http://localhost:4000/careers')
    if (!res.ok) {
        throw Error('Could not fetch that career')

    }

    return res.json()
    // this returns a promise, however react router takes care of that and get that data for us and can access that in our component
    // we need to export because we need to import in app,js so we can associate with a route
}
