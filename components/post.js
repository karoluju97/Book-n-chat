import { Card, Row, Button } from "react-bootstrap"
import styles from "../styles/Home.module.css"

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
            <Card.Footer>
                <Button>
                    Like
                </Button>
                <Button>
                    Comment
                </Button>
                <Button>
                    Share
                </Button>
                <Button>
                    Bookmark
                </Button>
            </Card.Footer>
        </Card>
    )
}

export default Post;
