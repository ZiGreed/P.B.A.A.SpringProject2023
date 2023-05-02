//VISA NAVIGACIJA. JOJE KEISIS TARPUSAVY TURINYS, PRIKLAUSOMAI NUO TO, AR VARTOTOJAS PRISIJUNGES AR NE
//IF LOGGED IN = TRUE, TADA RODOME NavMainButtons ir NavLogoutButton, IF LOGGED IN = FALSE, RODOME NavLoginForm

import { NavigationLogo, NavUserLogo, NavLogoutButton } from "./NavIcons";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";

function Navigation() {
  const { getLoggedIn } = useContext(AuthContext);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/users/getName")
      .then((res) => setUserName(res.data))
      .catch((error) => console.log(error));
  }, []);

  const logOut = async () => {
    await axios.get("http://localhost:3000/users/logout");
    getLoggedIn();
  };

  return (
    <>
      <div className="nav__background--color pt-5">
        <div className="d-flex justify-content-center">
          <NavigationLogo />
        </div>
        <div className="mt-5 d-flex flex-column justify-between gap-5">
          <div id="navButtons" className="w-75 mx-auto">
            <Link to="/" className="mb-2 w-50 mx-auto text-decoration-none">
              <Button className="w-100 mx-auto gradient-class">
                Pagrindinis
              </Button>
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
            <Link
              to="/budget/"
              className="mb-2 w-50 mx-auto text-decoration-none"
            >
              <Button className="w-100 mx-auto gradient-class">
                Biudžetas
              </Button>
            </Link>
            <Link
              to="/categorycreate/"
              className="mb-2 w-50 mx-auto text-decoration-none"
            >
              <Button className="w-100 mx-auto gradient-class">
                Kategorijos
              </Button>
            </Link>
          </div>
        </div>

        <div className="container__Bottom--Margin">
          <div className="user-logo">
            <NavUserLogo />
            <span className="user-profile">{userName}</span>
          </div>
          <button className="logout-button" onClick={logOut}>
            <NavLogoutButton />
          </button>
        </div>
      </div>
    </>
  );
}

export default Navigation;
