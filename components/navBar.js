import { Navbar, Container, Image, Button, Form } from "react-bootstrap";
import styles from "../styles/navBar.module.css"
import { useRouter } from 'next/router';
import { useEffect, useState } from "react"

const NavBar = ({ onFilter }) => {

    const [state, setState] = useState(false)

    const router = useRouter();

    useEffect(() => {
        const id = localStorage.getItem("id")
        if (id) {
            setState(true)
        }
    }, [])

    return (
        <Navbar bg="dark" variant="dark" sticky="top" style={{ margin: "0" }}>
            <Container fluid>
                <Navbar.Brand>
                    <Image src="logo.jpg" alt="" className={styles.navBarIcon}></Image>
                </Navbar.Brand>
                {state ?
                    <Form.Control onChange={onFilter} placeholder="Search book title mentioned in Posts" className={styles.search}>

                    </Form.Control> : <div></div>

                }
                {state ?
                    <Button onClick={() => {
                        localStorage.removeItem("id")
                        router.push("/")
                    }}>Log out</Button> : <div></div>
                }

            </Container>
        </Navbar>
    )
}

export default NavBar;