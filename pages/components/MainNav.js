import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useState} from 'react';
import {useRouter} from 'next/router';
import {useAtom} from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/authenticate';

export default function MainNav() {
   const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
   const [searchValue, setSearchValue] = useState('');
   const [isExpanded, setIsExpanded] = useState(false);

   let token = readToken();

   const router = useRouter();

   function logout() {
      setIsExpanded(false);
      removeToken();
      router.push('/login');
   }

   async function submitForm(e) {
      setIsExpanded(false);
      e.preventDefault();
      const query = `title=true&q=${searchValue}`;
      setSearchHistory(await addToHistory(query));
      router.push(`/artwork?${query}`);
   }

   return (
      <div>
         <Navbar bg="primary" variant="dark" fixed="top" className="fixed-top" expanded={isExpanded}>
            <Container>
               <Navbar.Brand>Carmen Whitton</Navbar.Brand>
               <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() =>{setIsExpanded(!isExpanded)}}/>
               <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                     <Nav.Link href="/" as={Link} onClick={()=>{setIsExpanded(false)}} active={router.pathname === "/"}>Home</Nav.Link>
                     {token && <Nav.Link href="/search" as={Link} onClick={()=>{setIsExpanded(false)}} active={router.pathname === "/search"}>Advanced Search</Nav.Link>}
                  </Nav>
                  &nbsp;
                  {!token && 
                     <Nav>
                        <Nav.Link href="/register" as={Link} onClick={()=>{setIsExpanded(false)}} active={router.pathname === "/register"}>Register</Nav.Link>
                        <Nav.Link href="/login" as={Link} onClick={()=>{setIsExpanded(false)}} active={router.pathname === "/login"}>Login</Nav.Link>
                     </Nav>}
                  {token && <Form className="d-flex" onSubmit={submitForm}>
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <Button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</Button>
                  </Form>}
                  &nbsp;
                  <Nav>
                     {token && <NavDropdown title={token.userName} id="basic-nav-dropdown">
                        <Link href="/favourites" passHref legacyBehavior><NavDropdown.Item onClick={()=>{setIsExpanded(false)}} active={router.pathname === "/favourites"}>Favourites</NavDropdown.Item></Link>
                        <Link href="/history" passHref legacyBehavior><NavDropdown.Item onClick={()=>{setIsExpanded(false)}} active={router.pathname === "/history"}>History</NavDropdown.Item></Link>
                        <NavDropdown.Item onClick={logout} >Logout</NavDropdown.Item>
                     </NavDropdown>}
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
         <br />
         <br />
      </div>
   );
}