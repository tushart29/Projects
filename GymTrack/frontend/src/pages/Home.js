

import { useEffect, useState } from 'react'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"


import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from '../components/WorkoutForm'



const Home = () => {
    // const [workouts, setWorkouts] = useState(null)
    const { workouts, dispatch } = useWorkoutsContext()

    useEffect(() => {

        const fetchWorkouts = async () => {
            // http://localhost:4000/ is the backend server
            const response = await fetch('/api/workouts')
            // we dont  need full url const response = await fetch('http://localhost:4000/api/workouts') since we added proxy in package.jon
            // pass json from response obj to something we can work with
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: json })
            }
        }

        fetchWorkouts()
    }, [dispatch])
    // first a function only when component is rendered not fetch multiple times everytime componet is rendered
    //empty array only lets the funciton fire it one

    return (
        <div className="home">
            <div className="workouts">
                {/* only loop through when workout value is there */}
                {/* {workouts && workouts.map(workout => (
                    // <p key={workout._id}> {workout.title}</p>
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))} */}
                {workouts && workouts.map(workout => {
                    console.log(workout._id, workout.createdAt); // console.log outside of JSX curly braces
                    return <WorkoutDetails workout={workout} key={workout._id} />;
                })}

            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home