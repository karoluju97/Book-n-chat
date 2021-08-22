import { Container, Row, Col, Navbar } from "react-bootstrap"
import firebase from "../firebase.js"
import { useEffect, useState } from "react"
import Post  from "../components/post.js"
import Profile from "../components/profile.js"
import styles from "../styles/Home.module.css"

const Homepage = () => {

    const [state, setState] = useState({ user: { username: "" } })


    useEffect(() => {
        const id = localStorage.getItem("id")
        firebase.database().ref(`users/${id}`).get().then(async (snapshot) => {

            setState({ user: snapshot.val() })
        });

    }, [])
    // return <div>{
    //     state.user.username
    // }</div>
    return (
        <div>
            <Navbar bg="dark" variant="dark" sticky="top" style={{ margin: "0" }}>
                <Navbar.Brand>
                    Book N Chat
                </Navbar.Brand>
            </Navbar>
            <Container fluid>
                <Row style={{ }}>
                    <Col sm="3" >
                        <Profile></Profile>
                    </Col>
                    <Col sm="6">
                        <Container className={styles.postList}>
                            <Post name={state.user.username} book="The Witcher" text="I hate me blah blah"></Post>
                            <Post name={state.user.username} book="The Witcher" text="I hate me blah blah"></Post>
                            <Post name={state.user.username} book="The Witcher" text="I hate me blah blah"></Post>
                            <Post name={state.user.username} book="The Witcher" text="I hate me blah blah"></Post>
                            <Post name={state.user.username} book="The Witcher" text="I hate me blah blah"></Post>
                            <Post name={state.user.username} book="The Witcher" text="I hate me blah blah"></Post>
                            <Post name={state.user.username} book="The Witcher" text="I hate me blah blah"></Post>
                            <Post name={state.user.username} book="The Witcher" text="I hate me blah blah"></Post>
                        </Container>
                    </Col>
                    <Col sm="3">
                        Chaturbate
                    </Col>
                </Row>
            </Container>
        </div>)
}

export default Homepage;