import firebase from "../firebase.js"
import { useRouter } from 'next/router';

const SignUp = () => {

    const router = useRouter();

    const submit = (e) => {
        e.preventDefault()

        firebase.auth().createUserWithEmailAndPassword(e.target.email.value, e.target.password.value).then((user) => {

            firebase.database().ref(`users/${user.user.uid}`).set({
                username: e.target.username.value,
                email: e.target.email.value
            })
            console.log(user.user)
            localStorage.setItem("id",user.user.uid)
            router.push("/homePage")
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <form onSubmit={submit}>
            <input type="text" placeholder="Username" name="username"></input>
            <input type="email" placeholder="Email" name="email"></input>
            <input type="password" placeholder="Password" name="password"></input>
            <input type="password" placeholder="Verify Password" name="verifyPassword"></input>
            <button type="submit">Sign Up</button>
        </form>
    )

}

export default SignUp;