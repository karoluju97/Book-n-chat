import { Navbar, Container, Image, Button, Form, InputGroup } from "react-bootstrap";
import styles from "../styles/navBar.module.css"
import { useRouter } from 'next/router';
import { useEffect, useState } from "react"
import { GiArchiveResearch } from "react-icons/gi"

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
        <Navbar variant="dark" sticky="top" className={styles.navBar}>
            <Container fluid>
                <Navbar.Brand>
                    <Image src="logo.jpg" alt="" className={styles.navBarIcon}></Image>
                </Navbar.Brand>
                {state ?
                    <InputGroup style={{width:"35%"}}> 
                    <InputGroup.Text>
                    <GiArchiveResearch size={30}></GiArchiveResearch>
                    </InputGroup.Text>
                        <Form.Control onChange={onFilter} placeholder="Search book title mentioned in Posts" className={styles.search}>
                        </Form.Control>
                    </InputGroup> : <div></div>

                }
                {state ?
                    <Button className={styles.logOutBut} onClick={() => {
                        localStorage.removeItem("id")
                        router.push("/")
                    }}>Log out</Button> : <div></div>
                }

            </Container>
        </Navbar>
    )
}

export default NavBar;