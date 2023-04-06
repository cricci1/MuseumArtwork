import { Container, Nav, Navbar, Form, Button, NavDropdown } from "react-bootstrap"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react";
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addtoHistory } from "@/lib/userData.js";
import { removeToken, readToken } from "@/lib/authenticate";

export default function MainNav() {

  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const [isExpanded, setIsExpanded] = useState(false);

  let token = readToken();

  function logout() {

    setIsExpanded(false);
    removeToken();
    router.push('/login');

  }

  const handleSearch = async (e) => {

    e.preventDefault();
    const search = e.target.search.value;

    if (search != '') {

      setIsExpanded(false);

      setSearchHistory(await addtoHistory(`title=true&q=${search}`)) 

      router.push(`/artwork?title=true&q=${search}`)

    }
  }

  return (
    <>
      <Navbar bg="dark" expand="lg" className="fixed-top navbar-dark bg-primary" expanded={isExpanded}>
        <Container>
          <Navbar.Brand>Christian Ricci</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsExpanded(!isExpanded)} />
          <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior><Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === "/"}>Home</Nav.Link></Link>
              { token && (  <Link href="/search" passHref legacyBehavior><Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === "/search"}>Advanced Search</Nav.Link></Link> )}
            </Nav>

            { !token && ( <Nav>
                          <Link href="/register" passHref legacyBehavior><Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === "/register"}>Register</Nav.Link></Link>
                          <Link href="/login" passHref legacyBehavior><Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === "/login"}>Login</Nav.Link></Link>
                          </Nav> )}

            &nbsp;

            { token && ( <Form className="d-flex" onSubmit={handleSearch}>
                         <Form.Control
                            type="search"
                            name="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                         />
                          <Button className="btn btn-success" type="submit">Search</Button>
                        </Form> )}

            &nbsp;

            <Nav>
              { token && ( <NavDropdown title={token.userName} id="basic-nav-dropdown">
                           <Link href="/favourites" passHref legacyBehavior><NavDropdown.Item onClick={() => setIsExpanded(false)}>Favourites</NavDropdown.Item></Link>
                           <Link href="/history" passHref legacyBehavior><NavDropdown.Item onClick={() => setIsExpanded(false)}>Search History</NavDropdown.Item></Link>
                           <NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
                           </NavDropdown> )}
            </Nav>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  )
}