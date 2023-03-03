import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useState} from 'react';
import {useRouter} from 'next/router'

export default function MainNav() {

    const [searchValue, setSearchValue] = useState('');
    const router = useRouter();

    function submitForm(e) {
        e.preventDefault();
        const href = `/artwork?title=true&q=${searchValue}`;
        router.push(href);
    }

   return (
      <div>
         <Navbar bg="primary" variant="dark" fixed="top" className="fixed-top">
            <Container>
               <Navbar.Brand>Carmen Whitton</Navbar.Brand>
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                     <Nav.Link href="/" as={Link} >Home</Nav.Link>
                     <Nav.Link href="/search" as={Link}>Advanced Search</Nav.Link>
                  </Nav>
                  <Form className="d-flex" onSubmit={submitForm}>
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <Button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</Button>
                </Form>
               </Navbar.Collapse>
            </Container>
         </Navbar>
         <br />
         <br />
      </div>
   );
}