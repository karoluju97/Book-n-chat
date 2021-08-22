import { Card } from "react-bootstrap"
import styles from "../styles/profile.module.css"

const Profile = () => {

    return (
        <Card className={styles.profile}>
            <Card.Img src="bgImg.jpg" variant="top" className={styles.profileBanner}>
            </Card.Img>
            <Card.Img src="pfp.jpg" className={styles.profilePic} >
            </Card.Img>
            <Card.Body className={styles.profileBody}>
                <Card.Title>
                    Zest
                </Card.Title>
                <Card.Text>
                    Bio
                </Card.Text>
            </Card.Body>
        </Card>
    )

}

export default Profile;