import { Container, Row, Col, Navbar, ListGroup, Form, Button } from "react-bootstrap"
import firebase from "../firebase.js"
import { useEffect, useState } from "react"
import Post from "../components/post.js"
import Profile from "../components/profile.js"
import styles from "../styles/Home.module.css"
import PostFrom from "../components/postForm.js"
import GlobalMessage from "../components/globalMessage.js"
import { v4 as uuid } from "uuid"

const Homepage = () => {
    const [state, setState] = useState({
        user: { username: "" },
        posts: [],
        messages: []
    })
    const sendMessage = (e) => {
        e.preventDefault();
        let message = e.target.messaging.value;
        firebase.database().ref(`messages/${uuid()}`).set({
            text: message,
            id: uuid(),
            user: state.user,
            timestamp: Date.now()
        })
        e.target.messaging.value = ""
    }
    useEffect(() => {
        let element = document.getElementById("chat");
        element.scrollTop = element.scrollHeight;
    }, [state.messages])
    useEffect(() => {
        const id = localStorage.getItem("id")
        firebase.database().ref(`users/${id}`).get().then((user) => {
            firebase.database().ref(`users/${id}`).on("value", (snapshot) => {
                if (snapshot.exists()) {
                    const value = snapshot.val()                  
                    setState(prevState => ({
                        ...prevState,
                        user: value
                    }))
                } else {
                    console.log("No data available");
                }
            })
            firebase.database().ref("posts").on("value", (snapshot) => {
                if (snapshot.exists()) {
                    const value = snapshot.val()
                    let result = Object.keys(value).map((key) => {
                        return { ...value[key], id: key }
                    });
                    setState(prevState => ({
                        ...prevState,
                        posts: result,
                        user: user.val()
                    }))
                } else {
                    console.log("No data available");
                }
            })
            firebase.database().ref("messages").on("value", (snapshot) => {
                if (snapshot.exists()) {
                    const value = snapshot.val()
                    let result = Object.keys(value).map((key) => {
                        return { ...value[key], id: key }
                    });
                    setState(prevState => ({
                        ...prevState,
                        messages: [...result]
                    }))
                } else {
                    console.log("No data available");
                }
            })
        });
    }, [])
    return (
        <div>
            <Navbar bg="dark" variant="dark" sticky="top" style={{ margin: "0" }}>
                <Navbar.Brand>
                    Book N Chat
                </Navbar.Brand>
            </Navbar>
            <Container fluid className={styles.mainContent}>
                <Row style={{}}>
                    <Col sm="3" >
                        <Profile user={state.user}></Profile>
                    </Col>
                    <Col sm="6" className={styles.postList}>
                        <Container>
                            <PostFrom username={state.user.username}></PostFrom>
                            {state.posts.sort((a, b) => {
                                return b.timestamp - a.timestamp
                            }).map((post) => {
                                return (
                                    <Post key={post.id} id={post.id} name={post.username} book={post.bookTitle} text={post.description}></Post>
                                )
                            })}
                        </Container>
                    </Col>
                    <Col sm="3">
                        <ListGroup className={styles.chatList} id="chat">
                            {state.messages.sort((a, b) => {
                                return a.timestamp - b.timestamp
                            }).map((message) => {
                                return (
                                    <GlobalMessage key={message.id} text={message.text} user={message.user}>

                                    </GlobalMessage>
                                )
                            })}
                        </ListGroup>
                        <Form onSubmit={sendMessage}>
                            <Row>
                                <Form.Control type="text" name="messaging">

                                </Form.Control>
                                <Button type="submit">
                                    Send
                                </Button>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>)
}

export default Homepage;