import { ListGroup } from "react-bootstrap";
import styles from "../styles/chat.module.css"

const GlobalMessage = ({ text, user, onClick }) => {
    return (
        <ListGroup.Item onClick={onClick} className={styles.globalMsg}>
            <b>{user.username}:</b> {text}
        </ListGroup.Item>
    )

}

export default GlobalMessage;