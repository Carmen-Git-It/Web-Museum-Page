import { Container } from 'react-bootstrap';
import MainNav from '@/pages/components/MainNav'

export default function Layout(props) {
   return (
      <div>
         <MainNav />
         <br />
         <Container>
            {props.children}
         </Container>
         <br />
      </div>
   );
}
