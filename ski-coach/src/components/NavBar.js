import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import LogoutButton from './LogoutButton'
import LoginButton from './LoginButton'

export default function NavBar({ isAuthed }) {
    return (
        <>
            <Navbar collapseOnSelect fixed='top' expand="sm" bg="dark" variant="dark">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav>
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/coaches">Coaches</Nav.Link>
                            {isAuthed ?
                                <Nav.Link href="/profile">My Profile</Nav.Link>
                                : <Nav.Link href="/profile">Profile</Nav.Link>}
                            {isAuthed ? <Nav.Link href="/new">Add Coach</Nav.Link> : null}
                            {isAuthed ? <LogoutButton /> : <LoginButton />}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
