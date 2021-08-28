import firebase from "../firebase.js"
import { useRouter } from 'next/router';
import styles from "../styles/login.module.css"
import { Form, Button, Container, Image } from "react-bootstrap"
import { SignUp } from "../pages/signUp"
import NavBar from "../components/navBar.js"
import Link from "next/link"

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
            <NavBar></NavBar>
            <Container>

                <Form onSubmit={submit} className={styles.loginBox}>
                    <Image src="bgbook.jpg" alt="" className={styles.loginBg}></Image>
                    <input type="email" placeholder="Enter email address" name="email" className={styles.loginInput}></input>
                    <input type="password" placeholder="Enter password" name="password" className={styles.loginInput} ></input>
                    <Button type="submit" className={styles.loginButton}>Log in</Button>
                    <Link href="signUp">{"Don't have an account? Sign up!"}</Link>
                </Form>
            </Container>
        </div>
    )

}

export default Index;