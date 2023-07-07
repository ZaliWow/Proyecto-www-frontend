import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import "../Styles/SearchMusic.css";

export function SearchMusic({}) {
    return(
        <div className='searchMusic'>
        <Container>
        <Form className="d-flex">
        <Form.Control
          type="search"
          style={{border: "2px solid red"}}
          placeholder="Buscar canción"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-danger">Buscar</Button>
      </Form>
      </Container>
      </div>
    )
    
}