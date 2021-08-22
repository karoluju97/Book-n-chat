import { ListGroup } from "react-bootstrap";

const GlobalMessage = ({text,user}) => {
    return (
        <ListGroup.Item>
            {`${user.username}: ${text}`}
        </ListGroup.Item>
        )

}

export default GlobalMessage;