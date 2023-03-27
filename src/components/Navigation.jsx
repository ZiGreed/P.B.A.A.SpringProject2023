//VISA NAVIGACIJA. JOJE KEISIS TARPUSAVY TURINYS, PRIKLAUSOMAI NUO TO, AR VARTOTOJAS PRISIJUNGES AR NE
//IF LOGGED IN = TRUE, TADA RODOME NavMainButtons ir NavLogoutButton, IF LOGGED IN = FALSE, RODOME NavLoginForm

import { NavigationLogo, NavUserLogo, NavLogoutButton } from "./NavIcons";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";

function Navigation() {
  return (
    <div className="nav__background--color pt-5">
      <div className="d-flex justify-content-center">
        <NavigationLogo />
      </div>
      <div className="mt-5">
        <Container id="navButtons">
          <Row>
            <Button className="mb-2 w-75 mx-auto">Pagrindinis</Button>
            <Button className="mb-2 w-75 mx-auto">Pajamos</Button>
            <Button className="mb-5 w-75 mx-auto">Išlaidos</Button>
          </Row>
        </Container>
      </div>
      <Container className="container__Bottom--Margin d-flex justify-content-between">
        <NavUserLogo />
        <NavLogoutButton />
      </Container>
    </div>
  );
}

export default Navigation;
