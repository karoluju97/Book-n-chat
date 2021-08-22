import { Card,Button } from "react-bootstrap"
import { useEffect, useState } from "react"
import styles from "../styles/post.module.css"
import firebase from "../firebase.js"

const Post = ({ name, book, text, id }) => {

    const [state, setState] = useState({
        likes: 0
    })
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
    }, [])
    return (
        <Card className={styles.post}>
            <Card.Header className={styles.postHeader}>
                {name} commented on {book}
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className={styles.postFooter}>
                <Button className={styles.postButton} onClick={() => {
                    firebase.database().ref(`posts/${id}/likes`).set({
                        id
                    })
                }}>
                    {state.likes} Likes
                </Button>
                <Button className={styles.postButton}>
                    Comment
                </Button>
                <Button className={styles.postButton}>
                    Share
                </Button>
                <Button className={styles.postButton}>
                    Bookmark
                </Button>
            </Card.Footer>
        </Card>
    )
}

export default Post;
