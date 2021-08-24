import { ListGroup } from "react-bootstrap";
import styles from "../styles/chat.module.css"

const GlobalMessage = ({text,user}) => {
    return (
        <ListGroup.Item className={styles.globalMsg}>
            {`${user.username}: ${text}`}
        </ListGroup.Item>
        )

}

export default GlobalMessage;