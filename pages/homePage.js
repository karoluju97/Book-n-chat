import { Container, Row, Col, Navbar } from "react-bootstrap"
import firebase from "../firebase.js"
import { useEffect, useState } from "react"
import Post  from "../components/post.js"
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
                    <Col sm="3" style={{ backgroundColor: "red" }}>
                        Profile
                    </Col>
                    <Col sm="6">
                        <Container>
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