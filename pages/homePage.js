import { Container, Row, Col, Navbar } from "react-bootstrap"
import firebase from "../firebase.js"
import { useEffect, useState } from "react"
import Post from "../components/post.js"
import Profile from "../components/profile.js"
import styles from "../styles/Home.module.css"
import PostFrom from "../components/postForm.js"

const Homepage = () => {
    const [state, setState] = useState({
        user: { username: "" },
        posts: []
    })
    useEffect(() => {
        const id = localStorage.getItem("id")
        firebase.database().ref(`users/${id}`).get().then((user) => {
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
                            {state.posts.map((post) => {
                                console.log(post)
                                return (
                                    <Post key={post.id} name={post.username} book={post.bookTitle} text={post.description}></Post>
                                )
                            })}
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