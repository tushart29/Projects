// import { useState } from 'react'

// const WorkoutForm = () => {
//     const [title, setTitle] = useState('');
//     const [load, setLoad] = useState('');
//     const [reps, setReps] = useState('');
//     const [error, setError] = useState(null)
//     const handleSubmit = async (e) => {
//         // reach out to api so async 
//         e.preventDefault() // dont want to refresh the page
//         const workout = { title, load, reps }

//         // fetch request to post the data
//         const response = await fetch('/api/workouts', {
//             method: 'POST',
//             body: JSON.stringify(workout),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         // reponse you get back. you get a success json info or erro message fromt he controller file 
//         const json = await response.json()
//         if (!response.okay) {

//             setError(json.error) // you created a error property in the contoller file 
//         }
//         if (response.okay) {
//             setTitle('')
//             setLoad('')
//             setReps('')
//             setError(null) // incase it was not null before
//             console.log('new workout added', json)
//         }
//     }
//     return (
//         <form className="create" onSubmit={handleSubmit}>
//             <h3> Add a new workout </h3>
//             <label> Exercise Title:</label>
//             {/* if someting changes outside the form, this change will be reflected here too */}
//             <input type='text'
//                 onChange={(e) => { setTitle(e.target.value) }}
//                 value={title}
//             ></input>
//             <label> Load (in kg): </label>
//             <input type='number'
//                 onChange={(e) => { setLoad(e.target.value) }}
//                 value={load}
//             ></input>
//             <label> Reps: </label>
//             <input type='number'
//                 onChange={(e) => { setReps(e.target.value) }}
//                 value={reps}
//             ></input>
//             <button>Add Workout</button>
//             {error && <div className="error">{error}</div>}
//         </form>
//     )
// }


// export default WorkoutForm
import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = { title, load, reps }

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        // Inside handleSubmit function in WorkoutForm component
        if (response.ok) {
            dispatch({ type: 'CREATE_WORKOUT', payload: json });
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
        }


    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Excersize Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <label>Load (in kg):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
            />

            <label>Number of Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm