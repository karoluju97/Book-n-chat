import { Card } from "react-bootstrap"
import styles from "../styles/profile.module.css"
import firebase from "../firebase.js"
import { BiEdit } from "react-icons/bi"
import { Modal, Button, Form } from "react-bootstrap"
import { useEffect, useState } from "react"

const Profile = ({ user }) => {


    const [state, setState] = useState({
        showModal: false
    })
    const close = () => {
        setState(prevState => ({
            ...prevState,
            showModal: false
        }))
    }
    const show = () => {
        setState(prevState => ({
            ...prevState,
            showModal: true
        }))
    }
    const updateProfile = (e) => {
        e.preventDefault()
        const id = localStorage.getItem("id")
        firebase.database().ref(`users/${id}`).set({
            ...user,
            username: e.target.name.value,
            pFP: e.target.pfpUrl.value,
            bio: e.target.bio.value
        })
        close()
    }
    return (
        <Card className={styles.profile}>
            <Card.Img src="bgImg.jpg" variant="top" className={styles.profileBanner}>
            </Card.Img>
            <Card.Img src={user.pFP} className={styles.profilePic} >
            </Card.Img>
            <Card.Body className={styles.profileBody}>
                <Card.Title>
                    {user.username} 
                    <BiEdit onClick={show}></BiEdit>
                </Card.Title>
                <Card.Text>
                    {user.bio || ""}
                </Card.Text>
            </Card.Body>
            <Modal show={state.showModal} onHide={close}>
                <Form onSubmit={updateProfile}>
                    <Modal.Header>
                        <Modal.Title>
                            Editing Profile
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control type="text" placeholder="Enter pictures URL" name="pfpUrl"></Form.Control>
                        <Form.Control type="text" placeholder="Enter new username" name="name"></Form.Control>
                        <Form.Control as="textarea" rows={3} placeholder="Edit Bio" name="bio"></Form.Control>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit">
                            Save
                        </Button>
                        <Button onClick={close}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Card>
    )
}

export default Profile;