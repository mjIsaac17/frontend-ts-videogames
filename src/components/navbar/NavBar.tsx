import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { RootStore } from "../../state/reducers/rootReducer";

const NavBar = () => {
  const { auth } = useSelector((state: RootStore) => state.auth);

  const handleToggle = () => {
    const toggle = document.getElementById("toggleButton");
    if (toggle?.className.search("collapsed") === -1) {
      console.log(toggle?.className.search("collapsed"));
      toggle?.click();
    }
  };
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Link to="/" className="a-no-style">
            <Navbar.Brand>Videogames-App</Navbar.Brand>
          </Link>
          <Navbar.Toggle
            id="toggleButton"
            aria-controls="responsive-navbar-nav"
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link
                to="/company"
                className="nav-link nav-no-style"
                onClick={handleToggle}
              >
                Companies
              </Link>
              <Link
                to="/console"
                className="nav-link a-no-style"
                onClick={handleToggle}
              >
                Consoles
              </Link>
              <Link
                to="/videogame"
                className="nav-link a-no-style"
                onClick={handleToggle}
              >
                Video games
              </Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">{auth?.user.name}</Nav.Link>
              <Nav.Link href="#memes">Sign Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default NavBar;
