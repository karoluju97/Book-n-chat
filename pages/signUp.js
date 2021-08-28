import firebase from "../firebase.js"
import { useRouter } from 'next/router';
import { Form, Button, Container, Image } from "react-bootstrap"
import NavBar from "../components/navBar.js"
import styles from "../styles/login.module.css"

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
            localStorage.setItem("id", user.user.uid)
            router.push("/homePage")
        }).catch((err) => {
            console.log(err)
        })
    }

    return (


        <div className={styles.loginBody}>
            <NavBar></NavBar>
            <Container>
                <Form onSubmit={submit} className={styles.loginBox}>
                    <Image src="bgbook.jpg" alt="" className={styles.loginBg}></Image>
                    <input type="text" placeholder="Username" name="username" className={styles.loginInput}></input>
                    <input type="email" placeholder="Email" name="email" className={styles.loginInput}></input>
                    <input type="password" placeholder="Password" name="password" className={styles.loginInput}></input>
                    <Button type="submit" className={styles.loginButton} >Sign Up</Button>
                    <a href="/"> Have an account? Log in here</a>
                </Form>
            </Container>
        </div>
    )

}

export default SignUp;