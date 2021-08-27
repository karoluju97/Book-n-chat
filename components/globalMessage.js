import { ListGroup } from "react-bootstrap";
import styles from "../styles/chat.module.css"

const GlobalMessage = ({ text, user, onClick }) => {
    return (
        <ListGroup.Item onClick={onClick} className={styles.globalMsg}>
            {`${user.username}: ${text}`}
        </ListGroup.Item>
    )

}

export default GlobalMessage;