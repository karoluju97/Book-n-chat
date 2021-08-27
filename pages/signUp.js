import firebase from "../firebase.js"
import { useRouter } from 'next/router';
import { Form, Button, Container, Image } from "react-bootstrap"
import NavBar from "../components/navBar.js"

const SignUp = () => {

    const router = useRouter();

    const submit = (e) => {
        e.preventDefault()

        firebase.auth().createUserWithEmailAndPassword(e.target.email.value, e.target.password.value).then((user) => {

            firebase.database().ref(`users/${user.user.uid}`).set({
                username: e.target.username.value,
                email: e.target.email.value,
                pFP: "pfp.jpg"
            })
            console.log(user.user)
            localStorage.setItem("id",user.user.uid)
            router.push("/homePage")
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <Form onSubmit={submit}>
            <NavBar></NavBar>
            <input type="text" placeholder="Username" name="username"></input>
            <input type="email" placeholder="Email" name="email"></input>
            <input type="password" placeholder="Password" name="password"></input>
            <input type="password" placeholder="Verify Password" name="verifyPassword"></input>
            <Button type="submit">Sign Up</Button>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/"> Already have an account? Log in here!</a>
        </Form>
    )

}

export default SignUp;