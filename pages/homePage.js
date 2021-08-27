import { Container, Row, Col, ListGroup, Form, Button, Modal } from "react-bootstrap"
import firebase from "../firebase.js"
import { useEffect, useState } from "react"
import Post from "../components/post.js"
import Profile from "../components/profile.js"
import styles from "../styles/Home.module.css"
import PostFrom from "../components/postForm.js"
import GlobalMessage from "../components/globalMessage.js"
import { v4 as uuid } from "uuid"
import NavBar from "../components/navBar.js"

const Homepage = () => {
    const [state, setState] = useState({
        user: { username: "" },
        selectedUser: { username: "" },
        posts: [],
        messages: [],
        filter: "",
        showModal: false
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
    const close = () => {
        setState(prevState => ({
            ...prevState,
            showModal: false
        }))
    }
    const show = () => {
        setState(prevState => ({
            ...prevState,
            showModal: true
        }))
    }
    useEffect(() => {
        let element = document.getElementById("chat");
        element.scrollTop = element.scrollHeight;
    }, [state.messages])
    useEffect(() => {
        const id = localStorage.getItem("id")
        firebase.database().ref(`users/${id}`).on("value", (user) => {
            if (user.exists()) {
                const value = user.val()
                setState(prevState => ({
                    ...prevState,
                    user: value
                }))
            } else {
                console.log("No data available");
            }
        });
        firebase.database().ref("posts").on("value", (snapshot) => {
            if (snapshot.exists()) {
                const value = snapshot.val()
                let result = Object.keys(value).map((key) => {
                    return { ...value[key], id: key }
                });
                setState(prevState => ({
                    ...prevState,
                    posts: result
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
    }, [])
    return (
        <div>
            <NavBar onFilter={(e) => {
                setState(prevState => ({
                    ...prevState,
                    filter: e.target.value
                }))
            }}></NavBar>
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
                            })
                                .filter(post => post.bookTitle.toLowerCase().includes(state.filter.toLowerCase()))
                                .map((post) => {
                                    return (
                                        <Post key={post.id} user={state.user.username} id={post.id} name={post.username} book={post.bookTitle} text={post.description}></Post>
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
                                    <GlobalMessage onClick={() => {
                                        setState(prevState => ({
                                            ...prevState,
                                            selectedUser: message.user,
                                            showModal: true
                                        }))
                                    }} key={message.id} text={message.text} user={message.user}>
                                    </GlobalMessage>
                                )
                            })}
                        </ListGroup>
                        <Form onSubmit={sendMessage}>
                            <Row>
                                <Col>
                                    <Form.Control type="text" name="messaging">

                                    </Form.Control>
                                </Col>
                                <Col>
                                    <Button type="submit">
                                        Send
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <Modal show={state.showModal} onHide={close}>
                <Modal.Body>
                    <Profile user={state.selectedUser}></Profile>
                </Modal.Body>
                <Modal.Footer>
                   <Button onClick={close}>
                       Close
                   </Button>
                </Modal.Footer>
            </Modal>
        </div>)
}

export default Homepage;