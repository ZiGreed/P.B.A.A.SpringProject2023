//VISA NAVIGACIJA. JOJE KEISIS TARPUSAVY TURINYS, PRIKLAUSOMAI NUO TO, AR VARTOTOJAS PRISIJUNGES AR NE
//IF LOGGED IN = TRUE, TADA RODOME NavMainButtons ir NavLogoutButton, IF LOGGED IN = FALSE, RODOME NavLoginForm

import { NavigationLogo, NavUserLogo, NavLogoutButton } from "./NavIcons";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <>
      {/* <Col md={3}> */}
        <div className="nav__background--color pt-5">
          <div className="d-flex justify-content-center">
            <NavigationLogo />
          </div>
          <div className="mt-5">
            <div id="navButtons" className="w-75 mx-auto">
              <Link to="/" className="mb-2 w-50 mx-auto text-decoration-none">
                <Button className="w-100 mx-auto gradient-class">Pagrindinis</Button>
              </Link>
              <Link
                to="/incomes/"
                className="mb-2 w-50 mx-auto text-decoration-none"
              >
                <Button className="w-100 mx-auto gradient-class">Pajamos</Button>
              </Link>
              <Link
                to="/expenses/"
                className="mb-2 w-50 mx-auto text-decoration-none"
              >
                <Button className="w-100 mx-auto gradient-class">Išlaidos</Button>
              </Link>
            </div>
          </div>
          <div className="container__Bottom--Margin">
            <NavUserLogo />
            <NavLogoutButton />
          </div>
        </div>
      {/* </Col> */}
    </>
  );
}

export default Navigation;
