import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import LogoutButton from './LogoutButton'
import LoginButton from './LoginButton'
import { Link } from 'react-router-dom'

export default function NavBar({ isAuthed }) {
    return (
        <>
            <Navbar collapseOnSelect fixed='top' expand="sm" bg="dark" variant="dark">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav>
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/coaches">Coaches</Nav.Link>
                            {isAuthed ?
                                <Nav.Link as={Link} to="/profile">My Profile</Nav.Link>
                                : <Nav.Link as={Link} to="/profile">Profile</Nav.Link>}
                            {isAuthed ? <Nav.Link as={Link} to="/new">Add Coach</Nav.Link> : null}
                            {isAuthed ? <LogoutButton /> : <LoginButton />}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
