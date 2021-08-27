import { Card, Form, Button } from "react-bootstrap"
import firebase from "../firebase.js"
import { v4 as uuid } from "uuid"
import styles from "../styles/postForm.module.css"

const PostFrom = ({ username }) => {
    const onSubmit = (e) => {
        e.preventDefault();
        firebase.database().ref(`posts/${uuid()}`).set({
            username,
            bookTitle: e.target.bookTitle.value,
            description: e.target.description.value,
            timestamp: Date.now()
        })
        e.target.bookTitle.value = ""
        e.target.description.value = ""
    }
    return (
        <Card className={styles.pForm}>
            <Form onSubmit={onSubmit}>
                <Card.Body>
                    <Form.Control className={styles.pfInput} type="text" placeholder="Name of Book" name="bookTitle">
                    </Form.Control>
                    <Form.Control className={styles.pfInput}  as="textarea" rows={3} placeholder="Write your thoughts.." name="description">
                    </Form.Control>
                    <Button type="submit" className={styles.pfBut}>
                        Post
                    </Button>
                </Card.Body>
            </Form>
        </Card >
    )
}

export default PostFrom;