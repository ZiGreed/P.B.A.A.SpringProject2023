import Navigation from "./Navigation";
import { Col, Row, Container, Offcanvas, Button } from "react-bootstrap";
import { useState } from "react";

function Layout({ children }) {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
  return (
    <div>
      <Container fluid className="p-0">
        <Row>
          <Col md={4}>
              <Navigation />
          </Col>
          <Col>
            <main>{children}</main>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Layout;
