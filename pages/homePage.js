import firebase from "../firebase.js"
import { useEffect, useState } from "react"
const Homepage = () => {

    const [state, setState] = useState({ user: { username: "" } })


    useEffect(() => {
        const id = localStorage.getItem("id")
        firebase.database().ref(`users/${id}`).get().then(async (snapshot) => {

            setState({ user: snapshot.val() })
        });

    }, [])
    return <div>{
        state.user.username
    }</div>

}

export default Homepage;