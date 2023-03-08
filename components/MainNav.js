import { Container, Nav, Navbar, Form, Button } from "react-bootstrap"
import Link from "next/link"
import { useRouter } from "next/router"

export default function MainNav() {

  const router = useRouter();

  const handleSearch = (e) => {

    e.preventDefault();
    const search = e.target.search.value;

    if (search != '') {

      router.push(`/artwork?title=true&q=${search}`)

    }
  }

  return (
    <>
      <Navbar bg="dark" expand="lg" className="fixed-top navbar-dark bg-primary">
        <Container>
          <Navbar.Brand>Christian Ricci</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior><Nav.Link>Home</Nav.Link></Link>
              <Link href="/search" passHref legacyBehavior><Nav.Link>Advanced Search</Nav.Link></Link>
            </Nav>
            <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              name="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button class="btn btn-success" type="submit">Search</Button>
          </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  )
}