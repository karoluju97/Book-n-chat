import { Card, Button, Modal, Form, ListGroup, Row, Col } from "react-bootstrap"
import { useEffect, useState } from "react"
import styles from "../styles/post.module.css"
import firebase from "../firebase.js"
import { v4 as uuid } from "uuid"
import { FiThumbsUp } from "react-icons/fi"
import { BiCommentDots } from "react-icons/bi"
import { BsTrash } from "react-icons/bs"

const Post = ({ user, name, book, text, id }) => {

    const [state, setState] = useState({
        likes: 0,
        showModal: false,
        comments: []
    })

    const addComment = (e) => {
        e.preventDefault();
        let comment = e.target.comment.value;
        firebase.database().ref(`posts/${id}/comments/${uuid()}`).set({
            text: comment,
            id: uuid(),
            user: user,
            timestamp: Date.now()
        })
        e.target.comment.value = ""
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

    const deletePost = () => {
        firebase.database().ref(`posts/${id}`).remove();
    }

    useEffect(() => {
        firebase.database().ref(`posts/${id}/likes`).on("value", (snapshot) => {
            if (snapshot.exists()) {
                const value = snapshot.val()
                setState(prevState => ({
                    ...prevState,
                    likes: Object.keys(value).length
                }))
            } else {
                console.log("No data available");
            }
        })
        firebase.database().ref(`posts/${id}/comments`).on("value", (snapshot) => {
            if (snapshot.exists()) {
                const value = snapshot.val()
                let result = Object.keys(value).map((key) => {
                    return { ...value[key], id: key }
                });
                setState(prevState => ({
                    ...prevState,
                    comments: result
                }))
            } else {
                console.log("No data available");
            }
        })
    }, [])
    return (
        <Card className={styles.post}>
            <Card.Header className={styles.postHeader}>
                <b>{name}</b> posted about <b>{book}</b>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className={styles.postFooter}>
                <Row>
                    <Col>
                        <Button className={styles.postButton} onClick={() => {
                            const userId = localStorage.getItem("id")
                            firebase.database().ref(`posts/${id}/likes/${userId}`).set(
                                userId
                            )
                        }}>
                            {state.likes} <FiThumbsUp size={20}></FiThumbsUp>
                        </Button>
                    </Col>
                    <Col>
                        <Button onClick={show} className={styles.postButton}>
                            <BiCommentDots size={20}></BiCommentDots>
                        </Button>
                    </Col>
                    {
                        user === name &&
                        <Col>
                            <Button onClick={deletePost} className={styles.postButton}>
                                <BsTrash size={20}></BsTrash>
                            </Button>
                        </Col>
                    }

                </Row>
            </Card.Footer>
            <Modal show={state.showModal} onHide={close}>
                <Modal.Header>
                    <Modal.Title>
                        Comments
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card className={styles.post}>
                        <Card.Header className={styles.postHeader}>
                            {name} commented on {book}
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {text}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Form onSubmit={addComment}>
                        <Form.Control type="text" placeholder="Add a comment" name="comment"></Form.Control>
                    </Form>
                    <ListGroup>
                        {
                            state.comments.map((comment) => {
                                return (
                                    <ListGroup.Item key={comment.id}>
                                        {`${comment.user}: ${comment.text}`}
                                    </ListGroup.Item>
                                )
                            })
                        }
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={close}>
                        Close
                    </Button>
                </Modal.Footer>

            </Modal>
        </Card>
    )
}

export default Post;
