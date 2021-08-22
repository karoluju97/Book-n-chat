import { Card, Row, Button } from "react-bootstrap"
import styles from "../styles/post.module.css"

const Post = ({ name, book, text }) => {
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
                <Button className={styles.postButton}>
                    Like
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
