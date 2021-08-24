import firebase from "../firebase.js"
import { useRouter } from 'next/router';
import styles from "../styles/login.module.css"
import { Form, Button, Navbar, Container, Image } from "react-bootstrap"
import { SignUp } from "../pages/signUp"

const Index = () => {

    const router = useRouter();

    const submit = (e) => {
        e.preventDefault()
        firebase.auth().signInWithEmailAndPassword(e.target.email.value, e.target.password.value).then((user) => {
            localStorage.setItem("id", user.user.uid)
            router.push("/homePage")
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className={styles.loginBody}>
            <Navbar bg="dark" variant="dark" sticky="top" style={{ margin: "0" }}>
                <Navbar.Brand>
                    Book N Chat
                </Navbar.Brand>
            </Navbar>
            <Container>
                <Form onSubmit={submit} className={styles.loginBox}>
                    <Image src="logo.jpg" alt="" className={styles.loginAvatar}></Image>
                    <input type="email" placeHolder="Enter email address" name="email" className={styles.loginInput}></input>
                    <input type="password" placeHolder="Enter password" name="password" className={styles.loginInput} ></input>
                    <Button type="submit" className={styles.loginButton}>Log in</Button>
                    <a href="signUp"> Do not have an account? Sign up Here!</a>
                </Form>
            </Container>
        </div>
    )

}

export default Index;