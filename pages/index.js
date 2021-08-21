import firebase from "../firebase.js"
import { useRouter } from 'next/router';

const Index = () => {

    const router = useRouter();

    const submit = (e) => {
        e.preventDefault()
        firebase.auth().signInWithEmailAndPassword(e.target.email.value, e.target.password.value).then((user) => {
            router.push("/homePage")
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <form onSubmit={submit}>
            <input type="email" name="email"></input>
            <input type="password" name="password"></input>
            <button type="submit">Log in</button>
        </form>
    )

}

export default Index;