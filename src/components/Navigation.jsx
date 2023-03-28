//VISA NAVIGACIJA. JOJE KEISIS TARPUSAVY TURINYS, PRIKLAUSOMAI NUO TO, AR VARTOTOJAS PRISIJUNGES AR NE
//IF LOGGED IN = TRUE, TADA RODOME NavMainButtons ir NavLogoutButton, IF LOGGED IN = FALSE, RODOME NavLoginForm

import { NavigationLogo, NavUserLogo, NavLogoutButton } from "./NavIcons";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <>
      <Col md={4}>
        <div className="nav__background--color pt-5">
          <div className="d-flex justify-content-center">
            <NavigationLogo />
          </div>
          <div className="mt-5">
            <Container id="navButtons">
              <Row>
                <Link to="/dashboard/" className="mb-2 w-75 mx-auto">
                  <Button className="w-100 mx-auto">Pagrindinis</Button>
                </Link>
                <Link to="/incomes/" className="mb-2 w-75 mx-auto">
                  <Button className="w-100 mx-auto">Pajamos</Button>
                </Link>
                <Link to="/expenses/" className="mb-2 w-75 mx-auto">
                  <Button className="w-100 mx-auto">Išlaidos</Button>
                </Link>
              </Row>
            </Container>
          </div>
          <Container className="container__Bottom--Margin d-flex justify-content-between">
            <NavUserLogo />
            <NavLogoutButton />
          </Container>
        </div>
      </Col>
    </>
  );
}

export default Navigation;
