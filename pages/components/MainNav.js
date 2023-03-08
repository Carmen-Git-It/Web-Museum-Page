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
   const [isExpanded, setIsExpanded] = useState(false);
   const router = useRouter();

   function submitForm(e) {
      setIsExpanded(false);
      e.preventDefault();
      const href = `/artwork?title=true&q=${searchValue}`;
      router.push(href);
   }

   return (
      <div>
         <Navbar bg="primary" variant="dark" fixed="top" className="fixed-top" expanded={isExpanded}>
            <Container>
               <Navbar.Brand>Carmen Whitton</Navbar.Brand>
               <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() =>{setIsExpanded(!isExpanded)}}/>
               <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                     <Nav.Link href="/" as={Link} onClick={()=>{setIsExpanded(false)}}>Home</Nav.Link>
                     <Nav.Link href="/search" as={Link} onClick={()=>{setIsExpanded(false)}}>Advanced Search</Nav.Link>
                  </Nav>
                  &nbsp;
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
                &nbsp;
               </Navbar.Collapse>
            </Container>
         </Navbar>
         <br />
         <br />
      </div>
   );
}