import { Card, Form, Button } from "react-bootstrap"
import firebase from "../firebase.js"
import { v4 as uuid } from "uuid"

const PostFrom = ({ username }) => {
    const onSubmit = (e) => {
        e.preventDefault();
        firebase.database().ref(`posts/${uuid()}`).set({
            username,
            bookTitle: e.target.bookTitle.value,
            description: e.target.description.value
        })
        e.target.bookTitle.value  = ""
        e.target.description.value  = ""
    }
    return (
        <Card>
            <Card.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Control type="text" placeholder="Name of Book" name="bookTitle">
                    </Form.Control>
                    <Form.Control as="textarea" rows={3} placeholder="Write your thoughts.." name="description">
                    </Form.Control>
                    <Button type="submit">
                        Post
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default PostFrom;