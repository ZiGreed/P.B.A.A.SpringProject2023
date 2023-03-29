import { Col, Row, Container, Offcanvas, Button } from "react-bootstrap";

function Layout({ children }) {
  return (
    <div>
      <Container fluid className="p-0">
        <Row>
            <main>{children}</main>
        </Row>
      </Container>
    </div>
  );
}

export default Layout;
